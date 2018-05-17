import React, { Component } from "react";
import { connect } from "react-redux";
import Team from "./Team";
import { Row, Col } from "react-grid-system";
import TextField from "material-ui/TextField";

class GroupMatch extends Component {
  renderMatch = () => {
    return (
      <div key={this.props.game.name}>
        <Row align="center">
          <Col sm={4}>
            <Team id={this.props.game.home_team} isHomeTeam="true" />
          </Col>
          <Col sm={1}>
            <center>
              <TextField
                id={`${this.props.game.home_team}_home`}
                type="number"
                disabled={this.props.finishedTimeToBet}
                value={this.props.game.home_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "home")
                }
              />
            </center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center>
              <TextField
                id={`${this.props.game.home_team}_away`}
                type="number"
                disabled={this.props.finishedTimeToBet}
                value={this.props.game.away_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "away")
                }
              />
            </center>
          </Col>
          <Col sm={4}>
            <Team id={this.props.game.away_team} isHomeTeam="false" />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { game } = this.props;

    if (game.type === "group") {
      return this.renderMatch();
    } else {
      return <div />;
    }
  }
}

export default GroupMatch;
