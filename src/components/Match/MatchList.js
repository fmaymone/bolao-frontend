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
import BetForm from '../../components/Forms/BetForm';
import firebase from 'firebase';
import { change, submit } from 'redux-form';
import Match from './Match'

const path = '/bets/';
const form_name = 'bets';

class MatchList extends Component {




    matches = [
        {
            name: 1,
            type: "group",
            home_team: 1,
            away_team: 2,
            home_result: null,
            away_result: null,
            date: "2018-06-14T18:00:00+03:00",
            stadium: 1,
            channels: [],
            finished: false
        },
        {
            name: 2,
            type: "group",
            home_team: 3,
            away_team: 4,
            home_result: null,
            away_result: null,
            date: "2018-06-15T17:00:00+05:00",
            stadium: 12,
            channels: [],
            finished: false
        }]



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
        if (uid) {
            return (
                <Activity
                    containerStyle={styles.matchesContainer}
                    title={intl.formatMessage({ id: 'bets' })}>
                    <Scrollbar>
                        <List>
                            {this.matches.map(match => (
                                <div key={match.name}>
                                    
                                        <Match game={match} />
                                    
                                </div>
                            ))}
                        </List>
                    </Scrollbar>

                </Activity>

            )
        } else {
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
)(injectIntl(muiThemeable()(withRouter(withFirebase(MatchList)))))


const styles = {
    matchesContainer: {
        overflow: 'hidden', display: 'flex', left: 20
    }
}