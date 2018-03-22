import firebase from 'firebase'

export const ADD_BET = 'ADD_BET'
export const SET_BET = 'SET_BET'
export const REMOVE_BET = 'REMOVE_BET'


export const betCreate = ({auth,game}) => {
    
    return () => {
        firebase.database().ref(`bets/${auth.uid}`).push({game})
    }
    
}

export default betCreate