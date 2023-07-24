import React, { Component } from "react";
import TOC from "./components/TOC.js";
import Contents from "./components/Contents.js";
import Lists from "./components/test.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "read",
      subject: { title: "WEB", sub: "World wide Web" },
      welcome: { title: "Welcome", desc: "hello react!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is HyperText ..." },
        { id: 2, title: "CSS", desc: "css is cool" },
        { id: 3, title: "JavaScripts", desc: "js is fxxking ashole" },
      ],
    };
  }
  render() {
    var _title,
      _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/* <TOC
          name={this.state.subject.title}
          subt={this.state.subject.sub}
        ></TOC> */}
        <div>
          <a
            href="/"
            onClick={function (e) {
              e.preventDefault();
              // this.state.mode = "welcome";
              this.setState({
                mode: "welcome",
              });
            }.bind(this)}
          >
            <h1>{this.state.subject.title}</h1>
          </a>
          {this.state.subject.sub}
        </div>
        <Lists data={this.state.contents}></Lists>
        <Contents title={_title} desc={_desc}></Contents>
      </div>
    );
  }
}

export default App;
