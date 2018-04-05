import React, { Component } from 'react';
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from '../../components/Match/MatchList'
class MatchesLoader extends Component {
    state = {
        matches: ''
    }

    componentDidMount() {
        this.getActualValues();
    }

    getActualValues =  () => {

        const { firebaseApp, auth } = this.props;
        let ref = firebaseApp.database().ref('/users/' + auth.uid + '/bets/').on('value', (dataSnapshot) => {

            if (dataSnapshot.val()) {
                console.log(dataSnapshot.val());
                this.setState({ matches: dataSnapshot.val() })
            }


        });
    }

    render() {
        console.log(this.state);
        if (this.state.matches != '') {
            return (
                <MatchList matches={this.state.matches} />
            )

        } else {
            return ('Carregando');
        }



    }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth, playerDataReducer } = state;

    return {
        intl,
        dialogs,
        auth,
        playerDataReducer: playerDataReducer
    };
};

export default connect(mapStateToProps

)(injectIntl(withRouter(withFirebase(muiThemeable()(MatchesLoader)))));

