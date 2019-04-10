import React, { Component } from "react";
import PropTypes from "prop-types";
import GOCSymbol from "./icons/GOCSymbol";

class FIP extends Component {
  constructor(props) {
    super(props);

    this.state = { fillColor: props.fillColor, t: props.t };
  }

  render() {
    const { t, fillColor } = this.props;
    const lang = t("current-language-code");

    return <GOCSymbol lang={lang} fillColor={fillColor} />;
  }
}

FIP.propTypes = {
  fillColor: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired
};

export default FIP;
