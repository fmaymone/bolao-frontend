import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from "../../components/Match/MatchList";
import ClassificationBuilder from "./ClassificationBuilder";
import FlatButton from "material-ui/FlatButton";
import { changeStage, updateMatch } from "../../store/actions/bolaoActions";
import { Row, Col } from "react-grid-system";

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

    await this.props.updateMatch(
      gameToBeUpdated,
      this.props.pool,
      this.props.user
    );
    await this.props.updateMatches();
  };

  groupsControls() {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div style={{}}>
          <FlatButton
            label={"< Anterior"}
            primary={true}
            onClick={this.prevGroup.bind(this)}
          />
        </div>
        <div style={{}}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{}}>
          <h1>{"Grupo " + currentGroup.toUpperCase()}</h1>
        </div>
        <div style={{}}>
          <MatchList
            matches={this.props.matches}
            handleChangedResult={this.handleChangedResult}
            finishedTimeToBet={this.props.finishedTimeToBet}
            user={this.props.user}
          />
        </div>
        <div style={{}}> {this.groupsControls()}</div>
        <div style={{}}>
          <ClassificationBuilder
            matches={this.props.matches}
            stage={this.props.playerDataReducer}
            pool={this.props.pool}
            referenceMatches={this.props.referenceMatches}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, playerDataReducer } = state;

  return {
    intl,
    dialogs,
    playerDataReducer: playerDataReducer
  };
};

export default connect(mapStateToProps, { changeStage, updateMatch })(
  injectIntl(withRouter(withFirebase(muiThemeable()(GroupsBuilder))))
);
