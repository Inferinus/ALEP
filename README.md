# ALEP: Advanced Loan Eligibility Predictor

## Team Information
- **Awwal Ahmed**
  - Email: aya3@hood.edu
  - Title: Project Liaison/Developer
- **Sarah Freidel**
  - Email: srf3@hood.edu
  - Title: Developer


## Project Repository URL
[GitHub - ALEP](https://github.com/Inferinus/ALEP)


## Project Overview
ALEP (Advanced Loan Eligibility Predictor) is a sophisticated tool designed to enhance the loan approval process. Utilizing a Random Forest algorithm, ALEP assesses potential borrowers based on factors like income, employment status, and credit history. This automated system predicts the likelihood of applicants fulfilling their loan obligations by analyzing historical data, ensuring decisions are both accurate and fair.


## Repository Directory Structure

- **ALEP/**
  - **app/** - Backend application with Flask
    - **models/** - Contains the Random Forest model and scaler for runtime use
  - **alep_frontend/** - Frontend React application
    - **src/** - Source files including React components and styles
      - **components/** - React components for UI elements
  - **instance/** - Database instance
  - **migrations/** - Database migrations folder
  - **notebooks/** - Jupyter notebook for data exploration and model training
    - **data/** - Data files used in the notebook


## Tech Stack
- **Frontend**: React.js
- **Backend**: Flask, SQLite
- **Data Science**: Python, Pandas, Scikit-Learn
- **Data Visualization**: Matplotlib, Seaborn


## Installation & Configuration
### Prerequisites
- Python 3.8 or higher
- Node.js 14.x or higher
- npm (typically installed with Node.js)

### Virtual Environment Setup
1. Clone the repository and navigate to the project directory:
    ```
    git clone https://github.com/yourgithubusername/ALEP.git
    cd ALEP
    ```
2. Create a virtual environment and activate it:
    - For macOS/Linux:
    ```
    python3 -m venv venv
    source venv/bin/activate
    ```
    - For Windows:
    ```
    python -m venv venvwin
    .\venvwin\Scripts\activate
    ```
3. Install python dependencies: 
  ```
  pip install -r requirements.txt
  ```
4. Set the FLASK_APP environment variable:
    - For macOS/Linux:
    ```
    export FLASK_APP=run.py
    ```
    - For Windows (Command Prompt):
    ```
    set FLASK_APP=run.py
    ```

### Initialize the Database
1. Initialize the database with Flask-Migrate:
    ```
    flask db init
    flask db migrate -m "Initial migration."
    flask db upgrade
    ```

### Start the Backend Server
Run ```python run.py``` in the ALEP directory.

### Setup and Run the Frontend
1. Navigate to the frontend directory: 'cd alep_frontend'
2. Install npm packages: 'npm install'
3. Start the React application: 'npm start'
