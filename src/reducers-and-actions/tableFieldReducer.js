import {ADD_FIELD, DELETE_FIELD} from '../constants/actions';
import _ from 'lodash';

const INITIAL_STATE = {
    idToField: localStorage.getItem('SimpleSortableTable') !== null
    ? new Map( JSON.parse(localStorage.getItem('SimpleSortableTable')) )
    : null,
};

const reducerMap = {
    [ADD_FIELD]: (state, httpResponse) => {
        const addedField = httpResponse.data;
        const updatedIdToField = new Map(state.idToField);

        updatedIdToField.set(addedField.code, addedField)

        localStorage.setItem('SimpleSortableTable', JSON.stringify(Array.from(updatedIdToField.entries())) )

        return {idToField: updatedIdToField}
    },
    [DELETE_FIELD]: (state, httpResponse) => {
        const deleteField = httpResponse.data
        const idToField = new Map(state.idToField);

        if(idToField.delete(deleteField.code)) {
            localStorage.setItem('SimpleSortableTable', JSON.stringify(Array.from(idToField.entries())) )

            return {idToField}
        } else {
            return state;
        }
    }
};

export default(state = INITIAL_STATE, action) => {
    let stateUpdates = state;

    const reducer = reducerMap[action.type];
    if (reducer) {
        stateUpdates = reducer(state, action.payload);
    }

    return stateUpdates == state ? state : {...state, ...stateUpdates};
}
