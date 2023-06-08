import { useSelector } from "react-redux";
import { useHistory, NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "../SearchBar";

function Navigation({ isLoaded }) {

  const user = useSelector((state) => state.session.user);


  return (
    <div className="navbar-container">

      <NavLink
        exact to="/"
        className="home-link">
        <div className="great">good<span className="cooks">cooks</span></div>
      </NavLink>
      {isLoaded ? (
        user ? (
          <>
          <SearchBar />
            <NavLink
              to="/review/list"
              className="navbar-sub-nav-link"
            >My books</NavLink>
            <NavLink
              to="/books/new"
              className="navbar-sub-nav-link"
            >Create Book</NavLink>
            <ProfileButton user={user} />
          </>
        ) : (
          null
        )
      ) : null}
    </div>
  );
}

export default Navigation;
