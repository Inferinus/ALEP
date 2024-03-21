CREATE TABLE LoanDecisions (
    decision_id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES LoanApplications(application_id),
    decision JSON NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);
