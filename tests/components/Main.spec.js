import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import Main from '../../src/components/Main';
import {addField, deleteField} from '../../src/reducers-and-actions/tableFieldAction';
import {Field} from '../../src/data/field';

describe('Main', () => {
    test('match snapshot', () => {
        const tree = renderer.create(<Main />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    test('correct props', () => {
        const fields = new Map()
        const wrapper = mount(<Main fields={fields} addField={addField} deleteField={deleteField} />)

        expect(wrapper.prop('fields')).toEqual(new Map)
        expect(wrapper.prop('addField')).toBeInstanceOf(Function)
        expect(wrapper.prop('deleteField')).toBeInstanceOf(Function)
    })

    test('set correct state when clicking SortableHeader 3 times', () => {
        const wrapper = mount(<Main />)
        const sortableHeaders = wrapper.find('SortableHeader')

        sortableHeaders.forEach(sortableHeader => {
            const sortFieldName = sortableHeader.prop('sortFieldName')            

            sortableHeader.simulate('click', sortFieldName)

            expect(wrapper.state('sortInfo')).toEqual({fieldName: sortFieldName, order: 'desc'})

            sortableHeader.simulate('click', sortFieldName)

            expect(wrapper.state('sortInfo')).toEqual({fieldName: sortFieldName, order: 'asc'})

            sortableHeader.first().simulate('click', sortFieldName)

            expect(wrapper.state('sortInfo')).toEqual({fieldName: sortFieldName, order: 'desc'})
        })
    })

    test('rendered TableItem', () => {
        let fields = new Map()
        const field1 = new Field()
        const field2 = new Field()

        fields.set(field1.code, field1)
        fields.set(field2.code, field2)

        const wrapper = shallow(<Main fields={fields} />)

        expect(wrapper.find('TableItem')).toHaveLength(2)
    })
})
