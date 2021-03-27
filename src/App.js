import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

class Header extends Component {
  state = {
    title: 'ha'
  }
  changeTitle() {
    this.setState({
      title: 'HEIHEI'
    })
  }
  render() {
    return (
      <h1 onClick={this.changeTitle.bind(this)}>{this.state.title}</h1>
    )
  }
}



function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

export default App;
