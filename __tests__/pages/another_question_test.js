/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import AnotherQuestion from "../../pages/another_question";

describe("AnotherQuestion", () => {
  it("renders GuidedExperiencePage", async () => {
    expect(shallow(<AnotherQuestion />).length).toEqual(1);
  });
});
