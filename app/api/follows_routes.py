from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import User, db

follows_routes = Blueprint('follows', __name__)

# @follows_routes.route('/')
# def all_current_users_following():
#     """
#     Query for all the users the current user is following
#     """
#     current_user = session.get('_user_id')
#     following_users = current_user.following
#     following_users_list = [user.to_dict() for user in following_users]
#     return {'following_users': following_users_list}


@follows_routes.route('/<int:user_id>')
def check_if_current_user_follows_given_user(user_id):
    """
    Query for all the users the current user is following
    Query for follows where follower id === current user id AND followed id === paramterized id
    """
    current_user = session.get('_user_id')
    given_user = User.query.get(user_id)

    is_following = given_user in current_user.following
    print('isFOLLOWING:', is_following)
    return {'is_following': is_following}

@follows_routes.route('/<int:userOne>/<int:userTwo>', methods=["POST"])
@login_required
def following(userOne, userTwo):
    user_1 = User.query.get(userOne)
    user_2 = User.query.get(userTwo)

    user_1.followers.append(user_2)

    db.session.commit()
    
    return user_1.to_dict()


@follows_routes.route('/<int:userOne>/<int:userTwo>', methods=["DELETE"])
@login_required
def unfollowing(userOne, userTwo):
    user_1 = User.query.get(userOne)
    user_2 = User.query.get(userTwo)

    user_2.following.remove(user_1)

    db.session.commit()
    return {"message": 'Successfully unfollowed!!'}