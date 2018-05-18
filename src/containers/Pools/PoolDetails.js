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
import UsersOfPool from "./UsersOfPool";
import PoolStepper from "./PoolStepper";
import ClassificationOfUser from './ClassificationOfUser';
import Loader from '../../components/UI/Loader';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

class PoolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserFromPool: false,
      isLoadingMatchesOfUser: true,
      isLoadingOutcomeMatches: true,
      outcomeMatches: [],
      matchesOfUser: []
    };
  }
  componentDidMount() {
    this.isUserFromPool(
      this.props.location.state.userOfPool,
      this.props.location.state.pool
    );
    this.fetchOutcome();
    this.fetchMatches();
    console.log(this.state.outcome);
  }
  fetchOutcome = async () => {
    //this is the place where the results will be stored
    const { firebaseApp } = this.props;
    const outcomePoolId = "-LCmgkjj3PpQwwuQvKTA";
    const outcomeUserId = "eyn6bCswRnZ5qIJZ4ZiC98rTe4n2";
    await firebaseApp
      .database()
      .ref(`/pools/${outcomePoolId}/users/${outcomeUserId}/matches`)
      .once("value")
      .then(snapshot => {
        this.setState({
          outcomeMatches: this.snapshotToArray(snapshot),
          isLoadingOutcomeMatches: false
        });
      });
  };
  fetchMatches = async () => {

    const user = this.props.location.state.userOfPool;
    const pool = this.props.location.state.pool;
 
    const { firebaseApp  } = this.props;
    await firebaseApp
      .database()
      .ref(`/pools/${pool.key}/users/${user.uid}/matches`)
      .once("value")
      .then(snapshot => {
        this.setState({
          matchesOfUser: this.snapshotToArray(snapshot),
          isLoadingMatchesOfUser: false
        });
      });
  };
  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }
  handleSetUserFromPool = async param => {
    this.setState({ isUserFromPool: param });
  };

  isUserFromPool = (user, pool) => {
    let answer = true;

    if (pool.users === undefined) {
      answer = false;
    } else {
      const keys = Object.keys(pool.users);
      const object = keys.find(k => k === user.uid);
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
  renderData = pool => {
    if(this.state.isLoadingMatchesOfUser === false && this.state.isLoadingOutcomeMatches === false){

    return (
      <Activity title={`${pool.name}`}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Minhas Apostas" value="a">
            <div>
              <MatchesBuilder
                pool={pool}
                user={this.props.location.state.userOfPool}
              />
            </div>
          </Tab>
          <Tab label="Classificação" value="b">
            <div>
              <UsersOfPool />
            </div>
          </Tab>
          <Tab label="Meus Pontos" value="c">
            <div>
            <ClassificationOfUser user={this.props.auth} matchesOfUser={this.state.matchesOfUser} outcomeMatches={this.state.outcomeMatches}/>
            </div>
          </Tab>
        </Tabs>
      </Activity>
    );
  }
    else{
      return <Loader />
    }
  };
  renderPool = pool => {
    return <Pool pool={pool} user={this.props.auth} />;
  };

  render() {
    const { match, auth, history } = this.props;

    const user = this.props.location.state.userOfPool;
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
          <PoolStepper
            handleSetUserFromPool={this.handleSetUserFromPool}
            pool={pool}
            auth={auth}
            history={history}
          />
        </Activity>
      );
    }
  }
}

const mapStateToProps = state => {
  const { auth, browser } = state;

  return {
    auth,
    browser
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(PoolDetails))))
);
