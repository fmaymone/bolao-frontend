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
import User from './User';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import { addUserToPool, fetchUserData, removeUserOfPool, addUserPools, removeUserPools } from "../../store/actions/bolaoActions";

class UserList extends Component {

    isUserFromPool = (id) => {

            if (this.props.usersOfPool.find(k => k === id)) {
                return true;
            }else{
                return false;
            }
        }

    renderListWithUsersObjects = users => {

        if (users === undefined) {
            return <div />;
        }

        if (users.length === 0) {
            return <ListItem primaryText='Nenhum Usuário Adicionado' />
        }

        return users.map((user, index) => {
            console.log(user);
            let isUserFromPool = this.isUserFromPool(user.uid);
            let iconAddOrRemove;
            let mode = 'delete';
            isUserFromPool ? 
            iconAddOrRemove = <FontIcon className="material-icons">remove_circle</FontIcon>
            : iconAddOrRemove = <FontIcon className="material-icons">add_circle</FontIcon>

            isUserFromPool ? mode = 'delete' : mode = 'add'
            
            return (
                <div key={index}>
                    <ListItem
                        leftAvatar={
                            <Avatar
                                src={user.photoURL}
                                alt="bussines"
                                icon={<FontIcon className="material-icons">business</FontIcon>}
                            />
                        }
                        key={index}
                        primaryText={user.displayName}
                        id={index}
                        rightIcon={iconAddOrRemove}
                        //secondaryText={user.val.full_name}
                        onClick={() => this.props.handleClick(user.uid, mode)}

                    //this.props.addUserToPool(this.props.pool, user.val.userId);
                    />
                    <Divider inset />
                </div>
            );
        });
    };

    renderListWithUsersKeys = keys => {

        if (keys === undefined) {
            return <div />;
        }

        if (keys.length === 0) {
            return <ListItem primaryText='Nenhum Usuário Adicionado' />
        }

        return keys.map((key) => {
            return (
                <User userKey={key} handleClick={this.props.handleClick} />
            );
        });
    };
    render() {
        const { users, onlyKeys } = this.props;
        return (

            <List
                id="test"
                style={{ height: "100%" }}
                ref={field => {
                    this.list = field;
                }}
            >
                {this.renderListWithUsersObjects(users)}
            </List>

        )
    }
}

export default UserList;