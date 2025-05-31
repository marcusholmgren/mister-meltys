import React from 'react';

import './OrderTicket.css';

interface OrderTicketProps {
  customerName: string;
  createdAt: number; // Assuming this is a timestamp or similar unique number for key
  cone: boolean;
  scoops: { [flavorName: string]: number };
  status: string;
  onChangeStatus: (newStatus: string) => void;
  onCancle: () => void;
}

const STATUSES = [
    'pending',
    'fulfilled',
    'paid',
];

const OrderTicket: React.FC<OrderTicketProps> = ({customerName, createdAt: _createdAt, cone, scoops, status, onChangeStatus, onCancle}) => {
    const flavorRows = Object.keys(scoops).map(flavorName => {
        const amountOfScoopsForFlavor = scoops[flavorName];
        return (
            <tr key={flavorName} className="order-ticket__flavor">
                <td>{flavorName}</td>
                <td style={{textAlign: 'right'}}>{amountOfScoopsForFlavor}</td>
            </tr>
        );
    });
    const totalScoops = Object.keys(scoops).reduce(
        (total, flavorName: string) => total + scoops[flavorName],
        0
    );

    return (
        <div className="order-ticket">
            <table className="order-ticket__table">
                <tbody>
                <tr className="order-ticket__name-and-status">
                    <td><strong className="order-ticket__name">{customerName}</strong></td>
                    <td>
                        <select className="order-ticket__status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeStatus(e.target.value)}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </td>
                </tr>
                <tr className="order-ticket__product-info">
                    <td colSpan={2}><strong>{cone ? 'Cone' : 'Cup'}</strong> — {totalScoops} scoops</td>
                </tr>
                {flavorRows}
                </tbody>
            </table>
            <button onClick={onCancle}>Cancle</button>
        </div>
    );
};

export default OrderTicket;


