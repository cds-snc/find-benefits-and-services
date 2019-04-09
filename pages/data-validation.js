import { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "../components/paper";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Container from "../components/container";
import Button from "../components/button";
import { globalTheme } from "../theme";

const root = css`
  overflow-x: auto;
  margin-top: 20px;
`;
const top = css`
  padding: 20px;
`;
const table = css`
  width: 100%;
`;
const tableCellCSS = css`
  font-weight: bold !important;
`;
const tableCellGreen = css`
  color: green !important;
`;
const tableCellRed = css`
  color: red !important;
`;
const envDetailsStyling = css`
  flex: 1;
  color: ${globalTheme.colour.linkTextColour};
  font-weight: bold !important;
`;

export class DataValidation extends Component {
  constructor(props) {
    super(props);
    // Names in airtable are stored under "benefitNameEn" and "benefitNameFr"
    let langCode = this.props.t("current-language-code");
    langCode = "vacName" + langCode.charAt(0).toUpperCase() + langCode.slice(1);
    this.state = {
      invalidUrls: [],
      urlState: undefined,
      benefitNameKey: langCode
    };
  }

  getBenefitNameCode = () => {};

  createData = (name, value, status) => {
    return { name, value, status };
  };

  checkBenefitsFields = (b, i) => {
    if (
      !(b.benefitNameEn && b.benefitNameEn != "") ||
      !(b.benefitNameFr && b.benefitNameFr != "") ||
      !(b.oneLineDescriptionEn && b.oneLineDescriptionEn != "") ||
      !(b.oneLineDescriptionFr && b.oneLineDescriptionFr != "") ||
      !(b.benefitPageEn && b.benefitPageEn != "") ||
      !(b.benefitPageFr && b.benefitPageFr != "")
    ) {
      return " " + b[this.state.benefitNameKey] + " (" + (i + 1) + "),";
    }
  };

  checkTranslationsFields(t, i) {
    if (
      !(t.key && t.key != "") ||
      !(t.English && t.English != "") ||
      !(t.French && t.French != "")
    ) {
      return " " + t.id + " (" + (i + 1) + "),";
    }
  }

  checkMissingNeeds = (b, i) => {
    if (!(b.needs && b.needs != "")) {
      return " " + b[this.state.benefitNameKey] + " (" + (i + 1) + "),";
    }
  };

  checkBenefitEligibility = (b, i) => {
    if (!b.benefitEligibility) {
      return " " + b[this.state.benefitNameKey] + " (" + (i + 1) + "),";
    }
  };

  checkBenefitUrls = async () => {
    this.setState({
      invalidUrls: []
    });

    let checkUrls = async b => {
      await fetch("/checkURL", {
        body: JSON.stringify({ id: b.id }),
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
        .then(resp => resp.json())
        .then(resp => {
          let invalidUrls = this.state.invalidUrls;
          if (!resp.passEn) {
            invalidUrls.push(b.benefitPageEn);
          }
          if (!resp.passFr) {
            invalidUrls.push(b.benefitPageFr);
          }
          this.setState({
            invalidUrls: invalidUrls
          });
          if (invalidUrls.length > 0) {
            this.setState({
              urlState: false
            });
          }
          return resp;
        })
        .catch(error => error);
    };
    this.props.benefits.map(await checkUrls);
    this.setState({
      urlState: true
    });
  };

  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    const {
      i18n,
      t,
      benefits,
      benefitEligibility,
      needs,
      errors,
      translations
    } = this.props; // eslint-disable-line no-unused-vars

    const data = [
      this.createData(
        "Size of Benefits Table",
        benefits.length,
        benefits.length > 0 ? true : false
      ),
      this.createData(
        "Size of Needs Table",
        needs.length,
        needs.length > 0 ? true : false
      ),
      this.createData(
        "Size of Benefit Eligibility Table",
        benefitEligibility.length,
        benefitEligibility.length > 0 ? true : false
      ),
      this.createData(
        "nameTranslationTableSize",
        translations.length,
        translations.length > 0 ? true : false
      ),
      this.createData(
        "Benefits with Empty Fields",
        benefits.map(this.checkBenefitsFields),
        benefits.filter(this.checkBenefitsFields).length == 0 ? true : false
      ),
      this.createData(
        "Benefits Without Needs",
        benefits.map(this.checkMissingNeeds),
        benefits.filter(this.checkMissingNeeds).length == 0 ? true : false
      ),
      this.createData(
        "Benefits not in the Benefit Eligibility Table",
        benefits.map(this.checkBenefitEligibility),
        benefits.filter(this.checkBenefitEligibility).length == 0 ? true : false
      ),
      this.createData(
        "emptyTranslations",
        translations.map(this.checkTranslationsFields),
        translations.filter(this.checkTranslationsFields).length == 0
          ? true
          : false
      ),
      this.createData(
        "validateURLs",
        this.state.invalidUrls.map((url, i) => {
          return (
            <div key={i}>
              <a target="_blank" rel="noopener noreferrer" href={url}>
                {url}
              </a>
            </div>
          );
        }),
        this.state.urlState
      ),
      this.createData("errors", errors, errors.length > 0 ? false : true)
    ];

    return (
      <Layout
        title={t("dv.pageTitle")}
        i18n={i18n}
        t={t}
        hideNoscript={true}
        backgroundColor={globalTheme.colour.backgroundFillColour}
        skipLink="#mainContent"
        url={this.props.url}
      >
        <Container id="mainContent">
          <p css={envDetailsStyling}>Build: {envDetails}</p>
          <Paper styles={[root, top]}>
            <p>
              {t("dv.last_cache_update")}
              :&nbsp;
              {Date(this.props.timestamp)}
            </p>
            <a href="/refresh">
              <Button id="refreshCache">{t("refresh-cache")}</Button>
            </a>
          </Paper>
          <Paper styles={root}>
            <Table css={table}>
              <TableHead>
                <TableRow>
                  <TableCell>{t("dv.status")}</TableCell>
                  <TableCell>{t("dv.name")}</TableCell>
                  <TableCell>{t("dv.value")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((n, i) => {
                  return (
                    <TableRow key={i} id={n.name}>
                      <TableCell
                        css={[
                          tableCellCSS,
                          n.status ? tableCellGreen : tableCellRed
                        ]}
                      >
                        {n.status !== undefined ? (
                          t("dv." + (n.status ? "Pass" : "Fail"))
                        ) : (
                          <Button onClick={() => this.checkBenefitUrls()}>
                            {t("dv.validate")}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{t("dv." + n.name)}</TableCell>
                      <TableCell>{n.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    benefitEligibility: reduxState.benefitEligibility,
    needs: reduxState.needs,
    timestamp: reduxState.timestamp,
    errors: reduxState.errors,
    translations: reduxState.translations
  };
};

DataValidation.propTypes = {
  benefits: PropTypes.array.isRequired,
  benefitEligibility: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  timestamp: PropTypes.number,
  translations: PropTypes.array.isRequired,
  url: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withI18N(DataValidation));
