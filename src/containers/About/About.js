import React, { Component } from "react";
import { Activity } from "rmw-shell";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
class About extends Component {
  renderPremiacao = () => {
    return (
      <Table displayRowCheckbox={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Posição</TableHeaderColumn>
            <TableHeaderColumn>Valor</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>
              50% do dinheiro arrecadado (Nº Apostadores x R$100,00)
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>
              20% do dinheiro arrecadado (Nº Apostadores x R$100,00)
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>
              15% do dinheiro arrecadado (Nº Apostadores x R$100,00)
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>
              10% do dinheiro arrecadado (Nº Apostadores x R$100,00)
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>5</TableRowColumn>
            <TableRowColumn>
              05% do dinheiro arrecadado (Nº Apostadores x R$100,00)
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  render() {
    return (
      <Activity title={"Regulamento"}>
        <div
          style={{
            margin: 5,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <h1>Taxa de Inscrição: R$ 100,00 por aposta</h1>
          {this.renderPremiacao()}
          <h1>Regulamento</h1>
          <p>
            Cada participante deverá preencher seus jogos com seus palpites
            devidamente preenchidos para até a final. Lembrar que em caso de
            empate em jogos de mata-mata, o jogador deve clicar em cima do time
            que ele julga que se classificará (ou será campeão no caso da final)
            até o dia 13/06/2018, bem como, fazer o pagamento até este mesmo
            dia, em mãos, para um dos representantes da comissão organizadora,
            sem prorrogação. Para aqueles que se encontram morando fora de
            Recife, entrar em contato para realizar o pagamento através de
            depósito bancário.
          </p>
          <p>
            <b>
              Só será válido, para a pontuação, o placar do tempo normal de
              jogo.
            </b>
          </p>
          <p>
            A premiação será paga na primeira semana após a final da Copa. Os
            cinco últimos colocados serão penalizados e pagarão a quantia de R$
            100,00 - R$ 80,00 – R$ 60,00 – R$ 40,00 – R$ 20,00. Sendo R$ 100,00
            para o último colocado, R$ 80,00 para o penúltimo colocado e assim
            sucessivamente. Este dinheiro arrecadado será utilizado para pagar a
            conta da cachaça do final do Bolão onde serão entregues os prêmios
            para os ganhadores.
          </p>
          <p>
            <b>Pontuação (Primeira Fase):</b> <br />Acertando o vencedor: + 3
            pontos <br />Acertando o placar do ganhador: + 1,5 pontos <br />Acertando
            o placar do perdedor: + 1,5 pontos <br />Acertando o empate: + 4
            pontos <br />Acertando o placar do empate: + 2 pontos <br />Acertando
            os times que se classificam em cada grupo: + 4 pontos por time
          </p>
          <br />
          <p>
            <b>Exemplo:</b> Os palpites foram: <br />Apostador A: Brasil 3 x 1 Croácia
            <br />Apostador B: Brasil 2 x 0 Croácia
            <br />Apostador C: Brasil 1 x 1 Croácia
            <br />Apostador D: Brasil 3 x 0 Croácia 
            <br />Apostador E: Brasil 4 x 2 Croácia
            <br /> Apostador F: Brasil 0 x 0 Croácia 
            <br /> Apostador G: Brasil 3 x 4 Croácia  
            <br /> <br />
            Sendo o placar real = Brasil 3 x 0 Croácia, então a pontuação
            ficaria assim: 
            <br />
            <br />Apostador A = (3+1,5) = 4,5 pontos 
            <br />Apostador B = (3+1,5) = 4,5 pontos 
            <br />Apostador C = (0) = 0 pontos 
            <br /> Apostador D = (3+1,5+1,5) = 6 pontos
            <br />Apostador E = (3)
            = 3 pontos 
            
            <br />Apostador F = (0) = 0
            pontos 
           
            <br />Apostador G = (0) = 0 pontos
            <br />
            <br />Se o placar real fosse = Brasil
            0 x 0 Croácia, então a pontuação ficaria assim: 
            <br />
             <br />Apostador A = (0) =
            0 pontos  
            <br />Apostador B = (0) = 0 pontos
            <br />Apostador C = (4) = 4 pontos
            <br />Apostador D = (0) = 0 pontos
            <br />Apostador E = (0) = 0 pontos  
            <br />Apostador F = (4+2) = 6 pontos 
            <br /> Apostador G = (0) = 0 pontos 
            
          </p>
          <p>
          Pontuação (Oitavas-de-final) <br /><br />
Acertando as equipes do jogo: + 6 pontos por time<br />
Acertando o vencedor: + 3 pontos<br />
Acertando o placar do ganhador: + 1,5 pontos<br />
Acertando o placar do perdedor: + 1,5 pontos<br />
Acertando o empate: + 4 pontos<br />
Acertando o placar do empate: + 2 pontos<br />
Acertando os times que se classificam para as Quartas-de-final: + 4 pontos por time<br /><br />

Pontuação (Quartas-de-final)<br /><br />
Acertando as equipes do jogo: + 6 pontos por time<br />
Acertando o vencedor: + 3 pontos<br />
Acertando o placar do ganhador: + 1,5 pontos<br />
Acertando o placar do perdedor: + 1,5 pontos<br />
Acertando o empate: + 4 pontos<br />
Acertando o placar do empate: + 2 pontos<br />
Acertando os times que se classificam para as Semi-finais: + 4 pontos por time<br /><br />

Pontuação (Semi-final)<br /><br />
Acertando as equipes do jogo: + 8 pontos por time<br />
Acertando o vencedor: + 3 pontos<br />
Acertando o placar do ganhador: + 1,5 pontos<br />
Acertando o placar do perdedor: + 1,5 pontos<br />
Acertando o empate: + 4 pontos<br />
Acertando o placar do empate: + 2 pontos<br /><br />

Pontuação (Fase-final)<br /><br />
Acertando as equipes do jogo: + 8 pontos por time<br />
Acertando o vencedor: + 3 pontos<br />
Acertando o placar do ganhador: + 1,5 pontos<br />
Acertando o placar do perdedor: + 1,5 pontos<br />
Acertando o empate: + 4 pontos<br />
Acertando o placar do empate: + 2 pontos<br />
Acertando o Campeão: + 15 pontos<br />
Acertando o Vice-Campeão: + 10 pontos<br />
Acertando o 3º Colocado: + 7 pontos<br />
Acertando o 4º Colocado: + 5 pontos<br />
Acertando o Artilheiro: + 12 pontos<br />
Acertando o número de gols do artilheiro: + 5 pontos<br /><br /><br />

<b>OBS: Ocorrendo mais de um artilheiro, ganhará pontos todo apostador que escolher algum dos artilheiros.</b>
          </p>
        </div>

        <br />
      </Activity>
    );
  }
}

export default About;

// import React, {Component} from 'react'
// import FlatButton from 'material-ui/FlatButton'
// import { injectIntl, intlShape } from 'react-intl'
// import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
// import { Activity } from 'rmw-shell'
// import ReactMarkdown from 'react-markdown'
// import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
// import README from './README.md'
// import WorldCup from '../../world-cup'

// require('github-markdown-css')

// class About extends Component {
//   // Sorry for using setState here but I have to remove 'marked' from the dependencies
//   // because of a vulnerability issue
//   constructor (props) {
//     super(props)
//     this.state = {
//       text: ''
//     }
//   }

//   componentWillMount () {
//     fetch(README)
//     .then(response => response.text())
//     .then(text => {
//       this.setState({text: text})
//     })
//     console.log('World Cup ---------------------');
//     console.log(WorldCup);
//     console.log('World Cup ---------------------');

//   }

//   render () {
//     const { intl } = this.props

//     return (
//       <Activity
//         iconElementRight={
//           // <FlatButton
//           //   style={{marginTop: 4}}
//           //   href='https://github.com/TarikHuber/react-most-wanted'
//           //   target='_blank'
//           //   rel='noopener'
//           //   secondary
//           //   icon={<GitHubIcon />}
//           // />
//           <div></div>
//         }
//         title={intl.formatMessage({id: 'about'})}>

//         <Scrollbar>
//           <div style={{backgroundColor: 'white', padding: 5}}>
//             <ReactMarkdown
//               className='markdown-body'
//               source={this.state.text}
//           />
//           </div>
//         </Scrollbar>

//       </Activity>
//     )
//   }
// }

// About.propTypes = {
//   intl: intlShape.isRequired
// }

// export default injectIntl(About)
