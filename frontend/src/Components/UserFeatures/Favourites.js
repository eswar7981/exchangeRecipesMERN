import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeDisplay from "../Home/RecipeDisplay";
const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const backButton = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/favourites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.favourites);
        setFavourites(res.favourites);
      });
  }, []);

  return (
    <>
      <div className="mt-10 fixed top-1/3 bg-white ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3"
        >
          🡰
        </button>
      </div>

      <div>
        <RecipeDisplay data={favourites}></RecipeDisplay>
      </div>
    </>
  );
};

export default Favourites;
