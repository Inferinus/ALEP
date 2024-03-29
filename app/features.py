from joblib import load
import os

# Assuming the paths are correctly set to where your model and scaler are stored
model_path = "models/random_forest_model.joblib"

# Load the model
RFclassifier = load(model_path)

# Check if the model has the attribute 'feature_names_in_'
if hasattr(RFclassifier, 'feature_names_in_'):
    feature_names = RFclassifier.feature_names_in_
    print("Features used during the model's fit:", feature_names)
else:
    print("The model does not have the 'feature_names_in_' attribute or it was not saved.")
