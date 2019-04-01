import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";

const Modal = css`
  left: 50%;
  margin: -250px 0 0 -32%;
  opacity: 1;
  position: absolute;
  top: 50%;
  visibility: visible;
  width: 65%;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
`;

const ModalContent = css`
  background: ${globalTheme.colour.alertModal};
  position: relative;
  z-index: 20;
  border-radius: 5px;
  color: ${globalTheme.colour.white};
  padding: 30px;
`;

class Noscript extends Component {
  render() {
    const { t } = this.props;

    return (
      <noscript>
        <div css={Modal}>
          <div css={ModalContent}>
            <div css="copy">
              <p dangerouslySetInnerHTML={{ __html: t("noscript") }} />
            </div>
          </div>
        </div>
      </noscript>
    );
  }
}

Noscript.propTypes = {
  t: PropTypes.func.isRequired
};

export default Noscript;
