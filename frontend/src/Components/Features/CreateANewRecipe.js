import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { ReactReduxContext, useSelector } from "react-redux";
import chef from "../images/chef.png";
import navLogo from "../images/navLogo.jpg";
import recipeLogo from "../images/createRecipe.jpg";
import { json, useNavigate } from "react-router-dom";
const CreateANewRecipe = () => {
  const [image, setImage] = useState();
  const token = useSelector((state) => state.auth.token);
  const [veg, setVeg] = useState(true);
  const [nonVeg, setNonVeg] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showpreferences, setShowPreferences] = useState(false);
  const navigate = useNavigate();
  const duration = ["below 15 min", "below 30 min", "below 60 min"];

  const [easy, setEasy] = useState(true);
  const [difficult, setDifficult] = useState(false);
  const preferences = [
    "no-preferences",
    "gluten-free",
    "peanut-free",
    "lactose-free",
  ];
  const [recipeDetails, setRecipeDetails] = useState({
    name: "",
    cuisine: "",
    type: "veg",
    servings: "",
    duration: "below 15 min",
    difficultyLevel: "easy",
    ingredients: [],
    image: "",
    procedure: "",
    tags: [],
    category: "",
    preferences: "no-preferences",
  });
  const [ingredient, setIngredient] = useState("");
  const [tag, setTag] = useState("");
  const categories = [
    "Soup",
    "BreakFast",
    "Curry",
    "Biryani",
    "Dessert",
    "Salad",
  ];

  const [showCategory, setShowCategory] = useState(false);

  const handleDropDownCategory = (e) => {
    e.preventDefault();
    setShowCategory(!showCategory);
  };

  const nameHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["name"]: e.target.value });
  };

  const handleDropDownDuration = (e) => {
    e.preventDefault();
    setShowDuration(!showDuration);
  };

  const handleDropDownPreferences = (e) => {
    e.preventDefault();
    setShowPreferences(!showpreferences);
  };

  const selectPreference = (e, index) => {
    e.preventDefault();
    setRecipeDetails({ ...recipeDetails, ["preferences"]: preferences[index] });
    setShowPreferences(!showpreferences);
  };

  const selectDuration = (e, index) => {
    e.preventDefault();
    setRecipeDetails({ ...recipeDetails, ["duration"]: duration[index] });
    setShowDuration(!showDuration);
  };

  const difficultyChange = (e) => {
    setEasy(!easy);
    setDifficult(!difficult);

    setRecipeDetails({
      ...recipeDetails,
      ["difficultyLevel"]: easy ? "difficult" : "easy",
    });
  };

  const selectCategory = (e, index) => {
    e.preventDefault();
    setRecipeDetails({ ...recipeDetails, ["category"]: categories[index] });
    setShowCategory(!showCategory);
  };

  const typeChange = (e) => {
    setVeg(!veg);
    setNonVeg(!nonVeg);

    setRecipeDetails({ ...recipeDetails, ["type"]: veg ? "non-veg" : "veg" });
  };

  const cuisineHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["cuisine"]: e.target.value });
  };

  const typeHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["type"]: e.target.value });
  };

  const servingsHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["servings"]: e.target.value });
  };

  const imageHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["image"]: e.target.value });
  };

  const procedureHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["procedure"]: e.target.value });
  };

  const categoryHandler = (e) => {
    setRecipeDetails({ ...recipeDetails, ["category"]: e.target.value });
  };

  const tagHandler = (e) => {
    setTag(e.target.value);
  };

  const addTagHandler = (e) => {
    e.preventDefault();
    setRecipeDetails({
      ...recipeDetails,
      ["tags"]: [...recipeDetails.tags, tag],
    });
    setTag("");
  };

  const ingredientHandler = (e) => {
    setIngredient(e.target.value);
  };

  const addIngredientHandler = (e) => {
    e.preventDefault();
    setRecipeDetails({
      ...recipeDetails,
      ["ingredients"]: [...recipeDetails.ingredients, ingredient],
    });
    console.log(recipeDetails.ingredients);
    setIngredient("");
  };

  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const removeIngredient = (e, ind) => {
    e.preventDefault();
    const updatedIngredients = recipeDetails.ingredients.filter(
      (ingredient, index) => ind != index
    );
    setRecipeDetails({ ...recipeDetails, ["ingredients"]: updatedIngredients });
  };

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const removeTag = (e, ind) => {
    e.preventDefault();
    const updatedTags = recipeDetails.tags.filter((tag, index) => ind != index);
    setRecipeDetails({ ...recipeDetails, ["tags"]: updatedTags });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(token);
    console.log(recipeDetails);
    fetch("http://localhost:5000/user/create-recipe", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        preferences: recipeDetails.preferences,
        difficulty: recipeDetails.difficultyLevel,
        name: recipeDetails.name.toLowerCase(),
        category: recipeDetails.category.toLowerCase(),
        cuisine: recipeDetails.cuisine.toLowerCase(),
        servings: recipeDetails.servings.toLowerCase(),
        procedure: recipeDetails.procedure,
        ingredients: recipeDetails.ingredients.toString().toLowerCase(),
        tags: recipeDetails.tags.toString().toLowerCase(),
        type: recipeDetails.type.toLowerCase(),
        duration: recipeDetails.duration.toLowerCase(),
        image: postImage.myFile,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status == "success") {
          setRecipeDetails({
            name: "",
            cuisine: "",
            type: "veg",
            servings: "",
            duration: "below 15 min",
            difficultyLevel: "easy",
            ingredients: [],
            image: "",
            procedure: "",
            tags: [],
            category: "",
            preferences: "no-preferences",
          });

          navigate('/home')
        }
      });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mt-10 fixed top-1/3 bg-white ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_1,_2)_0px_25px_50px_-12px]"
        >
          🡰
        </button>
      </div>
      <form onSubmit={submitHandler}
        className="p-2  logo max-w-max mx-auto border border-2 rounded-lg px-64  bg-white"
        style={{ backgroundImage: `url(${recipeLogo})` }}
      >
        <div className="pt-10 buttonBg  max-w-max mx-auto  font-semibold text-xl">
          <h3
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            Share your wonderful recipe here 😊
          </h3>
        </div>
        <div className="pt-10 mb-5">
          <label className="block  mb-2 text-sm  font-bold text-white dark:text-white">
            Title
          </label>
          <input
          required
            placeholder="dum biryani, vanilla cake"
            value={recipeDetails.name}
            onChange={nameHandler}
            type="text"
            className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></input>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white dark:text-white">
            Cuisine
          </label>
          <input
            required
            placeholder="Indian, Chinese, Korean"
            value={recipeDetails.cuisine}
            onChange={cuisineHandler}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></input>
        </div>

        <div className="mb-5">
          <label className="block  mb-2 text-sm  font-bold text-white dark:text-white">
            Choose Category
          </label>
          <div className="justify-center text-center">
            <div className="flex">
              <input
               
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={recipeDetails.category}
              ></input>
              <button
                className=" ml-3 text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                onClick={handleDropDownCategory}
              >
                Select
              </button>
            </div>

            <div
              className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                showCategory ? "block" : "hidden"
              }`}
            >
              <ul className=" z-10  w-40 text-center bg-white rounded divide-y divide-gray-100 shadow ">
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
        </div>

        <div className="mb-5">
          <label
            for="default-checkbox"
            class="block ms-2 text-sm  font-bold text-white dark:text-gray-300"
          >
            Type
          </label>
        </div>
        <div className="flex gap-5">
          <div class="flex items-center mb-4">
            <input
             
              checked={veg}
              onChange={typeChange}
              id="default-checkbox"
              type="checkbox"
              value=""
              class="button-bg w-4 h-4 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class=" ms-2 text-sm font-bold text-white dark:text-gray-300"
            >
              veg
            </label>
          </div>

          <div class="flex items-center mb-4">
            <input
             
              checked={nonVeg}
              onChange={typeChange}
              id="checked-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              class="ms-2 text-sm font-bold text-white dark:text-gray-300"
            >
              non veg
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white  dark:text-white">
            Preferences
          </label>
          <div className="flex">
            <input
              required
              className="border rounded-sm"
              value={recipeDetails.preferences}
            ></input>
            <button
              className="submit text-white bg-blue-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
              onClick={handleDropDownPreferences}
            >
              Choose
            </button>

            <div
              className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                showpreferences ? "block" : "hidden"
              }`}
            >
              <ul className=" z-10  w-32 text-center bg-white rounded divide-y divide-gray-100 shadow ">
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
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white  dark:text-white">
            Servings
          </label>
          <input
            required
            placeholder="4-5"
            value={recipeDetails.servings}
            onChange={servingsHandler}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></input>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white  dark:text-white">
            Duration
          </label>
          <div className="flex">
            <input
              required
              className="border rounded-sm"
              value={recipeDetails.duration}
            ></input>
            <button
              className="submit text-white bg-blue-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
              onClick={handleDropDownDuration}
            >
              Choose
            </button>

            <div
              className={`absolute ml-0 mt-2 z-10  bg-white rounded divide-y divide-gray-100 shadow ${
                showDuration ? "block" : "hidden"
              }`}
            >
              <ul className=" z-10  w-32 text-center bg-white rounded divide-y divide-gray-100 shadow ">
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
        </div>

        <div className="mb-5">
          <label
            for="default-checkbox"
            class="block text-sm  font-bold text-white  text-gray-900 dark:text-gray-300"
          >
            Difficulty Level
          </label>
        </div>
        <div className="flex gap-5">
          <div class="flex items-center mb-4">
            <input
             
              checked={easy}
              onChange={difficultyChange}
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-sm  font-bold text-white  dark:text-gray-300"
            >
              easy
            </label>
          </div>

          <div class="flex items-center mb-4">
            <input
             
              checked={difficult}
              onChange={difficultyChange}
              id="checked-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              class="ms-2 text-sm  font-bold text-white  dark:text-gray-300"
            >
              difficult
            </label>
          </div>
        </div>

        <div className="mb-4 ">
          <label className="block mb-2 text-sm  font-bold text-white dark:text-white">
            Ingredients
          </label>
          <div className="block ml-10">
            {recipeDetails.ingredients.map((ingredient, ind) => (
              <div className="flex gap-4 mt-2">
                <p className="bg-blue-300 border rounded-md px-3 ">
                  {ingredient}
                </p>
                <button
                  onClick={(e) => removeIngredient(e, ind)}
                  className="bg-red-500 px-2 pb-1 text-white"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <input
             
              placeholder="rice"
              value={ingredient}
              onChange={ingredientHandler}
              className="border-gray-300 m-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ></input>
            <button
              onClick={addIngredientHandler}
              className=" text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white dark:text-white">
            Procedure
          </label>
          <textarea
            required
            placeholder="explain the steps involved"
            value={recipeDetails.procedure}
            onChange={procedureHandler}
            type="text"
            style={{ width: "400px", height: "300px" }}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></textarea>
        </div>

        <div className="mb-4 ">
          <label className="block mb-2 text-sm  font-bold text-white dark:text-white">
            Tags:
          </label>
          <div className="block ml-10">
            {recipeDetails.tags.map((tag, ind) => (
              <div className="flex gap-4 mt-2">
                <p className="bg-blue-300 border rounded-md px-3 ">#{tag}</p>
                <button
                  onClick={(e) => removeTag(e, ind)}
                  className="bg-red-500 px-2 pb-1 text-white"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <input
              
              placeholder="food"
              value={tag}
              onChange={tagHandler}
              className="border-gray-300 m-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ></input>
            <button
              onClick={addTagHandler}
              className=" text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm  font-bold text-white dark:text-white">
            Image:
          </label>
          <input
            required
            onChange={(e) => handleFileUpload(e)}
            id="image"
            className="ml-20"
            type="file"
            accept=".jpeg, .png, .jpg"
          ></input>
        </div>

        <div className="max-w-max mx-auto">
          <button
            type="submit"
            className="submit px-24 py-1 mb-4"
            
          >
            Submit
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default CreateANewRecipe;
