import React, { Component } from "react";
import { Activity } from "rmw-shell";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from "./GroupsBuilder";
import { GROUPS_STAGE, KNOCKOUT_STAGE } from "../../store/actions/types";
import MatchList from "../../components/Match/MatchList";
import { matchesFetch, changeStage } from "../../store/actions/bolaoActions";
import FlatButton from "material-ui/FlatButton";

const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class MatchesBuilder extends Component {
  state = {
    matches: ""
  };

  nextGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: 'a', currentPhase: 'groups_stage' };
    let tempGroup;
    if (playerDataReducer.currentGroup === 'h') {
      tempGroup = 'a';
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);


  };

  prevGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: 'a', currentPhase: 'groups_stage' };
    let tempGroup;
    if (playerDataReducer.currentGroup === 'a') {
      tempGroup = 'h';
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) - 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);

  };
  componentDidMount() {
    const { firebaseApp, auth, watchList } = this.props;
    //firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    let ref = firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    watchList(ref, "listMatches"); //Here we started watching a list
  }
  componentWillUnmount() {
    const { unwatchList, auth } = this.props;
    unwatchList(`/users/${auth.uid}/matches`); // To unwatch a watcher that is stored in a specific location we call the unwatchList with the path
  }

  renderList(matches) {
    const { history } = this.props;

    return;
  }

  filterFromGroup = value => {
    return value.val.group == this.props.playerDataReducer.currentGroup;
  };
  getMatchesFromGroup = () => {
    const matches = this.props.matches.filter(this.filterFromGroup);
    return matches;
  };

  renderGroupsStage() {
    if (this.props.matches === undefined)
      return <div />;
    return (
      <div>
        <GroupsBuilder matches={this.getMatchesFromGroup()} />
        <FlatButton
          label={"< Anterior"}
          primary={true}
          onClick={this.prevGroup.bind(this)}
        />
        <FlatButton
          label={"Proximo >"}
          primary={true}
          onClick={this.nextGroup.bind(this)}
        />
      </div>
    );

  }

  renderKnockoutStage() {
    return <h1>Knockout Stage</h1>;
  }

  render() {
    let type =
      this.props.playerDataReducer.currentPhase === GROUPS_STAGE
        ? this.renderGroupsStage()
        : this.renderKnockoutStage();

    return <Activity>{type}</Activity>;
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, playerDataReducer, lists } = state;

  return {
    intl,
    dialogs,
    auth,
    playerDataReducer: playerDataReducer,
    matches: lists.listMatches
  };
};

export default connect(mapStateToProps, { matchesFetch, changeStage })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
