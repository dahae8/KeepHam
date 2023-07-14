import React, { Component } from "react";
import TOC from "./components/TOC.js";
import Contents from "./components/Contents.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: "WEB", sub: "World wide Web" },
    };
  }
  render() {
    return (
      <div className="App">
        <TOC
          name={this.state.subject.title}
          subt={this.state.subject.sub}
        ></TOC>
        <TOC name="submarin" subt="rull the world"></TOC>
        <Contents></Contents>
      </div>
    );
  }
}

export default App;
