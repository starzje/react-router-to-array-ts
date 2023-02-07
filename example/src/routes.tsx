import * as React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import UserAvatar from "./components/UserAvatar";
import Users from "./components/Users";
import UserSettings from "./components/UserSettings";

export const ROUTES = (
  <Routes>
    <Route
      handle={{ title: "About", category: "information" }}
      path="about"
      element={<About />}
    />
    <Route
      handle={{ title: "Contact", category: "information" }}
      path="contact"
      element={<Contact />}
    />
    <Route handle={{ title: "User menu", category: "User" }} path="user">
      <Route index={true} element={<Users />} />
      <Route
        handle={{ title: "User - Avatar", category: "User" }}
        path="avatar"
        element={<UserAvatar />}
      />
      <Route
        handle={{ title: "User - Settings ", category: "User" }}
        path="settings"
        element={<UserSettings />}
      />
    </Route>
    <Route
      handle={{ title: "Homepage with no category", category: "" }}
      path="/"
      element={<Home />}
    />
  </Routes>
);
