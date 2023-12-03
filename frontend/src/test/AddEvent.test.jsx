/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEvent from '../components/AddEvent';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('AddEvent component', () => {
    it('submits a new event with minimal data', async () => {
        axios.post.mockResolvedValue({ data: {} });

        const locationsData = [{ locationId: 'actualLocationId', zipcode: '00100', city: 'Helsinki' }];
        axios.get.mockResolvedValueOnce({ data: locationsData });

        const categoriesData = [{ categoryName: 'Urheilu', description: 'Urheilutapahtuma' }];
        axios.get.mockResolvedValueOnce({ data: categoriesData });

        render(
            <MemoryRouter>
                <AddEvent />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('event-label'), { target: { value: 'Test Event' } });
        fireEvent.change(screen.getByTestId('start-date-label'), { target: { value: '2023-12-01' } });
        fireEvent.change(screen.getByTestId('location-label'), { target: { value: 'Helsinki' } });
        fireEvent.change(screen.getByTestId('category-label'), { target: { value: 'Urheilu' } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
        });

        fireEvent.click(screen.getByText('Submit'));

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/events',
            {
                eventName: 'Test Event',
                startDate: '2023-12-01',
                location: {
                    city: 'Helsinki',
                    locationId: 'actualLocationId',
                    zipcode: '00100'
                },
                category: {
                    categoryName: 'Urheilu',
                    description: 'Urheilutapahtuma'
                },
                endDate: '2023-12-03',
                price: '',
                streetAddress: '',
                description: ''
            }
        );

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/events',
            expect.objectContaining({
                eventName: 'Test Event',
                startDate: '2023-12-01',
                location: expect.objectContaining({
                    city: 'Helsinki',
                    locationId: 'actualLocationId',
                    zipcode: '00100'
                }),
                category: expect.objectContaining({
                    categoryName: 'Urheilu',
                    description: 'Urheilutapahtuma'
                }),
                endDate: '',
                price: '',
                streetAddress: '',
                description: ''
            })
        );

    });
});
