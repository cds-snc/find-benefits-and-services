import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import ChildBenefitList from "./child_benefit_list";
import {
  getFilteredBenefitsFunction,
  getProfileFilters
} from "../selectors/benefits";
import ExampleBullets from "./example_bullets";
import { globalTheme } from "../theme";

const topBorder = css`
  padding-top: 1em;
  margin-bottom: 18px;
  details:last-child {
    border-bottom: 1px solid ${globalTheme.colour.backgroundFillColour2};
  }
`;

export class BenefitExpansion extends Component {
  getAlsoEligibleBenefits = (benefits, patronType = "") => {
    const reduxState = this.props.reduxState;
    const profileFilters = JSON.parse(
      JSON.stringify(getProfileFilters(reduxState, this.props))
    );

    const selectedNeeds = {}; // we don't want to filter by need here
    if (patronType !== "") {
      profileFilters["patronType"] = patronType;
    }

    return getFilteredBenefitsFunction(
      profileFilters,
      selectedNeeds,
      benefits,
      reduxState.needs,
      reduxState.benefitEligibility,
      reduxState.multipleChoiceOptions
    );
  };

  render() {
    const { t, benefit, benefits, store } = this.props;
    const language = t("current-language-code");
    const benefitName =
      language === "en" ? benefit.benefitNameEn : benefit.benefitNameFr;
    const childBenefits = benefit.childBenefits
      ? benefits.filter(ab => benefit.childBenefits.indexOf(ab.id) > -1)
      : [];

    let otherBenefits = t("benefits_b.eligible_open_veteran", {
      x: benefitName
    });

    return (
      <div css={topBorder}>
        <ExampleBullets
          benefit={benefit}
          t={t}
          store={store}
          language={language}
        />
        <ChildBenefitList
          benefits={childBenefits}
          colonText={otherBenefits}
          t={t}
        />
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    multipleChoiceOptions: reduxState.multipleChoiceOptions,
    reduxState: reduxState
  };
};
BenefitExpansion.propTypes = {
  benefits: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  css: PropTypes.string,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitExpansion);
