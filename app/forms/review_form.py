from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(min=3, max=255, message='Review must be between 3 and 255 characters')])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    submit = SubmitField('Submit')
