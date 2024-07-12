import React from "react";
import Feed from "../GeneralFeatures/Feed";
import SearchRecipe from "../GeneralFeatures/SearchRecipe";

const home = () => {
  return (
    <div className="bg-grey-500">
      <div className="">
        <SearchRecipe></SearchRecipe>
      </div>

      <Feed></Feed>
    </div>
  );
};

export default home;
