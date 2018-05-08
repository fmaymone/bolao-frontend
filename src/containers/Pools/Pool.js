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
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import { withFirebase } from "firekit-provider";
import FireForm from "fireform";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import Users from "../Users/Users";
import UserBuilder from "../Users/UserBuilder";
import { Container, Row, Col } from "react-grid-system";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
} from "../../store/actions/bolaoActions";

const path = "/pools/";
const form_name = "pool";

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
}

class Pool extends Component {
  constructor(props) {
    super(props);

  }
  validate = values => {
    const { intl } = this.props;
    const errors = {};

    errors.name = !values.name
      ? intl.formatMessage({ id: "error_required_field" })
      : "";
    return errors;
  };

  handleUpdateValues = values => {
    const { auth, match } = this.props;

    return {
      userName: auth.displayName,
      userPhotoURL: match.params.uid,
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

    return {
      created: firebase.database.ServerValue.TIMESTAMP,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
      ...values
    };
  };

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
      auth,
      id
    } = this.props;

    const uid = match.params.uid;

    let canAddUsers = false;
    if (this.props.match.path === "/pools/edit/:uid") {
      canAddUsers = true;
    }

    // filteredUsers = allUsersObjects.filter(
    //   u => usersObjects.indexOf(u) === -1
    // );


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

    const addUsers = canAddUsers ? (
      <div>
        <RaisedButton
          onClick={() => { history.push(`/pools/edit/users/${uid}`) }}
          label="Gerenciar Usuários do Pool"
          primary={true}
          style={{ margin: 12, marginLeft: 0 }}
        />
      </div>
    ) : (
        <div />
      );

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
        <Container style={styles.container}>
          <Row>
            <Col sm={8}>
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
            </Col>
            <Col sm={4}>{addUsers}</Col>
          </Row>

          <Dialog
            title={intl.formatMessage({ id: "delete_pool_title" })}
            actions={actions}
            modal={false}
            open={dialogs.delete_pool === true}
            onRequestClose={this.handleClose}
          >
            {intl.formatMessage({ id: "delete_pool_message" })}
          </Dialog>
        </Container>
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
  const { intl, dialogs, auth } = state;

  return {
    intl,
    dialogs,
    auth,
    isGranted: grant => isGranted(state, grant)

  };
};

export default connect(mapStateToProps, {
  setDialogIsOpen,
  change,
  submit,
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
})(injectIntl(withRouter(withFirebase(muiThemeable()(Pool)))));
