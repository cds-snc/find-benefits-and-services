import React, { Component } from "react";
import GuidedExperiencePage from "../components/guided_experience_page";
import Cookies from "universal-cookie";
import airtableConstants from "../utils/hardcoded_strings";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  render() {
    return (
      <GuidedExperiencePage
        section={airtableConstants.question.index}
        {...this.props}
      />
    );
  }
}

export default Index;
