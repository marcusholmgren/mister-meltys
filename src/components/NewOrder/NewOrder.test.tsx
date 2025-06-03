/**
 * @vitest-environment jsdom
/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'; // Import cleanup
import { describe, it, expect as vitestExpect, vi, afterEach } from 'vitest'; // Explicitly import vitest globals and afterEach

// Make expect available for the tests in this file directly
const expect = vitestExpect;

import { NewOrderComponent as NewOrder } from './NewOrder'; // Import the plain component
import * as FLAVORS from '../../constants/flavors';

// Mock the placeOrder prop
const mockPlaceOrder = vi.fn();

// Remove the problematic import of '@testing-library/jest-dom'

describe('NewOrder Component without jest-dom', () => {
    afterEach(cleanup); // Cleanup DOM after each test

    const allFlavorKeys = Object.keys(FLAVORS);
    // Provide default values in case FLAVORS is empty or has few keys, to prevent undefined keys
    const flavor1 = allFlavorKeys.length > 0 ? allFlavorKeys[0] : 'STRAWBERRY_DEFAULT';
    const flavor2 = allFlavorKeys.length > 1 ? allFlavorKeys[1] : 'CHOCOLATE_DEFAULT';
    const flavor3 = allFlavorKeys.length > 2 ? allFlavorKeys[2] : 'VANILLA_DEFAULT';

    // Helper to ensure FLAVORS constant has keys for reliable testing,
    // otherwise tests might pass vacuously if Object.keys(FLAVORS) is empty.
    const currentFlavors = Object.keys(FLAVORS).length > 0 ? FLAVORS : {
        [flavor1]: flavor1,
        [flavor2]: flavor2,
        [flavor3]: flavor3,
    };
    const currentFlavorKeys = Object.keys(currentFlavors);


    it('should display only flavors with stock greater than zero', () => {
        const flavorStock = {
            [flavor1]: 5,
            [flavor2]: 0, // Out of stock
            [flavor3]: 10,
        };
        render(<NewOrder placeOrder={mockPlaceOrder} flavors={flavorStock} />);

        // Check that in-stock flavors are present
        expect(screen.getByText(flavor1)).not.toBeNull();
        expect(screen.getByText(flavor3)).not.toBeNull();

        // Check that out-of-stock flavor is NOT present
        expect(screen.queryByText(flavor2)).toBeNull();
    });

    it('should display all flavors if all are in stock', () => {
        const dynamicFlavorStock: { [key: string]: number } = {};
        currentFlavorKeys.forEach(fKey => dynamicFlavorStock[fKey] = 5);

        render(<NewOrder placeOrder={mockPlaceOrder} flavors={dynamicFlavorStock} />);

        currentFlavorKeys.forEach(fKey => {
            expect(screen.getByText(fKey)).not.toBeNull();
        });
    });

    it('should display no flavors if all are out of stock', () => {
        const dynamicFlavorStock: { [key: string]: number } = {};
        currentFlavorKeys.forEach(fKey => dynamicFlavorStock[fKey] = 0);

        render(<NewOrder placeOrder={mockPlaceOrder} flavors={dynamicFlavorStock} />);

        currentFlavorKeys.forEach(fKey => {
            expect(screen.queryByText(fKey)).toBeNull();
        });
    });

    it('should display no flavors if flavorStock is empty', () => {
        render(<NewOrder placeOrder={mockPlaceOrder} flavors={{}} />);

        currentFlavorKeys.forEach(fKey => {
            expect(screen.queryByText(fKey)).toBeNull();
        });
    });

    it('should render action buttons for in-stock flavors', () => {
        const flavorStock = { [flavor1]: 5 };
        // Ensure flavor1 is actually part of currentFlavorKeys if FLAVORS was empty
        if (!currentFlavorKeys.includes(flavor1) && currentFlavorKeys.length > 0) {
             // This case should ideally not happen if flavor1 is derived from currentFlavorKeys
        }


        render(<NewOrder placeOrder={mockPlaceOrder} flavors={flavorStock} />);

        // Only proceed if flavor1 was supposed to be rendered
        if (flavorStock[flavor1] > 0) {
            const flavor1TextElement = screen.getByText(flavor1);
            expect(flavor1TextElement).not.toBeNull();

            const flavor1Row = flavor1TextElement.closest('tr');
            expect(flavor1Row).not.toBeNull();

            if (flavor1Row) {
                // @ts-ignore
                const withinRow = within(flavor1Row);
                expect(withinRow.getByText('+')).not.toBeNull();
                expect(withinRow.getByText('-')).not.toBeNull();
            }
        } else {
            // If flavor1 is not in stock, it shouldn't be rendered.
            expect(screen.queryByText(flavor1)).toBeNull();
        }
    });
});

// Helper to use `within` with testing-library
import { getQueriesForElement } from '@testing-library/dom';

// @ts-ignore
const within = (element: HTMLElement) => getQueriesForElement(element);
