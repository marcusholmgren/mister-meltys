import React, { useState } from "react";

import Panel from "../Panel/Panel";
import { Column, Row } from "../Grid/Grid";
import ButtonGroup from "../Button/ButtonGroup";
import Button from "../Button/Button";

import "./NewOrder.css";

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
  flavors: { [flavorName: string]: number };
}

const DEFAULT_STATE: NewOrderState = {
  customerName: "",
  scoops: {},
  cone: false,
};

// Export the plain component for testing and for the container to wrap
export const NewOrderComponent: React.FC<NewOrderProps> = (props) => {
  const [customerName, setCustomerName] = useState(DEFAULT_STATE.customerName);
  const [scoops, setScoops] = useState<ScoopDetail>(DEFAULT_STATE.scoops);
  const [cone, setCone] = useState(DEFAULT_STATE.cone);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.placeOrder({ customerName, scoops, cone });
    setCustomerName(DEFAULT_STATE.customerName);
    setScoops(DEFAULT_STATE.scoops);
    setCone(DEFAULT_STATE.cone);
  };

  const handleDecreaseFlavor = (flavorName: string) => {
    if (!scoops[flavorName]) {
      return;
    }

    const currentScoops = { ...scoops };

    if (currentScoops[flavorName] === 1) {
      delete currentScoops[flavorName];
      setScoops(currentScoops);
    } else {
      setScoops({
        ...scoops,
        [flavorName]: currentScoops[flavorName] - 1,
      });
    }
  };

  const handleIncreaseFlavor = (flavorName: string) => {
    setScoops({
      ...scoops,
      [flavorName]: (scoops[flavorName] || 0) + 1,
    });
  };

  return (
    <Panel title="New order">
      <form className="new-order-form" onSubmit={handleFormSubmit}>
        <Row>
          <Column>
            <label htmlFor="customer-name">Customer name</label>
            <input
              type="text"
              id="customer-name"
              name="name"
              value={customerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomerName(e.target.value)
              }
              autoComplete="off"
            />
          </Column>
          <Column>
            <label>Container</label>
            <ButtonGroup>
              <Button
                label="Cup"
                priority={!cone ? "primary" : "secondary"}
                onClick={() => setCone(false)}
              />
              <Button
                label="Cone"
                priority={cone ? "primary" : "secondary"}
                onClick={() => setCone(true)}
              />
            </ButtonGroup>
          </Column>
        </Row>

        <label>Scoops</label>
        <table className="new-order-scoops-table">
          <colgroup>
            <col width="80%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            {Object.keys(props.flavors || {})
              .filter((flavor) => (props.flavors[flavor] || 0) > 0)
              .map((flavor) => (
                <tr key={flavor}>
                  <td>
                    <strong>{flavor}</strong>
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button
                        size="small"
                        label="-"
                        priority="primary"
                        onClick={() => handleDecreaseFlavor(flavor)}
                      />
                      <Button
                        size="small"
                        label={(scoops[flavor] || 0).toString()}
                        priority="secondary"
                      />
                      <Button
                        size="small"
                        label="+"
                        priority="primary"
                        onClick={() => handleIncreaseFlavor(flavor)}
                      />
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Button
          className="new-order-submit-button"
          label="Add order"
          type="submit"
        />
      </form>
    </Panel>
  );
};

export default NewOrderComponent;
