import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";

class SingleRoom extends Component {
  static contextType = RoomContext; // ! very important for the context to work

  state = {
    slug: this.props.match.params.slug,
    defaultBcg
  };

  componentDidMount() {
    // console.log("SLUG:" + this.state.slug);
  }

  render() {
    //  pull the getRoom functions out of the context and use it to get the roomdetails of the slug
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    // if the room can't be found then let the user know
    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }

    //  the room was found so pull the details of the room out of the context
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;

    // here we're deconstructing the images into a ARRAY. It will contain the mainImage (the first one) and an object with all the other images (these will be used in the images list below te main image)
    const [mainImage, ...otherImages] = images;

    // TODO - there are several images for each room type. Work out how to choose a random image each time the cpmponent is renderd (Math.random and array.size will be needed). NOTE you will need to change the above deconstruction of he images object.
    // in this component we are going to use styled components to change the background URL.
    // www.styled-components.com
    return (
      <>
        <StyledHero img={mainImage}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {otherImages.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: £{price}</h6>
              <h6>size: {size} SQFT</h6>
              <h6>
                Max Capacity:{" "}
                {capacity > 1 ? `${capacity} people` : "Single person"}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>
                {breakfast
                  ? "free breakfast included"
                  : "no breakfast included"}
              </h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default SingleRoom;
