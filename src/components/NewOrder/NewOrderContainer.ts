import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import NewOrder from './NewOrder';
import {actions as ordersActions} from '../../ducks/orders';

// This should ideally be imported from NewOrder.tsx or a shared types file
interface ScoopDetail {
  [flavorName: string]: number;
}

interface OrderData {
  customerName: string;
  scoops: ScoopDetail;
  cone: boolean;
}

interface DispatchProps {
  placeOrder: (orderData: OrderData) => void; // Consider a more specific return type if placeOrder is a thunk returning something
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    placeOrder: (orderData: OrderData) => dispatch(ordersActions.placeOrder(orderData) as any) // Cast as any for now if placeOrder action type is complex
});

export default connect(null, mapDispatchToProps)(NewOrder);
