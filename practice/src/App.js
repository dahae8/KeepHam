import React, { Component } from "react";
import TOC from "./components/TOC.js";
import ReadContents from "./components/ReadContents.js";
import CreateContents from "./components/CreateContents.js";
import Lists from "./components/test.js";
import Controls from "./components/control.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create",
      selected_content_id: 2,
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
      _article,
      _cont,
      _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>;
    } else if (this.state.mode === "read") {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContents
          onSubmit={function (_title, _desc) {
            console.log(_title, _desc);
            _cont = this.state.contents;
          }.bind(this)}
        ></CreateContents>
      );
    }
    return (
      <div className="App">
        <TOC
          name={this.state.subject.title}
          subt={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></TOC>
        <Lists
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        ></Lists>
        <Controls
          onChangeMode={function (_mode) {
            this.setState({ mode: _mode });
          }.bind(this)}
        ></Controls>
        {_article}
      </div>
    );
  }
}

export default App;
