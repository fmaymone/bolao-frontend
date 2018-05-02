import React, { Component } from 'react';
import { Activity } from 'rmw-shell';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { withFirebase } from 'firekit-provider';
import Pool from '../../components/Pool/Pool';

class PoolDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    renderPool = (pool) => {
       
        return (<Activity title='Pool'>
            <Pool pool={pool} />
        </Activity>)
    }
    render() {
        const { pools, match } = this.props;

        const pool = pools.find(k => k.key === match.params.uid);
        if (pool !== undefined) {
            return this.renderPool(pool);
        } else {
            return (
                <Activity>
                    <h1>Loading</h1>
                </Activity>)

        }

    }
}

const mapStateToProps = state => {
    const { auth, browser, lists } = state;

    return {
        pools: lists.pools,
        auth,
        browser

    };
};

export default connect(mapStateToProps)(
    injectIntl(muiThemeable()(withRouter(withFirebase(PoolDetails))))
);