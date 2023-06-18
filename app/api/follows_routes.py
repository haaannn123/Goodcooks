from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import User, db

follows_routes = Blueprint('follows', __name__)

@follows_routes.route('/<int:user_id>')
def check_if_current_user_follows_given_user(user_id):
    """
    Query for all the users the current user is following
    Query for follows where follower id === current user id AND followed id === paramterized id
    """
    current_user = User.query.get(session.get('_user_id'))
    given_user = User.query.get(user_id)

    is_following = given_user in current_user.following
    return {'is_following': is_following}

@follows_routes.route('/<int:userBeingFollowedId>', methods=["POST"])
@login_required
def following(userBeingFollowedId):
    current_user = User.query.get(session.get('_user_id'))
    user_being_followed = User.query.get(userBeingFollowedId)
    
    for user in current_user.following:
        if user == user_being_followed:
            return {"message": "You are already following this user!"}
        
    current_user.following.append(user_being_followed)
    db.session.commit()
    
    return current_user.to_dict()


@follows_routes.route('/<int:userTwo>', methods=["DELETE"])
@login_required
def unfollowing(userTwo):
    current_user = User.query.get(session.get('_user_id'))
    user_2 = User.query.get(userTwo)
    current_user.following.remove(user_2)
    db.session.commit()
    return {"message": 'Successfully unfollowed!!'}