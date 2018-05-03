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
import { changeStage } from "../../store/actions/bolaoActions";
import FlatButton from "material-ui/FlatButton";
import { Container, Row, Col } from "react-grid-system";
import PacmanLoader from 'react-spinners';


const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class MatchesBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
  }

  componentDidMount() {

    this.fetchMatches();

  }

  fetchMatches = async () => {
    const { firebaseApp, auth, pool } = this.props;
  
  
      await firebaseApp.database()
        .ref(`/pools/${pool.key}/users/${auth.uid}/`)
        .once('value')
        .then(snapshot =>{
          this.setState({matches:snapshot.val()})
        })
  
  }

  filterFromGroup = value => {
    return value.val.group == this.props.playerDataReducer.currentGroup;
  };

  getActualMatches = () => {
    let matches = this.state.matches.matches;
    for (let index = 0; index < matches.length; index++) {
      const element = matches[index];
      console.log(element);
    }
    return matches;
  };

  renderGroupsStage() {
    if (this.state.matches === undefined)
      return <div />;
    return (
      <GroupsBuilder matches={this.getActualMatches()} pool={this.props.pool} />
    );
  }

  renderKnockoutStage() {
    if (this.state.matches === undefined)
      return <div />;
    return (
      <KnockoutBuilder matches={this.getActualMatches()} pool={this.props.pool} />
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

    const { pools, auth, pool } = this.props;

    console.log(pool);

    if (this.state.matches === null) {
      return "oi";
    }
    if (this.state.matches.length === 0) {
      return "oi";
    }

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
    pools: lists.pools
  };
};

export default connect(mapStateToProps, { changeStage })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
