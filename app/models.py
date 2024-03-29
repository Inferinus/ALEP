import pandas as pd
import numpy as np
from joblib import load
import os

# Load the model and scaler
model_path = os.path.join(os.path.dirname(__file__), 'models', 'random_forest_model.joblib')
scaler_path = os.path.join(os.path.dirname(__file__), 'models', 'scaler.joblib')
RFclassifier = load(model_path)
scaler = load(scaler_path)

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
    print("Input data")
    print(input_df)
    
    # Scaling
    input_df_scaled = scaler.transform(input_df)

    return input_df_scaled

def evaluate_loan_eligibility(data):
    """
    Evaluate loan eligibility using the preprocessed data and the Random Forest model.
    """
    preprocessed_data = preprocess_input_data(data)
    print("Processed Data")
    print(preprocessed_data)
    #prediction = RFclassifier.predict(preprocessed_data)

    probabilities = RFclassifier.predict_proba(preprocessed_data)
    
    #Model Threshold
    new_threshold = 0.75
    prediction = (probabilities[:, 1] >= new_threshold).astype(int)

    # Calculating feature importances
    feature_importances = RFclassifier.feature_importances_
    features = np.array([
        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History',
        'Gender', 'Married', 'Dependents_0', 'Dependents_1', 'Dependents_2', 'Dependents_3+',
        'Education', 'Self_Employed', 'Property_Area_Rural', 'Property_Area_Semiurban', 'Property_Area_Urban'
    ])
    feature_importance_series = pd.Series(feature_importances, index=features)
    sorted_feature_importance = feature_importance_series.sort_values(ascending=False)
    
    print("Feature Importances:")
    print(sorted_feature_importance)

    result_status = "Approved" if prediction[0] == 1 else "Rejected"
    return {"status": result_status}
