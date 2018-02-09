import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from 'rmw-shell'
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions';
import CompanyForm from '../../components/Forms/CompanyForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import { change, submit } from 'redux-form';
import isGranted from 'rmw-shell/lib/utils/auth';
import firestore from 'firebase/firestore'


const path = '/companies/';
const form_name = 'company';


class Test extends Component {
    state = { 
        bets: ''
     }
    
     componentWillMount() {
      console.log('------------------CONSOLE STATE---') 
      console.log(this.props)
      console.log('------------------CONSOLE STATE---') 
     }

    handleButton = () => {
    
        const { firebaseApp }= this.props
        let firestore=firebaseApp.firestore()
        const docRef=firestore.collection('bets')
        console.log(docRef)

        docRef.add({
            title: 'lindo match'
        })
    }

    getRealTimeUpdates = () =>{

        const { firebaseApp }= this.props
        let firestore=firebaseApp.firestore()
        const docRef=firestore.collection('bets')

        docRef.onSnapshot(function(doc) {
            if(doc && doc.exists){
                console.log("Current bets: ", doc && doc.data());
            }
            
        });


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
    this.getRealTimeUpdates();

    return (
      <Activity>
        <h1>Teste</h1>
        <div style={{ margin: 15, display: 'flex' }}>
            <FlatButton label='botao foda'  onClick={this.handleButton} />
        </div>
      </Activity>
    );
  }
}


const mapStateToProps = (state) => {
  const { intl, dialogs } = state;

  console.log('----------------------state---------------------')
  console.log(state)
  console.log('----------------------state---------------------')

  return {
    intl,
    dialogs,
    isGranted: grant => isGranted(state, grant),

  };
};

export default connect(state => state.worldCupData,
  mapStateToProps, { setDialogIsOpen, change, submit }
)(injectIntl(withRouter(withFirebase(muiThemeable()(Test)))));
