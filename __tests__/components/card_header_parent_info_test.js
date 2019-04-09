import React from "react";
import { mount } from "enzyme";
import { CardHeaderParentInfo } from "../../components/card_header_parent_info";
import benefitsFixture from "../fixtures/benefits";
const { axe, toHaveNoViolations } = require("jest-axe");
import translate from "../fixtures/translate";
expect.extend(toHaveNoViolations);

describe("CardHeaderParentInfo", () => {
  let props;
  beforeEach(() => {
    props = {
      t: translate,
      benefit: benefitsFixture[2],
      parentBenefits: [benefitsFixture[1]]
    };
  });

  it("passes axe tests", async () => {
    let html = mount(<CardHeaderParentInfo {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the name", () => {
    expect(mount(<CardHeaderParentInfo {...props} />).text()).toContain(
      benefitsFixture[1].benefitNameEn
    );
  });

  it("has a link not open in a new tab", () => {
    expect(
      mount(<CardHeaderParentInfo {...props} />)
        .find("a")
        .prop("target")
    ).not.toEqual("_blank");

    expect(
      mount(<CardHeaderParentInfo {...props} />)
        .find("a")
        .prop("href")
    ).toEqual(benefitsFixture[1].benefitPageEn);

    expect(
      mount(<CardHeaderParentInfo {...props} />)
        .find("a")
        .text()
    ).toEqual(benefitsFixture[1].benefitNameEn);
  });

  describe("when language is French", () => {
    beforeEach(() => {
      props.t = () => "fr";
    });

    it("contains the French name", () => {
      expect(mount(<CardHeaderParentInfo {...props} />).text()).toContain(
        benefitsFixture[1].benefitNameFr
      );
    });

    it("has an <a> with the French link", () => {
      expect(
        mount(<CardHeaderParentInfo {...props} />)
          .find("a")
          .prop("href")
      ).toEqual(benefitsFixture[1].benefitPageFr);
      expect(
        mount(<CardHeaderParentInfo {...props} />)
          .find("a")
          .text()
      ).toEqual(benefitsFixture[1].benefitNameFr);
    });
  });

  it("clicking link logs an exit event", () => {
    let analytics = require("../../utils/analytics");
    analytics.logEvent = jest.fn();
    mount(<CardHeaderParentInfo {...props} />)
      .find("a")
      .simulate("click");
    expect(analytics.logEvent).toBeCalledWith(
      "Exit",
      "gateway benefit",
      benefitsFixture[1].benefitPageEn
    );
  });
});
