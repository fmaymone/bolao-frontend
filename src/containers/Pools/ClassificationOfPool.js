import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Container, Row, Col } from "react-grid-system";
import Users from "../Users/Users";
import User from "../Users/User";
import { Activity } from "rmw-shell";
import UserList from "../Users/UserList";
import RaisedButton from "material-ui/RaisedButton";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import FontIcon from "material-ui/FontIcon";
import { ResponsiveMenu } from "material-ui-responsive-menu";
import { List, ListItem } from "material-ui/List";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
} from "../../store/actions/bolaoActions";
import Loader from "../../components/UI/Loader";
import { calculatePoints } from "../../store/functions/general";

class ClassificationOfPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pool: {},
      allUsers: [],
      usersOfPool: [],
      isLoadingPool: true,
      isLoadingUsers: true
    };
  }
  componentDidMount() {
    this.fetchPoolData(this.props.match.params.uid);
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

  fetchPoolData = async id => {
    const { history, match, firebaseApp } = this.props;

    await firebaseApp
      .database()
      .ref(`/pools/${id}/users`)
      .once("value")
      .then(snapshot => {
        this.setState({
          pool: this.snapshotToArray(snapshot),
          isLoadingPool: false
        });
      });
  };
  render() {
    const { intl, history, muiTheme, outcomeMatches } = this.props;
    let allUserMatches = [];

    if (this.state.isLoadingPool) {
      return <Loader />;
    } else {
      this.state.pool.map(user => {
        allUserMatches.push(calculatePoints(user.matches, outcomeMatches));
      });
      console.log(allUserMatches);
      return (
        <Activity title={this.state.pool.name}>
          <Scrollbar />
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
export default connect(mapStateToProps, {})(
  injectIntl(withRouter(withFirebase(muiThemeable()(ClassificationOfPool))))
);
