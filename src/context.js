import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);

    //  calculate the maximum price from the data to use in the price slider and the maximun size
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let minPrice = Math.min(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    // ? we can use the new ES6 syntax if what is in the state has the same name as what we're trying to update it wuth like 'rooms' and 'featuredRooms' in the following
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      minPrice,
      maxSize
    });
  }

  /*
    formatData(item)
    ----------------
    Takes the items data and creates an array of objects that are more easily processed by JS
  */
  formatData(items) {
    //  loop through the items data
    let tempItems = items.map(item => {
      // grab the id
      let id = item.sys.id;
      // flatten out the images into an array
      let images = item.fields.images.map(image => image.fields.file.url);
      // create a room object with just the existing items.fields object while also replacing the .images object with our flattened images object and add in the id field.
      let room = { ...item.fields, images: images, id: id };
      return room;
    });

    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    //  use FIND to return an OBJECT
    const foundRoom = tempRooms.find(room => room.slug === slug);
    return foundRoom;
  };

  handleChange = event => {
    // get the target info and use the type to decide what value to use when it's a checkbox or not.
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    //  update the state using the name of the component (this must be the same in the state AND the value option in the select i.e. value={type} in RoomsFilter.js that targes the type param in the state)
    this.setState({ [name]: value }, this.filterRooms);
  };

  filterRooms = () => {
    // deconstruct some of the state
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //  all the rooms
    let tempRooms = [...rooms];

    // transform values
    capacity = parseInt(capacity);
    price = parseInt(price);
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);

    //  filter by TYPE
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //  filter by CAPACITY
    tempRooms = tempRooms.filter(room => room.capacity >= capacity);

    //  filter by PRICE
    tempRooms = tempRooms.filter(room => room.price <= price);

    //  filter by SIZE
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //  filter by BREAKFAST
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === breakfast);
    }

    //  filter by PETS
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === pets);
    }

    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

//  this is a wrapper for the RoomConsumer. Simply wrap your component in withRoomConsumer to get access to the context and all props.
// ! check out 3:47:36 on how to wrap your component in this.
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
