import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RecipeDisplay from "../Home/RecipeDisplay";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const ShowAuthorRecipes = () => {
  const { authorName } = useParams();
  const [recipes, setRecipes] = useState();
  const token=useSelector((state)=>state.auth.token)

  useEffect(() => {
    fetch(
      `http://localhost:5000/user/searchAuthorRecipes/?authorName=${authorName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:token
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.recipes)
        setRecipes(res.recipes);
      });
  }, []);

  const navigate = useNavigate();

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

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
        <RecipeDisplay data={recipes}></RecipeDisplay>
      </div>
    </>
  );
};

export default ShowAuthorRecipes;
