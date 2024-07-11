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
              <div className="mt-52 text-black">
                <p>{recipe.name}</p>
              </div>
            </NavLink>
          </div>
        ))}
    </>
  );
};

export default ShowCollections;
