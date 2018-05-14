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

class PoolsDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <PoolList pools={this.props.pools} history={this.props.history} />  )
    }
}
 
const mapStateToProps = state => {
    const { auth, browser, lists, history } = state;

    return {
        pools: lists.pools,
        auth,
        browser,
        history
    };
};

export default connect(mapStateToProps)(
    injectIntl(muiThemeable()(withRouter(withFirebase(PoolsDashBoard))))
);