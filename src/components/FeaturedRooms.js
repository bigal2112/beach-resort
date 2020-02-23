import React, { Component } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
import Loading from "./Loading";
import Room from "./Room";

class FeaturedRooms extends Component {
  static contextType = RoomContext; // ! very important for the context to work

  render() {
    //  destructure the context
    let { featuredRooms: rooms, loading } = this.context;

    // get all the rooms we want to display into an component with a key
    const roomsToDisplay = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });

    return (
      <section className="featured-rooms">
        <Title title="Featured Rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : roomsToDisplay}
        </div>
      </section>
    );
  }
}

export default FeaturedRooms;
