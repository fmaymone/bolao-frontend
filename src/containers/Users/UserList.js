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
import { addUserToPool, fetchUserData, removeUserOfPool, addUserPools, removeUserPools } from "../../store/actions/bolaoActions";

class UserList extends Component {
    renderList = users => {

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
                     onClick={() => this.props.handleClick(user.key,this.props.mode)}
                    //this.props.addUserToPool(this.props.pool, user.val.userId);
                    />
                    <Divider inset />
                </div>
            );
        });
    };
    render() {
        const { users } = this.props;
        return (<List
            id="test"
            style={{ height: "100%" }}
            ref={field => {
                this.list = field;
            }}
        >
            {this.renderList(users)}
        </List>
        )
    }
}
export default UserList;