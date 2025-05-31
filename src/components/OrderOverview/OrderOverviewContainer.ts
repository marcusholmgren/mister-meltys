import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import OrderOverview from './OrderOverview';
import { actions as ordersActions } from '../../ducks/orders';

// Define the structure of an individual order (should be consistent with OrderOverview.tsx)
interface Order {
  createdAt: number;
  customerName: string;
  cone: boolean;
  scoops: { [flavorName: string]: number };
  status: string;
}

// Define parts of the RootState that are relevant here
// Ideally, RootState would be a central type
interface EmployeesState { loading: boolean; error?: string | null; data?: any[]; } // Placeholder
interface FreezerState { flavors: { [flavorName: string]: number }; temperature: number | null; } // Placeholder

interface RootState {
  employees: EmployeesState;
  freezer: FreezerState;
  orders: Order[];
}

interface StateProps {
  orders: Order[];
}

interface DispatchProps {
  fulfillOrder: (index: number) => void;
  payForOrder: (index: number) => void;
  cancelOrder: (index: number) => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
    orders: state.orders
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    fulfillOrder: (index: number) => dispatch(ordersActions.fulfillOrder(index) as any), // Cast for complex actions
    payForOrder: (index: number) => dispatch(ordersActions.payForOrder(index) as any),
    cancelOrder: (index: number) => dispatch(ordersActions.cancelOrder(index) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderOverview);
