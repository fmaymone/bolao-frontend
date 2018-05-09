import React, { Component } from "react";
import Loader from '../../components/UI/Loader';
import firebase from 'firebase';
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import FontIcon from "material-ui/FontIcon";
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true
    };
  }
  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const {  userKey } = this.props;

    await firebase
      .database()
      .ref(`/users/${userKey}`)
      .once("value")
      .then(snapshot => {
        this.setState({
          user: snapshot.val(),
          isLoading: false
        });
      });
  };

  render() {
    if (this.state.isLoading){
        return <Loader />
    }else{
        return(
        <div key={this.state.user.uid}>
            <ListItem
              leftAvatar={
                <Avatar
                  src={this.state.user.photoURL}
                  alt="bussines"
                  icon={
                    <FontIcon className="material-icons">business</FontIcon>
                  }
                />
              }
              
              primaryText={this.state.user.displayName}
              //id={index}
              //secondaryText={user.val.full_name}
              onClick={() => this.props.handleClick(this.state.user.uid, this.props.mode)}
              //this.props.addUserToPool(this.props.pool, user.val.userId);
            />
            <Divider inset />
          </div>
        )
       
    }
  }
}

export default User;
