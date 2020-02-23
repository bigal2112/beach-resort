import React, { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";

//  use the Set function to return only unique values from the passed items object
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  //  get a unique list of the type (and add "all" to the top) and format them
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  const typesToRender = types.map((type, index) => {
    return (
      <option key={index} value={type}>
        {type}
      </option>
    );
  });

  //  get a unique list of the capacities and format them
  let capacities = getUnique(rooms, "capacity");

  const capacitiesToRender = capacities.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type - start */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            className="form-control"
            onChange={handleChange}
            name="type"
            value={type}
            id="type"
          >
            {typesToRender}
          </select>
        </div>
        {/* select type - end */}
        {/* select guests - start */}
        <div className="form-group">
          <label htmlFor="capacity">guests</label>
          <select
            className="form-control"
            onChange={handleChange}
            name="capacity"
            value={capacity}
            id="capacity"
          >
            {capacitiesToRender}
          </select>
        </div>
        {/* select guests - end */}
        {/* select room price - start */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            className="form-control"
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
          ></input>
        </div>
        {/* select room price - end */}
        {/* select size - start */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              className="size-input"
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
            ></input>
            <input
              className="size-input"
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        {/* select size - end */}
        {/* select extras - start */}
        <div className="form-group">
          <div className="single-extra">
            <input
              className="size-input"
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            ></input>
            <label htmlFor="breakfast">breakfast</label>
            <input
              className="size-input"
              type="checkbox"
              name="pets"
              id="pets"
              value={pets}
              onChange={handleChange}
            ></input>
            <label htmlFor="pest">pets</label>
          </div>
        </div>
        {/* select extras - end */}
      </form>
    </section>
  );
};

export default RoomsFilter;
