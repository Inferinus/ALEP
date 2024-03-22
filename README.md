# ALEP - Automated Loan Eligibility Predictor

Welcome to the ALEP project repository! ALEP is an advanced system designed to predict loan eligibility using machine learning and provide users with instant loan application decisions.

## Project Overview

The ALEP project aims to streamline the loan application process by leveraging financial data and sophisticated machine learning algorithms. Users can fill out a loan application form, and the system will provide an instant decision on their eligibility based on predictive modeling.

## Features

- **Machine Learning Model:** Utilizes a powerful machine learning model for accurate loan eligibility predictions.
- **Web Application:** A user-friendly React.js web interface for submitting loan applications and receiving instant decisions.
- **Dynamic Dashboard:** Visualizes user financial health, eligibility results, and personalized credit improvement tips.


## File Structure

frontend/: Contains all files related to the React frontend.  
    src/: Contains the React application source code.  
        components/:  
            Dashboard.js: Component displaying the user dashboard, including loan eligibility results.  
            LoanApplicationForm.js: Component for users to fill out and submit a loan application form.  
        services/:  
            loanService.js: Contains functions for API calls to the Flask backend for loan processing.  
        App.js: The main React application component that includes routing logic.  
        index.js: Entry point for the React application that renders the App component.  
    package.json: Node.js package configuration file, listing project dependencies and scripts.  
    

app/: Contains all files related to the Flask backend.  
    database/: Contains database-related files, facilitating migrations, scripts, and data management.  
        migrations/: Directory for database migration scripts (if using a migration tool like Alembic).  
        scripts/: Directory for database-related scripts, including maintenance or utility scripts.  
        data/: Directory for storing initial data or backups, useful for database seeding or recovery.  
        setup.sql: Initial setup script for PostgreSQL, used to create databases and tables.  
    models/: Contains ML Predictive Models, including pre-trained models and their associated files.  
    __init__.py: Initializes the Flask application and configures components like the database.  
    routes.py: Defines URL routes and view functions, mapping endpoints to Python functions.  
    models.py: Contains SQLAlchemy database models, representing tables and their relationships.  
    

app.py: Script to run the Flask application, initializing and starting the Flask server.  
config.py: Configuration file for the Flask application.  
get-pip.py: A Python script used for installing pip, Python's package installer, if it's not already installed.  
requirements.txt: File listing Python dependencies required for the Flask backend, ensuring consistent environments.  
