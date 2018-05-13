import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from "./GroupsBuilder";
import KnockoutBuilder from './KnockoutBuilder';
import { GROUPS_STAGE, KNOCKOUT_STAGE  } from "../../store/actions/types";
import { changeStage } from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";
import { Tabs, Tab } from 'material-ui/Tabs';


class MatchesBuilder extends Component {
  
  handleChange = async (value) => {
    await this.handleChangeKnockout(value);
  };
  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches = async () =>{
    const { firebaseApp, auth, watchList, user } = this.props;
    //firebaseApp.database().ref(`/users/${auth.uid}/matches`);

    let ref = firebaseApp.database().ref(`/pools/${this.props.pool.key}/users/${user.uid}/matches`);
    //let ref = firebaseApp.database().ref(`/pools/-LBXZbmmksFrFv2lCUfN/users/eyn6bCswRnZ5qIJZ4ZiC98rTe4n2/matches`);
    await watchList(ref, "listMatches"); 

  }
  componentWillUnmount() {
    const { unwatchList, user } = this.props;
    unwatchList(`/pools/${this.props.pool.key}/users/${user.uid}/matches`); // To unwatch a watcher that is stored in a specific location we call the unwatchList with the path
  }

  filterFromGroup = value => {
    return value.val.group === this.props.playerDataReducer.currentGroup;
  };
  getActualMatches = () => {
    const matches = this.props.matches.filter(this.filterFromGroup);
    return matches;
  };

  renderGroupsStage() {
    if (this.props.matches === undefined)
      return <div />;
    return (
      <GroupsBuilder matches={this.getActualMatches()} pool={this.props.pool} />
    );
  }

  renderKnockoutStage() {
    if (this.props.matches === undefined)
      return <div />;
    return (
      <KnockoutBuilder matches={this.getActualMatches()} pool={this.props.pool} />
    );
  }
  handleChangeKnockout = async (phase) => {
    let group = 'round_16'
    if (phase === GROUPS_STAGE) {
      group = 'a';
    }
    const data = {
      currentGroup: group,
      currentPhase: phase
    }
    await this.props.changeStage(data);

  }

  render() {
    const { intl } = this.props
   
    return (<Tabs
      value={this.props.playerDataReducer.currentPhase}
      onChange={this.handleChange}
    >
      <Tab label={intl.formatMessage({ id: "first_phase" })} value={GROUPS_STAGE}>
        <Container>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>{this.renderGroupsStage()}</Col>
            <Col sm={2}></Col>
          </Row>
        </Container>

      </Tab>
      <Tab label={intl.formatMessage({ id: "second_phase" })} value={KNOCKOUT_STAGE}>
        <Container>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}> {this.renderKnockoutStage()}</Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </Tab>
    </Tabs>
    )
  }
}

const mapStateToProps = state => {
  const { intl, dialogs,  playerDataReducer, lists } = state;

  return {
    intl,
    dialogs,
    playerDataReducer: playerDataReducer,
    matches: lists.listMatches
  };
};

export default connect(mapStateToProps, { changeStage })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
