import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SearchResults from "./components/SearchResults";
import SignUpPage from "./components/SignUpPage";

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
          <ProtectedRoute path="/review/list">
            <UserBooks />
          </ProtectedRoute>
          <ProtectedRoute path="/books/new">
            <BookForm />
          </ProtectedRoute>
          <ProtectedRoute path="/books/:bookId/edit">
            <BookFormUpdate />
          </ProtectedRoute>
          <ProtectedRoute path="/books/:bookId">
            <Book />
          </ProtectedRoute>
          <ProtectedRoute path="/user/:userId">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path='/bookshelves/edit'>
              <EditShelf />
          </ProtectedRoute>
          <ProtectedRoute path="/books">
            <AllBooks/>
          </ProtectedRoute> 
          <ProtectedRoute path="/search/:search_terms">
            <SearchResults />
          </ProtectedRoute>
          <Route path="/login">
            <SplashPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <ProtectedRoute path="/">
            <Books />
          </ProtectedRoute>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
