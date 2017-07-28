import React from 'react';

export default class TableItem extends React.PureComponent {
    onDeleteField() {
      this.props.deleteField(this.props.field)
    }

    render() {
        const {field} = this.props;
        return (
            <tbody>
                <tr>
                    <td>{field.id}</td>
                    <td>{field.firstName}</td>
                    <td>{field.lastName}</td>
                    <td>{field.phone}</td>
                    <td>{field.gender}</td>
                    <td>{field.age}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={this.onDeleteField.bind(this)}>Delete</button></td>
                </tr>
            </tbody>
        );
    }
}
