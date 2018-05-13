import React, { Component } from 'react';
import { Activity } from 'rmw-shell';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { withFirebase } from 'firekit-provider';
import Pool from '../../components/Pool/Pool';
import PoolList from '../../components/Pool/PoolList';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class MyPools extends Component {

    componentDidMount() {
        const { watchList, firebaseApp, auth } = this.props;

        let ref = firebaseApp
            .database()
            .ref(`pools`);

        let ref2 = firebaseApp
            .database()
            .ref(`users/${auth.uid}/pools`);

        watchList(ref2, 'poolsOfUser');
    }

    render() {
        const { pools, intl } = this.props;
        if (pools === undefined) {
            return (
                <Activity>
                    <Paper style={style} zDepth={4} circle={true} />
                </Activity>
            )
        }
        return (
            <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    <PoolList poolsOfUser={this.props.poolsOfUser} pools={this.props.pools} history={this.props.history} user={this.props.auth} />
                </div>
            </Activity>
        )
    }
}

const mapStateToProps = state => {
    const { auth, browser, lists } = state;

    return {
        pools: lists.pools,
        poolsOfUser: lists.poolsOfUser,
        auth,
        browser,


    };
};

export default connect(mapStateToProps)(
    injectIntl(muiThemeable()(withRouter(withFirebase(MyPools))))
);

