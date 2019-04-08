/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import PatronLocation from "../../pages/patronLocation";

describe("PatronLocation", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<PatronLocation />).length).toEqual(1);
  });
});
