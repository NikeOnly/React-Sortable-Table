import fieldReducer, {INITIAL_STATE} from '../../src/reducers-and-actions/tableFieldReducer'
import {Field} from '../../src/data/field';
import * as action from '../../src/constants/actions';
import LocalStorageUtil from '../../src/utils/localStorageUtil';

const field = new Field(1, 'Alex', 'Brown', '3333333', 'male', '33')
const field2 = new Field(1, 'Lana', 'Grey', '5555555', 'female', '22')

describe('Reducer', () => {
    test('on action ADD_FIELD should return Map with added field', () => {
        const newData = new Map()

        const data = fieldReducer({idToField: newData}, {type: action.ADD_FIELD, payload: {data: field}})
        newData.set(field.code, field)

        expect(data).toEqual({idToField: newData})
    })

    test('on action DELETE_FIELD should return Map without deleted field', () => {
        let oldData = new Map()
        oldData.set(field.code, field)
        oldData.set(field2.code, field2)

        let data = fieldReducer({idToField: oldData}, {type: action.DELETE_FIELD, payload: {data: field}})

        oldData.delete(field.code)

        expect(data.idToField).toEqual(oldData)

        data = fieldReducer({idToField: new Map}, {type: action.DELETE_FIELD, payload: {data: field}})

        expect(data).toEqual({idToField: new Map})
    })
})
