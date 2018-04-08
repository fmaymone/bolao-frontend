import React, { Component } from 'react';
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from '../../components/Match/MatchList'
class MatchesLoader extends Component {
  

    
  

  

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

