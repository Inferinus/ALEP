-- Create a new role
CREATE ROLE db_admin WITH LOGIN PASSWORD 'password2024';

-- Create a new database
CREATE DATABASE alepDB OWNER db_admin;

-- Grant all privileges on database to the new role
GRANT ALL PRIVILEGES ON DATABASE alepDB TO db_admin;

-- Optional: Set the default schema for the new role to public
ALTER ROLE db_admin SET search_path TO public;

-- Optional: Make the role able to create new roles and databases
ALTER ROLE db_admin WITH CREATEDB CREATEROLE;
