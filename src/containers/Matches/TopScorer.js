import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { TOP_SCORER } from "../../store/actions/types";
import { updateTopScorer } from "../../store/actions/bolaoActions";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";

class TopScorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOfTopScorer: "",
      goals: 0
    };
  }

  handleChangeNameTopScorer = async event => {
    const { topScorer } = this.props;
    //let value = { ...topScorer, nameOfTopScorer: event.target.value };
    this.setState({nameOfTopScorer:event.target.value});
  };
  handleChangeGoalsTopScorer = async event => {
    const { topScorer } = this.props;
    this.setState({goals:event.target.value});
  };
  saveTopScorer = () => {
    this.props.handleChangeTopScorer(this.state);
  }

  render() {
    console.log(this.props.matches);
    const { topScorer } = this.props;

    return (
      <div>
        <TextField
          id="text-field-controlled"
          value={this.state.nameOfTopScorer}
          floatingLabelText="Nome do Artilheiro"
          onChange={e => this.handleChangeNameTopScorer(e)}
        />
        <br />
        <TextField
          id="text-field-2"
          value={this.state.goals}
          floatingLabelText="Número de Gols"
          onChange={e => this.handleChangeGoalsTopScorer(e)}
        />
        <br />
        <div>
        <RaisedButton
          onClick={() => { this.saveTopScorer() }}
          label="Salvar Artilheiro"
          primary={true}
          style={{ margin: 12, marginLeft: 0 }}
        />
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { intl, dialogs, playerDataReducer, lists } = state;

  return {};
};

export default connect(mapStateToProps, { updateTopScorer })(
  injectIntl(withRouter(withFirebase(TopScorer)))
);
