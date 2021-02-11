import React, { Component } from "react";
import { connect } from "react-redux";
import Paperbase from "./Paperbase";

export const Layout = (Content, HeaderData, ...propsMapping) => {
  class HOC extends Component {
    /**
     * Creates an instance of HOC.
     * @param {any} props
     * @memberof HOC
     */
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <React.Fragment>
          <Paperbase
            content={<Content {...this.props} />}
            HeaderData={<HeaderData {...this.props} />}
          />
        </React.Fragment>
      );
    }
  }

  return connect(...propsMapping)(HOC);
};
