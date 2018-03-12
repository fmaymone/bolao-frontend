import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { injectIntl } from 'react-intl'
import { Activity } from 'rmw-shell'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
import FlatButton from "material-ui/FlatButton";

class MatchList extends Component {

    componentWillMount() {
        const { watchList, firebaseApp } = this.props

    }

    handleInsertBet = data => {


        this.props.firebaseApp
            .database()
            .ref("bets/" + this.props.auth.uid)
            .set({
                data
            });
    };
    handleGetBets = data => {


        this.props.firebaseApp
            .database()
            .ref("bets/" + this.props.auth.uid)
            .set({
                data
            });
    };

    data = {
        matches: [
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
            },
            {
                name: 17,
                type: "group",
                home_team: 1,
                away_team: 3,
                home_result: null,
                away_result: null,
                date: "2018-06-19T21:00:00+03:00",
                stadium: 3,
                channels: [],
                finished: false
            },
            {
                name: 18,
                type: "group",
                home_team: 4,
                away_team: 2,
                home_result: null,
                away_result: null,
                date: "2018-06-20T18:00:00+03:00",
                stadium: 10,
                channels: [],
                finished: false
            },
            {
                name: 33,
                type: "group",
                home_team: 4,
                away_team: 1,
                home_result: null,
                away_result: null,
                date: "2018-06-25T18:00:00+04:00",
                stadium: 7,
                channels: [],
                finished: false
            },
            {
                name: 34,
                type: "group",
                home_team: 2,
                away_team: 3,
                home_result: null,
                away_result: null,
                date: "2018-06-25T17:00:00+03:00",
                stadium: 8,
                channels: [],
                finished: false
            }
        ]
    }
    componentDidMount() {
        const { watchList, firebaseApp } = this.props

        let ref = firebaseApp.database().ref('bets').limitToFirst(20)

        watchList(ref)
    }
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { intl, firebaseApp, companies, muiTheme, history, isGranted, auth } = this.props

        let ref = firebaseApp.database().ref('bets' + this.props.auth.uid).limitToFirst(20)
        ref.on('value', function (snapshot) {
           console.log(snapshot.val())
        });
        return (
            <Activity
                //isLoading={companies === undefined}
                containerStyle={{ overflow: 'hidden' }}
                title={intl.formatMessage({ id: 'bets' })}>
                <h1>Olar</h1>
                <FlatButton
                    label={'Oi'}
                    secondary={true}
                    onClick={() => this.handleInsertBet(this.data)}
                />
            </Activity>
        )
    }
}
const mapStateToProps = (state) => {
    const { auth, browser } = state

    return {

        auth,
        browser,
        isGranted: grant => isGranted(state, grant)
    }
}

export default connect(
    mapStateToProps
)(injectIntl(muiThemeable()(withRouter(withFirebase(MatchList)))))