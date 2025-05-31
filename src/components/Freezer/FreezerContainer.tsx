import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

import Freezer from './Freezer';
import {actions} from '../../ducks/freezer';
import * as FLAVORS from '../../constants/flavors';

// Placeholder for EmployeesState if not imported from another file's typings
interface EmployeesState {
  loading: boolean;
  error?: string | null;
  data?: any[];
}

interface FreezerState {
  flavors: { [flavorName: string]: number };
  temperature: number | null;
}

interface RootState {
  employees: EmployeesState; // Assuming this structure from previous files
  freezer: FreezerState;
  // Define other state slices as needed
}

interface FreezerContainerProps {
  flavors: { [flavorName: string]: number };
  temperature: number | null;
  updateTemperature: (temperature: number) => void;
  addProductToFreezer: (flavorName: string, amount: number) => void;
  removeScoop: (flavorName: string) => void;
}

class FreezerContainer extends Component<FreezerContainerProps> {

    componentDidMount() {
        setInterval(() => {
            const randomTemperature = -Math.round(Math.random() * 10);
            this.props.updateTemperature(randomTemperature);
        }, 2000)
    }

    handleClickRestock = (flavorName: string) => {
        const amountString = window.prompt(`Enter amount to restock ${flavorName}`);
        if (amountString === null) return; // User cancelled prompt
        const amount = parseInt(amountString);
        if (!isNaN(amount)) {
            this.props.addProductToFreezer(flavorName, amount);
        }
    };

    handleClickAddProduct = () => {
        const allAvailableFlavors = Object.keys(FLAVORS);
        const flavorName = window.prompt(`Enter flavor name to restock. (Choose from ${allAvailableFlavors.join(', ')})`);
        // Ensure flavorName is not null and is a valid key in FLAVORS
        if (flavorName && FLAVORS[flavorName as keyof typeof FLAVORS]) {
            this.handleClickRestock(flavorName);
        }
    };

    handleClickFlavor = (flavorName: string) => {
        this.props.removeScoop(flavorName);
    };

    render() {
        return (
            <Freezer
                flavors={this.props.flavors}
                temperature={this.props.temperature}
                onClickRestock={this.handleClickRestock}
                onClickFlavor={this.handleClickFlavor}
                onClickAddProduct={this.handleClickAddProduct}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    flavors: state.freezer.flavors,
    temperature: state.freezer.temperature
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateTemperature: (temperature: number) => dispatch(actions.updateTemperature(temperature) as any), // Cast for thunk/complex actions if necessary
    addProductToFreezer: (flavorName: string, amount: number) => dispatch(actions.addProductToFreezer(flavorName, amount) as any),
    removeScoop: (flavorName: string) => dispatch(actions.removeScoop(flavorName) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(FreezerContainer);
