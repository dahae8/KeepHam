import React, { Component } from "react";

class TOC extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        {this.props.subt}
      </div>
    );
  }
}

export default TOC;
