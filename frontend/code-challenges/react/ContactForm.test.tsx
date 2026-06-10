import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders Name and Email inputs and a Submit button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('updates the inputs as you type (controlled)', async () => {
    render(<ContactForm />);
    const name = screen.getByLabelText('Name');
    await userEvent.type(name, 'Eric');
    expect(name).toHaveValue('Eric');
  });

  it('shows a validation error when submitting empty', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('alert')).toHaveTextContent('All fields are required');
  });

  it('shows a welcome message when both fields are filled', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText('Name'), 'Eric');
    await userEvent.type(screen.getByLabelText('Email'), 'eric@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Welcome, Eric')).toBeInTheDocument();
  });

  it('does not show the error once valid', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText('Name'), 'Eric');
    await userEvent.type(screen.getByLabelText('Email'), 'eric@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
