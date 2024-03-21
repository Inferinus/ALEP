-- Users Stored Procedures
CREATE OR REPLACE PROCEDURE createUser(_username VARCHAR, _password VARCHAR, _email VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO Users (username, password, email) VALUES (_username, _password, _email);
END;
$$;

CREATE OR REPLACE PROCEDURE retrieveUser(_user_id INTEGER)
LANGUAGE plpgsql AS $$
BEGIN
    SELECT * FROM Users WHERE user_id = _user_id;
END;
$$;

CREATE OR REPLACE PROCEDURE updateUser(_user_id INTEGER, _username VARCHAR, _password VARCHAR, _email VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Users SET username = _username, password = _password, email = _email WHERE user_id = _user_id;
END;
$$;

CREATE OR REPLACE PROCEDURE deleteUser(_user_id INTEGER)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Users WHERE user_id = _user_id;
END;
$$;



-- LoanApplications Stored Procedures
CREATE OR REPLACE PROCEDURE createLoanApplication(_user_id INTEGER, _application_data JSON)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO LoanApplications (user_id, application_data) VALUES (_user_id, _application_data);
END;
$$;




-- LoanDecisions Stored Procedures
CREATE OR REPLACE PROCEDURE createLoanDecision(_application_id INTEGER, _decision JSON)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO LoanDecisions (application_id, decision) VALUES (_application_id, _decision);
END;
$$;