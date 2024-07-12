import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/AuthStore";
import { appActions } from "../Store/AppStore";

const MyCollections = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [collections, setCollections] = useState();
  const [newCollectionDetails, setNewCollectionDetails] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/user/get-collections`, {
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
        const collectionNames = res.collections.map(
          (collection) => collection.name
        );
        const updatedNames = collectionNames.filter(
          (item, index) => collectionNames.indexOf(item) === index
        );

        dispatch(appActions.setCollection(updatedNames));
        setCollections(updatedNames);
      });
  }, [isFormActive]);

  const nameHandler = (e) => {
    setNewCollectionDetails({
      ...newCollectionDetails,
      ["name"]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/user/add-collection", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        collectionName: newCollectionDetails.name,
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

    setIsFormActive(false);
  };

  const navigateMe = (e, collectionName) => {
    e.preventDefault();
    navigate(`/my-collections/${collectionName}`);
  };

  const activeForm = (e) => {
    e.preventDefault();
    setIsFormActive(true);
  };

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className=" mt-10 fixed top-1/3 ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_3,_2)_3px_2px_5px_-12px]"
        >
          🡰
        </button>
      </div>
      {!isFormActive && (
        <div className="ml-10 text-white mt-20">
          <h1 className="text-black max-w-max mx-auto mb-4 text-xl font-semibold">
            Collections
          </h1>
          <div className="grid m-4 grid-cols-12 grid-rows-12 gap-2  items-center ">
            <button
              onClick={activeForm}
              className="col-span-2 rounded-lg min-h-[200px] bg-red-400 "
            >
              <div>
                <p className="text-xl">Add a new collection</p>
                <p className="text-3xl">+</p>
              </div>
            </button>
            {collections &&
              collections.map((collection) => (
                <button
                  onClick={(e) => navigateMe(e, collection)}
                  className="col-span-2 text-xl rounded-lg min-h-[200px] bg-red-500 "
                >
                  {collection}
                </button>
              ))}
          </div>
        </div>
      )}

      {isFormActive && (
        <div className="bg-slate-300 mt-52">
          <form className="flex items-center  max-w-max mx-auto p-10">
            <div className="flex gap-5">
              <label
                for="name"
                class="block text-xl mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Collection Name
              </label>
              <input
                onChange={nameHandler}
                value={newCollectionDetails.name}
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 text-xl border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Specials"
                required=""
              />
            </div>

            <button
              className="text-white ml-4 p-2 border  rounded-lg bg-red-500"
              onClick={submitHandler}
            >
              Add
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MyCollections;
