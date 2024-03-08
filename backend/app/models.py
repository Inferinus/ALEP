from joblib import load
import numpy as np
import pandas as pd

# Assuming the scaler and the model are saved separately
RFclassifier = load('backend/models/random_forest_model.joblib')
scaler = load('backend/models/scaler.joblib')  # Load the scaler if you used one

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