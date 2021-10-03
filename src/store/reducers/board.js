import { UPDATE_BOARD_INFO } from '../actions/board';

export const board = (state, action) => {
    switch (action.type) {
        case UPDATE_BOARD_INFO:
            return { ...state, boardInfo: action.payload };
        default:
            return state;
    }
}
