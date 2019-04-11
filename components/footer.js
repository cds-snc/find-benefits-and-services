import { Component } from "react";
import PropTypes from "prop-types";
import WordMark from "./word_mark";
import { Toolbar } from "@material-ui/core";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FooterLink from "./typography/footer_link";
import { globalTheme } from "../theme";

const root = css`
  width: 100%;
  background-color: ${globalTheme.colour.headerBackground};
  height: 100px;
  text-align: center;
`;

const toolbar = css`
  padding: 0 !important;
  height: 100%;
`;

const envDetailsStyling = css`
  flex: 1;
  color: ${globalTheme.colour.white};
`;
const cdsLogo = css`
  height: 80px;
`;

const focusStyle = css`
  margin-right: 1em;
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

class Footer extends Component {
  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    return (
      <div css={root} role="navigation">
        <Toolbar css={toolbar}>
          <a
            href={
              this.props.t("current-language-code") == "en"
                ? "https://digital.canada.ca"
                : "https://numerique.canada.ca"
            }
            css={focusStyle}
          >
            <img
              css={cdsLogo}
              src={
                "/static/cds-logo-" +
                this.props.t("current-language-code") +
                "-v2.svg"
              }
              alt={
                this.props.t("current-language-code") == "en"
                  ? "Canadian Digital Service"
                  : "Service numérique canadien"
              }
            />
          </a>
          <FooterLink
            id="privacy"
            href={this.props.t("privacy-link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.t("Privacy")}
          </FooterLink>
          <p css={envDetailsStyling}>Build: {envDetails}</p>
          <div>
            <WordMark height="25px" width="6em" flag="#fff" text="#fff" />
          </div>
        </Toolbar>
      </div>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
