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
import RaisedButton from "material-ui/RaisedButton";
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
import FontIcon from 'material-ui/FontIcon';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
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
      allUsers: [],
      usersOfPool: [],
      isLoadingPool: true,
      isLoadingUsers: true,
      bla: false

    };
  }
  componentDidMount() {
    this.fetchPoolData(this.props.match.params.uid);
    this.fetchUsersData();
    //this.updateUsersOfPool();

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
  fetchPoolData = async (id) => {

    const { history, match, firebaseApp } = this.props;


    await firebaseApp
      .database()
      .ref(`/pools/${id}`)
      .once("value")
      .then(snapshot => {
        this.setState({
          pool: snapshot.val(),
          usersOfPool: snapshot.val().users,
          isLoadingPool: false
        });
      });
  };

  fetchUsersData = async () => {

    const { firebaseApp } = this.props;


    await firebaseApp
      .database()
      .ref(`/users/`)
      .once("value")
      .then(snapshot => {
        this.setState({
          users: this.snapshotToArray(snapshot),
          isLoadingUsers: false
        });
      });
    this.setState({ bla: true });
  };

  fetchUsersOfPoolData = async () => {
    let usersObjectsOfPool = [];
    //console.log(this.state.allUsers);
  }

  handleClick = async (user, mode) => {
    const uid = this.props.match.params.uid;
    if (mode === "add") {
      await this.addUserToPool(user, uid);
    } else {
      await this.removeUserOfPool(user, uid);
    }
    this.fetchPoolData(this.props.match.params.uid);
  };

  addUserToPool = async (user, pool) => {
    await this.props.addUserToPool(user, pool);
    await this.props.addUserPools(user, pool);
  };
  removeUserOfPool = async (user, pool) => {
    await this.props.removeUserOfPool(user, pool);
    await this.props.removeUserPools(user, pool);
  };


  

  render() {
    const { intl, history, muiTheme } = this.props;

    const menuList = [
      {
       
        text: intl.formatMessage({ id: 'pool_back' }),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        onClick: () => { history.goBack() }
      }
    ]

    let keysFromUsersFromPool;


    if (this.state.isLoadingPool && this.state.isLoadingUsers) {
      return <Loader />
    } else {
      //console.log('oi');
      this.state.pool.users === undefined ? keysFromUsersFromPool = [] : keysFromUsersFromPool = Object.keys(this.state.pool.users);
      return (
        <Activity title={this.state.pool.name}>
         <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
        
          
            <UserList usersOfPool={keysFromUsersFromPool} users={this.state.users} handleClick={this.handleClick} mode='delete' />
          
          <RaisedButton
            onClick={() => { history.goBack() }}
            label="Retornar ao Pool"
            primary={true}
            style={{ margin: 12, marginLeft: 0 }}
          />
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
