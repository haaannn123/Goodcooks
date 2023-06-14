import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate, thunkGetUser } from "./store/session";
import Navigation from "./components/Navigation";
import Books from "./components/Books";
import Book from "./components/BookDetails";
import BookForm from "./components/BookForm";
import BookFormUpdate from "./components/BookFormUpdate";
import ProfilePage from "./components/ProfilePage";
import EditShelf from "./components/ProfilePage/EditShelf";
import SplashPage from "./components/SplashPage";
import UserBooks from "./components/UserBooks/UserBooks";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AllBooks from "./components/AllBooks";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
    <ScrollToTop />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/review/list">
            <UserBooks />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/books/new">
            <BookForm />
          </Route>
          <Route path="/books/:bookId/edit">
            <BookFormUpdate />
          </Route>
          <Route path="/books/:bookId">
            <Book />
          </Route>
          <Route path='/books'>
            <AllBooks />
          </Route>
          <Route path="/user/:userId">
            <ProfilePage />
          </Route>
          <Route path='/bookshelves/edit'>
              <EditShelf />
          </Route>
          <Route path="/">
            <SplashPage />
            <Books />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
