import { useDispatch, useSelector } from "react-redux";
import AccountBox from "../AccountBox";
import "./SplashPage.css";
import { useEffect } from "react";
import { thunkGetAllBooks, thunkGetBookById } from "../../store/books";

const SplashPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const books = Object.values(useSelector(state => state.booksReducer.books))
  console.log("BOOKS HERE!!!---->",books)

  useEffect(() => {
    dispatch(thunkGetAllBooks())
  }, [dispatch])
  

  return (
    <div className="splash-page-container">
      {user ? null : (
        <div className="login-container">
          <img className="splash-page-image" src="https://i.imgur.com/8y4rp0M.png" alt="splash-page" />
          <div className="splash-page-description-container">
              <div className="splash-page-description">
                <h3>Deciding what to read next?</h3>
                <p>You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.</p>
              </div>
              <div className="splash-page-description-two">
                <h3>What are your friends reading?</h3>
                <p>Chances are your friends are discussing their favorite (and least favorite) cookbooks on Goodcooks.</p>
              </div>
          </div>
          <AccountBox />
            <div className="splash-page-books">
                <div className="splash-page-books-child">
                  <h3>Because Brian liked:</h3>
                  <div className="just-ken">
                  {books.map((obj) => {
                      if (obj.author === "Joshua Weissman"){
                        return (
                          <img src={obj.preview_img} alt="book" className="splash-page-book-cover"/>
                        )
                      }
                  })}
                  {books.map((obj) => {
                      if (obj.author === "Samin Nosrat"){
                        return (
                          <img src={obj.preview_img} alt="book" className="splash-page-book-cover"/>
                        )
                      }
                  })}
                  {books.map((obj) => {
                      if (obj.author === "Chrissy Teigen"){
                        return (
                          <img src={obj.preview_img} alt="book" className="splash-page-book-cover"/>
                        )
                      }
                  })}
                  </div>
                </div>
                <i class="fa-solid fa-right-long"></i>
                <div className="splash-page-books-child">
                <h3>He discovered:</h3>
                  {books.map((obj) => {
                      if (obj.author === "Andrew Rea"){
                        return (
                          <img src={obj.preview_img} alt="book" className="splash-page-book-cover"/>
                        )
                      }
                  })}
                  </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default SplashPage;
