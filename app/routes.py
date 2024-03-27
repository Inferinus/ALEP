from flask import current_app as app, request, jsonify, send_from_directory, render_template
from app.models import User, LoanApplication, LoanDecision, evaluate_loan_eligibility, create_user, retrieve_user, update_user, delete_user, create_loan_application, create_loan_decision
from sqlalchemy.exc import SQLAlchemyError
import psycopg2
import os

from app import create_app

app = create_app()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# CRUD Operations for Database

# Create a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    create_user(data['username'], data['password'], data['email'])
    return jsonify({"message": "User created successfully"}), 201

# Retrieve user information
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = retrieve_user(user_id)
    if user:
        return jsonify(user)
    return jsonify({"message": "User not found"}), 404

# Update user information
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user_route(user_id):
    data = request.json
    update_user(user_id, data['username'], data['password'], data['email'])
    return jsonify({"message": "User updated successfully"}), 200

# Delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    delete_user(user_id)
    return jsonify({"message": "User deleted successfully"}), 200

# Create a new loan application
@app.route('/loan_applications', methods=['POST'])
def add_loan_application():
    data = request.json
    create_loan_application(data['user_id'], data['application_data'])
    return jsonify({"message": "Loan application submitted successfully"}), 201

# Create a new loan decision
@app.route('/loan_decisions', methods=['POST'])
def add_loan_decision():
    data = request.json
    create_loan_decision(data['application_id'], data['decision'])
    return jsonify({"message": "Loan decision created successfully"}), 201

@app.route('/api/predict_loan_eligibility', methods=['POST'])
def predict_loan_eligibility():
    # Get data from request payload
    input_data = request.get_json()
    
    if not input_data:
        return jsonify({"error": "Missing data"}), 400

    try:
        # Evaluate loan eligibility
        result = evaluate_loan_eligibility(input_data)
        
        # Return the prediction result
        return jsonify(result), 200
    except Exception as e:
        # Handle unexpected errors
        return jsonify({"error": str(e)}), 500

@app.route('/api/eligibility-results', methods=['GET'])
def get_mock_eligibility_results():
    # Return a mock response or static JSON for now
    mock_results = {
        "financialHealth": "Good",
        "status": "Approved",
        "tips": ["Tip 1", "Tip 2"]
    }
    return jsonify(mock_results), 200

#@app.route('/api/eligibility-results/<application_id>', methods=['GET'])
#def get_eligibility_results(application_id):
    # Example logic to fetch results by application_id
    # This needs to be replaced with your actual data retrieval logic
    #results = fetch_results_for_application(application_id)

    #if results is None:
        #return jsonify({"error": "Results not found for the given application ID"}), 404

    #return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)