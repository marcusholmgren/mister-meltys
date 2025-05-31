import React, {Component} from 'react';

import Panel from '../Panel/Panel';
import OrderTicket from '../OrderTicket/OrderTicket';

// Define the structure of an individual order based on typical usage
// This might need to be adjusted once OrderTicketProps is defined
interface Order {
  createdAt: number; // Used as key and likely part of order data
  customerName: string;
  cone: boolean;
  scoops: { [flavorName: string]: number };
  status: string;
  // Potentially other fields that OrderTicket expects
}

interface OrderOverviewProps {
  orders: Order[];
  fulfillOrder: (index: number) => void;
  payForOrder: (index: number) => void;
  cancelOrder: (index: number) => void;
}

class OrderOverview extends Component<OrderOverviewProps> {
    handleChangeStatus(index: number, status: string) {
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
            // Note: The 'horizontalScroll' prop for Panel will cause an error until Panel.tsx is typed correctly.
            <Panel title="Orders" horizontalScroll>
                {this.props.orders.map((order: Order, index: number) => (
                    <OrderTicket
                        key={order.createdAt}
                        {...order}
                        onChangeStatus={(status: string) => this.handleChangeStatus(index, status)}
                        onCancle={() => this.props.cancelOrder(index)}
                    />))
                }
            </Panel>
        );
    }
};

export default OrderOverview;
