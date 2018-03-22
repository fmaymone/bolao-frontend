import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import { connect } from 'react-redux';
import Team from "./Team";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-flexbox-grid';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from 'rmw-shell'
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions';
import BetForm from '../../components/Forms/BetForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import { change, submit } from 'redux-form';
import isGranted from 'rmw-shell/lib/utils/auth';

const path = '/bets/';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      away_team: "0",
      home_team: "0",
      away_score: "0",
      home_score: "0"
    };

  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      game,
      submit,
      muiTheme,
      isGranted,
      firebaseApp,
      auth
    } = this.props;

    
    const uid = auth.uid+'/'+game.name;
    if (auth) {
      return (
          <FireForm
            form={'bet-' + this.props.game.name} 
            firebaseApp={firebaseApp}
            name={this.props.game.name}
            path={path}
            validate={this.validate}
            onSubmitSuccess={(values) => { history.push('/test'); }}
            onDelete={(values) => { history.push('/test'); }}
            uid={uid}>
            <BetForm />
          </FireForm>
      )
    } else {
      return (<h1>Carregando</h1>)
    }
  }
}

const styles = {
  matchContainer: {

    flexDirection: 'column',
    backgroundColor: "green"

  },

};

const mapStateToProps = (state) => {
  const { intl, dialogs, auth } = state;

  return {
    intl,
    dialogs,
    auth,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen, change, submit }
)(injectIntl(withRouter(withFirebase(muiThemeable()(Match)))));

Match.propTypes = {
  // name: PropTypes.string,
  // code: PropTypes.string,
  // home: PropTypes.boolean
};
