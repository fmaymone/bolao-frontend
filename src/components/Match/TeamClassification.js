import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import Flag from "react-world-flags";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";

const style = {
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHomeTeam = team => {
    let fontWeight = "normal";
    if (this.props.isWinner == team.id) {
      fontWeight = "bold";
    }
    return  <div style={{display: 'inline-block'}}>{team.name}</div>;
  };

  renderAwayTeam = team => {
    let fontWeight = "normal";
    if (this.props.isWinner == team.id) {
      fontWeight = "bold";
    }
    
    return  <div style={{display: 'inline-block'}}>{team.name}</div>;
  };
  render() {
    const isHomeTeam = this.props.isHomeTeam;
    const teamEntity = this.props.worldCupData.teams.find(
      k => k.id == this.props.id
    );
    if (teamEntity) {
      if (isHomeTeam == "true") {
        return this.renderHomeTeam(teamEntity);
      } else {
        return this.renderAwayTeam(teamEntity);
      }
    } else {
      return "Time não escolhido";
    }
  }
}

const styles = {};
const mapStateToProps = state => {
  const { auth, browser, lists, worldCupData } = state;

  return {
    worldCupData: worldCupData
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(Team)))
);

Team.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string
};
