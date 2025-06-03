import React, {Component} from 'react';
import { connect } from 'react-redux';

import Panel from '../Panel/Panel';
import {Column, Row} from '../Grid/Grid';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';

import * as FLAVORS from '../../constants/flavors';
import { getFlavorStock, FreezerState } from '../../ducks/freezer'; // Import the selector and FreezerState

import './NewOrder.css';

interface ScoopDetail {
  [flavorName: string]: number;
}

interface NewOrderState {
  customerName: string;
  scoops: ScoopDetail;
  cone: boolean;
}

// Assuming OrderData is similar to NewOrderState for placeOrder prop
type OrderData = NewOrderState; // Changed from interface extends

interface NewOrderProps {
  placeOrder: (order: OrderData) => void;
  flavorStock: { [flavorName: string]: number }; // Added from mapStateToProps
}

// Minimal RootState definition for mapStateToProps
interface RootState {
  freezer: FreezerState; // Assuming 'freezer' is the key and its value is of type FreezerState
  // other state slices...
}

const DEFAULT_STATE: NewOrderState = {
    customerName: '',
    scoops: {},
    cone: false,
};

// Export the plain component for testing and for the container to wrap
export class NewOrderComponent extends Component<NewOrderProps, NewOrderState> {
    constructor(props: NewOrderProps) {
        super(props);
        this.state = {
            ...DEFAULT_STATE,
        };
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Order data:', this.state);
        this.props.placeOrder(this.state);
        this.setState(DEFAULT_STATE);
    };

    handleDecreaseFlavor = (flavorName: string) => {
        if (!this.state.scoops[flavorName]) {
            return;
        }

        const currentScoops = {...this.state.scoops};

        if (currentScoops[flavorName] === 1) {
            delete currentScoops[flavorName];
            this.setState({
                scoops: currentScoops,
            });
        } else {
            this.setState({
                scoops: {
                    ...this.state.scoops,
                    [flavorName]: currentScoops[flavorName] - 1,
                },
            });
        }
    };

    handleIncreaseFlavor = (flavorName: string) => {
        this.setState({
            scoops: {
                ...this.state.scoops,
                [flavorName]: (this.state.scoops[flavorName] || 0) + 1,
            },
        });
    };

    render() {
        return (
            <Panel title="New order">
                <form className="new-order-form" onSubmit={this.handleFormSubmit}>
                    <Row>
                        <Column>
                            <label htmlFor="customer-name">Customer name</label>
                            <input
                                type="text"
                                id="customer-name"
                                name="name"
                                value={this.state.customerName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({customerName: e.target.value})}
                                autoComplete="off"
                            />
                        </Column>
                        <Column>
                            <label>Container</label>
                            <ButtonGroup>
                                <Button
                                    label="Cup"
                                    priority={!this.state.cone ? 'primary' : 'secondary'}
                                    onClick={() => this.setState({cone: false})}
                                />
                                <Button
                                    label="Cone"
                                    priority={this.state.cone ? 'primary' : 'secondary'}
                                    onClick={() => this.setState({cone: true})}
                                />
                            </ButtonGroup>
                        </Column>
                    </Row>

                    <label>Scoops</label>
                    <table className="new-order-scoops-table">
                        <colgroup>
                            <col width="80%"/>
                            <col width="20%"/>
                        </colgroup>
                        <tbody>
                        {Object.keys(FLAVORS)
                            .filter(flavor => (this.props.flavorStock[flavor] || 0) > 0)
                            .map(flavor => (
                            <tr key={flavor}>
                                <td>
                                    <strong>{flavor}</strong>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="small" label="-" priority="primary"
                                                onClick={() => this.handleDecreaseFlavor(flavor)}/>
                                        <Button size="small" label={(this.state.scoops[flavor] || 0).toString()}
                                                priority="secondary"/>
                                        <Button size="small" label="+" priority="primary"
                                                onClick={() => this.handleIncreaseFlavor(flavor)}/>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Button className="new-order-submit-button" label="Add order" type="submit"/>
                </form>
            </Panel>
        );
    }
};

const mapStateToProps = (state: RootState) => ({
  flavorStock: getFlavorStock(state.freezer)
});

// No mapDispatchToProps needed if placeOrder is passed down from a parent container component
// If placeOrder itself should be dispatched via Redux, that would be a separate change.

// The connected component is the default export
export default connect(mapStateToProps)(NewOrderComponent);

