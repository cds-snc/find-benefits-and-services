import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const sizeDict = {
  xl: {
    fontSize: 56,
    fontWeight: 300,
    fontFamily: globalTheme.fontFamilySerif
  },
  lg: {
    fontSize: 45,
    fontWeight: 600,
    fontFamily: globalTheme.fontFamilySansSerif
  },
  md_lg: {
    fontSize: 36,
    fontWeight: 700,
    fontFamily: globalTheme.fontFamilySansSerif
  },
  md: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: globalTheme.fontFamilySansSerif
  },
  sm_md: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: globalTheme.fontFamilySansSerif
  },
  sm: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: globalTheme.fontFamilySansSerif
  }
};

class Header extends Component {
  style = css`
    font-family: ${sizeDict[this.props.size].fontFamily};
    font-size: ${sizeDict[this.props.size].fontSize}px;
    @media only screen and (max-width: ${globalTheme.max.mobile}) {
      font-size: ${0.8 * sizeDict[this.props.size].fontSize}px;
    }
    font-weight: ${sizeDict[this.props.size].fontWeight};
    color: ${globalTheme.colour.fontColour};
    margin: 0px;
    padding-top: ${this.props.paddingTop}px;
    outline: 0;
  `;

  constructor(props) {
    super(props);
    this.focusEl = React.createRef();
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      const node = this.focusEl.current;
      node.focus();
    }
  }

  render() {
    const { children, styles, headingLevel, id, autoFocus } = this.props;
    const props = {
      css: styles ? [this.style, styles] : this.style,
      id: id
    };

    if (autoFocus) {
      props["tabIndex"] = -1;
      props["ref"] = this.focusEl;
    }

    switch (headingLevel) {
      case "h1":
        return <h1 {...props}>{children}</h1>;
      case "h2":
        return <h2 {...props}>{children}</h2>;
      case "h3":
        return <h3 {...props}>{children}</h3>;
      case "h4":
        return <h4 {...props}>{children}</h4>;
      case "":
        return <div {...props}>{children}</div>;
    }
  }
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  headingLevel: PropTypes.string,
  size: PropTypes.string,
  id: PropTypes.string,
  paddingTop: PropTypes.string,
  autoFocus: PropTypes.bool
};

Header.defaultProps = {
  headingLevel: "",
  paddingTop: "0",
  autoFocus: false
};

export default Header;
