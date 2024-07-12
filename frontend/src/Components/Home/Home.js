import React from "react";
import Feed from "./Feed";
import SearchRecipe from "./SearchRecipe";

import bgVideo from "../images/bg.mp4";
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
