import React, { Component } from 'react';
import { Activity } from 'rmw-shell';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { withFirebase } from 'firekit-provider';
import Pool from '../../components/Pool/Pool';
import {Tabs, Tab} from 'material-ui/Tabs';
import MatchesBuilder from '../Matches/MatchesBuilder';
import Avatar from 'material-ui/Avatar';
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
        <Tab label="Minhas Apostas" value="a"  style={'backgroundColor : #fff'}>
          <div>
          <MatchesBuilder pool={pool} user={this.props.location.state.userOfPool} />
          </div>
        </Tab>
        <Tab label="Usuários do Pool" value="b"  style={'backgroundColor : #fff'}>
          <div>
            <UsersOfPool />
          </div>
        </Tab>
        <Tab label="Classificação" value="c"  style={'backgroundColor : #fff'}>
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
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