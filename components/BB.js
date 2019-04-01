import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getPrintUrl, getHomeUrl } from "../selectors/urls";
import { withTheme } from "@material-ui/core/styles";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Container from "../components/container";
import { globalTheme } from "../theme";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled } from "../utils/common";
import BenefitsPane from "./benefits_pane";
import BreadCrumbs from "../components/breadcrumbs";
import Cookies from "universal-cookie";
import Paper from "./paper";
import Header from "./typography/header";
import NextSteps from "./next_steps";
import QuickLinks from "./quick_links";
import StickyHeader from "./sticky_header";
import AlphaBanner from "./alpha_banner";
import SelectionsEditor from "./selections_editor";
import SelectionsEditorMobile from "./selections_editor_mobile";

const divider = css`
  border-top: 2px solid ${globalTheme.colour.divider};
  width: 100%;
`;
const innerDiv = css`
  padding-top: 24px;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;

// this can be deleted when the sidebar is removed
const stylingWithSidebar = css`
  font-size: 28px !important;
  margin-bottom: 30px;
`;

const selectionsEditorMobileStyle = css`
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    display: none !important;
  }
`;

const selectionsEditorStyle = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none !important;
  }
`;

export class BB extends Component {
  state = {
    showDisabledCookieBanner: false
  };

  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidMount() {
    this.props.setCookiesDisabled(areCookiesDisabled());
    this.setState({
      showDisabledCookieBanner: areCookiesDisabled()
    });
    // Update cookies if favourite benefits have been pruned on the server
    let favouritesFromCookies = this.cookies.get("favouriteBenefits"),
      favouriteBenefits = this.props.favouriteBenefits;

    if (favouritesFromCookies && favouritesFromCookies.length > 0) {
      const invalidBenefits = favouritesFromCookies.filter(
        b => favouriteBenefits.indexOf(b) === -1
      );
      if (invalidBenefits.length > 0) {
        this.cookies.set("favouriteBenefits", favouriteBenefits, { path: "/" });
        this.props.saveFavourites(favouriteBenefits);
      }
    }
  }

  componentDidUpdate() {
    if (this.state.showDisabledCookieBanner && !this.props.cookiesDisabled) {
      this.setState({
        showDisabledCookieBanner: false
      });
    }
  }

  render() {
    const { t, url, store, homeUrl, printUrl } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Container>
        <div className={topMatter}>
          <BreadCrumbs
            t={t}
            breadcrumbs={[]}
            homeUrl={homeUrl}
            pageTitle={t("ge.Find benefits and services")}
          />
        </div>
        <Paper id={this.props.id} padding="md" styles={innerDiv}>
          <AlphaBanner t={t} url={url} />
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Header headingLevel="h1" size="xl">
                {t("ge.Find benefits and services")}
              </Header>
            </Grid>
            <StickyHeader
              t={t}
              url={url}
              printUrl={printUrl}
              store={store}
              showShareLink={true}
            />
            <Grid item xs={12}>
              <QuickLinks t={t} rightHandText={t("B3.check eligibility")} />
            </Grid>
            <Grid item md={4} xs={12}>
              <div id="benefits-and-services">
                <Header
                  headingLevel="h2"
                  size="md_lg"
                  styles={stylingWithSidebar}
                >
                  {t("titles.benefits_and_services")}
                </Header>
              </div>
              {url.query.sidebar && url.query.sidebar === "true" ? (
                <React.Fragment>
                  <div css={selectionsEditorMobileStyle}>
                    <SelectionsEditorMobile t={t} store={store} url={url} />
                  </div>
                  <div css={selectionsEditorStyle}>
                    <SelectionsEditor t={t} store={store} url={url} />
                  </div>
                </React.Fragment>
              ) : null}
            </Grid>
            <Grid id="mainContent" item md={8} xs={12}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  {this.state.showDisabledCookieBanner ? (
                    <DisabledCookiesBanner
                      t={t}
                      onClose={() =>
                        this.setState({ showDisabledCookieBanner: false })
                      }
                    />
                  ) : null}
                </Grid>
              </Grid>
              <BenefitsPane id="BenefitsPane" t={t} store={store} url={url} />
            </Grid>
            <Grid item xs={12}>
              <div css={divider} />
            </Grid>
            <Grid item md={4} xs={12}>
              <div id="next-steps">
                <Header headingLevel="h2" size="md_lg">
                  {t("nextSteps.whats_next")}
                </Header>
              </div>
            </Grid>
            <Grid item md={8} xs={12}>
              <NextSteps t={t} store={store} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCookiesDisabled: areDisabled => {
      dispatch({ type: "SET_COOKIES_DISABLED", data: areDisabled });
    },
    saveFavourites: favouriteBenefits => {
      dispatch({
        type: "LOAD_DATA",
        data: { favouriteBenefits: favouriteBenefits }
      });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    cookiesDisabled: reduxState.cookiesDisabled,
    benefits: reduxState.benefits,
    favouriteBenefits: reduxState.favouriteBenefits,
    homeUrl: getHomeUrl(reduxState, props),
    printUrl: getPrintUrl(reduxState, props, {})
  };
};

BB.propTypes = {
  url: PropTypes.object.isRequired,
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  saveFavourites: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  homeUrl: PropTypes.string,
  printUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BB)
);
