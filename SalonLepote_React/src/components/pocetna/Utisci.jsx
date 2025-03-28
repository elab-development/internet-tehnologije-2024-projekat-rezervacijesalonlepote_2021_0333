import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Utisci = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://dummyjson.com/comments")
      .then(response => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch(error => {
        setError("Greška pri učitavanju komentara!");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Učitavanje komentara...</p>;
  if (error) return <p>{error}</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Prikazuje 3 komentara istovremeno
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <button className="next">➡</button>,
    prevArrow: <button className="prev">⬅</button>,
  };

  return (
    <div className="comments-container">
      <h2>Recenzije korisnika</h2>
      <Slider {...settings}>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h4>{comment.user.username}</h4>
            <p>{comment.body}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Utisci;
