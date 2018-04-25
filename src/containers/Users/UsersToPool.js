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
import { addUserToPool } from '../../store/actions/bolaoActions'

class UsersToPool extends Component {
  componentDidMount() {
    const { watchList, firebaseApp } = this.props;

    let ref = firebaseApp
      .database()
      .ref("users")
      .limitToFirst(20);

    watchList(ref);
  }

  handleAddUserToPool = (user) =>{
    this.props.addUserToPool( user, this.props.pool);
  }

  renderList = (users) => {
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
            onClick={ () => this.handleAddUserToPool(user.val.uid)}
               //this.props.addUserToPool(this.props.pool, user.val.userId);
            
          />
          <Divider inset />
        </div>
      );
    });
  }

  render() {
    const { intl, users, muiTheme, history, isGranted } = this.props;

    return (
      
        
        <Scrollbar>
            <h1>{this.props.title}</h1>
          <div
            style={{
              overflow: "none",
              backgroundColor: muiTheme.palette.convasColor
            }}
          >
            <List
              id="test"
              style={{ height: "100%" }}
              ref={field => {
                this.list = field;
              }}
            >
              {this.renderList(users)}
            </List>
          </div>
        </Scrollbar>
        
      
    );
  }
}

UsersToPoolToPool.propTypes = {
  users: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {
    users: lists.users,
    auth,
    browser,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(mapStateToProps, {addUserToPool})(
  injectIntl(muiThemeable()(withRouter(withFirebase(UsersToPool))))
);
