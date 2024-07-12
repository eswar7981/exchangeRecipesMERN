import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import food from "../images/food.jpg";

const SearchResult = () => {
  const navigate = useNavigate();

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const recipes = useSelector((state) => state.app.searchResults);

  console.log(recipes);

  return (
    <>
      <div className="mt-10 fixed top-1/3 ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_3,_2)_3px_2px_5px_-12px]"
        >
          🡰
        </button>
      </div>

      <div
        className="ml-4 pt-10 grid grid-cols-6 grid-rows-6 gap-2"
        style={{ backgroundImage: {} }}
      >
        {recipes &&
          recipes.map((recipe, index) => (
            <div className="col-span-2  max-w-max rounded-sm bg-red-100 px-4 py-3 mb-10">
              <NavLink to={`/recipes/${recipe.category}/${recipe.id}`}>
                <div>
                  <img
                    className="border m;-5 border-2 border-slate-500 w-100 h-40 "
                    src={recipe.image}
                      style={{ width: "200px", height: "160px" }}
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
    </>
  );
};

export default SearchResult;
