import "./Reviews.css";

const Reviews = ({ avgRating, numReviews}) => {

    const renderStars = (avgRating) => {
        if (avgRating === 0){
            return (
                <>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </>
            )
        }else if (avgRating <= 1.4){
            return (
                <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </>
            )
        } else if (avgRating < 2){
            return(
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 2.4){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 3){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 3.4){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 4){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 4.4){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        } else if (avgRating < 5){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                </div>
            )
        } else if (avgRating >= 5){
            return (
                <div className="star-container-render">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </div>
            )
        } else {
            return (
                <div className="star-container-render">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            )
        }
    }

    const renderReviews = (numReviews) => {
        if (numReviews === 1){
            return numReviews + ' rating'
        } else{
            return numReviews + ' ratings'
        }
    }


  return (
    <div className="reviews-container">
      <div>{renderStars(avgRating)}</div>
      <h1 className="avg-rating">{avgRating}</h1>
      <span className="rating-rating">{renderReviews(numReviews)}</span>
    </div >
  );
};

export default Reviews;
