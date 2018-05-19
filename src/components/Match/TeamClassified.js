import React, { Component } from "react";
import Paper from "material-ui/Paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import Chip from "material-ui/Chip";
import { green500, red500, yellow500 } from "material-ui/styles/colors";
import { Row, Col } from "react-grid-system";

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class TeamClassified extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getColourOfChip(type) {
    switch (type) {
      case 'specific':
        return green500;
      case 'included':
        return yellow500;
      case 'not_included':
        return red500;
      default:
        return green500;
    }
  }
  renderChipTeam = (team, isClassified) => {
    return (
      <div style={{ display: "inline-block" }}>
        <Chip
          style={styles.chip}
          backgroundColor={this.getColourOfChip(isClassified)}
        >
          {team.name}
        </Chip>
      </div>
    );
  };
  render() {
    const {team} = this.props;
    const teamEntity = this.props.worldCupData.teams.find(
      k => k.id === team.id
    );
    if (teamEntity) {
      return this.renderChipTeam(teamEntity, team.type);
    } else {
      return "Time não escolhido";
    }
  }
}

const mapStateToProps = state => {
  const { worldCupData } = state;

  return {
    worldCupData: worldCupData
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(TeamClassified)))
);
