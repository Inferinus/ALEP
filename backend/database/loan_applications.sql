CREATE TABLE LoanApplications (
    application_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    application_data JSON NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);