import React, { Component } from "react";
import { Card, CardHeader } from "material-ui/Card";

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

class TopScorer extends Component {
  

  render() {
    const { name, goals,  intl, points, group } = this.props;
    return (
      <Card>
        <CardHeader
          title={intl.formatMessage({ id: group })}
          subtitle={`Pontos: ${points}`}
        />
        <div style={styles.wrapper}>
        <p>{`Nome: ${name} | Gols: ${goals}`}</p>
        </div>
      </Card>
    );
  }
}

export default injectIntl(TopScorer);
