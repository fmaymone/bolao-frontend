import React, { Component } from "react";
import {
  Card,
  CardHeader,
} from "material-ui/Card";

import { injectIntl } from "react-intl";
import TeamClassified from "../Match/TeamClassified";



const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: "auto"
  },
  chip: {
    margin: 4
  },

  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class FinalResult extends Component {
  renderTeams = data => {
    return data.teams.map((team, index) => {
      return <TeamClassified team={team}/>;
    });
  };

  render() {
    const { data, intl, group } = this.props;
    return (
      <Card>
        <CardHeader
          title={intl.formatMessage({ id: group })}
          subtitle={`Pontos: ${data.points}`}
        />
        <div style={styles.wrapper}>{this.renderTeams(data)}</div>
      </Card>
    );
  }
}

export default injectIntl(FinalResult);
