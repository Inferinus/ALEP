from flask import request, jsonify, current_app as app, session
from . import db 
from app.models import User, LoanApplication, LoanDecision, evaluate_loan_eligibility
from datetime import datetime



# Login-related Routes

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user is None:
        user = User(firstname=data['firstname'], lastname=data['lastname'], username=data['username'], email=data['email'])
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User successfully registered."}), 201
    else:
        return jsonify({"error": "User already exists"}), 409

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({
        "message": "User successfully signed in.",
        "user": {
            "id": user.id,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "username": user.username,
            "email": user.email}}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
    
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200



# Loan Application Related Routes

@app.route('/api/predict_loan_eligibility', methods=['POST'])
def predict_loan_eligibility():
    try:
        user_id = request.json.get('user_id')
        print("User ID:", user_id)  # Debugging line
        input_data = request.get_json()
        print("\nInput data from application: ")
        print(input_data)
        
        # Evaluate eligibility and generate reasons if needed
        result = evaluate_loan_eligibility(input_data)
        
        # Save loan application
        new_application = LoanApplication(
            user_id=user_id,
            gender=input_data['gender'],
            married=input_data['married'],
            dependents=input_data['dependents'],
            education=input_data['education'],
            self_employed=input_data['selfEmployed'],
            applicant_income=input_data['applicantIncome'],
            coapplicant_income=input_data['coapplicantIncome'],
            loan_amount=input_data['loanAmount'],
            loan_term=input_data['loanTerm'],
            credit_history=input_data['creditHistory'],
            property_area=input_data['propertyArea'],
        )
        db.session.add(new_application)
        db.session.flush()  # This is to get the application id before committing
        
        # Save loan decision
        new_decision = LoanDecision(
            application_id=new_application.id,
            answer=result['status'],
            reason=', '.join(result.get('reasons', [])),
            decision_date=datetime.utcnow()
        )
        db.session.add(new_decision)
        db.session.commit()
        
        print(result)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred during processing.", "details": str(e)}), 500

@app.route('/api/user_loan_applications/<int:user_id>', methods=['GET'])
def user_loan_applications(user_id):
    # Retrieve all loan applications for the given user ID
    applications = LoanApplication.query.filter_by(user_id=user_id).all()
    applications_data = []
    for application in applications:
        # Retrieve the decision for each application
        decision = LoanDecision.query.filter_by(application_id=application.id).first()
        applications_data.append({
            "application_id": application.id,
            "loan_amount": application.loan_amount,
            "loan_term": application.loan_term,
            "status": decision.answer if decision else 'Pending',
            "reason": decision.reason if decision else None,
            "decision_date": decision.decision_date.strftime('%Y-%m-%d %H:%M:%S') if decision else None,
        })
    return jsonify(applications_data)




# Misc CRUD database operations

@app.route('/api/retrieve_user/<int:user_id>', methods=['GET'])
def retrieve_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"username": user.username, "email": user.email, "firstname": user.firstname, "lastname": user.lastname}), 200

@app.route('/api/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.firstname = data.get('firstname', user.firstname)
    user.lastname = data.get('lastname', user.lastname)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data and data['password']:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

@app.route('/api/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/api/change_password/<int:user_id>', methods=['PUT'])
def change_password(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user or not user.check_password(data['currentPassword']):
        return jsonify({'error': 'Invalid current password'}), 400
    user.set_password(data['newPassword'])
    db.session.commit()
    return jsonify({'message': 'Password changed successfully'}), 200