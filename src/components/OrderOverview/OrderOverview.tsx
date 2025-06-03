import React from 'react';

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

const OrderOverview: React.FC<OrderOverviewProps> = (props) => {
    const handleChangeStatus = (index: number, status: string) => {
        // console.log(`Changing status of order at index ${index} to ${status}`);
        switch (status) {
            case 'fulfilled':
                props.fulfillOrder(index);
                break;
            case 'paid':
                props.payForOrder(index);
                break;
            default:
                console.warn(`Unknown status change: ${status}`);
                break;
        }
    }

    return (
        // Note: The 'horizontalScroll' prop for Panel will cause an error until Panel.tsx is typed correctly.
        <Panel title="Orders" horizontalScroll>
            {props.orders.map((order: Order, index: number) => (
                <OrderTicket
                    key={order.createdAt}
                    {...order}
                    onChangeStatus={(status: string) => handleChangeStatus(index, status)}
                    onCancle={() => props.cancelOrder(index)}
                />))
            }
        </Panel>
    );
};

export default OrderOverview;
