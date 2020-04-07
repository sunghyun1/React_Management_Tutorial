import React from 'react';


class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        // api/customer/7 => 7번 고객 삭제
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick= {(e) => {this.props.deleteCustomer(this.props.id)} }>삭제</button>
        )
    }
}


export default CustomerDelete;