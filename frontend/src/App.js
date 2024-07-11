import "./App.css";
import NavigationBar from "./Components/Navigation/NavigationBar";
import Login from "./Components/Authentication/Login";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Logout from "./Components/Authentication/Logout";
import SignUp from "./Components/Authentication/SignUp";
import logo from "./Images&Logos/logo.png";
import Home from "./Components/Home/Home";
import CreateANewRecipe from "./Components/Features/CreateANewRecipe";
import MyRecipes from "./Components/Features/MyRecipes";
import Favourites from "./Components/Features/Favourites";
import Following from "./Components/Features/Following";
import MyCollections from "./Components/Features/MyCollections";
import Logo from "./Components/Features/Logo/Logo";
import bgVideo from "./Components/images/bg.mp4";
import RecipeDisplay from "./Components/Home/RecipeDisplay";
import OpeningPage from "./Components/Home/OpeningPage";
import ShowCategoryRecipes from "./Components/Home/ShowCategoryRecipes";
import CompleteRecipeDisplay from "./Components/Home/CompleteRecipeDisplay";
import ShowCollections from "./Components/Features/ShowCollections";
import AdminLogin from "./Components/Authentication/AdminLogin";
import SearchResult from "./Components/Home/SearchResult";
function App() {
  return (
    <div style={{backgroundColor:'#3A3B3C'}}>
      <header>
        <NavigationBar></NavigationBar>
      </header>
      <main>
   
        <Routes>
          <Route path="/" element={<OpeningPage></OpeningPage>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/search" element={<SearchResult></SearchResult>}></Route>
          <Route path="/recipes/my-collection/:recipeId" element={<CompleteRecipeDisplay></CompleteRecipeDisplay>}></Route>
          <Route path="/recipes/:category" element={<ShowCategoryRecipes></ShowCategoryRecipes>}></Route>
          <Route path='/recipes/:category/:recipeId' element={<CompleteRecipeDisplay></CompleteRecipeDisplay>}></Route>
          <Route path='/adminLogin' element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route
            path="/create-recipe"
            element={<CreateANewRecipe></CreateANewRecipe>}
          ></Route>
          <Route path="/my-recipes" element={<MyRecipes></MyRecipes>}></Route>
          <Route path="/favourites" element={<Favourites></Favourites>}></Route>
          <Route path="/following" element={<Following></Following>}></Route>
          <Route
            path="/my-collections"
            element={<MyCollections></MyCollections>}
          ></Route>
          <Route
            path="/my-collections/:collectionName"
            element={<ShowCollections></ShowCollections>}
          ></Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;
