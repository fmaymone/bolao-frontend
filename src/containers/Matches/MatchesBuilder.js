import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from "./GroupsBuilder";
import KnockoutBuilder from "./KnockoutBuilder";
import {
  GROUPS_STAGE,
  KNOCKOUT_STAGE,
  FIRST_PHASE_STARTED,
  SECOND_PHASE_STARTED,
  SECOND_PHASE_FINISHED,
  NOT_CHOSEN,
  TOP_SCORER
} from "../../store/actions/types";
import { changeStage, updateTopScorer } from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";
import { Tabs, Tab } from "material-ui/Tabs";
import Loader from "../../components/UI/Loader";
import MatchesStepper from "./MatchesStepper";
import { cyan700 } from "material-ui/styles/colors";
import TopScorer from "./TopScorer";

class MatchesBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: [],
      bettingStatus: FIRST_PHASE_STARTED,
      finishedTimeToBet: false
    };
  }
  handleChangeTopScorer = async value => {
    await this.props.updateTopScorer(this.props.pool, this.props.user,value
    );
    this.updateMatches();
  };
 
  checkLimitDate = () => {
    const limitDate = new Date(2018, 6, 13, 18);
    let now = new Date();

    if (now > limitDate) {
      this.setState({ finishedTimeToBet: true });
    }
  };

  handleChange = async value => {
    await this.handleChangeKnockout(value);
  };
  componentDidMount() {
    this.checkLimitDate();
    this.fetchMatches();
  }
  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }

  fetchMatches = async () => {
    const { firebaseApp, user } = this.props;
    await firebaseApp
      .database()
      .ref(`/pools/${this.props.pool.key}/users/${user.uid}/matches`)
      .once("value")
      .then(snapshot => {
        this.setState({
          matches: this.snapshotToArray(snapshot),
          isLoading: false
        });
      });
    await this.checkBettingStatus();
  };

  checkBettingStatus = async () => {
    const matchesIdToSearch = [48, 49, 50, 51, 52, 53, 54, 55];

    let findMatchNotAllocated = false;
    if (this.state.bettingStatus === FIRST_PHASE_STARTED) {
      for (let index = 0; index < matchesIdToSearch.length; index++) {
        const idToSearch = matchesIdToSearch[index];
        const match = this.state.matches.find(k => k.name == idToSearch);
        if (!this.matchHasBeenAlocated(match)) {
          findMatchNotAllocated = true;
        }
      }
    }
    if (findMatchNotAllocated === false) {
      this.setState({ bettingStatus: SECOND_PHASE_STARTED });
    }
    //check if he finishes the finals and 3rd matches
    const finalResult = this.state.matches.find(k => k.key === "result");
    if (
      finalResult.first !== NOT_CHOSEN &&
      finalResult.second !== NOT_CHOSEN &&
      finalResult.third !== NOT_CHOSEN &&
      finalResult.fourth !== NOT_CHOSEN
    ) {
      this.setState({ bettingStatus: SECOND_PHASE_FINISHED });
    }
  };
  //check if a match have teams alocated. Used on the Status of the Matches Builder
  matchHasBeenAlocated = match => {
    let answer = true;
    if (match.away_team === NOT_CHOSEN || match.home_team === NOT_CHOSEN) {
      answer = false;
    }
    return answer;
  };

  updateMatches = () => {
    this.fetchMatches();
  };

  filterFromGroup = value => {
    return value.group === this.props.playerDataReducer.currentGroup;
  };
  getActualMatches = () => {
    const matches = this.state.matches.filter(this.filterFromGroup);
    return matches;
  };

  renderGroupsStage() {
    if (this.state.matches === undefined)
      return <h1>Erro nos Jogos. Dê Refresh</h1>;
    return (
      <GroupsBuilder
        matches={this.getActualMatches()}
        pool={this.props.pool}
        referenceMatches={this.state.matches}
        updateMatches={this.updateMatches}
        finishedTimeToBet={this.state.finishedTimeToBet}
        user={this.props.user}
      />
    );
  }

  renderKnockoutStage() {
    if (this.state.matches.length < 0) return <div />;
    const finalResult = this.state.matches.find(k=>k.group==='result');
    return (
      <KnockoutBuilder
        matches={this.getActualMatches()}
        pool={this.props.pool}
        referenceMatches={this.state.matches}
        updateMatches={this.updateMatches}
        finishedTimeToBet={this.state.finishedTimeToBet}
        user={this.props.user}
        finalResult = {finalResult}
      />
    );
  }
  renderTopScorer() {
    if (this.state.matches.length < 1) {
      return <div />;
    } else {
      const topScorer = this.state.matches.find(k => k.group === TOP_SCORER);

      return (
        <TopScorer
          topScorer={topScorer}
          handleChangeTopScorer={this.handleChangeTopScorer}
        />
      );
    }
  }
  handleChangeKnockout = async phase => {
    let group = "round_16";
    if (phase === GROUPS_STAGE) {
      group = "a";
    }
    const data = {
      currentGroup: group,
      currentPhase: phase
    };
    await this.props.changeStage(data);
  };

  render() {
    const { intl } = this.props;

    if (this.state.isLoading === false) {
      return (
        <Tabs
          value={this.props.playerDataReducer.currentPhase}
          onChange={this.handleChange}
        >
          <Tab
            style={{ backgroundColor: cyan700 }}
            label={intl.formatMessage({ id: "first_phase" })}
            value={GROUPS_STAGE}
          >
            <Container>
              <Row>
                <Col sm={12}>
                  <MatchesStepper bettingStatus={this.state.bettingStatus} />
                </Col>
              </Row>
              <Row>
                <Col sm={2} />
                <Col sm={8}>{this.renderGroupsStage()}</Col>
                <Col sm={2} />
              </Row>
            </Container>
          </Tab>
          <Tab
            style={{ backgroundColor: cyan700 }}
            label={intl.formatMessage({ id: "second_phase" })}
            value={KNOCKOUT_STAGE}
          >
            <Container>
            <Row>
                <Col sm={12}>
                  <MatchesStepper bettingStatus={this.state.bettingStatus} />
                </Col>
              </Row>
              <Row>
                <Col sm={2} />
                <Col sm={8}> {this.renderKnockoutStage()}</Col>
                <Col sm={2} />
              </Row>
            </Container>
          </Tab>
          <Tab
            style={{ backgroundColor: cyan700 }}
            label={"Artilheiro"}
            value={TOP_SCORER}
          >
            <Container>
              <Row>
                <Col sm={12}>{this.renderTopScorer()}</Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, playerDataReducer, lists } = state;

  return {
    intl,
    dialogs,
    playerDataReducer: playerDataReducer,
    matches: lists.listMatches
  };
};

export default connect(mapStateToProps, { changeStage, updateTopScorer })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
