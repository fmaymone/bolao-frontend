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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class TeamPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHomeTeam = team => {
    return (
      <Row align="center">
        
        <Col>
          <Flag code={team.iso2} height="16" />
        </Col>
        <Col> {team.name} </Col>
      </Row>
    );
  };

  renderTeam = team => {
    const teamValues = this.props.team;
    //id: match.val.home_team, points: 0, win: 0, lost: 0, draw: 0, gc: 0, gp: 0 }
    return (
      <TableRow>
        <TableRowColumn style={{width: '30%'}}>{team.name}</TableRowColumn>
        <TableRowColumn>{teamValues.points}</TableRowColumn>
        <TableRowColumn>{teamValues.win}</TableRowColumn>
        <TableRowColumn>{teamValues.lost}</TableRowColumn>
        <TableRowColumn>{teamValues.draw}</TableRowColumn>
        <TableRowColumn>{teamValues.gp - teamValues.gc}</TableRowColumn>
        <TableRowColumn>{teamValues.gp}</TableRowColumn>
        <TableRowColumn>{teamValues.gc}</TableRowColumn>
      </TableRow>
    );
  };
  render() {
    const isHomeTeam = this.props.isHomeTeam;
    const teamEntity = this.props.worldCupData.teams.find(k=>k.id==this.props.team.id);
    if (teamEntity) {
      return(this.renderTeam(teamEntity));
     
    } else {
      return "Olar";
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
  injectIntl(muiThemeable()(withRouter(TeamPosition)))
);


