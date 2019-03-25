import React from "react";
import GuidedExperiencePage from "../components/guided_experience_page";
import airtableConstants from "../utils/hardcoded_strings";

let ServiceType = props => {
  return (
    <GuidedExperiencePage
      section={airtableConstants.question.another_question}
      {...props}
    />
  );
};

export default ServiceType;
