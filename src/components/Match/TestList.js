import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { injectIntl } from 'react-intl'
import { Activity } from 'rmw-shell'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
import FlatButton from "material-ui/FlatButton";
import FireForm from 'fireform'
import TestForm from '../../components/Forms/TestForm';
import firebase from 'firebase';
import { change, submit } from 'redux-form';

const path = '/bets/';
const form_name = 'bets';

class TestList extends Component {
   
   
    handleCreateValues = (values) => {

        const { auth } = this.props;
        console.log('handleCreateValues')
        return {
          created: firebase.database.ServerValue.TIMESTAMP,
          completed: false,
          ...values
        }
      }
 
    handleUpdateValues = (values) => {

        return {
          updated: firebase.database.ServerValue.TIMESTAMP,
          ...values
        }
      }

    handleChange = () => {

        console.log('Mudou o Form')
        submit('bets')
    }

    constructor(props) {
        super(props);
        this.state = {}
    }
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
            firebaseApp
          } = this.props;
        const uid = this.props.auth.uid;
        if(uid){
        return (
            <Activity>
                <FireForm
                    firebaseApp={firebaseApp}
                    name={'bets'}
                    
                    path={`${path}`}
                    //validate={this.validate}
                    handleChange={this.handleChange}
                    handleCreateValues={this.handleCreateValues}
                    onSubmitSuccess={(values) => { history.push('/test'); }}
                    onDelete={(values) => { history.push('/bets'); }}
                    uid={uid+'/1'}

                >
                    <TestForm />
                </FireForm>
                


            </Activity>

        )
    }else{
        return 'Oi'
    }
    }
}
const mapStateToProps = (state) => {
    const { auth, browser, lists } = state

    return {
        auth,
        browser,
        isGranted: grant => isGranted(state, grant)
    }
}

export default connect(
    mapStateToProps, { change, submit }
)(injectIntl(muiThemeable()(withRouter(withFirebase(TestList)))))