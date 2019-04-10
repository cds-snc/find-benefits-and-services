import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import withI18N from "../lib/i18nHOC";
import NeedButton from "../components/need_button";
import WordMark from "../components/word_mark";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FIP from "../components/fip";
import { globalTheme } from "../theme";

const root = css`
  font-family: Merriweather, serif;
  padding: 12px;
`;
const table = css`
  width: 100%;
`;
const box = css`
  border-style: solid;
  border-width: 2px;
  padding: 1.5em;
`;
const gridstyle = css`
  margin-top: 12px !important;
`;
const bigTitle = css`
  font-size: 32px;
  font-weight: bold;
`;
const margins = css`
  margin-top: 20px;
  margin-bottom: 15px;
`;
const title = css`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const bold = css`
  font-weight: bold;
`;
const rules = css`
  width: 100%;
  line-height: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  height: 3em;
  background-image: linear-gradient(black 1px, transparent 0);
  background-position: 0px 1.2em;
  background-size: 100% 1.5em;
  -webkit-print-color-adjust: exact;
`;
const benefitRow = css`
  "@media print": {
    page-break-inside: avoid !important;
  }
`;
const benefitCell = css`
  padding-bottom: 10px;
  padding-left: 0px;
`;
const svgContainer = css`
  width: 450px;
  height: 38px;
`;
const hr = css`
  color: black;
  background-color: black;
  border: 0;
  height: 2px;
  -webkit-print-color-adjust: exact;
`;
const wordmark = css`
  text-align: right;
  width: 100%;
  margin-top: 20px;
`;

export class Print extends Component {
  componentDidMount() {
    document.title = this.props.t("titles.print");
    window.print();
  }

  countString = (filteredBenefits, benefits, t, printingFromFavourites) => {
    switch (true) {
      case printingFromFavourites:
        return t("favourites.saved_benefits", { x: filteredBenefits.length });
      case filteredBenefits.length === benefits.length:
        return t("B3.All benefits to consider");
      case filteredBenefits.length === 0:
        return t("B3.No benefits");
      case filteredBenefits.length === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: filteredBenefits.length });
    }
  };

  sortBenefits = (benefits, language) => {
    benefits.forEach(b => {
      if (b.sortingPriority === undefined) {
        b.sortingPriority = "low";
      }
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[b.sortingPriority];
    });

    let sorting_fn = (a, b) => {
      if (a.sortingNumber === b.sortingNumber) {
        // sort alphabetically
        let benefitName = language === "en" ? "benefitNameEn" : "benefitNameFr";
        let nameA = a[benefitName].toUpperCase();
        let nameB = b[benefitName].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      // ascending numeric sort
      return a.sortingNumber - b.sortingNumber;
    };
    return benefits.sort(sorting_fn);
  };

  render() {
    const {
      t,
      benefits,
      needs,
      multipleChoiceOptions,
      store,
      url
    } = this.props; // eslint-disable-line no-unused-vars
    const query = url.query;
    const printingFromFavourites = query.fromFavourites !== undefined;
    const filteredBenefitsIDs =
      Object.keys(query).indexOf("benefits") > -1
        ? query.benefits.split(",")
        : [];
    const filteredBenefits = benefits.filter(
      x => filteredBenefitsIDs.indexOf(x.id) > -1
    );
    const sortedFilteredBenefits = this.sortBenefits(
      filteredBenefits,
      this.props.t("current-language-code"),
      query["sortBy"]
    );

    const profile_text = this.props.profileQuestions
      .map(q => q.variable_name)
      .map(k => {
        if (!query[k]) {
          return null;
        }
        let option = multipleChoiceOptions.filter(
          x => x["variable_name"] == query[k]
        )[0];
        if (t("current-language-code") === "en") {
          return option.ge_breadcrumb_english
            ? option.ge_breadcrumb_english
            : option.display_text_english;
        } else {
          return option.ge_breadcrumb_french
            ? option.ge_breadcrumb_french
            : option.display_text_french;
        }
      })
      .filter(x => (x && x.length > 0 ? true : false))
      .join(", ");

    return (
      <div css={root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div css={svgContainer}>
              <FIP
                t={t}
                alt={t("titles.fip")}
                fillColor={globalTheme.colour.black}
              />
            </div>
          </Grid>

          {printingFromFavourites ? (
            ""
          ) : (
            <Grid item xs={12}>
              <div css={box}>
                <div css={bold}>{t("print.who_is_receiving")}</div>
                <div className={"profile_section " + rules}>{profile_text}</div>

                <div css="needs_section">
                  <Grid container spacing={0}>
                    {needs.map((need, i) => (
                      <Grid item xs={4} key={i}>
                        <NeedButton
                          need={need}
                          t={t}
                          store={store}
                          disabled="disabled"
                          url={url}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </Grid>
          )}
        </Grid>

        <div css={[bigTitle, margins]}>
          {this.countString(
            sortedFilteredBenefits,
            benefits,
            t,
            printingFromFavourites
          )}
        </div>
        <table css={table}>
          <tbody>
            {sortedFilteredBenefits.map((b, i) => {
              return (
                <tr key={i} css={benefitRow}>
                  <td css={benefitCell}>
                    <div className="benefitsListItem">
                      <div>
                        <b>
                          {t("current-language-code") == "en"
                            ? b.benefitNameEn
                            : b.benefitNameFr}
                        </b>
                      </div>
                      <div>
                        {t("current-language-code") == "en"
                          ? b.oneLineDescriptionEn
                          : b.oneLineDescriptionFr}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Grid container spacing={24} css={gridstyle}>
          <Grid item xs={12}>
            <hr css={hr} />
          </Grid>
          <Grid item xs={12}>
            <div css={bigTitle}>{t("print.have_any_questions")}</div>
          </Grid>
          <Grid item xs={6}>
            <div css={title}>{t("favourites.contact_us")}</div>
            <div css={bold}>{t("contact.phone")}</div>
            <div>{t("favourites.call_time")}</div>
            <br />
            <div css={bold}>{t("contact.email")}</div>
            <div>{t("favourites.email_disclaimer")}</div>
            <br />
            <div css={title}>{t("print.apply_online")}</div>
            <div css={bold}>{t("contact.my_vac_link")}</div>
            <div>{t("print.sign_up_for_my_vac")}</div>
          </Grid>
        </Grid>
        <div css={wordmark}>
          <WordMark width="6em" flag="#000" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    multipleChoiceOptions: reduxState.multipleChoiceOptions,
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    benefits: reduxState.benefits,
    needs: reduxState.needs
  };
};

Print.propTypes = {
  multipleChoiceOptions: PropTypes.array.isRequired,
  profileQuestions: PropTypes.array.isRequired,
  benefits: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(Print));
