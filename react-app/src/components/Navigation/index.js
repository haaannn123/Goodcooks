import { useSelector } from "react-redux";
import { useHistory, NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ isLoaded }) {

  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleClick = () => {
    history.push("/books/new");
  };

  return (
    <div className="navbar-container">

      <NavLink
        exact to="/"
        className="home-link">
        <div className="great">great<span className="cooks">cooks</span></div>
      </NavLink>

      {isLoaded ? (
        user ? (
          <>
            <NavLink
              to="/books/new"
              className="navlink">Create Book</NavLink>
            <NavLink
              to="/review/list"
              className="navlink">My books</NavLink>
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
