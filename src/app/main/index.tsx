import { remoteSearchMovies } from "app/usecases";
import { AutoComplete } from "lib/components";
import React from "react";
import ReactDOM from "react-dom";

import "./index-styles.scss"

const App = () => {
  return <div className="container">
    <h4>Search movies below: </h4>
    <AutoComplete filter={remoteSearchMovies}  />
  </div>;
};

ReactDOM.render(<App />, document.getElementById("main"));
