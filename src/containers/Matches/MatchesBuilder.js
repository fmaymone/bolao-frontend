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
import Loader from '../../components/UI/Loader'


class MatchesBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true,
    matches: [] };
  }
  
  handleChange = async (value) => {
    await this.handleChangeKnockout(value);
  };
  componentDidMount() {
    this.fetchMatches();
  }
  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  fetchMatches = async () =>{
    const { firebaseApp, auth, watchList, user } = this.props;
    await firebaseApp
    .database()
    .ref(`/pools/${this.props.pool.key}/users/${user.uid}/matches`)
    .once('value')
    .then(snapshot => {
      this.setState({
        matches: this.snapshotToArray(snapshot),
        isLoading: false
      });
    });

  }
  componentWillUnmount() {
    const { unwatchList, user } = this.props;
    unwatchList(`/pools/${this.props.pool.key}/users/${user.uid}/matches`); // To unwatch a watcher that is stored in a specific location we call the unwatchList with the path
  }

  updateMatches = () => {
    this.fetchMatches();
  }
  // componentWillUpdate() {
  //   this.fetchMatches();
  // }

  filterFromGroup = value => {
    return value.group === this.props.playerDataReducer.currentGroup;
  };
  getActualMatches = () => {
    const matches = this.state.matches.filter(this.filterFromGroup);
    return matches;
  };

  renderGroupsStage() {
    if (this.state.matches === undefined)
      return <div />;
    return (
      <GroupsBuilder matches={this.getActualMatches()} pool={this.props.pool} referenceMatches = {this.state.matches} updateMatches={this.updateMatches} />
    );
  }

  renderKnockoutStage() {
    if (this.state.matches === undefined)
      return <div />;
    return (
      <KnockoutBuilder matches={this.getActualMatches()} pool={this.props.pool} referenceMatches = {this.state.matches} updateMatches={this.updateMatches}/>
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

    
   if(this.state.isLoading === false){
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
    )}else{
      return <Loader />
    }
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
