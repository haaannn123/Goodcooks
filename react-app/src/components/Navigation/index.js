import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LandingPage from '../LandingPage';
import './Navigation.css';

function Navigation({ isLoaded }){
	const user = useSelector(state => state.session.user);

	return (
		<div className="navbar-container">
				<NavLink exact to="/" className="home-link">greatcooks</NavLink>
			{user && isLoaded ?(
				<>
					<ProfileButton user={user} />
				</>
			): <LandingPage />}
		</div>
	);
}

export default Navigation;
