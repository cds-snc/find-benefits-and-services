import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "./paper";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import BenefitExpansion from "./benefit_expansion";
import BenefitCardHeader from "./benefit_card_header";
import OneLiner from "./typography/one_liner";
import Header from "./typography/header";
import Tag from "./icons/Tag";
import { globalTheme } from "../theme";
import LearnMoreButton from "./learn_more_button";

const cardBody = css`
  padding-top: 0px;
  border-top: none;
  border: 1px solid ${globalTheme.colour.backgroundFillColour2};
  box-shadow: none;
`;
const cardDescriptionText = css`
  padding-left: ${globalTheme.cardPadding};
  padding-right: ${globalTheme.cardPadding};
  padding-top: 10px;
  @media only screen and (max-width: ${globalTheme.min.xs}) {
    padding-top: 14px;
    padding-left: ${globalTheme.cardPaddingMobile};
    padding-right: ${globalTheme.cardPaddingMobile};
  }
`;
const buttonRow = css`
  padding-left: ${globalTheme.cardPadding};
  padding-right: ${globalTheme.cardPadding};
  padding-bottom: 25px;
  @media only screen and (max-width: ${globalTheme.min.xs}) {
    padding-left: ${globalTheme.cardPaddingMobile};
    padding-right: ${globalTheme.cardPaddingMobile};
    padding-bottom: 9px;
  }
`;
const root = css`
  width: 100%;
  display: block;
`;
const benefitName = css`
  padding-top: ${globalTheme.cardPadding};
  padding-left: ${globalTheme.cardPadding};
  padding-right: ${globalTheme.cardPadding};
  padding-bottom: 10px;
  display: flex;
  @media only screen and (max-width: ${globalTheme.min.xs}) {
    padding-top: ${globalTheme.cardPaddingMobile};
    padding-left: ${globalTheme.cardPaddingMobile};
    padding-right: ${globalTheme.cardPaddingMobile};
  }
`;

const padding = css`
  padding-left: ${globalTheme.cardPadding};
  padding-right: ${globalTheme.cardPadding};
  @media only screen and (max-width: ${globalTheme.min.xs}) {
    padding-left: ${globalTheme.cardPaddingMobile};
    padding-right: ${globalTheme.cardPaddingMobile};
  }
`;
const flex = css`
  align-items: center;
  // if screen size is min.sm or larger put favourites button below learn more
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    display: flex;
  }
`;
const floatRight = css`
  margin-left: auto;
  order: 2;
`;

const tagStyle = css`
  width: 20px;
  height: 20px;
  font-size: 12px !important;
  color: ${globalTheme.colour.accentFontColour2} !important;
  margin-right: 0.5em;
  vertical-align: middle;
`;

export class BenefitCard extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { t, benefit, store } = this.props;

    const needsMet = benefit.needs
      ? this.props.needs.filter(
          need =>
            benefit.needs.indexOf(need.id) > -1 &&
            this.props.selectedNeeds[need.id]
        )
      : [];
    const language = t("current-language-code");
    const searchWords = this.props.searchString.split(/\s+/);
    return (
      <Grid item xs={12}>
        <div css={root}>
          <Paper styles={cardBody}>
            <BenefitCardHeader
              benefit={benefit}
              t={t}
              store={this.props.store}
              language={language}
            />
            <Header styles={benefitName} size="md" headingLevel="h2">
              <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={
                  this.props.currentLanguage === "en"
                    ? benefit.benefitNameEn
                    : benefit.benefitNameFr
                }
              />
              {this.props.savedList === false ? (
                <FavouriteButton
                  benefit={benefit}
                  toggleOpenState={() => {}}
                  store={store}
                  t={t}
                  icon={true}
                />
              ) : null}
            </Header>
            <div css={padding}>
              {needsMet.length > 0 ? <Tag css={tagStyle} /> : null}
              {needsMet.map(need => (
                <NeedTag
                  key={benefit.id + need.id}
                  t={t}
                  need={need}
                  last={needsMet.indexOf(need) === needsMet.length - 1}
                />
              ))}
            </div>
            <OneLiner
              className={"cardDescription"}
              styles={cardDescriptionText}
            >
              <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={
                  this.props.currentLanguage === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </OneLiner>

            <Grid container css={buttonRow}>
              <Grid item xs={12}>
                <BenefitExpansion
                  css={padding}
                  benefit={benefit}
                  t={t}
                  store={store}
                />
              </Grid>
              <Grid item xs={12}>
                <div css={flex}>
                  <LearnMoreButton benefit={benefit} t={t} />
                  <div css={floatRight}>
                    {this.props.savedList ? (
                      <FavouriteButton
                        benefit={benefit}
                        toggleOpenState={() => {}}
                        store={store}
                        t={t}
                      />
                    ) : null}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    searchString: reduxState.searchString,
    benefits: reduxState.benefits
  };
};

BenefitCard.propTypes = {
  benefits: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  savedList: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCard);
