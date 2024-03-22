from joblib import load
from app import app, db
import numpy as np
import pandas as pd
import json


# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://db_admin:alep2024@localhost/alepdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

RFclassifier = load('app/models/random_forest_model.joblib')
scaler = load('app/models/scaler.joblib')


# Database Models
class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class LoanApplication(db.Model):
    __tablename__ = 'loan_applications'
    application_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    loan_amount = db.Column(db.Numeric, nullable=False)
    credit_score = db.Column(db.Integer, nullable=False)
    employment_status = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class LoanDecision(db.Model):
    __tablename__ = 'loan_decisions'
    decision_id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('loan_applications.application_id'), nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    reason = db.Column(db.String(255), nullable=False)
    decision_data = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, server_default=db.func.now())



def preprocess_input_data(data):
    """
    Preprocess the input data to match the training format.
    """
    # Create a DataFrame from the input data
    input_df = pd.DataFrame([data])
    
    # Handling missing values
    for column in ['Gender', 'Married', 'Dependents', 'Self_Employed', 'Credit_History', 'Loan_Amount_Term']:
        input_df[column] = input_df[column].fillna(input_df[column].mode()[0])
    input_df['LoanAmount'] = input_df['LoanAmount'].fillna(input_df['LoanAmount'].mean())
    
    # Apply square root transformation
    input_df['ApplicantIncome'] = np.sqrt(input_df['ApplicantIncome'])
    input_df['CoapplicantIncome'] = np.sqrt(input_df['CoapplicantIncome'])
    input_df['LoanAmount'] = np.sqrt(input_df['LoanAmount'])
    
    # Encoding categorical variables as done before model training
    input_df = pd.get_dummies(input_df, drop_first=True)
    
    # Ensure all columns used in training are present, fill missing with 0s
    model_columns = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History',
                     'Gender_Male', 'Married_Yes', 'Education_Not Graduate', 'Self_Employed_Yes', 
                     'Property_Area_Semiurban', 'Property_Area_Urban']  # Add all columns used in training
    for col in model_columns:
        if col not in input_df.columns:
            input_df[col] = 0
    
    input_df = input_df[model_columns]
    
    return input_df

def evaluate_loan_eligibility(data):
    """
    Evaluate loan eligibility using the Random Forest model.
    """
    preprocessed_data = preprocess_input_data(data)
    
    # If you used a scaler, apply it
    scaled_data = scaler.transform(preprocessed_data)
    
    # Make a prediction
    prediction = RFclassifier.predict(scaled_data)
    
    result_status = "Approved" if prediction[0] == 1 else "Rejected"
    
    result = {
        "status": result_status,
    }
    
    return result

# Users procedures
def create_user(username, password, email):
    sql = "CALL createUser(:username, :password, :email);"
    db.session.execute(sql, {'username': username, 'password': password, 'email': email})
    db.session.commit()

def retrieve_user(user_id):
    sql = "CALL retrieveUser(:user_id);"
    result = db.session.execute(sql, {'user_id': user_id})
    return result.fetchone()

def update_user(user_id, username, password, email):
    sql = "CALL updateUser(:user_id, :username, :password, :email);"
    db.session.execute(sql, {'user_id': user_id, 'username': username, 'password': password, 'email': email})
    db.session.commit()

def delete_user(user_id):
    sql = "CALL deleteUser(:user_id);"
    db.session.execute(sql, {'user_id': user_id})
    db.session.commit()

# Loan Application procedures
def create_loan_application(user_id, application_data):
    sql = "CALL createLoanApplication(:user_id, :application_data);"
    db.session.execute(sql, {'user_id': user_id, 'application_data': application_data})
    db.session.commit()

# Loan Decisions procedures
def create_loan_decision(application_id, decision):
    # Assuming `decision` is a dictionary that you'll convert to JSON
    decision_json = json.dumps(decision)
    sql = "CALL createLoanDecision(:application_id, :decision_json);"
    db.session.execute(sql, {'application_id': application_id, 'decision_json': decision_json})
    db.session.commit()





# Ensure to create the database and tables before running the application
if __name__ == '__main__':
    db.create_all()