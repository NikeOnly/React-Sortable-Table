import React from 'react';
import TableItem from './TableItem'
import _ from 'lodash';

import Form from './Form';
import SortableHeader from './SortableHeader';

export default class Main extends React.PureComponent {
    state = {
        sortInfo: {fieldName: '', order: 'desc'},
    }

    toggleTableSortBy = (fieldName) => {
        if (!this.state.sortInfo || this.state.sortInfo.fieldName !== fieldName) {
            this.setState({sortInfo: {fieldName, order: 'desc'}});
        } else {
            const order = this.state.sortInfo.order === 'asc' ? 'desc' : 'asc';
            this.setState({sortInfo: {fieldName, order}});
        }
    }

    render() {
        const {fields, addField, deleteField} = this.props;
        const {fieldName, order} = this.state.sortInfo;
        let renderFields;

        if (fields) {
            const fieldsArray = Array.from(fields.values());

            renderFields = _.chain(fieldsArray)
            .orderBy([fieldName], [order])
            .map(field => <TableItem key={field.code} field={field} deleteField={deleteField} />)
            .value()
        }

        return (
            <div>
                <h3>Simple form</h3>

                <Form addField={addField} />

                <table className="table table-bordered main-table">
                    <thead>
                        <tr>
                            <SortableHeader headerName={'#'}
                                sortFieldName='id'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <SortableHeader headerName={'First Name'}
                                sortFieldName='firstName'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <SortableHeader headerName={'Last Name'}
                                sortFieldName='lastName'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <SortableHeader headerName={'Phone'}
                                sortFieldName='phone'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <SortableHeader headerName={'Gender'}
                                sortFieldName='gender'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <SortableHeader headerName={'Age'}
                                sortFieldName='age'
                                sortField={this.state.sortInfo.fieldName}
                                sortOrder={this.state.sortInfo.order}
                                onSortClicked={this.toggleTableSortBy}
                            />
                            <th></th>
                        </tr>
                    </thead>
                    {renderFields}                    
                </table>
            </div>
        );
    }
}
