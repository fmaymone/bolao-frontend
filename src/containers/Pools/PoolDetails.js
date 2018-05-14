import { withFirebase } from 'firekit-provider';
import { Tab, Tabs } from 'material-ui/Tabs';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Activity } from 'rmw-shell';
import Pool from '../../components/Pool/Pool';
import MatchesBuilder from '../Matches/MatchesBuilder';
import UsersOfPool from './UsersOfPool';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };

class PoolDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderData = (pool) => {
        return(
        <Activity title = {`${pool.val.name}`}
    
        >
            {/* <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                {this.renderPool(pool)}
            </div> */}
             
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        tabTemplateStyle={'backgroundColor : #fff'}
      >
        <Tab label="Minhas Apostas" value="a"  >
          <div>
          <MatchesBuilder pool={pool} user={this.props.location.state.userOfPool} />
          </div>
        </Tab>
        <Tab label="Usuários do Pool" value="b"  >
          <div>
            <UsersOfPool />
          </div>
        </Tab>
        <Tab label="Classificação" value="c" >
          <div>
            <h2 style={styles.headline}>Classificacao</h2>
            <p>
             Classificação
            </p>
          </div>
        </Tab>
      </Tabs>
        </Activity>
        )
    }
    renderPool = (pool) => {
        return <Pool pool={pool} user={this.props.auth} />
    }

    
    render() {
        const { pools, match } = this.props;
        const user = this.props.location.state.userOfPool;
        if (pools === undefined) {
            return <div />;
        }
        const pool = pools.find(k => k.key === match.params.uid);
        if (pool !== undefined) {
            return this.renderData(pool);
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