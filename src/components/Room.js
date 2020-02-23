import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

//? this image will be show if there is a problem loading the correct one
import defaultImage from "../images/room-1.jpeg";

const Room = ({ room }) => {
  const { name, slug, images, price } = room;

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImage} alt="single room" />
        <div className="price-top">
          <h6>£{price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

// TODO - un-comment out the propTypes below and get the working without error
// Room.propTypes = {
//   name: PropTypes.string.isRequired,
//   slug: PropTypes.string.isRequired,
//   images: PropTypes.arrayOf(PropTypes.string).isRequired,
//   price: PropTypes.number.isRequired
// };

export default Room;
