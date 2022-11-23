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
  TOP_SCORER,
} from "../../store/actions/types";
import { changeStage, updateTopScorer } from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";
import { Tabs, Tab } from "material-ui/Tabs";
import Loader from "../../components/UI/Loader";
import MatchesStepper from "./MatchesStepper";
import { cyan700 } from "material-ui/styles/colors";
import TopScorer from "./TopScorer";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const USER_ADMIN = "02b4c88iL0Olehf1KpeEeNUdBMX2";
const POOL_ADMIN = "-LCmgkjj3PpQwwuQvKTA";

class MatchesBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: [],
      bettingStatus: FIRST_PHASE_STARTED,
      finishedTimeToBet: false,
      dialogHasOpened: false,
      clicksDialogDraw: 0,
      isAdmin: false,
    };
  }
  handleChangeTopScorer = async (value) => {
    await this.props.updateTopScorer(this.props.pool, this.props.user, value);
    this.updateMatches();
  };

  handleOpen = () => {
    this.setState({ dialogHasOpened: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogHasOpened: false });
  };

  openDialog = () => {
    const actions = [
      <FlatButton
        label="Entendi"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDialogClose}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Empates da 2a Fase"
          actions={actions}
          modal={false}
          open={this.state.dialogHasOpened}
          onRequestClose={this.handleDialogClose}
        >
          Se você desejar apostar que um jogo foi empate, clique em cima do time
          que você considera que irá se classificar. O time ficará em{" "}
          <b>negrito</b> e estará classificado para a próxima fase
        </Dialog>
      </div>
    );
  };

  checkLimitDate = () => {
    const limitDate = new Date(2021, 11, 22, 8);
    const now = new Date();

    if (now > limitDate) {
      this.setState({ finishedTimeToBet: true });
    }
  };

  handleChange = async (value) => {
    await this.handleChangeKnockout(value);
  };
  componentDidMount() {
    this.checkLimitDate();
    this.fetchMatches();
    this.checkAdmin();
  }
  checkAdmin = () => {
    if (
      this.props.pool.key === POOL_ADMIN &&
      this.props.user.uid === USER_ADMIN
    ) {
      this.setState({ isAdmin: true, finishedTimeToBet: false });
    }
  };
  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
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
      .on("value", (snapshot) => {
        this.setState({
          matches: this.snapshotToArray(snapshot),
          isLoading: false,
        });
        this.checkBettingStatus();
      });
  };

  checkBettingStatus = async () => {
    const matchesIdToSearch = [48, 49, 50, 51, 52, 53, 54, 55];
    if (this.state.matches.length > 0) {
      let findMatchNotAllocated = false;
      if (this.state.bettingStatus === FIRST_PHASE_STARTED) {
        for (let index = 0; index < matchesIdToSearch.length; index++) {
          const idToSearch = matchesIdToSearch[index];
          const match = this.state.matches.find((k) => k.name == idToSearch);
          if (!this.matchHasBeenAlocated(match)) {
            findMatchNotAllocated = true;
          }
        }
      }
      if (findMatchNotAllocated === false) {
        this.setState({ bettingStatus: SECOND_PHASE_STARTED });
        if (this.state.clicksDialogDraw === 0) {
          this.setState({ dialogHasOpened: true, clicksDialogDraw: 1 });
        } else {
          this.setState({ dialogHasOpened: false, clicksDialogDraw: 1 });
        }
      }
      //check if he finishes the finals and 3rd matches
      const finalResult = this.state.matches.find((k) => k.key === "result");
      if (
        finalResult.first !== NOT_CHOSEN &&
        finalResult.second !== NOT_CHOSEN &&
        finalResult.third !== NOT_CHOSEN &&
        finalResult.fourth !== NOT_CHOSEN
      ) {
        this.setState({ bettingStatus: SECOND_PHASE_FINISHED });
      }
    }
  };
  //check if a match have teams alocated. Used on the Status of the Matches Builder
  matchHasBeenAlocated = (match) => {
    let answer = true;
    if (match.away_team === NOT_CHOSEN || match.home_team === NOT_CHOSEN) {
      answer = false;
    }
    return answer;
  };

  updateMatches = () => {
    //this.fetchMatches();
  };

  filterFromGroup = (value) => {
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
        isAdmin={this.state.isAdmin}
      />
    );
  }

  renderKnockoutStage() {
    if (this.state.matches.length < 0) return <div />;

    const finalResult = this.state.matches.find((k) => k.group === "result");
    return (
      <div>
        <KnockoutBuilder
          matches={this.getActualMatches()}
          pool={this.props.pool}
          referenceMatches={this.state.matches}
          updateMatches={this.updateMatches}
          finishedTimeToBet={this.state.finishedTimeToBet}
          user={this.props.user}
          finalResult={finalResult}
          isAdmin={this.state.isAdmin}
        />
      </div>
    );
  }
  renderTopScorer() {
    if (this.state.matches.length < 1) {
      return <div />;
    } else {
      const topScorer = this.state.matches.find((k) => k.group === TOP_SCORER);

      return (
        <TopScorer
          finishedTimeToBet={this.state.finishedTimeToBet}
          topScorer={topScorer}
          handleChangeTopScorer={this.handleChangeTopScorer}
        />
      );
    }
  }
  handleChangeKnockout = async (phase) => {
    let group = "round_16";
    if (phase === GROUPS_STAGE) {
      group = "a";
    }
    const data = {
      currentGroup: group,
      currentPhase: phase,
    };
    await this.props.changeStage(data);
  };

  render() {
    const { intl, isGranted } = this.props;

    //console.log(isGranted('administration'));

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
              {!this.state.finishedTimeToBet && (
                <Row>
                  <Col sm={12}>
                    <MatchesStepper bettingStatus={this.state.bettingStatus} />
                  </Col>
                </Row>
              )}
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
              {!this.state.finishedTimeToBet && (
                <Row>
                  <Col sm={12}>
                    <MatchesStepper bettingStatus={this.state.bettingStatus} />
                  </Col>
                </Row>
              )}
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

const mapStateToProps = (state) => {
  const { intl, dialogs, playerDataReducer, lists } = state;

  return {
    intl,
    dialogs,
    playerDataReducer: playerDataReducer,
    matches: lists.listMatches,
  };
};

export default connect(mapStateToProps, { changeStage, updateTopScorer })(
  injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder))))
);
