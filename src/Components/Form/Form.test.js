import React from 'react';
import Form from './Form';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Form', () => {
  it('should display a form', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )
    
    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  it('should be able to input a csv in the form', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )

    const input = getByPlaceholderText('upload csv');
    fireEvent.change(input, {target: {files: ['test.csv']}});

    expect(input.files).toEqual(['test.csv']);
  })

  it('should be able to upload a csv in the form', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )

    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    fireEvent.change(input, {target: {files: ['test.csv']}});
    fireEvent.click(button)

    expect(mockSetFileAdded).toHaveBeenCalledWith(true);
    expect(mockSetEmails).toHaveBeenCalledWith([]);
  })
})