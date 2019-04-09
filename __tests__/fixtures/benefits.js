const benefitsFixture = [
  {
    id: "benefit_4",
    benefitNameEn: "b4_en",
    benefitNameFr: "b4_fr",
    benefitPageEn: "b4_link_en",
    benefitPageFr: "b4_link_fr",
    oneLineDescriptionEn: "b4_desc_en",
    oneLineDescriptionFr: "b4_desc_fr",
    needs: ["need_3"],
    sortingPriority: "low",
    availableIndependently: "Independent",
    benefitEligibility: ["4", "6"]
  },
  {
    id: "benefit_0",
    benefitNameEn: "b0_en",
    benefitNameFr: "b0_fr",
    benefitPageEn: "b0_link_en",
    benefitPageFr: "b0_link_fr",
    oneLineDescriptionEn: "b0_desc_en",
    oneLineDescriptionFr: "b0_desc_fr",
    needs: ["need_0", "need_1"],
    childBenefits: ["benefit_1"],
    availableIndependently: "Independent",
    noteEn: "note_0_en [test link](/some_url)",
    noteFr: "note_0_fr [french test link](/some_french_url)",
    sortingPriority: "low",
    benefitEligibility: ["0"],
    seeMoreSentenceEn: "seeMoreSentenceEn",
    seeMoreSentenceFr: "seeMoreSentenceFr"
  },
  {
    id: "benefit_1",
    benefitNameEn: "b1_en",
    benefitNameFr: "b1_fr",
    benefitPageEn: "b1_link_en",
    benefitPageFr: "b1_link_fr",
    oneLineDescriptionEn: "b1_desc_en",
    oneLineDescriptionFr: "b1_desc_fr",
    needs: ["need_0", "need_2"],
    availableIndependently: "Requires Gateway Benefit",
    noteEn: "note_1_en",
    noteFr: "note_1_fr",
    sortingPriority: "medium",
    benefitEligibility: ["3", "5"]
  },
  {
    id: "benefit_3",
    benefitNameEn: "b3_en",
    benefitNameFr: "b3_fr",
    benefitPageEn: "b3_link_en",
    benefitPageFr: "b3_link_fr",
    oneLineDescriptionEn: "b3_desc_en",
    oneLineDescriptionFr: "b3_desc_fr",
    needs: ["need_2"],
    availableIndependently: "Independent",
    benefitEligibility: ["4", "6"]
  },
  {
    id: "benefit_2",
    benefitNameEn: "b2_en",
    benefitNameFr: "b2_fr",
    benefitPageEn: "b2_link_en",
    benefitPageFr: "b2_link_fr",
    oneLineDescriptionEn: "b2_desc_en",
    oneLineDescriptionFr: "b2_desc_fr",
    availableIndependently: "Requires Gateway Benefit",
    needs: ["need_1"],
    noteEn: "note_2_en",
    noteFr: "note_2_fr",
    sortingPriority: "high",
    benefitEligibility: ["1"]
  }
];

export default benefitsFixture;
