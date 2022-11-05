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
import { green500, red500 } from 'material-ui/styles/colors';

import { addUserToPool, fetchUserData, removeUserOfPool, addUserPools, removeUserPools } from "../../store/actions/bolaoActions";

class UserList extends Component {

    isUserFromPool = (id) => {

        if (this.props.usersOfPool.find(k => k === id)) {
            return true;
        } else {
            return false;
        }
    }

    compare = (a, b) =>{
        if(this.isUserFromPool(a.uid) && !this.isUserFromPool(b.uid)){
            return -1
        }
        if(!this.isUserFromPool(a.uid) && this.isUserFromPool(b.uid)){
            return 1
        }
        return 0;
    }

    renderListWithUsersObjects = users => {

        if (users === undefined) {
            return <div />;
        }

        if (users.length === 0) {
            return <ListItem primaryText='Nenhum Usuário Adicionado' />
        }

        users.sort(this.compare);


        return users.map((user, index) => {
            //console.log(user);
            let isUserFromPool = this.isUserFromPool(user.uid);
            let iconAddOrRemove;
            let mode = 'delete';
            let secondaryText = 'Não pertence ao Pool'
            
            if(isUserFromPool){
                iconAddOrRemove = <div><FontIcon className="material-icons" color={red500}>remove_circle</FontIcon></div>
                mode = 'delete';
                secondaryText = 'Já Adicionado'

            }else{
                iconAddOrRemove = <FontIcon className="material-icons" color={green500}>add_circle</FontIcon>
                mode = 'add'
            }

            

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
                        primaryText={user.displayName + " / " + user.email}
                        id={index}
                        rightIcon={iconAddOrRemove}
                        secondaryText={secondaryText}
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
            <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            <List
                id="test"
                style={{ height: "100%" }}
                ref={field => {
                    this.list = field;
                }}
            >
                {this.renderListWithUsersObjects(users)}
            </List>
            </div>

        )
    }
}

export default UserList;