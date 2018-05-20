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

const styles = {
  team_home: {
    justifyContent: "flex-start",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: 'center',
    marginLeft: '10%'
  },

  team_away: {
    justifyContent: "flex-end",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: 'center',
    marginRight: '10%'
  }
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
    return (
      <div style={styles.team_home}>
        <div  >
          <Flag code={team.iso2} height="16" />{" "}
        </div>
        <div style={{ fontWeight: fontWeight }}>{team.name} </div>
      </div>
    );
  };

  renderAwayTeam = team => {
    let fontWeight = "normal";
    if (this.props.isWinner == team.id) {
      fontWeight = "bold";
    }
    return (
      <div style={styles.team_away}>
        
        <div style={{ fontWeight: fontWeight }}>{team.name} </div>
        <div>
          <Flag code={team.iso2} height="16" />{" "}
        </div>
      </div>
    );
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
