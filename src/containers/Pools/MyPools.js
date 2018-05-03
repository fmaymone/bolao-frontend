import React, { Component } from 'react';
import { Activity } from 'rmw-shell';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { withFirebase } from 'firekit-provider';
import Pool from '../../components/Pool/Pool';
import PoolList from '../../components/Pool/PoolList';

class MyPools extends Component {

    render() {
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

