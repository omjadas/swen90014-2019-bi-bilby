import React from 'react';
import logo from '../images/logo.svg';
import '../stylesheets/App.css';
import Roster from "./rosterAlgTest";

class App extends React.Component {
  /**
   * This method renders the App
   * @returns {JSX.Element}
   * @memberof App
   */
  public render(): JSX.Element {
    Roster = new Roster();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
