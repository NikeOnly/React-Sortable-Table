import React from 'react'
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme'

import Form from '../../src/components/Form';

describe('Form', () => {
    test('match snapshot', () => {
        const tree = renderer.create(<Form />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    describe('input fields and fieldErrors get correct values', () => {
        const wrapper = mount(<Form />);
        let inputs = wrapper.find('.form-control');
        let radios = wrapper.find({type: 'radio'});

        test('inputs handleChange, onBlur & validation functions', () => {
            inputs.forEach(input => {
                const id = input.prop('id');
                const error = id + 'Error';

                if (id === 'firstName' || id === 'lastName') {
                    input.props().onChange({target: {value: '1'}}, id)
                    input.props().onBlur({target: {value: '1'}}, id)
                    expect(wrapper.state(id)).toBe('1')
                    expect(typeof( wrapper.state(error) )).toBe('string')

                    input.props().onChange({target: {value: 'test'}}, id)
                    input.props().onBlur({target: {value: 'test'}}, id)
                    expect(wrapper.state(id)).toBe('test')
                    expect(wrapper.state(error)).toBeFalsy()
                }

                if (id === 'phone' || id === 'age') {
                    input.props().onChange({target: {value: '1'}}, id)
                    input.props().onBlur({target: {value: '1'}}, id)
                    expect(wrapper.state(id)).toBe('1')
                    expect(wrapper.state(error)).toBeFalsy()

                    input.props().onChange({target: {value: 'test'}}, id)
                    input.props().onBlur({target: {value: 'test'}}, id)
                    expect(wrapper.state(id)).toBe('test')
                    expect(typeof( wrapper.state(error) )).toBe('string')
                }

                if (id === 'age') {
                    input.props().onChange({target: {value: ''}}, id)
                    expect(typeof( wrapper.state(error) )).toBe('string')

                    input.props().onChange({target: {value: '300'}}, id)
                    expect(typeof( wrapper.state(error) )).toBe('string')
                }
            })
        })

        test('radio handleChange function', () => {
            radios.forEach(radio => {
                const value = radio.prop('value');

                radio.props().onChange({target: {value}}, 'gender')

                expect(radio.prop('checked')).toBeTruthy()
                expect(wrapper.state('gender')).toEqual(value)
            })
        })
    })

    test('addField', (done) => {
        const addField = jest.fn();
        const wrapper = mount(<Form addField={addField} />);
        const form = wrapper.find('form');

        form.simulate('submit', { preventDefault: () => {} })

        expect(typeof( wrapper.state('isValidationDone') )).toBe('string')

        setTimeout(() => {
            expect(wrapper.state('isValidationDone')).toEqual('')
            done();
        }, 2500);        

        wrapper.setState({firstNameError: '', lastNameError: '', phoneError: '', ageError: ''})

        form.simulate('submit', { preventDefault: () => {} })

        expect(wrapper.state('isValidationDone')).toEqual('')
        expect(wrapper.prop('addField')).toHaveBeenCalled()
    })
})
