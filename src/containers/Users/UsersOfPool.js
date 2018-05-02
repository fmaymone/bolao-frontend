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
import UserList from './UserList'

class UsersOfPool extends Component {




  renderList = users => {
    const { history } = this.props;


    if (users === undefined) {
      return <div />;
    }

    return users.map((user, index) => {
      return (
        <div key={index}>
          <ListItem
            leftAvatar={
              <Avatar
                src={user.val.photoURL}
                alt="bussines"
                icon={<FontIcon className="material-icons">business</FontIcon>}
              />
            }
            key={index}
            primaryText={user.val.displayName}
            id={index}
            //secondaryText={user.val.full_name}
            onClick={() => this.handleClick(user)}
          //this.props.addUserToPool(this.props.pool, user.val.userId);
          />
          <Divider inset />
        </div>
      );
    });
  };

  render() {
    const { intl, users, usersList, muiTheme, history, isGranted } = this.props;

    let usersObjects = [];
    let keys = Object.keys(users);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const object = usersList.find(k => k.key === key);
      usersObjects.push(object);
    }

    return (
      <UserList users={usersObjects} />
    );
  }
}



const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {
    usersList: lists.users,
    auth,
    browser,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(UsersOfPool))))
);
