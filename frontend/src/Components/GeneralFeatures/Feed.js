import React from "react";
import navLogo from "../assets/navLogo.jpg";
import food from "../assets/food.jpg";
import { NavLink } from "react-router-dom";
import dessertImage from "../assets/desserts.png";
import breakfastImage from "../assets/breakfast.png";
import curryImage from "../assets/curry.png";
import biryaniImage from "../assets/biryani.jpg";
import milkshakeImage from "../assets/milkshake.png";
import saladImage from "../assets/salads.png";
import soupImage from "../assets/soup.jpg";
import snacks from "../assets/food.jpg";

const Feed = () => {
  const recipes = [
    {
      id: 1,
      name: "rice",
      difficulty: "easy",
      duration: "15 mins only",
      cuisine: "indian",
      category: "rice",
      rating: 5,
    },
    {
      id: 2,
      name: "rice",
      difficulty: "easy",
      duration: "15 mins only",
      cuisine: "indian",
      category: "rice",
      rating: 5,
    },
    {
      id: 3,
      name: "rice",
      difficulty: "easy",
      duration: "15 mins only",
      cuisine: "indian",
      category: "rice",
      rating: 5,
    },
  ];
  const rating = "⭐";

  return (
    <>
      <div className=" ml-2 mt-10 pb-6 grid grid-cols-12">
        <div className="col-span-2">
        <NavLink to="/recipes/Soup">
          <button className="rounded-3xl  shadow12  relative text-center">
            <img
              title="Desserts"
              className=" rounded-3xl "
              src={soupImage}
              style={{ width: "200px", height: "270px" }}
            ></img>
            <div className=" pl-16 absolute text-white text-xl font-bold">
              <h2>Soups</h2>
            </div>
          </button>
          </NavLink>
        </div>

        <div className=" rounded-3xl min-h-[100] col-span-2">
          <NavLink to="/recipes/Dessert">
            <button className=" rounded-3xl  shadow12 relative shadow-md text-center ">
              <img
                title="Desserts"
                className="rounded-3xl "
                src={dessertImage}
                style={{ width: "200px", height: "270px" }}
              ></img>

              <div className=" pl-16 absolute text-white text-xl font-bold">
                <h2 className="">Dessert</h2>
              </div>
            </button>
          </NavLink>
        </div>

        <div className=" col-span-2">
          <NavLink to="/recipes/BreakFast">
            <button className="rounded-3xl  shadow12  relative text-center">
              <img
                title="BreakFast"
                className=" rounded-3xl "
                src={breakfastImage}
                style={{ width: "200px", height: "270px" }}
              ></img>
              <div className=" pl-16 absolute text-white text-xl font-bold">
                <h2>BreakFast</h2>
              </div>
            </button>
          </NavLink>
        </div>

        <div className="col-span-2">
          <NavLink to="/recipes/Curry">
          <button className="rounded-3xl  shadow12  relative text-center">
            <img
              title="Desserts"
              className="rounded-3xl "
              src={curryImage}
              style={{ width: "200px", height: "270px" }}
            ></img>
            <div className=" pl-16 absolute text-white text-xl font-bold">
              <h2>Curries</h2>
            </div>
          </button>
          </NavLink>
         
        </div>

        <div className="min-h-[100] col-span-2 ">
          <NavLink to="/recipes/Biryani">
          <button className="rounded-3xl  shadow12  relative text-center">
            <img
              title="Desserts"
              className=" rounded-3xl "
              src={biryaniImage}
              style={{ width: "200px", height: "270px" }}
            ></img>
            <div className=" pl-16 absolute text-white text-xl font-bold">
              <h2>Biryanis</h2>
            </div>
          </button>
          </NavLink>
        </div>

        <div className="col-span-2">
          <NavLink to="/recipes/Salad">
          <button className="rounded-3xl  shadow12  relative text-center">
            <img
              title="Desserts"
              className=" rounded-3xl "
              src={saladImage}
              style={{ width: "200px", height: "270px" }}
            ></img>
            <div className=" pl-16 absolute text-white text-xl font-bold">
              <h2>Salads</h2>
            </div>
          </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Feed;
