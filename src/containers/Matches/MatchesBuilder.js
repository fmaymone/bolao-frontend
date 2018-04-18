import React, { Component } from "react";
import { Activity } from "rmw-shell";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from "./GroupsBuilder";
import KnockoutBuilder from './KnockoutBuilder';
import { GROUPS_STAGE, KNOCKOUT_STAGE, ROUND_16 } from "../../store/actions/types";
import MatchList from "../../components/Match/MatchList";
import { matchesFetch, changeStage } from "../../store/actions/bolaoActions";
import FlatButton from "material-ui/FlatButton";
import { Container, Row, Col } from "react-grid-system";


const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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

  filterFromGroup = value => {
    return value.val.group == this.props.playerDataReducer.currentGroup;
  };

  getActualMatches = () => {
    const matches = this.props.matches.filter(this.filterFromGroup);
    return matches;
  };

  renderGroupsStage() {
    if (this.props.matches === undefined)
      return <div />;
    return (
      <GroupsBuilder matches={this.getActualMatches()} />
    );
  }

  renderKnockoutStage() {
    if (this.props.matches === undefined)
      return <div />;
    return (
      <KnockoutBuilder matches={this.getActualMatches()} />
    );
  }
 
  handleChangeKnockout = (phase) => {
    let group = 'round_16'
    if (phase === GROUPS_STAGE) {
      group = 'a';
    }
    const data = {
      currentGroup: group,
      currentPhase: phase
    }
    this.props.changeStage(data);

  }

  render() {
    let type =
      this.props.playerDataReducer.currentPhase === GROUPS_STAGE
        ? this.renderGroupsStage()
        : this.renderKnockoutStage();

    return (
      <Activity>
        <Container>
          <Row>
            <Col sm={2}>
              <FlatButton
                label={"Knockout >"}
                primary={true}
                onClick={this.handleChangeKnockout.bind(this, KNOCKOUT_STAGE)}
              />
              <FlatButton
                label={"Groups >"}
                primary={true}
                onClick={this.handleChangeKnockout.bind(this, GROUPS_STAGE)}
              />
            </Col>
            <Col sm={8}>
              <center>{type}</center>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
        </Container>
      </Activity>
    )
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
