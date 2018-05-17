import React, { Component } from "react";
import TestList from "../../components/Match/TestList";
import BetForm from "../../components/Forms/BetForm";
import { Activity } from "rmw-shell";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from "../../components/Match/MatchList";
import ClassificationBuilder from "./ClassificationBuilder";
import FlatButton from "material-ui/FlatButton";
import { changeStage, updateMatch } from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";

const groups = ["a", "b", "c", "d", "e", "f", "g", "h"];

class GroupsBuilder extends Component {
  nextGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: "a", currentPhase: "groups_stage" };
    let tempGroup;
    if (playerDataReducer.currentGroup === "h") {
      tempGroup = "a";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
  };

  prevGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: "a", currentPhase: "groups_stage" };
    let tempGroup;
    if (playerDataReducer.currentGroup === "a") {
      tempGroup = "h";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) - 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
  };
  handleChangedResult = async (e, game, type) => {
    let gameToBeUpdated = { ...game };
    type === "home"
      ? (gameToBeUpdated.home_result = e.target.value)
      : (gameToBeUpdated.away_result = e.target.value);

    await this.props.updateMatch(gameToBeUpdated, this.props.pool);
    await this.props.updateMatches();
  };

  groupsControls() {
    return (
      <div
        style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}
      >
        <div style={{ }}>
          <FlatButton
            label={"< Anterior"}
            primary={true}
            onClick={this.prevGroup.bind(this)}
          />
        </div>
        <div
          style={{
            
          
          }}
        >
          <FlatButton
            label={"Proximo >"}
            primary={true}
            onClick={this.nextGroup.bind(this)}
          />
        </div>
      </div>
    );
  }

  render() {
    const currentGroup = this.props.playerDataReducer.currentGroup;
    return (
      <div>
        <Row>
          <Col md={12}>
            {" "}
            <MatchList
              matches={this.props.matches}
              title={"Grupo " + currentGroup.toUpperCase()}
              handleChangedResult={this.handleChangedResult}
              finishedTimeToBet={this.props.finishedTimeToBet}
            />
          </Col>
        </Row>
        {this.groupsControls()}
        <Row>
          <Col md={10} >
            <ClassificationBuilder
              matches={this.props.matches}
              stage={this.props.playerDataReducer}
              pool={this.props.pool}
              referenceMatches={this.props.referenceMatches}
              
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, playerDataReducer, lists } = state;

  return {
    intl,
    dialogs,
    auth,
    playerDataReducer: playerDataReducer
  };
};

export default connect(mapStateToProps, { changeStage, updateMatch })(
  injectIntl(withRouter(withFirebase(muiThemeable()(GroupsBuilder))))
);
