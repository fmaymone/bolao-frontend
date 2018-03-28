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
    return (
      <Row>
        
        <Col>
          <Flag code={team.iso2} height="16" />
        </Col>
        <Col> {team.name} </Col>
      </Row>
    );
  };

  renderAwayTeam = team => {
    return (
      <Row>
        <Col> {team.name} </Col>
        <Col>
          <Flag code={team.iso2} height="16" />
        </Col>
      </Row>
    );
  };
  render() {
    const isHomeTeam = this.props.isHomeTeam;
    const teamEntity = this.props.worldCupData.teams[this.props.id - 1];
    if (teamEntity) {
      if (isHomeTeam == "true") {
        return this.renderHomeTeam(teamEntity);
      } else {
        return this.renderAwayTeam(teamEntity);
      }
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
  injectIntl(muiThemeable()(withRouter(Team)))
);

Team.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  home: PropTypes.boolean
};
