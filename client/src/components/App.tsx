import React from "react";
import logo from "../images/logo.svg";
import "../stylesheets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Upload from "./Upload";

class App extends React.Component {

  /**
   * Render the app.
   *
   * @returns {JSX.Element} Element to be rendered
   * @memberof App
   */
  public render(): JSX.Element {
    return (
      <div className="App">
        <Upload></Upload>
      </div>
    );
  }

}

export default App;
