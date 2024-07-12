import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import headerImg from "../images/bg.jpg";
import { appActions } from "../Store/AppStore";
import { useNavigate } from "react-router-dom";

const SearchRecipe = () => {
  const navigate = useNavigate();
  const [noResults, setNoResults] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [searchDetails, setSearchDetails] = useState({
    name: "",
    category: "",
    tag: "",
    ingredient: "",
    type: "",
    difficultyLevel: "",
    duration: "",
    preference: "",
  });
  const [showCategory, setShowCategory] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [showIngredient, setShowIngredient] = useState(false);
  const [showDifficultyLevel, setShowDifficultyLevel] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const tags = ["None", "food", "yummy", "delicious"];
  const preferences = ["None", "gluten-free", "peanut-free", "lactose-free"];
  const categories = [
    "None",
    "Soup",
    "BreakFast",
    "Curry",
    "Biryani",
    "Dessert",
    "Salad",
  ];
  const ingredients = ["None", "rice", "wheat", "chicken", "eggs", "mutton"];
  const duration = ["None", "below 15 min", "below 30 min", "below 60 min"];
  const types = ["None", "vegan", "veg", "non-veg"];
  const difficultyLevel = ["None", "easy", "difficult"];

  const [searchResult, setSearchResult] = useState();

  const selectCategory = (e, index) => {
    e.preventDefault();
    if (categories[index] === "None") {
      setSearchDetails({ ...searchDetails, ["category"]: "" });
    } else {
      setSearchDetails({ ...searchDetails, ["category"]: categories[index] });
    }
    setShowCategory(!showCategory);
  };

  const selectTag = (e, index) => {
    e.preventDefault();
    if (categories[index] === "None") {
      setSearchDetails({ ...searchDetails, ["tag"]: "" });
    } else {
      setSearchDetails({ ...searchDetails, ["tag"]: tags[index] });
    }

    setShowTag(!showTag);
  };

  const selectPreference = (e, index) => {
    e.preventDefault();

    if (categories[index] === "None") {
      setSearchDetails({ ...searchDetails, ["preference"]: "" });
    } else {
      setSearchDetails({
        ...searchDetails,
        ["preference"]: preferences[index],
      });
    }

    setShowPreferences(!showPreferences);
  };

  const selectDuration = (e, index) => {
    e.preventDefault();
    if (categories[index] === "None") {
      setSearchDetails({ ...searchDetails, ["duration"]: "" });
    } else {
      setSearchDetails({ ...searchDetails, ["duration"]: duration[index] });
    }

    setShowDuration(!showDuration);
  };

  const selectIngredient = (e, index) => {
    e.preventDefault();

    if (categories[index] === "None") {
      setSearchDetails({ ...searchDetails, ["ingredient"]: "" });
    } else {
      setSearchDetails({
        ...searchDetails,
        ["ingredient"]: ingredients[index],
      });
    }
    setShowIngredient(!showIngredient);
  };

  const nameHandler=(e)=>{
   
    setSearchDetails({...searchDetails,['name']:e.target.value})
  }

  const selectDifficultyLevel = (e, index) => {
    e.preventDefault();

    if (categories[index] === "None") {
      setSearchDetails({
        ...searchDetails,
        ["difficultyLevel"]: "",
      });
    } else {
      setSearchDetails({
        ...searchDetails,
        ["difficultyLevel"]: difficultyLevel[index],
      });
    }

    setShowDifficultyLevel(!showDifficultyLevel);
  };

  const selectType = (e, index) => {
    e.preventDefault();
    setSearchDetails({ ...searchDetails, ["type"]: types[index] });
    setShowType(!showType);
  };

  const handleDropDownCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleDropDownTag = () => {
    setShowTag(!showTag);
  };

  const handleDropDownIngredients = () => {
    setShowIngredient(!showIngredient);
  };

  const handleDropDownDifficultyLevel = () => {
    setShowDifficultyLevel(!showDifficultyLevel);
  };
  const handleDropDownDuration = () => {
    setShowDuration(!showDuration);
  };

  const handleDropDownType = () => {
    setShowType(!showType);
  };

  const handleDropDownPreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchDetails);

    fetch(`http://localhost:5000/search`, {
      method: "POST",
      body: JSON.stringify({
        name: searchDetails.name.toLowerCase(),
        category: searchDetails.category.toLowerCase(),
        duration: searchDetails.duration.toLowerCase(),
        difficultyLevel: searchDetails.difficultyLevel.toLowerCase(),
        ingredient: searchDetails.ingredient.toLowerCase(),
        preferences: searchDetails.preference.toLowerCase(),
        tag: searchDetails.tag.toLowerCase(),
        type: searchDetails.type.toLowerCase(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.length == 0) {
          setNoResults(true);
          setTimeout(() => {
            setNoResults(false);
          }, 2000);
        } else {
          dispatch(appActions.setSearchResults(res));
          navigate("/search");
        }
      });
  };

  return (
    <>
      {noResults && (
        <div
          class="flex left-96 fixed top-2 z-10 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Info alert!</span> No results found
          </div>
        </div>
      )}
      <div
        className="logo"
        style={{
          backgroundImage: `url(${headerImg})`,
          objectFit: "cover",
          opacity: "0.9",
        }}
      >
        <div className="relative bgg" style={{ opacity: "1" }}>
          <form class=" mt-5 max-w-lg mx-auto border rounded-full z-10">
            <div class="flex">
              <div class="relative w-full mt-20">
                <input
                  value={searchDetails.name}
                  onChange={nameHandler}
                  type="search"
                  id="search-dropdown"
                  class="block  w-full z-20 text-sm text-gray-900 bg-gray-50 px-4 h-10  rounded-lg py-1 border-s-5 border     "
                  placeholder="Search for a recipe"
                  required
                />
                <button
                  onClick={submitHandler}
                  type="submit"
                  className="submit absolute top-0 end-0 px-2 text-sm font-medium h-full text-white  rounded-e-lg border border-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <div
            className=" z-10 mt-2 max-w-max mx-auto"
            style={{ zIndex: "3232" }}
          >
            <h2 style={{ color: "white" }}>Choose</h2>
          </div>
          <div className="mt-6 pb-20 max-w-max mx-auto flex gap-1 ">
            <div className="block">
              <div className="justify-center text-center">
                <button
                  className=" text-white bg-black box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) hover:bg-red-600 focus:ring-4 focus:outline-none border border-4 border-red-500 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownCategory}
                >
                  Category
                </button>
                <div>
                  <input
                    style={{ zIndex: 466474764 }}
                    className="searchFilter  bg-white text-black  text-center"
                    value={searchDetails.category}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showCategory ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {categories &&
                    categories.map((category, index) => (
                      <li>
                        <button onClick={(e) => selectCategory(e, index)}>
                          {category}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block  ">
              <div className="justify-center text-center">
                <button
                  className=" text-white bg-black hover:bg-red-600 border-red-500 focus:ring-4 focus:outline-none border border-4 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownDifficultyLevel}
                >
                  Difficulty
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.difficultyLevel}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showDifficultyLevel ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {difficultyLevel &&
                    difficultyLevel.map((difficulty, index) => (
                      <li>
                        <button
                          onClick={(e) => selectDifficultyLevel(e, index)}
                        >
                          {difficulty}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block">
              <div className="justify-center text-center">
                <button
                  className="  text-white bg-black hover:bg-red-600 border-red-500 focus:ring-4 focus:outline-none border border-4 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownIngredients}
                >
                  Main Ingredient
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.ingredient}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showIngredient ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {ingredients &&
                    ingredients.map((ingredient, index) => (
                      <li>
                        <button onClick={(e) => selectIngredient(e, index)}>
                          {ingredient}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block  ">
              <div className="justify-center text-center">
                <button
                  className="  text-white bg-black hover:bg-red-600 border-red-500 focus:ring-4 focus:outline-none border border-4 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownDuration}
                >
                  Preparation Time
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.duration}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showDuration ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded border-red-500 divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {duration &&
                    duration.map((duration, index) => (
                      <li>
                        <button onClick={(e) => selectDuration(e, index)}>
                          {duration}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block  ">
              <div className="justify-center text-center">
                <button
                  className="  text-white bg-black hover:bg-red-600 border-red-500 focus:ring-4 focus:outline-none border border-4 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownPreferences}
                >
                  Preferences
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.preference}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showPreferences ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {preferences &&
                    preferences.map((preference, index) => (
                      <li>
                        <button onClick={(e) => selectPreference(e, index)}>
                          {preference}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block  ">
              <div className="justify-center text-center">
                <button
                  className="  text-white  bg-black hover:bg-red-600 border-4 border-red-500 focus:ring-4 focus:outline-noneborder border-4font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownTag}
                >
                  #Tag
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.tag}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showTag ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {tags &&
                    tags.map((tag, index) => (
                      <li>
                        <button onClick={(e) => selectTag(e, index)}>
                          #{tag}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="block  ">
              <div className="justify-center text-center">
                <button
                  className="  text-white  bg-black hover:bg-red-600 border border-4 border-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={handleDropDownType}
                >
                  Type
                </button>
                <div>
                  <input
                    className="searchFilter  text-center"
                    value={searchDetails.type}
                  ></input>
                </div>
              </div>
              <div
                className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                  showType ? "block" : "hidden"
                }`}
              >
                <ul className=" z-10  w-40 text-center bg-black text-white rounded divide-y divide-red-500 shadow border  border-red-500 ">
                  {" "}
                  {types &&
                    types.map((type, index) => (
                      <li>
                        <button onClick={(e) => selectType(e, index)}>
                          {type}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchRecipe;
