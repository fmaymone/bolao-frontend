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
            isLoadingAllPools: true,
            isLoadingUserPools: true,
            noPools: true
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
                    isLoadingAllPools: false,
                    noPools: false
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
                    if(snapshot.val() === null){
                        this.setState({
                           noPools: true,
                           isLoadingUserPools: false
                        });
                    }else{
                    this.setState({
                        userPools: Object.keys(snapshot.val()),
                        isLoadingUserPools: false
                    });
                }
                });
        }

    }

    render() {
        const { intl } = this.props;

        if (this.state.isLoadingAllPools === false && this.state.isLoadingUserPools === false && this.props.auth.uid !== undefined) {
            if (this.state.noPools) {
                return (
                    <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                        <h2>Você não se cadastrou em nenhum Grupo ainda!</h2>
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
            
        } else {
            return (
                <Activity title={intl.formatMessage({ id: 'my_pools' })}>
                    <Loader />
                </Activity>
            )
            
        }
    }
}

const mapStateToProps = state => {
    const { auth, browser, lists } = state;

    return {
        
        auth,
        browser,


    };
};

export default connect(mapStateToProps)(
    injectIntl(muiThemeable()(withRouter(withFirebase(MyPools))))
);

