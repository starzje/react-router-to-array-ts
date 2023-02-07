import React from "react";
import Example from "./Example";

import { ROUTES } from "./routes";
import "./style.css";

const App = () => {
  return (
    <>
      {ROUTES}
      <Example />
    </>
  );
};

export default App;
