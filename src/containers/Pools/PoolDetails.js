import { withFirebase } from "firekit-provider";
import { Tab, Tabs } from "material-ui/Tabs";
import muiThemeable from "material-ui/styles/muiThemeable";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Activity } from "rmw-shell";
import Pool from "../../components/Pool/Pool";
import MatchesBuilder from "../Matches/MatchesBuilder";
import ClassificationOfUser from "./ClassificationOfUser";
import Loader from "../../components/UI/Loader";
import ClassificationOfPool from "./ClassificationOfPool";
import userCachedData from "./users";
import poolCachedData from "./poolCachedData";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class PoolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserFromPool: false,
      isLoadingMatchesOfUser: false,
      isLoadingOutcomeMatches: false,
      isLoadingPool: false,
      outcomeMatches: [],
      matchesOfUser: [],
      poolData: [],
      finishedTimeToBet: false,
      status: {},
    };
  }
  async componentDidMount() {
    const limitDate = new Date(2022, 11, 22, 8);
    let now = new Date();

    this.isUserFromPool(
      this.props.location.state.userOfPool,
      this.props.location.state.pool
    );
    if (now > limitDate) {
      this.setState({ finishedTimeToBet: true });
      this.fetchMatchesDataCached();
      this.fetchPoolDataCached();
      await this.fetchOutcome();
      //this.fetchPoolData();
    }
    await this.fetchMatches();
  }

  fetchPoolDataCached = () => {
    let dataAsArray = [];
    const currentPool =
      poolCachedData[this.props.location.state.pool.key].users;
    Object.keys(currentPool).forEach((value) => {
      dataAsArray.push({
        key: value,
        matches: currentPool[value].matches,
      });
    });
    this.setState({
      poolData: dataAsArray,
      isLoadingPool: false,
    });
  };

  fetchPoolData = async () => {
    const { firebaseApp } = this.props;

    await firebaseApp
      .database()
      .ref(`/pools/${this.props.location.state.pool.key}/users`)
      .once("value")
      .then((snapshot) => {
        this.setState({
          poolData: this.snapshotToArray(snapshot),
          isLoadingPool: false,
        });
      });
  };
  fetchOutcome = async () => {
    //this is the place where the results will be stored
    this.setState({ isLoadingOutcomeMatches: true });
    const { firebaseApp } = this.props;
    const outcomePoolId = "-LCmgkjj3PpQwwuQvKTA";
    const outcomeUserId = "02b4c88iL0Olehf1KpeEeNUdBMX2";
    await firebaseApp
      .database()
      .ref(`/pools/${outcomePoolId}/users/${outcomeUserId}/matches`)
      .on("value", (snapshot) => {
        this.setState({
          outcomeMatches: this.snapshotToArray(snapshot),
          isLoadingOutcomeMatches: false,
        });
      });
  };
  fetchMatches = async () => {
    const user = this.props.location.state.userOfPool;
    const pool = this.props.location.state.pool;

    const { firebaseApp } = this.props;
    await firebaseApp
      .database()
      .ref(`/pools/${pool.key}/users/${user.uid}/matches`)
      .on("value", (snapshot) => {
        this.setState({
          matchesOfUser: this.snapshotToArray(snapshot),
          isLoadingMatchesOfUser: false,
        });
      });
  };

  fetchMatchesDataCached = async () => {
    const user = this.props.location.state.userOfPool;
    const pool = this.props.location.state.pool;

    const poolData = poolCachedData;

    const matchesOfUser =
      poolData[this.props.location.state.pool.key].users[user.uid].matches;

    this.setState({
      matchesOfUser: matchesOfUser,
      isLoadingMatchesOfUser: false,
    });
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
  handleSetUserFromPool = async (param) => {
    this.setState({ isUserFromPool: param });
  };

  isUserFromPool = (user, pool) => {
    let answer = true;

    if (pool.users === undefined) {
      answer = false;
    } else {
      const keys = Object.keys(pool.users);
      const object = keys.find((k) => k === user.uid);
      if (object === undefined) {
        answer = false;
        this.setState({ isUserFromPool: false });
      } else {
        answer = true;
        this.setState({ isUserFromPool: true });
      }
    }
    return answer;
  };
  renderData = (pool) => {
    if (
      this.state.isLoadingMatchesOfUser === false &&
      this.state.isLoadingOutcomeMatches === false &&
      this.state.isLoadingPool === false
    ) {
      return (
        <Activity title={`${pool.name}`}>
          <Tabs value={this.state.value} onChange={this.handleChange}>
            {/* <Tab label="Hoje" value="a">
              <MatchesOfTheDay users={this.props.users} poolData={this.state.poolData} outcomeMatches={this.state.outcomeMatches} />
            </Tab> */}
            <Tab label="Minhas Apostas" value="a">
              <div>
                <MatchesBuilder
                  pool={pool}
                  user={this.props.location.state.userOfPool}
                  users={this.props.users}
                />
              </div>
            </Tab>
            {this.state.finishedTimeToBet && (
              <Tab label="Classificação" value="b">
                <div>
                  <ClassificationOfPool
                    poolData={this.state.poolData}
                    outcomeMatches={this.state.outcomeMatches}
                    users={this.props.users}
                  />
                </div>
              </Tab>
            )}
            {this.state.finishedTimeToBet && (
              <Tab label="Meus Pontos" value="c">
                <div>
                  <ClassificationOfUser
                    user={this.props.auth}
                    matchesOfUser={this.state.matchesOfUser}
                    outcomeMatches={this.state.outcomeMatches}
                  />
                </div>
              </Tab>
            )}
          </Tabs>
        </Activity>
      );
    } else {
      return (
        <div>
          <Activity title={`${pool.name}`}>
            <Loader />
          </Activity>
        </div>
      );
    }
  };
  renderPool = (pool) => {
    return <Pool pool={pool} user={this.props.auth} />;
  };

  render() {
    const pool = this.props.location.state.pool;

    if (this.state.isUserFromPool) {
      if (pool !== undefined) {
        return this.renderData(pool);
      } else {
        return (
          <Activity>
            <h1>Erro</h1>
          </Activity>
        );
      }
    } else {
      return (
        <Activity title={`${pool.name}`}>
          <h1>Tu num é do grupo. Pede pra alguem te adicionar ou vaza!!!!</h1>
        </Activity>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    auth,
    browser,
    users: lists.users,
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(PoolDetails))))
);
