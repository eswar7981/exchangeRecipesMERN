import React, { startTransition, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecipeDisplay from "./RecipeDisplay";

const ShowCategoryRecipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState();
 

  useEffect(() => {
    console.log(category)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/search/?category=${category.toLowerCase()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRecipes(res.recipes);
      });
  }, []);

  const navigate = useNavigate();

  const backButton = (e) => {
    e.preventDefault();
    navigate("/home");
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

export default ShowCategoryRecipes;
