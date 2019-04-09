/* eslint-env jest */

import { shallow } from "enzyme";
import Router from "next/router";
import lunr from "lunr";
import React from "react";
import { FavouritesPage } from "../../pages/favourites";
import benefitsFixture from "../fixtures/benefits";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import benefitEligibilityFixture from "../fixtures/benefitEligibility";
import questionsFixture from "../fixtures/questions";
import multipleChoiceOptionsFixture from "../fixtures/multiple_choice_options";
import translate from "../fixtures/translate";
import nextStepsFixture from "../fixtures/nextSteps";
import benefitExamplesFixture from "../fixtures/benefitExamples";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Favourites Page", () => {
  Router.router = {
    push: jest.fn()
  };
  Router.push = jest.fn();

  let props;
  let mockStore, reduxData;

  beforeEach(() => {
    props = {
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      url: { query: {} }
    };
    mockStore = configureStore();
    reduxData = {
      nextSteps: nextStepsFixture,
      questions: questionsFixture,
      cookiesDisabled: false,
      setCookiesDisabled: jest.fn(),
      option: "",
      translations: [],
      benefitExamples: benefitExamplesFixture,
      benefits: benefitsFixture,
      benefitEligibility: benefitEligibilityFixture,
      multipleChoiceOptions: multipleChoiceOptionsFixture,
      enIdx: JSON.stringify({
        version: lunr.version,
        fields: ["benefitNameEn", "oneLineDescriptionEn"],
        fieldVectors: [
          ["benefitNameEn/benefit_1", [0, 0.288]],
          ["oneLineDescriptionEn/benefit_1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            {
              _index: 1,
              benefitNameEn: {},
              oneLineDescriptionEn: { benefit_1: {} }
            }
          ],
          [
            "fiz",
            {
              _index: 0,
              benefitNameEn: { benefit_1: {} },
              oneLineDescriptionEn: {}
            }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      frIdx: JSON.stringify({
        version: lunr.version,
        fields: ["benefitNameFr", "oneLineDescriptionFr"],
        fieldVectors: [
          ["benefitNameFr/benefit_1", [0, 0.288]],
          ["oneLineDescriptionFr/benefit_1", [1, 0.288]]
        ],
        invertedIndex: [
          [
            "biz",
            {
              _index: 1,
              benefitNameFr: {},
              oneLineDescriptionFr: { benefit_1: {} }
            }
          ],
          [
            "fiz",
            {
              _index: 0,
              benefitNameFr: { benefit_1: {} },
              oneLineDescriptionFr: {}
            }
          ]
        ],
        pipeline: ["stemmer"]
      }),
      needs: needsFixture,
      searchString: "",
      selectedNeeds: {},
      favouriteBenefits: [benefitsFixture[1].id]
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = shallow(<FavouritesPage {...props} {...reduxData} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
