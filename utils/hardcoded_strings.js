exports.tableNames = [
  "benefits",
  "benefitEligibility",
  "needs",
  "translations",
  "questions",
  "multipleChoiceOptions",
  "questionDisplayLogic",
  "questionClearLogic",
  "benefitExamples",
  "nextSteps"
];

exports.getPageName = questionName => {
  const pageNameDict = {
    patronType: "",
    patronLocation: "patronLocation",
    patronAge: "patronAge",
    needs: "needs",
    summary: "summary",
    benefitsDirectory: "benefits-directory"
  };
  return pageNameDict[questionName];
};
