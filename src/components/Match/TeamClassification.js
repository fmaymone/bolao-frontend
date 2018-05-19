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
import Chip from "material-ui/Chip";
import {
  green500,
  yellow500,
  blue500,
  pink500
} from "material-ui/styles/colors";

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
    return <div style={{ display: "inline-block" }}>{team.name}</div>;
  };

  renderAwayTeam = team => {
    let fontWeight = "normal";
    if (this.props.isWinner == team.id) {
      fontWeight = "bold";
    }

    return <div style={{ display: "inline-block" }}>{team.name}</div>;
  };
  getColourOfChip(position) {
    switch (position) {
      case "first":
        return green500;
        break;
      case "second":
        return yellow500;
        break;
      case "third":
        return blue500;
        break;
      case "fourth":
        return pink500;
        break;

      default:
        return green500;
        break;
    }
  }
  renderChipTeam = team => {
    return <Chip
    backgroundColor={this.getColourOfChip(this.props.position)}
    >{team.name}</Chip>;
  };
  render() {
    const isHomeTeam = this.props.isHomeTeam;
    const teamEntity = this.props.worldCupData.teams.find(
      k => k.id == this.props.id
    );
    if (teamEntity) {
      if (this.props.isChip) {
        return this.renderChipTeam(teamEntity);
      }
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
