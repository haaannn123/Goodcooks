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
    current_user = User.query.get(session.get('_user_id'))
    given_user = User.query.get(user_id)

    is_following = given_user in current_user.following
    return {'is_following': is_following}

@follows_routes.route('/<int:userBeingFollowedId>', methods=["POST"])
@login_required
def following(userBeingFollowedId):
    current_user = User.query.get(session.get('_user_id'))
    user_being_followed = User.query.get(userBeingFollowedId)
    print("\n add follow", current_user.following, current_user, user_being_followed, "\n")

    for user in current_user.following:
        if user == user_being_followed:
            return {"message": "You are already following this user!"}
        
    current_user.following.append(user_being_followed)
    # user_being_followed.followers.append(current_user)

    print("\n", current_user.following, "\n")
    db.session.commit()
    
    return current_user.to_dict()


@follows_routes.route('/<int:userTwo>', methods=["DELETE"])
@login_required
def unfollowing(userTwo):
    current_user = User.query.get(session.get('_user_id'))
    user_2 = User.query.get(userTwo)
    
    print("\n DELETE USER", current_user.following, current_user, user_2, "\n")

    current_user.following.remove(user_2)

    print("\n", current_user.following, "\n")

    # user_2.followers.remove(current_user)

    db.session.commit()
    return {"message": 'Successfully unfollowed!!'}