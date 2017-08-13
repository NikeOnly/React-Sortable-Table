import React from 'react'
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import ConnectedApp, {App} from '../src/App';

describe('App', () => {
    test('match snapshot', () => {
        const tree = renderer.create(<App />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    test('render connected component', () => {
        const initialState = {tableField: {idToField: new Map}}
        const mockStore = configureStore()
        const store = mockStore(initialState)
        const container = shallow(<ConnectedApp store={store} /> )

        expect(toJson(container)).toMatchSnapshot();
        expect(container.prop('idToField')).toEqual(initialState.idToField)
    })
})
