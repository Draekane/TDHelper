import * as playerAT from '../../actionTypes/players/playerAT';

const initialState = {
    players: []
};

//------------------------REDUCER LOGIC BY ACTION ---------------------//
export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case playerAT.PLAYER_ADD:
            return state;
        case playerAT.PLAYER_UPDATE:
            return state;
        case playerAT.PLAYER_DELETE:
            return state;
        default:
        return state;
    }
}
