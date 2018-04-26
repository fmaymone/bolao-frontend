import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Activity } from "rmw-shell";
import { ResponsiveMenu } from "material-ui-responsive-menu";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import PoolForm from "../../components/Forms/PoolForm";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import FontIcon from "material-ui/FontIcon";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import { withFirebase } from "firekit-provider";
import FireForm from "fireform";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import Users from "../Users/Users";
import UserBuilder from "../Users/UserBuilder";

const path = "/pools/";
const form_name = "pool";

class Pool extends Component {
  validate = values => {
    const { intl } = this.props;
    const errors = {};

    errors.name = !values.name
      ? intl.formatMessage({ id: "error_required_field" })
      : "";
    // errors.full_name = !values.full_name ? intl.formatMessage({ id: 'error_required_field' }) : '';
    // errors.vat = !values.vat ? intl.formatMessage({ id: 'error_required_field' }) : '';

    return errors;
  };

  componentDidMount() {
    const { watchList, firebaseApp, match } = this.props;

    let ref = firebaseApp.database().ref(`pools/${match.params.uid}/users`);
    watchList(ref, "usersOfPool");
  }

  handleUpdateValues = values => {
    const { auth } = this.props;

    return {
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      updated: firebase.database.ServerValue.TIMESTAMP,
      ...values
    };
  };

  handleClose = () => {
    const { setDialogIsOpen } = this.props;

    setDialogIsOpen("delete_pool", false);
  };

  handleDelete = () => {
    const { history, match, firebaseApp } = this.props;
    const uid = match.params.uid;

    if (uid) {
      firebaseApp
        .database()
        .ref()
        .child(`${path}${uid}`)
        .remove()
        .then(() => {
          this.handleClose();
          history.goBack();
        });
    }
  };
  handleCreateValues = values => {
    const { auth } = this.props;

    console.log("Passei no handle");

    return {
      created: firebase.database.ServerValue.TIMESTAMP,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
      ...values
    };
  };
  poolFromUsers = () => {};

  render() {
    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      match,
      submit,
      muiTheme,
      isGranted,
      firebaseApp,
      auth
    } = this.props;

    const uid = match.params.uid;

    const usersObjects = [];

    for (let index = 0; index <  this.props.usersOfPool.length; index++) {
      const element = this.props.usersOfPool[index];
      const userObject =  this.props.users.find(k=>k.key===element.key);
      usersObjects.push(userObject.val);
     
    }
   
    
   

    const actions = [
      <FlatButton
        label={intl.formatMessage({ id: "cancel" })}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({ id: "delete" })}
        secondary={true}
        onClick={this.handleDelete}
      />
    ];

    const menuList = [
      {
        hidden:
          (uid === undefined && !isGranted(`create_${form_name}`)) ||
          (uid !== undefined && !isGranted(`edit_${form_name}`)),
        text: intl.formatMessage({ id: "save" }),
        icon: (
          <FontIcon
            className="material-icons"
            color={muiTheme.palette.canvasColor}
          >
            save
          </FontIcon>
        ),
        tooltip: intl.formatMessage({ id: "save" }),
        onClick: () => {
          submit("pool");
        }
      },
      {
        hidden: uid === undefined || !isGranted(`delete_${form_name}`),
        text: intl.formatMessage({ id: "delete" }),
        icon: (
          <FontIcon
            className="material-icons"
            color={muiTheme.palette.canvasColor}
          >
            delete
          </FontIcon>
        ),
        tooltip: intl.formatMessage({ id: "delete" }),
        onClick: () => {
          setDialogIsOpen("delete_pool", true);
        }
      }
    ];

    return (
      <Activity
        iconStyleRight={{ width: "50%" }}
        iconElementRight={
          <div>
            <ResponsiveMenu
              iconMenuColor={muiTheme.palette.canvasColor}
              menuList={menuList}
            />
          </div>
        }
        onBackClick={() => {
          history.goBack();
        }}
        title={intl.formatMessage({
          id: match.params.uid ? "edit_pool" : "create_pool"
        })}
      >
        <div style={{ margin: 15, display: "flex" }}>
          <FireForm
            firebaseApp={firebaseApp}
            name={"pool"}
            path={`${path}`}
            validate={this.validate}
            handleCreateValues={this.handleCreateValues}
            onSubmitSuccess={values => {
              history.push("/pools");
            }}
            onDelete={values => {
              history.push("/pools");
            }}
            uid={match.params.uid}
          >
            <PoolForm />
          </FireForm>
        </div>
        <Dialog
          title={intl.formatMessage({ id: "delete_pool_title" })}
          actions={actions}
          modal={false}
          open={dialogs.delete_pool === true}
          onRequestClose={this.handleClose}
        >
          {intl.formatMessage({ id: "delete_pool_message" })}
        </Dialog>
        <Users title="Usuários do Pool" users={usersObjects} />
        {/* <UserBuilder id={auth.uid} /> */}
      </Activity>
    );
  }
}

Pool.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { intl, dialogs, auth, lists } = state;

  return {
    intl,
    dialogs,
    auth,
    isGranted: grant => isGranted(state, grant),
    usersOfPool: lists.usersOfPool,
    users: lists.users
  };
};

export default connect(mapStateToProps, { setDialogIsOpen, change, submit })(
  injectIntl(withRouter(withFirebase(muiThemeable()(Pool))))
);
