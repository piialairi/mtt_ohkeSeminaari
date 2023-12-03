/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleComponent from './SimpleComponent';

test('renders SimpleComponent', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});
