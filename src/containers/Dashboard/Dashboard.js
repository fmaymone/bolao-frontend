import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { injectIntl, intlShape } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Activity } from 'rmw-shell'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Line, Bar } from 'react-chartjs-2'
import { withFirebase } from 'firekit-provider'
import PoolStepper from '../Pools/PoolStepper';
import PoolList from '../../components/Pool/PoolList'
import Pool from '../Pools/Pool';
import { withRouter } from 'react-router-dom'



class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      allPools: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPoolData();
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
          isLoading: false
        });
      });
  };


  render() {

    const { intl, history } = this.props;
    if(this.state.isLoading){
      return <h1>Carregando</h1>
    }else{
    return (
      <Activity
        title={intl.formatMessage({ id: 'dashboard' })} >
        <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          <PoolList pools={this.state.allPools} history={this.props.history} user={this.props.auth} />
        </div>
        <br />
      </Activity >
    )
  }
  }
}

Dashboard.propTypes = {
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => {
  const {  auth } = state

  return {
    auth
  };
}

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withRouter(withFirebase(Dashboard)))))
