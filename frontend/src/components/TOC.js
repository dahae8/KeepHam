import React, { Component } from "react";

class TOC extends Component {
  render() {
    return (
      <div>
        <a href="/">
          <h1>{this.props.name}</h1>
        </a>
        {this.props.subt}
      </div>
    );
  }
}

export default TOC;
