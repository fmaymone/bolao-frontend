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
import {addUserToPool, addUserPools} from '../../store/actions/bolaoActions'

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
    stepIndex: 0,
    value: '',
    errorText: '',
    canGo: false
  };

  handleChange = (event) => {
    
    this.setState({
      value: event.target.value,
    });
    if (event.target.value.match(this.props.pool.secret_word)) {
      this.setState({ errorText: '' , canGo: true})
    } else {
      this.setState({ errorText: 'Palava-Chave Incorreta' })
    }
  };
  dummyAsync = cb => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = async () => {
    const { stepIndex } = this.state;
    if (stepIndex === 2){
      console.log('oi');
      await this.props.addUserToPool(this.props.auth.uid, this.props.pool.key);
      await this.props.addUserPools(this.props.auth.uid, this.props.pool.key);
      await this.props.handleSetUserFromPool(true);

    }
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

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            Ingresse nesse Grupo. Para conseguir entrar você tem que saber a palavra-chave que você recebeu no seu convite para participar. 
          </p>
        );
      case 1:
        return (
          <div>
            <TextField
              id="text-field-controlled"
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
              style={{ marginTop: 0 }}
              floatingLabelText="Digite a palavra-chave do Grupo"
              errorText= {this.state.errorText}
            />
            <p>
              Ao receber o convite para esse Grupo, foi enviado também uma palavra-chave secreta. Digite-a para poder ingressar. 
            </p>
          
          </div>
        );
      case 2:
        return (
          <p>
           Você acertou a palavra-secreta do Grupo <b> {this.props.pool.name}. </b> Aperte o botão <b>iniciar</b> pra entrar e começar as suas Apostas. 
          </p>
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  renderContent = () => {
    const { finished, stepIndex, canGo} = this.state;
    const contentStyle = { margin: "0 16px", overflow: "hidden" };
    let disabledButton = false;
    if(stepIndex === 1 && canGo === false){
      disabledButton = true;
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
            disabled={disabledButton}
            label={stepIndex === 2 ? "Iniciar" : "Próximo"}
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

export default connect(mapStateToProps,{addUserPools, addUserToPool}  )(
  injectIntl(muiThemeable()(withRouter(withFirebase(PoolStepper))))
);
