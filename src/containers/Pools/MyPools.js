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
        // const { watchList, firebaseApp } = this.props;

        // let ref = firebaseApp
        //     .database()
        //     .ref("pools");
        // watchList(ref);
    }

    render() {
        const { pools } = this.props;
        if (pools === undefined) {
            return (
                <Activity>
                    <Paper style={style} zDepth={4} circle={true} />;
                </Activity>
            )
        }
        return (
            <Activity>
                <PoolList pools={this.props.pools} history={this.props.history} user={this.props.auth} />
            </Activity>
        )
    }
}

const mapStateToProps = state => {
    const { auth, browser, lists } = state;

    return {
        pools: lists.pools,
        auth,
        browser,


    };
};

export default connect(mapStateToProps)(
    injectIntl(muiThemeable()(withRouter(withFirebase(MyPools))))
);

