import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
const ShowCollections = () => {
  const { collectionName } = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [collectionDetails, setCollectionDetails] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/user/get-collection-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
        name: collectionName,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.collectionDetails);
        setCollectionDetails(res.collectionDetails);
      });
  }, []);

  const backButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="grid pt-10 m-4 bg-slate-400   grid-cols-12 grid-rows-12 gap-2  items-center ">
      <div className="mt-10 fixed top-1/3 ">
        <button
          onClick={backButton}
          className="bg-black  text-white px-2 py-2 text-2xl hover:px-3   shadow-[rgba(0,_0,_3,_2)_3px_2px_5px_-12px]"
        >
          🡰
        </button>
      </div>
      {collectionDetails &&
        collectionDetails.map((recipe) => (
          <div>
            <NavLink to={`/recipes/${recipe.category}/${recipe.id}`}>
              <div className="ml-20 text-white  flex items-center text-center col-span-2 w-40 text-xl rounded-lg min-h-[200px] bg-red-500 ">
                <p className="ml-10">{recipe.name}</p>
              </div>
            </NavLink>
          </div>
        ))}
        </div>
    </>
  );
};

export default ShowCollections;
