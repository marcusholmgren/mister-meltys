//import React, {Component} from 'react';
import React from 'react';


import Panel from '../Panel/Panel';
import Button from '../Button/Button';
import FreezerFlavor from '../FreezerFlavor/FreezerFlavor';

/*
class Freezer2 extends Component {

    render() {
        const flavors = Object.keys(this.props.flavors).map(flavorName => (
            <FreezerFlavor
                key={flavorName}
                onClickRestock={this.props.onClickRestock.bind(this, flavorName)}
                onClickFlavor={this.props.onClickFlavor.bind(this, flavorName)}
                flavorName={flavorName}
                scoops={this.props.flavors[flavorName]}
            />
        ));

        let title = `Freezer (°${this.props.temperature}C)`;
        if (!this.props.temperature) {
            title = 'Freezer';
        }

        return (
            <Panel title={title}>
                <Button label="Add product" onClick={this.props.onClickAddProduct}/>
                <br/>
                {flavors}
            </Panel>
        );
    }
}
*/


const Freezer = (props) => {
    const flavors = Object.keys(props.flavors).map(flavorName => (
        <FreezerFlavor
            key={flavorName}
            onClickRestock={props.onClickRestock.bind(this, flavorName)}
            onClickFlavor={props.onClickFlavor.bind(this, flavorName)}
            flavorName={flavorName}
            scoops={props.flavors[flavorName]}
        />
    ));

    let title = `Freezer (°${props.temperature}C)`;
    if (!props.temperature) {
        title = 'Freezer';
    }

    return (
        <Panel title={title}>
            <Button label="Add product" onClick={props.onClickAddProduct}/>
            <br/>
            {flavors}
        </Panel>
    );
};

export default Freezer;

