import React from 'react';

class SortableHeader extends React.PureComponent {
    onHeaderClicked() {
        this.props.onSortClicked(this.props.sortFieldName);
    }

    render() {
        const {headerName, sortFieldName, sortField, sortOrder} = this.props;
        const iconClassName = `sort-icon ${sortFieldName === sortField ? 'icon-visible' : 'icon-hidden'}`;
        const icon = sortOrder === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

        return <th onClick={this.onHeaderClicked.bind(this)}>
            <span className='data-table-header-span'>{headerName}</span>
            <i className={`${iconClassName} material-icons`}>{icon}</i>
        </th>
    }
}

export default SortableHeader;
