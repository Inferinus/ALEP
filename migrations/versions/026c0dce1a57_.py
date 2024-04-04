"""empty message

Revision ID: 026c0dce1a57
Revises: faa6761ba825
Create Date: 2024-04-04 13:29:51.058150

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '026c0dce1a57'
down_revision = 'faa6761ba825'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('loan_application', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('married', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('dependents', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('education', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('self_employed', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('applicant_income', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('coapplicant_income', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('loan_term', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('credit_history', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('property_area', sa.String(length=20), nullable=False))
        batch_op.drop_column('credit_score')
        batch_op.drop_column('employment_status')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('loan_application', schema=None) as batch_op:
        batch_op.add_column(sa.Column('employment_status', sa.VARCHAR(length=80), nullable=False))
        batch_op.add_column(sa.Column('credit_score', sa.INTEGER(), nullable=False))
        batch_op.drop_column('property_area')
        batch_op.drop_column('credit_history')
        batch_op.drop_column('loan_term')
        batch_op.drop_column('coapplicant_income')
        batch_op.drop_column('applicant_income')
        batch_op.drop_column('self_employed')
        batch_op.drop_column('education')
        batch_op.drop_column('dependents')
        batch_op.drop_column('married')
        batch_op.drop_column('gender')

    # ### end Alembic commands ###
