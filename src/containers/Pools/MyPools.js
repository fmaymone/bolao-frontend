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
import Loader from '../../components/UI/Loader'
import FontIcon from 'material-ui/FontIcon'

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class MyPools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPools: [],
            userPools: [],
            isLoading: true,
        };
    }


    componentDidMount() {
        this.fetchPoolData();
        this.fecthUsersOfPooldata();

    }
    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    };

    fetchPoolData = async (id) => {

        const { auth, firebaseApp } = this.props;
        console.log(auth);

        await firebaseApp
            .database()
            .ref(`/pools/`)
            .once("value")
            .then(snapshot => {
                this.setState({
                    allPools: this.snapshotToArray(snapshot),
                });
            });
    };
    fecthUsersOfPooldata = async () => {

        const { auth, firebaseApp } = this.props;
        console.log(auth);
        if (auth.uid !== undefined) {
            await firebaseApp
                .database()
                .ref(`/users/${auth.uid}/pools`)
                .once("value")
                .then(snapshot => {
                    this.setState({
                        userPools: Object.keys(snapshot.val()),
                        isLoading: false
                    });
                });
        }

    }

    render() {
        const { pools, intl } = this.props;

        if (this.state.isLoading) {
            return (
                <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                    <Loader />
                </Activity>
            )
        } else {
            if (pools === undefined) {
                return (
                    <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                        <h2>Você não se cadastrou em nenhum Pool ainda!</h2>
                    </Activity>
                )
            }
            return (
                <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                    <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                        <PoolList filterPools={this.state.userPools} pools={this.state.allPools} history={this.props.history} user={this.props.auth} />
                    </div>
                </Activity>
            )
        }
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

