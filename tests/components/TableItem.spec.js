import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import TableItem from '../../src/components/TableItem';
import {Field} from '../../src/data/field';

const field = new Field(1, 'Melisa', 'Black', '11111111', 'female', '28' )

describe('TableItem', () => {
    test('match snapshot', () => {
        const tree = renderer.create(<TableItem field={field} />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    test('click delete button', () => {        
        let deleteField = jest.fn()

        const wrapper = shallow(<TableItem field={field} deleteField={deleteField} />)
        const button = wrapper.find('button')

        button.simulate('click')

        expect(deleteField).toHaveBeenCalledWith(field)
    })
})
