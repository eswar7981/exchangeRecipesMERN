import React, { cloneElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import bgImage from "../images/desserts.png";
import ShowCollections from "../Features/ShowCollections";

const CompleteRecipeDisplay = (recipe) => {
  const { recipeId } = useParams();
  const [dropdown, setDropDown] = useState(false);
  const login = useSelector((state) => state.auth.token);
  const [collections, setCollections] = useState();
  const [recipeDetails, setRecipeDetails] = useState();
  const navigate = useNavigate();
  const collectionNames = useSelector((state) => state.app.collectionNames);
  const [favourite, setFavourite] = useState(false);
  const admin = useSelector((state) => state.app.login);

  const removeUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/admin/remove-user", {
      method: "POST",
      body: JSON.stringify({
        token: login,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        navigate("/home");
      });
  };

  const backButton = (e) => {
    e.preventDefault();
    if (recipeDetails.category === undefined) {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  const handleDropDown = (e) => {
    e.preventDefault();
    setDropDown(!dropdown);
  };

  const followTheAuthor = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/user/follow-author`, {
      method: "POST",
      body: JSON.stringify({
        token: login,
        author: recipeDetails.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  const addToFavourites = (e) => {
    e.preventDefault();
    setFavourite(true);

    fetch(`http://localhost:5000/user/add-favourite`, {
      method: "POST",
      body: JSON.stringify({
        token: login,
        recipeId: recipeId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/search/details/?recipeId=${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRecipeDetails(res.recipe);
      });
  }, []);

  const deleteRecipe = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/admin/delete-recipe", {
      method: "POST",
      body: JSON.stringify({
        recipeId: recipeDetails.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        navigate("/home");
      });
  };

  const submitHandler = (e, name) => {
    e.preventDefault();
    console.log(name);
    fetch("http://localhost:5000/user/add-recipe-collection", {
      method: "POST",
      body: JSON.stringify({
        token: login,
        collectionName: name,
        recipeId: recipeDetails.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      });

    setDropDown(!dropdown);
  };

  return (
    <div>
      <div className="mt-10 fixed top-1/3 bg-white ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_1,_2)_0px_25px_50px_-12px]"
        >
          🡰
        </button>
      </div>

      <div class="flex">
        <div class="w-2/3 pb-8 max-w-max mx-auto text-white bg-black px-4 py-5 space-y-3 border rounded-lg my-10 shadow-md 1px 2px 3px red-300">
          <h1 className="max-w-max mx-auto  text-xl font-semibold">
            {recipeDetails && recipeDetails.name.toUpperCase()}
          </h1>
          <img
            className="max-w-max mx-auto"
            src="https://spoonacular.com/recipeImages/818941-556x370.jpg"
            alt="Avocado"
          ></img>

          {login && !favourite && !admin && (
            <div className="max-w-20 ml-auto text-3xl">
              <button onClick={addToFavourites}>🤍</button>
            </div>
          )}

          {login && favourite && !admin && (
            <div className="max-w-20 ml-auto text-3xl">
              <button onClick={ShowCollections}>💗</button>
              <ul></ul>
            </div>
          )}

          {admin && (
            <>
              <div className="">
                <button
                  className="max-auto-max ml-3 text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={deleteRecipe}
                >
                  Delete Recipe
                </button>
                <ul className=" z-10 mt-2  w-40 text-white text-center bg-red-500 rounded divide-y divide-gray-100 shadow">
                  {collectionNames &&
                    dropdown &&
                    collectionNames.map((name) => (
                      <li>
                        <button onClick={(e) => submitHandler(e, name)}>
                          {name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="">
                <button
                  className="max-auto-max ml-3 text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                  onClick={removeUser}
                >
                  Delete Author
                </button>
                <ul className=" z-10 mt-2  w-40 text-white text-center bg-red-500 rounded divide-y divide-gray-100 shadow">
                  {collectionNames &&
                    dropdown &&
                    collectionNames.map((name) => (
                      <li>
                        <button onClick={(e) => submitHandler(e, name)}>
                          {name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

          {login && !admin && (
            <div className="">
              <button
                className="max-auto-max ml-3 text-white bg-red-600  box-shadow: 0 1px 2px 0 rgb(1 1 1 / 0.5) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                onClick={handleDropDown}
              >
                Add To Collections
              </button>
              <ul className=" z-10 mt-2  w-40 text-white text-center bg-red-500 rounded divide-y divide-gray-100 shadow">
                {collectionNames &&
                  dropdown &&
                  collectionNames.map((name) => (
                    <li>
                      <button onClick={(e) => submitHandler(e, name)}>
                        {name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div class="space-y-2 ">
            <h1 class="text-lg font-bold font-semibold font-sans">
              Recipe Info:
            </h1>
            <div class="flex flex-col space-y-1 ml-10">
              <span>
                Cuisine: {recipeDetails && recipeDetails.cuisine.toUpperCase()}
              </span>
              <span>
                Preperation Time: {recipeDetails && recipeDetails.duration}
              </span>
              <span>
                Difficulty: {recipeDetails && recipeDetails.difficulty}
              </span>
              <span>servings: {recipeDetails && recipeDetails.servings}</span>
            </div>
            <div>
              <h1 class="text-lg mb-2 font-bold font-semibold font-sans">
                Type of Dish:
              </h1>
              {recipeDetails && recipeDetails.type === "veg" ? (
                <span class="bg-green-600 px-2 text-white ml-10 rounded-md p-1">
                  {recipeDetails && recipeDetails.type}
                </span>
              ) : (
                <span class="bg-red-600 px-2 text-white ml-10 rounded-md p-1">
                  {recipeDetails && recipeDetails.type}
                </span>
              )}
            </div>
          </div>
          <div>
            <h1 class="text-lg text-lg font-bold font-semibold font-sans">
              Ingredients :
            </h1>
            <ul class="list-decimal pl-5 ml-10">
              {recipeDetails &&
                recipeDetails.ingredients
                  .split(",")
                  .map((ingredient) => <li>{ingredient}</li>)}
            </ul>
          </div>

          <div>
            <h1 class="text-lg text-lg font-bold font-semibold font-sans">
              Instructions :
            </h1>
            <ul class="list-disc pl-5 ml-10">
              {recipeDetails &&
                recipeDetails.procedure
                  .split(",")
                  .map((step) => <li>{step}</li>)}
            </ul>
          </div>

          <div>
            <h1 class="text-lg mb-2 text-lg font-bold font-semibold font-sans">
              Tags:
            </h1>
            {recipeDetails &&
              recipeDetails.keywords
                .split(",")
                .map((keyword) => (
                  <span className="bg-red-600 text-white rounded-md p-1 mr-4">
                    #{keyword}
                  </span>
                ))}
          </div>
          {!admin && login && (
            <div className="max-w-52 ml-auto ">
              <button
                onClick={followTheAuthor}
                className="  bg-blue-600   px-2 boreder rounded-sm hover:bg-blue-700   text-white font-bold"
              >
                Follow Author
              </button>
            </div>
          )}

          {login && !admin && (
            <div className="pt-32 pl-44 text-black bg-white">
              <div>
                <h1 className="text-lg mb-2 text-lg font-bold font-semibold font-sans">
                  Write a Review
                </h1>
                <textarea type="text" required className="w-80 h-44"></textarea>
              </div>
              <div>
                <h1 className="text-lg  mb-2 text-lg font-bold font-semibold font-sans">
                  Rate out of 5
                </h1>
                <div className="flex">
                  <input
                    max={5}
                    type="number"
                    maxLength="1"
                    minLength="1"
                    min={0}
                    required
                    className="border w-10 text-center rounded-lg"
                  ></input>
                </div>

                <button>Submit</button>
              </div>
            </div>
          )}

          <section class="py-24 relative bg-white">
            <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <h2 class="font-manrope font-bold text-2xl text-black text-center mb-11">
                People Love this Recipe
              </h2>
              <div class="grid grid-cols-12 py-6 border-y border-gray-200 mb-11">
                <div class="col-span-12 lg:col-span-10 ">
                  <h5 class="font-manrope font-semibold text-2xl leading-9 text-black text-center">
                    Reviews
                    <span class="lg:hidden font-manrope font-semibold text-2xl leading-9 text-black text-center">
                      {" "}
                      & Rating
                    </span>
                  </h5>
                </div>
                <div class="col-span-12 lg:col-span-2 max-lg:hidden">
                  <h5 class="font-manrope font-semibold text-2xl leading-9 text-black text-center">
                    Rating
                  </h5>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-8">
                <div class="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto">
                  <div class="col-span-12 lg:col-span-10 ">
                    <div class="sm:flex gap-6">
                      <div
                        className="text-center text-xl text-white"
                        style={{
                          backgroundColor: "beige",
                          paddingTop: "24px",
                          paddingBottom: "20px",
                          paddingLeft: "35px",
                          paddingRight: "35px",
                          height: "80px",
                          borderRadius: "90px",
                          backgroundColor: "orange",
                        }}
                      >
                        A
                      </div>
                      <div class="text">
                        <p class="font-medium text-lg leading-8 text-gray-900 mb-2">
                          Robert Karmazov
                        </p>
                        <div class="flex lg:hidden items-center gap-2 lg:justify-between w-full mb-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_13624_2090)">
                              <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_13624_2090">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_13624_2090)">
                              <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_13624_2090">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_13624_2090)">
                              <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_13624_2090">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_13624_2090)">
                              <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_13624_2090">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_13624_2090)">
                              <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_13624_2090">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p class="font-normal text-base leading-7 text-gray-400 mb-4 lg:pr-8">
                          One of the standout features of Pagedone is its
                          intuitive and user-friendly interface. Navigating
                          through the system feels natural, and the layout makes
                          it easy to locate and utilize various design elements.
                          This is particularly beneficial for designers looking
                          to streamline their workflow.{" "}
                        </p>
                        <div class="flex items-center justify-between">
                          <div class="cursor-pointers flex items-center gap-2">
                            <a
                              href="javascript:;"
                              class="font-semibold text-lg cursor-pointer leading-8 text-indigo-600 whitespace-nowrap"
                            >
                              View & Reply
                            </a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <path
                                d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                                stroke="#4F46E5"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <p class="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                            Nov 01, 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompleteRecipeDisplay;
