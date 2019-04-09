const fs = require("fs");
const urlCheck = require("../utils/url_check");

const benefits = JSON.parse(fs.readFileSync("data/data.json")).benefits;

const checkBenefitUrls = b => {
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageEn)).then(result => {
    if (!result) {
      console.log(
        `${b.benefitNameEn}: Error connecting to benefitPageEn (${
          b.benefitPageEn
        })`
      );
    }
  });
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageFr)).then(result => {
    if (!result) {
      console.log(
        `${b.benefitNameEn}: Error connecting to benefitPageFr (${
          b.benefitPageFr
        })`
      );
    }
  });
};

benefits.map((b, index) => {
  setTimeout(() => checkBenefitUrls(b), index * 20);
});
