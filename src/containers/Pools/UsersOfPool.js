import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Container, Row, Col } from "react-grid-system";
import Users from "../Users/Users";
import User from "../Users/User";
import { Activity } from 'rmw-shell';
import UserList from '../Users/UserList';

import { List, ListItem } from "material-ui/List";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
} from "../../store/actions/bolaoActions";
import BounceLoader from "react-spinners";
import Loader from "../../components/UI/Loader";

const style = {
  container: {
    position: "relative"
  },
  refresh: {
    display: "inline-block",
    position: "relative"
  }
};

class UsersOfPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pool: {},
      isLoading: true
    };
  }
  componentDidMount() {
    this.fetchPoolData(this.props.match.params.uid);
  }
  fetchPoolData = async (id) => {

    const { history, match, firebaseApp } = this.props;


    await firebaseApp
      .database()
      .ref(`/pools/${id}`)
      .once("value")
      .then(snapshot => {
        this.setState({
          pool: snapshot.val(),
          isLoading: false
        });
      });
  };


  handleClick = async (user, mode) => {
    const uid = this.props.match.params.uid;
    if (mode === "add") {
      await this.addUserToPool(user, uid);
    } else {
      await this.removeUserOfPool(user, uid);
    }
  };

  addUserToPool = async (user, pool) => {
    await this.props.addUserToPool(user, pool);
    await this.props.addUserPools(user, pool);
  };
  removeUserOfPool = async (user, pool) => {
    await this.props.removeUserOfPool(user, pool);
    await this.props.removeUserPools(user, pool);
  };

  renderListUsersPool = pool => {

    if (pool === null) {
      return <div>Sem usuários</div>;
    } else {
      const users = pool.users;
      if (users === undefined) {
        return <div />;
      }
      let objects = [];
      let keys = Object.keys(users);
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        objects.push(<User userKey={element} handleClick={this.handleClick} mode='delete' />);

      }
      return objects;
    }
  };

  render() {
    const { intl } = this.props;

    if (this.state.isLoading) {
      return <Loader />
    } else {
      return (
        <Activity
        
          containerStyle={{ overflow: 'hidden' }}
          title={intl.formatMessage({ id: 'pool_users' })}>
         <div><h1>Usuarios do Pool</h1></div>
        <List
          id="usersOfPools"
          style={{ height: "100%" }}
          ref={field => {
            this.list = field;
          }}
        >
          {this.renderListUsersPool(this.state.pool)}
        </List>
        <div><h1>Adicionar Usuarios</h1>
          <UserList users={this.props.allUsers} handleClick={this.handleClick} mode='add' />
        </div>
        </Activity>
      );
    }
  }
}

const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {
    allUsers: lists.users
  };
};
export default connect(mapStateToProps, {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
})(injectIntl(withRouter(withFirebase(muiThemeable()(UsersOfPool)))));
