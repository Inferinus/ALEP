from flask import Flask, request, jsonify
from .models import evaluate_loan_eligibility  # This is a placeholder.

app = Flask(__name__)

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

@app.route('/api/eligibility-results/<application_id>', methods=['GET'])
def get_eligibility_results(application_id):
    # Example logic to fetch results by application_id
    # This needs to be replaced with your actual data retrieval logic
    results = fetch_results_for_application(application_id)

    if results is None:
        return jsonify({"error": "Results not found for the given application ID"}), 404

    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)