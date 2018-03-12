import React, { Component } from "react";
import { Activity } from "rmw-shell";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import FireForm from "fireform";
import Dialog from "material-ui/Dialog";
import BetForm from "../../components/Forms/BetForm";
import FlatButton from "material-ui/FlatButton";

const path = "/bets/";
const form_name = "bet";
const historyBase = "bet";
const historyBasePlural = "bets";

class BetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  handleInsertBet = matchId => {


    this.props.firebaseApp
      .database()
      .ref("bets/" + this.props.auth.uid + matchId)
      .set({
        username: "name",
        email: "emailasdasd",
        profile_picture: "imageUrlasdasdasd"
      });
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
      auth
    } = this.props;
    const uid = match.params.uid;
    
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
    return (
      <Activity>
        <div style={{ margin: 15, display: "flex" }}>
          <FlatButton
            label={'Oi'}
            secondary={true}
            onClick={() => this.handleInsertBet(1)}
          />
          {/* <FireForm
            firebaseApp={firebaseApp}
            name={historyBase}
            path={`${path}`}
            validate={this.validate}
            onSubmitSuccess={values => {
              history.push(historyBasePlural);
            }}
            onDelete={values => {
              history.push(historyBasePlural);
            }}
            uid={match.params.uid}
          >
            <BetForm />
          </FireForm> */}
        </div>
        {/* <Dialog
          title={intl.formatMessage({ id: "delete_company_title" })}
          actions={actions}
          modal={false}
         // open={dialogs.delete_company === true}
          onRequestClose={this.handleClose}
        >
          {intl.formatMessage({ id: "delete_company_message" })}
        </Dialog> */}
      </Activity>
    );
  }
}

const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {
    companies: lists.companies,
    auth,
    browser
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(BetsList))))
);
