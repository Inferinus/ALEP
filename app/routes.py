from flask import request, jsonify, render_template, current_app as app
from . import db 
from app.models import User, LoanApplication, LoanDecision, evaluate_loan_eligibility
from datetime import datetime

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("index.html")

@app.route('/api/predict_loan_eligibility', methods=['POST'])
def predict_loan_eligibility():
    try:
        input_data = request.get_json()
        print("\nInput data from application: ")
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



# CRUD OPERATIONS FOR DATABASE

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/retrieve_user/<int:user_id>', methods=['GET'])
def retrieve_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"username": user.username, "email": user.email}), 200

@app.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# LoanApplication Routes
@app.route('/create_loan_application', methods=['POST'])
def create_loan_application():
    data = request.get_json()
    new_loan_application = LoanApplication(
        user_id=data['user_id'],
        loan_amount=data['loan_amount'],
        credit_score=data['credit_score'],
        employment_status=data['employment_status']
    )
    db.session.add(new_loan_application)
    db.session.commit()
    return jsonify({"message": "Loan Application created successfully"}), 201

@app.route('/retrieve_loan_application/<int:application_id>', methods=['GET'])
def retrieve_loan_application(application_id):
    loan_application = LoanApplication.query.get_or_404(application_id)
    return jsonify({
        "user_id": loan_application.user_id,
        "loan_amount": loan_application.loan_amount,
        "credit_score": loan_application.credit_score,
        "employment_status": loan_application.employment_status
    }), 200

@app.route('/update_loan_application/<int:application_id>', methods=['PUT'])
def update_loan_application(application_id):
    loan_application = LoanApplication.query.get_or_404(application_id)
    data = request.get_json()
    loan_application.loan_amount = data.get('loan_amount', loan_application.loan_amount)
    loan_application.credit_score = data.get('credit_score', loan_application.credit_score)
    loan_application.employment_status = data.get('employment_status', loan_application.employment_status)
    db.session.commit()
    return jsonify({"message": "Loan Application updated successfully"}), 200

@app.route('/delete_loan_application/<int:application_id>', methods=['DELETE'])
def delete_loan_application(application_id):
    loan_application = LoanApplication.query.get_or_404(application_id)
    db.session.delete(loan_application)
    db.session.commit()
    return jsonify({"message": "Loan Application deleted successfully"}), 200

# LoanDecision Routes
@app.route('/create_loan_decision', methods=['POST'])
def create_loan_decision():
    data = request.get_json()
    new_loan_decision = LoanDecision(
        application_id=data['application_id'],
        answer=data['answer'],
        reason=data['reason'],
        decision_date=datetime.utcnow()
    )
    db.session.add(new_loan_decision)
    db.session.commit()
    return jsonify({"message": "Loan Decision created successfully"}), 201

@app.route('/retrieve_loan_decision/<int:decision_id>', methods=['GET'])
def retrieve_loan_decision(decision_id):
    loan_decision = LoanDecision.query.get_or_404(decision_id)
    return jsonify({
        "application_id": loan_decision.application_id,
        "answer": loan_decision.answer,
        "reason": loan_decision.reason,
        "decision_date": loan_decision.decision_date.strftime('%Y-%m-%d %H:%M:%S')
    }), 200

@app.route('/update_loan_decision/<int:decision_id>', methods=['PUT'])
def update_loan_decision(decision_id):
    loan_decision = LoanDecision.query.get_or_404(decision_id)
    data = request.get_json()
    loan_decision.answer = data.get('answer', loan_decision.answer)
    loan_decision.reason = data.get('reason', loan_decision.reason)
    # Assuming you don't update decision_date as it represents the initial decision time
    db.session.commit()
    return jsonify({"message": "Loan Decision updated successfully"}), 200

@app.route('/delete_loan_decision/<int:decision_id>', methods=['DELETE'])
def delete_loan_decision(decision_id):
    loan_decision = LoanDecision.query.get_or_404(decision_id)
    db.session.delete(loan_decision)
    db.session.commit()
    return jsonify({"message": "Loan Decision deleted successfully"}), 200