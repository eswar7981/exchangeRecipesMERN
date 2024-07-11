import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import food from "../images/food.jpg";

const RecipeDisplay = (recipes) => {

console.log(recipes)
  
  return (
    <>
      {recipes.length == 0 ? (
        <div className="text-white mt-24">
          <p>no recipes in this category</p>
        </div>
      ) : (
        <div
          className="ml-4 pt-10 grid grid-cols-6 grid-rows-6 gap-2"
          style={{ backgroundImage: {} }}
        >
          {recipes.data &&
            recipes.data.map((recipe, index) => (
              <div className="col-span-2 text-white  max-w-max rounded-sm bg-black px-4 py-3 mb-10">
                <NavLink to={`/recipes/${recipe.category}/${recipe.id}`}>
                  <div>
                    <img
                      className="border border-2 border-slate-500 w-100 h-40 "
                      src={food}
                    ></img>
                    <div className="flex gap-3">
                      <p>recipe:</p>
                      <p className="text font-bold text-red-600">
                        {recipe.name.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <p>cuisine:</p>
                      <p className="text font-medium text-red-600">
                        {recipe.cuisine.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <p>difficulty:</p>
                      <p className="text font-medium text-red-600">
                        {recipe.difficulty.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <p>preparation time:</p>
                      <p className="text font-medium text-red-600">
                        {recipe.duration}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star unchecked"></span>
                      <span class="fa fa-star unchecked"></span>

                      <p>(10)</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default RecipeDisplay;
