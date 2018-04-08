import React, { Component } from "react";
import TestList from "../../components/Match/TestList";
import GroupsMatchList from "../../components/Match/GroupsMatchList";
import BetForm from "../../components/Forms/BetForm";
import { Activity } from "rmw-shell";
import Classification from '../../components/Match/Classification'
import firebase from "firebase";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";

class ClassificationController extends Component {
  state = {
    matches: {}
  };
  componentDidMount() {
    this.getActualValues();
  }

  getActualValues = async () => {
    const { firebaseApp, auth } = this.props;
    let ref = await firebaseApp.database().ref("/users/" + auth.uid + "/bets/");
    await ref.on("value", dataSnapshot => {
      if (dataSnapshot.val()) {
        console.log(dataSnapshot.val());
        this.setState({ matches: dataSnapshot.val() });
      }
    });
  };

  submit = values => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return (
      
        <GroupsMatchList matches={this.state.matches}/>
      
    );
  }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth } = state;
  
    return {
      intl,
      dialogs,
      auth,

    };
  };
  
  export default connect(mapStateToProps)(injectIntl(withRouter(withFirebase(muiThemeable()(ClassificationController)))));