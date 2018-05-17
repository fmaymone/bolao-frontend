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
    this.state = { isUserFromPool: false };
  }
  componentDidMount() {
    this.isUserFromPool(this.props.location.state.userOfPool, this.props.location.state.pool);
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
          <Tab label="Usuários do Pool" value="b">
            <div>
              <UsersOfPool />
            </div>
          </Tab>
          <Tab label="Classificação" value="c">
            <div>
              <h2 style={styles.headline}>Classificacao</h2>
              <p>Classificação</p>
            </div>
          </Tab>
        </Tabs>
      </Activity>
    );
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
