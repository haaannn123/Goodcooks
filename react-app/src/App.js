import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Books from "./components/Books";
import Book from "./components/Book";
import BookForm from "./components/BookForm";
import BookFormUpdate from "./components/BookFormUpdate";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
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
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/user">
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
