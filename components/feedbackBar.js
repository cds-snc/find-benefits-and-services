import { Component } from "react";
import PropTypes from "prop-types";
import SubmitButton from "./button";
import { logEvent } from "../utils/analytics";
import Raven from "raven-js";
import TextArea from "./text_area";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FooterButton from "./footer_button";
import { globalTheme } from "../theme";
import Header from "./typography/header";
import { Grid } from "@material-ui/core";
require("isomorphic-fetch");

const CommentBox = css`
  background-color: ${globalTheme.colour.button1Hover};
  color: ${globalTheme.colour.white};
  text-align: left;
  font-size: 14px;
  padding: 5px 0 50px 0;
`;
const Div = css`
  background-color: ${globalTheme.colour.button1Hover};
  width: 100%;
  color: ${globalTheme.colour.white};
  text-align: left;
  font-size: 14px;
  display: table;
  @media (max-width: 400px) {
    height: 100px;
  }
`;
const FeedbackWrapper = css`
  margin-top: 125px;
`;
const Inner = css`
  line-height: 1.6;
  display: flex;
  flex-direction: row;
  color: ${globalTheme.colour.white};
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  @media (max-width: 400px) {
    font-size: 16px;
    button {
      margin-top: 10px;
    }
  }
`;
const TextHold = css`
  background-color: ${globalTheme.colour.button1Hover};
  padding: 10px 0;
`;
const topHeading = css`
  color: white;
  padding-top: 30px;
`;
const whiteNormalFont = css`
  color: white;
  font-weight: normal;
`;
const fileBugHeader = css`
  color: white;
  font-weight: normal;
  float: right;
`;
const pStyle = css`
  font-size: 20px;
  font-weight: normal;
  font-family: ${globalTheme.fontFamilySansSerif};
`;
const textArea = css`
  span {
    color: white;
  }
`;
const cancelButton = css`
  margin-left: 10px;
`;
const resetButton = css`
  text-decoration: underline;
`;

export class FeedbackBar extends Component {
  state = {
    bug: "",
    commentIsBug: false,
    commentFormToggled: false,
    commentSubmitted: false,
    infoBeMoreUseful: "",
    feedbackSubmitted: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  cancelComment = () => {
    this.setState({ feedbackSubmitted: false });
    this.setState({ commentFormToggled: false });
  };

  sendComment = () => {
    this.setState({ commentFormToggled: false });
    this.setState({ commentSubmitted: true });
    let payload = {
      whatWentWrong: this.state.bug,
      howCanInfoBeMoreUseful: this.state.infoBeMoreUseful,
      url: window.location.href,
      time: new Date().toUTCString()
    };

    fetch("/submitComment", {
      body: JSON.stringify(payload),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    }).catch(err => Raven.captureException(err));
  };

  sendFeedback = answer => {
    this.setState({ feedbackSubmitted: true });
    logEvent("Page Feedback (" + this.props.t("feedback-prompt") + ")", answer);
    if (answer == "No" || answer == "Bug") {
      this.setState({ commentFormToggled: true });
      if (answer == "Bug") this.setState({ commentIsBug: true });
    }
  };

  resetFeedback = () => {
    this.setState({
      bug: "",
      commentIsBug: false,
      commentFormToggled: false,
      commentSubmitted: false,
      infoBeMoreUseful: "",
      feedbackSubmitted: false
    });
  };

  toggleCommentForm = () => {
    this.setState({ commentFormToggled: !this.state.commentFormToggled });
  };

  render() {
    const { t } = this.props;

    return (
      <div
        css={FeedbackWrapper}
        aria-label={t("feedback.page_title")}
        role="complementary"
      >
        {this.state.commentFormToggled ? (
          <div css={CommentBox} role="form">
            <Header size="lg" headingLevel="h2" styles={topHeading}>
              {t("comment-help-us-improve")}
            </Header>
            <p css={pStyle}>{t("comment-privacy-disclaimer")}</p>
            <div css={TextHold}>
              <TextArea
                id="commentTextArea"
                name="bugFiling"
                maxLength={500}
                t={t}
                css={textArea}
                onChange={
                  this.state.commentIsBug
                    ? this.handleChange("bug")
                    : this.handleChange("infoBeMoreUseful")
                }
              >
                {this.state.commentIsBug
                  ? t("comment-what-went-wrong")
                  : t("feedback.how_can_info_be_more_useful")}
              </TextArea>
            </div>
            <br />
            <SubmitButton
              id="sendComment"
              arrow={true}
              size="big"
              onClick={() => this.sendComment()}
            >
              {t("send")}
            </SubmitButton>
            &nbsp; &nbsp;
            <FooterButton
              id="cancelComment"
              css={cancelButton}
              onClick={() => this.cancelComment()}
            >
              {t("cancel")}
            </FooterButton>
          </div>
        ) : null}
        <div css={Div}>
          {this.state.feedbackSubmitted && !this.state.commentFormToggled ? (
            <div css={Inner}>
              <Header size="sm" headingLevel="h2" styles={whiteNormalFont}>
                {t("feedback.response_p1")}
              </Header>
              <FooterButton
                id="feedbackReset"
                css={resetButton}
                onClick={() => this.resetFeedback()}
              >
                {t("feedback.response_p2")}
              </FooterButton>
            </div>
          ) : !this.state.feedbackSubmitted ? (
            <div css={Inner}>
              <Grid container spacing={8}>
                <Grid item md={5} xs={12}>
                  <Header size="sm" headingLevel="h2" styles={whiteNormalFont}>
                    {t("feedback-prompt")}
                  </Header>
                </Grid>
                <Grid item md={3} xs={12}>
                  <FooterButton
                    id="feedbackYes"
                    onClick={() => this.sendFeedback("Yes")}
                  >
                    {t("yes")}
                  </FooterButton>
                  &nbsp; &nbsp;
                  <FooterButton
                    id="feedbackNo"
                    onClick={() => this.sendFeedback("No")}
                  >
                    {t("no")}
                  </FooterButton>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Header size="sm" headingLevel="h2" styles={fileBugHeader}>
                    <FooterButton
                      id="feedbackBug"
                      onClick={() => this.sendFeedback("Bug")}
                    >
                      {t("feedback.bug_prompt")}
                    </FooterButton>
                  </Header>
                </Grid>
              </Grid>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

FeedbackBar.propTypes = {
  t: PropTypes.func.isRequired
};

export default FeedbackBar;
