import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { useSelector } from "react-redux";
import navLogo from "../assets/navLogo.jpg";
const NavigationBar = () => {
  const login = useSelector((state) => state.auth.login);
  const token = useSelector((state) => state.auth.token);
  const followers = useSelector((state) => state.auth.followers);

  const admin = useSelector((state) => state.app.login);

  return (
    <>
      <nav>
        <div className="navi">
          <ul style={{ listStyleType: "None" }}>
            <div className="dropdown">
              <div className="ml-5 mt-2">
                <button className="dropbtn">
                  <div className="menu"></div>
                  <div className="menu"></div>
                </button>
              </div>
              <div className="dropdown-content">
                {!login && !admin && (
                  <>
                    <li>
                      <NavLink to="/home">
                        <div className="btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      {" "}
                      <NavLink style={{ textDecoration: "None" }} to="/login">
                        <button className="btn">Login</button>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{ textDecoration: "None" }} to="/sign-up">
                        <button className="btn">SignUp</button>
                      </NavLink>
                    </li>
                  </>
                )}

                {admin && (
                  <>
                    <li>
                      <NavLink to="/home">
                        <div className="btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{ textDecoration: "None" }} to="/logout">
                        <div className="flex gap-2 btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                          </svg>
                          <div className="btn">LogOut</div>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}

                {login && !admin && (
                  <>
                    <li>
                      <NavLink to="/home">
                        <div className="btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        style={{
                          textDecoration: "None",
                          justifyContent: "center",
                        }}
                        to="/create-recipe"
                      >
                        <div className="btn">Create a new recipe</div>
                      </NavLink>
                    </li>
                    <li style={{ justifyContent: "center" }}>
                      <NavLink
                        style={{ textDecoration: "None" }}
                        to="/my-recipes"
                      >
                        <div className="btn">My-recipes</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        style={{ textDecoration: "None" }}
                        to="/my-collections"
                      >
                        <div className="btn">Collections</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        style={{ textDecoration: "None" }}
                        to="/favourites"
                      >
                        <div className="flex gap-2 ">
                          <div className="btn">Favourites</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="red"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        style={{ textDecoration: "None" }}
                        to="/following"
                      >
                        <div className="btn">Following</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink style={{ textDecoration: "None" }}>
                        <div className="flex gap-2 btn">
                          Followers :{" "}
                          <div
                            className="bg-slate-400 hover:bg-red-500"
                            style={{
                              color: "#51ff0d",
                              backgroundColor: "black",
                            }}
                          >
                            {followers}
                          </div>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{ textDecoration: "None" }} to="/logout">
                        <div className="flex gap-2 btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                          </svg>
                          <div className="btn">LogOut</div>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
