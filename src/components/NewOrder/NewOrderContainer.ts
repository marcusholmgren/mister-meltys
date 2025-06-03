import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NewOrderComponent } from "./NewOrder"; // Import the named component
import { actions as ordersActions } from "../../ducks/orders";
import { FreezerState } from "../../ducks/freezer";

// This should ideally be imported from NewOrder.tsx or a shared types file
interface ScoopDetail {
  [flavorName: string]: number;
}

interface OrderData {
  customerName: string;
  scoops: ScoopDetail;
  cone: boolean;
}

interface RootState {
  freezer: FreezerState;
  // Define other state slices as needed
}

interface DispatchProps {
  placeOrder: (orderData: OrderData) => void; // Consider a more specific return type if placeOrder is a thunk returning something
}

const mapStateToProps = (state: RootState) => ({
  flavors: state.freezer.flavors,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  placeOrder: (orderData: OrderData) =>
    dispatch(ordersActions.placeOrder(orderData) as any), // Cast as any for now if placeOrder action type is complex
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderComponent); // Connect the named component
