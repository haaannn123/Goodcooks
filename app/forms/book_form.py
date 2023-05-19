from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, DateField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class BookForm(FlaskForm):
    title=StringField('Title', validators=[DataRequired(), Length(min=2)])
    author=StringField('Written By', validators=[DataRequired(), Length(min=2)])
    description = StringField('Description', validators=[DataRequired(), Length(min=3)])
    price = DecimalField('Price', places=2, number_format=3, validators=[DataRequired(), NumberRange(min=1)])
    published = IntegerField('Published')
    preview_img= StringField('Image', validators=[DataRequired()])
    submit = SubmitField('Submit')
