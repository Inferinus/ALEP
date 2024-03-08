# ALEP - Automated Loan Eligibility Predictor

Welcome to the ALEP project repository! ALEP is an advanced system designed to predict loan eligibility using machine learning and provide users with instant loan application decisions.

## Project Overview

The ALEP project aims to streamline the loan application process by leveraging financial data and sophisticated machine learning algorithms. Users can fill out a loan application form, and the system will provide an instant decision on their eligibility based on predictive modeling.

## Features

- **Machine Learning Model:** Utilizes a powerful machine learning model for accurate loan eligibility predictions.
- **Web Application:** A user-friendly web interface for submitting loan applications and receiving instant decisions.
- **Dynamic Dashboard:** Visualizes user financial health, eligibility results, and personalized credit improvement tips.


## File Structure

frontend/: Contains all files related to the Angular frontend.
    src/: Contains the Angular application source code.
    app/: Contains Angular components, services, models, etc.
    assets/: Contains static assets such as images, fonts, etc.
    angular.json: Angular project configuration file.
    package.json: Node.js package configuration file.
    tsconfig.json: TypeScript configuration file.


backend/: Contains all files related to the Flask backend.
    app/: Contains the Flask application code.
    static/: Contains static files like CSS, JavaScript, etc.
    templates/: Contains HTML templates.
    __init__.py: Initializes the Flask application.
    routes.py: Defines URL routes and view functions.
    models.py: Contains database models.
    config.py: Configuration file for the Flask application.
    requirements.txt: File listing Python dependencies.
    run.py: Script to run the Flask application.


database/: Contains database-related files.
    migrations/: Directory for database migration scripts (if using a migration tool like Alembic).
    scripts/: Directory for database-related scripts.
    data/: Directory for storing initial data or backups.
    setup.sql: Initial setup script for PostgreSQL