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

exports.servicePersonOptions = ["veteran", "servingMember"];
exports.familyOptions = ["family"];
exports.question = {
  index: "patronType",
  another_question: "question2",
  needs: "needs"
};

exports.getPageName = questionName => {
  const pageNameDict = {
    patronType: "",
    question2: "another_question",
    needs: "needs",
    summary: "summary",
    benefitsDirectory: "benefits-directory"
  };
  return pageNameDict[questionName];
};
