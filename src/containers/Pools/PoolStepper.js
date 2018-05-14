import React, { Component } from "react";
import { Activity } from "rmw-shell";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { withFirebase } from "firekit-provider";
import Pool from "../../components/Pool/Pool";
import PoolList from "../../components/Pool/PoolList";
import Paper from "material-ui/Paper";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import TextField from "material-ui/TextField";

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class PoolStepper extends Component {
  state = {
    loading: false,
    finished: false,
    stepIndex: 0
  };

  dummyAsync = cb => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        })
      );
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex - 1
        })
      );
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            Ingresse nesse Pool. Para conseguir entrar você tem que saber a palavra-chave que você recebeu no seu convite para participar. 
          </p>
        );
      case 1:
        return (
          <div>
            <TextField
              style={{ marginTop: 0 }}
              floatingLabelText="Digite a palavra-chave do Pool"
            />
            <p>
              Ao receber o convite para esse Pool, foi enviado também uma palavra-chave secreta. Digite-a para poder ingressar. 
            </p>
          
          </div>
        );
      case 2:
        return (
          <p>
            Agora que você está no Pool, acesse o menu Lateral "Meus Pools" e faça suas apostas para a Copa. 
          </p>
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  renderContent() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px", overflow: "hidden" };

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              }}
            >
              Click here
            </a>{" "}
            to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label="Voltar"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{ marginRight: 12 }}
          />
          <RaisedButton
            label={stepIndex === 2 ? "Finalizar" : "Próximo"}
            primary={true}
            onClick={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const { loading, stepIndex } = this.state;

    return (
      <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Escolha o Pool pra entrar</StepLabel>
          </Step>
          <Step>
            <StepLabel>Digite a palavra-secreta do Pool</StepLabel>
          </Step>
          <Step>
            <StepLabel>Crie seus jogos</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {};
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(PoolStepper))))
);
