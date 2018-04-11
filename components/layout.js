// @flow

import React, { Component } from "react";

import ErrorBoundary from "../components/errorBoundary";
import Head from "../components/head";

class Layout extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Head />
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
