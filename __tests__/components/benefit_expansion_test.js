import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import benefitEligibilityFixture from "../fixtures/benefitEligibility_complex";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options_complex";
import { BenefitExpansion } from "../../components/benefit_expansion";
import benefitExamplesFixture from "../fixtures/benefitExamples";
import needsFixture from "../fixtures/needs_complex";
import benefitsFixture from "../fixtures/benefits_complex";
import questionsFixture from "../fixtures/questions_complex";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("BenefitExpansion", () => {
  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      t: () => "en",
      benefit: benefitsFixture.filter(
        x => x.benefitNameEn === "Disability Benefits"
      )[0]
    };
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      benefitExamples: benefitExamplesFixture,
      needs: needsFixture,
      selectedNeeds: {},
      questions: questionsFixture,
      patronType: "veteran",
      serviceType: "CAF",
      statusAndVitals: "",
      serviceHealthIssue: "",
      searchString: ""
    };
    props.reduxState = reduxData;
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mount(<BenefitExpansion {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the ChildBenefitList component", () => {
    expect(
      mount(<BenefitExpansion {...props} {...reduxData} />).find(
        "ChildBenefitList"
      ).length
    ).toEqual(1);
  });

  describe("getAlsoEligibleBenefits", () => {
    it("returns the correct veteran benefits", () => {
      const childBenefits = props.benefit.childBenefits
        ? reduxData.benefits.filter(
            ab => props.benefit.childBenefits.indexOf(ab.id) > -1
          )
        : [];
      expect(
        mount(<BenefitExpansion {...props} {...reduxData} />)
          .instance()
          .getAlsoEligibleBenefits(childBenefits, "veteran")
          .map(x => x.benefitNameEn)
      ).toEqual([
        "Attendance Allowance",
        "Career Impact Allowance",
        "Clothing Allowance",
        "Exceptional Incapacity Allowance",
        "Treatment Benefits",
        "Veterans Independence Program"
      ]);
    });
  });
});
