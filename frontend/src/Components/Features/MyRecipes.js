import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RecipeDisplay from "../Home/RecipeDisplay";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetch(`http://localhost:5000/user/my-recipes`, {
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
        console.log(res.myRecipes);
        setMyRecipes(res.myRecipes);
      });
  }, []);

  return (
    <div>
      <RecipeDisplay data={myRecipes}></RecipeDisplay>
    </div>
  );
};

export default MyRecipes;
