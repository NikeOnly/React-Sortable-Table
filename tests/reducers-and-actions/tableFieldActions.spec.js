import {addField, deleteField} from '../../src/reducers-and-actions/tableFieldAction';
import {Field} from '../../src/data/field';
import * as action from '../../src/constants/actions';

const field = new Field(1, 'Alex', 'Brown', '3333333', 'male', '33')

describe('Action', () => {
    test('addField - object with correcct type and payload - promise', async () => {
        const data = await addField('Alex', 'Brown', '3333333', 'male', '33')

        expect(data.type).toEqual(action.ADD_FIELD)
        return expect(data.payload).resolves.toHaveProperty('data', {
            'id': 1,
            firstName: 'Alex',
            'lastName': 'Brown',
            'phone': '3333333',
            gender: 'male',
            age: '33',
            code: expect.anything()
        })
    })

    test('deleteField - object with correcct type and payload - promise', async () => {
        const data = await deleteField(field)

        expect(data.type).toEqual(action.DELETE_FIELD)
        return expect(data.payload).resolves.toEqual({data: field})
    })
})
