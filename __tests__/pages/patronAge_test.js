/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import PatronAge from "../../pages/patronAge";

describe("PatronAge", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<PatronAge />).length).toEqual(1);
  });
});
