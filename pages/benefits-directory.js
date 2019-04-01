import React, { Component } from "react";
import PropTypes from "prop-types";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BB from "../components/BB";
import { getProfileFilters, getFilteredBenefits } from "../selectors/benefits";
import { globalTheme } from "../theme";
import { getBenefitCountString } from "../utils/common";

export class BenefitsDirectory extends Component {
  constructor() {
    super();
  }

  render() {
    const { i18n, t, filteredBenefits, benefits, url } = this.props; // eslint-disable-line no-unused-vars
    const title =
      filteredBenefits.length === benefits.length
        ? t("B3.All benefits to consider")
        : getBenefitCountString(filteredBenefits, t);
    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        title={title + " | " + t("titles.benefits_directory")}
        backgroundColor={globalTheme.colour.backgroundFillColour}
        skipLink="#mainContent"
        url={url}
      >
        <BB id="BB" t={t} store={this.props.store} url={this.props.url} />
      </Layout>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    profileFilters: getProfileFilters(reduxState, props),
    filteredBenefits: getFilteredBenefits(reduxState, props),
    searchString: reduxState.searchString,
    selectedNeeds: reduxState.selectedNeeds,
    benefits: reduxState.benefits,
    benefitEligibility: reduxState.benefitEligibility
  };
};

BenefitsDirectory.propTypes = {
  profileFilters: PropTypes.object.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  searchString: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  benefits: PropTypes.array.isRequired,
  benefitEligibility: PropTypes.array
};

export default withI18N(connect(mapStateToProps)(BenefitsDirectory));
