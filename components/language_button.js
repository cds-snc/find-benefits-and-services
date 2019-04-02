import { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { logEvent } from "../utils/analytics";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { mutateUrl } from "../utils/common";

const desktopButton = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${globalTheme.colour.white};
  margin: 0px;
  padding: 0 8px;
  letter-spacing: 0.25em;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

class LanguageButton extends Component {
  render() {
    const { t, url, i18n } = this.props;

    return (
      <Link href={mutateUrl(url, "", {})}>
        <a
          id="changeLanguage"
          title={t("other-language-in-current-language")}
          css={desktopButton}
          onClick={() => {
            logEvent("Language change", t("other-language"));
            i18n.changeLanguage();
          }}
          lang={t("other-language-code")}
        >
          {t("other-language")}
        </a>
      </Link>
    );
  }
}

LanguageButton.propTypes = {
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default LanguageButton;
