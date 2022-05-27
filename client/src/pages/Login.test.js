import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from './Login';

test('form title should be rendered', () => {
    render(<Login />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
});

test('email input should be rendered', () => {
    render(<Login />);
    const input = screen.getByTitle('email');
    expect(input).toBeInTheDocument();
});

test('password input should be rendered', () => {
    render(<Login />);
    const input = screen.getByTitle('password');
    expect(input).toBeInTheDocument();
});

test('button should be rendered', () => {
    render(<Login />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
});
