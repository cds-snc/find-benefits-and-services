import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { logEvent } from "../utils/analytics";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { mutateUrl } from "../utils/common";

const buttonStyle = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${globalTheme.colour.white};
  margin: 0px;
  padding: 0 8px;
  letter-spacing: 0.25em;
  text-decoration: none;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const desktopButton = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;
const mobileButton = css`
  font-size: 14px;
  @media only screen and (min-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;

class LanguageButton extends Component {
  titleCase = word => {
    return word[0].toUpperCase() + word.substr(1);
  };

  render() {
    const { t, url, i18n } = this.props;

    return (
      <React.Fragment>
        <div title={t("other-language-in-current-language")}>
          <Link
            id="changeLanguage"
            href={mutateUrl(url, "", { lng: t("other-language-code") })}
          >
            <a
              id="changeLanguage"
              title={t("other-language-in-current-language")}
              css={[buttonStyle, desktopButton]}
              onClick={() => {
                logEvent("Language change", t("other-language"));
                url.query.lng = t("other-language-code");
                i18n.changeLanguage();
              }}
              lang={t("other-language-code")}
            >
              {t("other-language")}
            </a>
          </Link>

          <Link
            id="changeLanguageMobile"
            href={mutateUrl(url, "", { lng: t("other-language-code") })}
          >
            <a
              id="changeLanguage"
              title={t("other-language-in-current-language")}
              css={[buttonStyle, mobileButton]}
              onClick={() => {
                logEvent("Language change", t("other-language"));
                url.query.lng = t("other-language-code");
                i18n.changeLanguage();
              }}
              lang={t("other-language-code")}
            >
              {this.titleCase(t("other-language-code"))}
            </a>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

LanguageButton.propTypes = {
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default LanguageButton;
