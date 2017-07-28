import {ADD_FIELD, DELETE_FIELD} from '../constants/actions';
import {Field} from '../data/field';

let id = 1;

export function addField(firstName, lastName, phone, gender, age) {
    const request = new Promise((resolve, reject) => {
        const newField = new Field(
            id,
            firstName,
            lastName,
            phone,
            gender,
            age
        )

        resolve({data: newField})
    })

    id = id + 1;

    return {
        type: ADD_FIELD,
        payload: request
    }
}

export function deleteField(field) {
    const request = new Promise((resolve, reject) => {
        resolve({data: field})
    })

    return {
        type: DELETE_FIELD,
        payload: request
    }
}
