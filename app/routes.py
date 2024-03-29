from flask import request, jsonify, render_template, send_from_directory, current_app as app
from app.models import evaluate_loan_eligibility


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("index.html")

@app.route('/api/predict_loan_eligibility', methods=['POST'])
def predict_loan_eligibility():
    try:
        input_data = request.get_json()
        print(input_data)
        result_status = evaluate_loan_eligibility(input_data)
        print(result_status)
        return jsonify(result_status)
    except Exception as e:
        print(e)  # Log the error for debugging
        return jsonify({"error": "An error occurred during processing.", "details": str(e)}), 500

@app.route('/submit_application', methods=['POST'])
def submit_application():
    input_data = request.get_json()
    result_status = evaluate_loan_eligibility(input_data)
    # Render the result.html template with the prediction result
    return render_template('result.html', result_status=result_status)
