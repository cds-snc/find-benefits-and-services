import React, { Component } from "react";
import PropTypes from "prop-types";

import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import Favourites from "../components/favourites";
import { globalTheme } from "../theme";

export class FavouritesPage extends Component {
  render() {
    const { t, favouriteBenefits, url } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        t={this.props.t}
        i18n={this.props.i18n}
        hideNoscript={false}
        title={t("favourites.saved_benefits", { x: favouriteBenefits.length })}
        backgroundColor={globalTheme.colour.backgroundFillColour}
        skipLink="#mainContent"
        url={url}
      >
        <Favourites
          id="favourites"
          t={t}
          favouriteBenefits={favouriteBenefits}
          url={this.props.url}
          store={this.props.store}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    favouriteBenefits: state.favouriteBenefits
  };
};

FavouritesPage.propTypes = {
  favouriteBenefits: PropTypes.array.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(FavouritesPage));
