import pandas as pd
import numpy as np
from joblib import load
import os
import bcrypt
from . import db

# Load the model and scaler
model_path = os.path.join(os.path.dirname(__file__), 'models', 'random_forest_model.joblib')
scaler_path = os.path.join(os.path.dirname(__file__), 'models', 'scaler.joblib')
RFclassifier = load(model_path)
scaler = load(scaler_path)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        # Verifying the password
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

class LoanApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    married = db.Column(db.String(10), nullable=False)
    dependents = db.Column(db.String(10), nullable=False)
    education = db.Column(db.String(20), nullable=False)
    self_employed = db.Column(db.String(10), nullable=False)
    applicant_income = db.Column(db.Integer, nullable=False)
    coapplicant_income = db.Column(db.Integer, nullable=False)
    loan_amount = db.Column(db.Float, nullable=False)
    loan_term = db.Column(db.Integer, nullable=False)
    credit_history = db.Column(db.Integer, nullable=False)
    property_area = db.Column(db.String(20), nullable=False)


class LoanDecision(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('loan_application.id'), nullable=False)
    answer = db.Column(db.String(80), nullable=False)
    reason = db.Column(db.String(250), nullable=True)
    decision_date = db.Column(db.DateTime, nullable=False)


def preprocess_input_data(data):
    """
    Adjust preprocessing to closely align with the training phase.
    """
    # Convert input data to DataFrame
    input_df = pd.DataFrame([data])

    # Numeric transformations
    input_df['ApplicantIncome'] = np.sqrt(float(data['applicantIncome']))
    input_df['CoapplicantIncome'] = np.sqrt(float(data['coapplicantIncome']))
    input_df['LoanAmount'] = np.sqrt(float(data['loanAmount']))

    # Directly usable fields
    input_df['Loan_Amount_Term'] = float(data['loanTerm'])
    input_df['Credit_History'] = float(data['creditHistory'])

    # Convert categorical fields to True/False
    input_df['Gender'] = data['gender'] == 'Male'
    input_df['Married'] = data['married'] == 'Yes'
    input_df['Education'] = data['education'] == 'Graduate'
    input_df['Self_Employed'] =  data['selfEmployed'] == 'Yes'

    # Dependents
    for i in range(4):
        dep_key = str(i) if i < 3 else '3+'
        input_df[f'Dependents_{dep_key}'] = data['dependents'] == dep_key

    # Property Area handling
    for area in ['Rural', 'Semiurban', 'Urban']:
        input_df[f'Property_Area_{area}'] = data['propertyArea'] == area

    # Reordered columns to match the training phase
    expected_columns = [
        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History',
        'Gender', 'Married', 'Dependents_0', 'Dependents_1', 'Dependents_2', 'Dependents_3+',
        'Education', 'Self_Employed', 'Property_Area_Rural', 'Property_Area_Semiurban', 'Property_Area_Urban'
    ]

    # Ensure all expected columns are present
    for col in expected_columns:
        if col not in input_df.columns:
            input_df[col] = False  # Assume missing columns are False

    # Order columns
    input_df = input_df[expected_columns]
    print("\nInput data formated: ")
    print(input_df)
    
    # Scaling
    input_df_scaled = scaler.transform(input_df)

    return input_df_scaled

def evaluate_loan_eligibility(data):
    """
    Evaluate loan eligibility using the preprocessed data and the Random Forest model.
    """
    preprocessed_data = preprocess_input_data(data)
    print("\nProcessed Data")
    print(preprocessed_data)
    
    probabilities = RFclassifier.predict_proba(preprocessed_data)
    
    # Model Threshold
    new_threshold = 0.75
    prediction = (probabilities[:, 1] >= new_threshold).astype(int)

    # Feature Importances
    feature_importances = RFclassifier.feature_importances_
    features = np.array([
        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History',
        'Gender', 'Married', 'Dependents_0', 'Dependents_1', 'Dependents_2', 'Dependents_3+',
        'Education', 'Self_Employed', 'Property_Area_Rural', 'Property_Area_Semiurban', 'Property_Area_Urban'
    ])
    feature_importance_series = pd.Series(feature_importances, index=features).sort_values(ascending=False)
    
    print("\nFeature Importances:")
    print(feature_importance_series)

    response = {"status": "Approved" if prediction[0] == 1 else "Rejected"}
    
    if prediction[0] == 0:  # If the application is rejected
        reasons = []

        # Income-Loan Ratio Check
        total_income = float(data['applicantIncome']) + float(data['coapplicantIncome'])
        loan_amount = float(data['loanAmount'])
        if total_income > 0:
            income_loan_ratio = loan_amount / total_income
            if income_loan_ratio > 0.6:  # threshold ratio
                reasons.append(f"The income to loan amount ratio is too high ({income_loan_ratio:.2f}). Consider reducing the loan amount or increasing income.")

        # Loan Term
        loan_term = int(data['loanTerm'])
        if loan_term > 360:
            reasons.append("The requested loan term is too long. Shortening the loan term may increase approval chances.")

        # Credit History Evaluation
        if data['creditHistory'] == '0':
            reasons.append("Improving credit history is crucial for loan approval. Consider checking your credit report for potential improvements.")

        # Self-Employed and Income Stability
        if data['selfEmployed'] == 'Yes' and total_income < 5000: 
            reasons.append("For self-employed applicants, demonstrating a higher and stable income may improve loan eligibility.")

        # Marital Status Check
        if data['married'] == 'No' and feature_importances['Married'] > 0.04:
            reasons.append("Marital status can impact loan approval. Married applicants may sometimes be viewed as having a more stable financial situation.")
        
        # Property Area Influence
        property_area_feedback = {
            'Urban': "Urban areas may have stricter evaluation criteria due to higher property values.",
            'Rural': "Rural areas might see lower approval rates due to perceived market stability concerns.",
            'Semiurban': "Properties in semi-urban areas generally have better approval rates. Review other aspects of your application if rejected."
        }
        reasons.append(property_area_feedback.get(data['propertyArea'], "Property area influence is unclear."))

        # Default message if no specific reasons identified
        if not reasons:
            reasons.append("There were no clear factors leading to rejection. Reviewing the application details for accuracy and completeness may help.")

        response["reasons"] = reasons

    return response