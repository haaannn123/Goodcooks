from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class BookshelfForm(FlaskForm):
    name = StringField('Shelf name', validators=[DataRequired()])
    submit = SubmitField('Submit')
