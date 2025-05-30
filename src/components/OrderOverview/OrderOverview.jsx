import React, {Component} from 'react';

import Panel from '../Panel/Panel';
import OrderTicket from '../OrderTicket/OrderTicket';


class OrderOverview extends Component {
    handleChangeStatus(index, status) {
        // console.log(`Changing status of order at index ${index} to ${status}`);
        switch (status) {
            case 'fulfilled':
                this.props.fulfillOrder(index);
                break;
            case 'paid':
                this.props.payForOrder(index);
                break;
            default:
                console.warn(`Unknown status change: ${status}`);
                break;
        }
    }


    render() {
        return (
            <Panel title="Orders" horizontalScroll>
                {this.props.orders.map((order, index) => (
                    <OrderTicket
                        key={order.createdAt}
                        {...order}
                        onChangeStatus={(status) => this.handleChangeStatus(index, status)}
                        onCancle={() => this.props.cancelOrder(index)}
                    />))
                }
            </Panel>
        );
    }
};

export default OrderOverview;

