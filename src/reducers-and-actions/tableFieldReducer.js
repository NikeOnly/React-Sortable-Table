import {ADD_FIELD, DELETE_FIELD} from '../constants/actions';
import LocalStorageUtil from '../utils/localStorageUtil';
import _ from 'lodash';

export const INITIAL_STATE = {
    idToField: new Map(LocalStorageUtil.tableField.map((field) => [field.code, field]))
};

const reducerMap = {
    [ADD_FIELD]: (state, httpResponse) => {
        const addedField = httpResponse.data;
        const updatedIdToField = new Map(state.idToField);

        updatedIdToField.set(addedField.code, addedField)

        updateLocalStorage(updatedIdToField);

        return {idToField: updatedIdToField}
    },
    [DELETE_FIELD]: (state, httpResponse) => {
        const deleteField = httpResponse.data
        const idToField = new Map(state.idToField);

        if(idToField.delete(deleteField.code)) {
            updateLocalStorage(idToField);

            return {idToField}
        } else {
            return state;
        }
    }
};

function updateLocalStorage(idToField) {
    LocalStorageUtil.tableField = Array.from(idToField.values());
}

export default(state = INITIAL_STATE, action) => {
    let stateUpdates = state;

    const reducer = reducerMap[action.type];
    if (reducer) {
        stateUpdates = reducer(state, action.payload);
    }

    return stateUpdates == state ? state : {...state, ...stateUpdates};
}
