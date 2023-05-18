from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, DateField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class BookForm(FlaskForm):
    title=StringField('Title', validators=[DataRequired(), Length(min=3)])
    author=StringField('Written By', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField('Price', places=2, number_format=3, validators=[DataRequired(), NumberRange(min=1)])
    published = DateField('Published On')
    preview_img= StringField('Image')
    submit = SubmitField('Submit')

