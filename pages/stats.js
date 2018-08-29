import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";

import PrChart from "../components/stats/prChart";
import PrDurationChart from "../components/stats/pr_duration_chart";

import { withStyles } from "@material-ui/core/styles/index";
import Container from "../components/container";

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing.unit * 3
  },
  table: {
    // width: 1000
  }
});

export class Stats extends Component {
  render() {
    const { classes, i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout
        i18n={this.props.i18n}
        t={this.props.t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.stats")}
      >
        <Container className={classes.marginTop}>
          <h1>{t("stats.title")}</h1>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Paper>
                <PrChart
                  t={this.props.t}
                  store={this.props.store}
                  id="PrChart"
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <PrDurationChart
                  t={this.props.t}
                  store={this.props.store}
                  id="PrDurationChart"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default withStyles(styles)(withI18next()(Stats));
