import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './components/Main';
import {addField, deleteField} from './reducers-and-actions/tableFieldAction';

const mapStateToProps = state => ({
   fields: state.tableField.idToField
 })

export class App extends Component {
    render() {
        const {addField, deleteField, fields} = this.props;
        return (
            <Main addField={addField} deleteField={deleteField} fields={fields} />
        );
    }
}

export default connect(mapStateToProps, {addField, deleteField})(App)
