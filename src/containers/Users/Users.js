import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { Activity } from "rmw-shell";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import { withFirebase } from "firekit-provider";
import isGranted from "rmw-shell/lib/utils/auth";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import BounceLoader from "react-spinners";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools,
} from "../../store/actions/bolaoActions";

class Users extends Component {
  componentDidMount() {
    const { watchList, firebaseApp } = this.props;

    let ref = firebaseApp.database().ref("users");

    watchList(ref);
  }

  getUserData = async (uid) => {
    return this.props.fetchUserData(uid);
  };

  renderList = (users) => {
    const { history } = this.props;

    if (users === undefined) {
      return <div />;
    }

    return users.map((user, index) => {
      if (user === undefined) {
        return <div></div>;
      } else {
        return (
          <div key={index}>
            <ListItem
              leftAvatar={
                <Avatar
                  src={user.val.photoURL}
                  alt="bussines"
                  icon={
                    <FontIcon className="material-icons">business</FontIcon>
                  }
                />
              }
              key={index}
              primaryText={user.val.displayName}
              id={index}
              //secondaryText={user.val.full_name}
              onClick={() => this.props.handleClick(user, this.props.mode)}
            />
            <Divider inset />
          </div>
        );
      }
    });
  };

  render() {
    const { intl, users, muiTheme, history, isGranted } = this.props;

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div
          style={{
            overflow: "none",
            backgroundColor: muiTheme.palette.convasColor,
          }}
        >
          <List
            id="test"
            style={{ height: "100%" }}
            ref={(field) => {
              this.list = field;
            }}
          >
            {this.renderList(users)}
          </List>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    auth,
    browser,
    isGranted: (grant) => isGranted(state, grant),
  };
};

export default connect(mapStateToProps, {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools,
})(injectIntl(muiThemeable()(withRouter(withFirebase(Users)))));
