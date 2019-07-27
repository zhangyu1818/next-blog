import React from "react";
import App, { Container } from "next/app";
import "./global.scss";

class BaseLayout extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default BaseLayout;
