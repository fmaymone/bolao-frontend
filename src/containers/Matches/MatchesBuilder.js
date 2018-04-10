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
import { matchesFetch } from "../../store/actions/bolaoActions";

class MatchesBuilder extends Component {
  state = {
    matches: ""
  };

  componentDidMount() {
    const { firebaseApp, auth, watchList } = this.props;
    //firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    let ref = firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    watchList(ref, "listMatches"); //Here we started watching a list
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
      return <GroupsBuilder matches={this.getMatchesFromGroup()} />;
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

export default connect(mapStateToProps, { matchesFetch })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
