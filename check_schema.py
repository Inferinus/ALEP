from app import create_app, db  # Absolute import referring to the 'app' package

def print_database_schema():
    app = create_app()
    app.app_context().push()

    # Reflect the database
    db.reflect()

    # Print table and column information
    for table in db.Model.metadata.tables.values():
        print(f"\nTable: {table.name}")
        for column in table.columns:
            print(f"  Column: {column.name}")
            print(f"    Type: {column.type}")
            print(f"    Nullable: {column.nullable}")
            print(f"    Default: {column.default}")
            print(f"    Primary Key: {column.primary_key}")

if __name__ == "__main__":
    print_database_schema()
