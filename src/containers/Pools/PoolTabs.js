import React, { Component } from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import { injectIntl } from 'react-intl';
import muiThemeable from "material-ui/styles/muiThemeable";
import PoolBasicData from './PoolBasicData';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class PoolTabs extends Component {

  
  
    handleChange = (value) => {
      this.setState({
        value: value,
      });
    };
  
    render() {
    const { intl } = this.props;
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label= {intl.formatMessage({ id: "pool_basic_data" })} value={GROUPS_STAGE}>
            <div>
             <PoolBasicData />
            </div>
          </Tab>
          <Tab label= {intl.formatMessage({ id: "pool_users" })} value={KNOCKOUT_STAGE}>
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
      );
    }
  }

  export default injectIntl(muiThemeable()(PoolTabs))