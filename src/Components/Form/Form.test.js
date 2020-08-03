import React from 'react';
import Form from './Form';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MutationObserver from "@sheerun/mutationobserver-shim";
window.MutationObserver = MutationObserver;

describe('Form', () => {
  it('should display a form with instructions and a title', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByText, getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )
    
    const title = getByText('Upload Csv')
    const instructions = getByText('Make sure the csv is one column and includes a header.')
    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    expect(title).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(input).toBeInTheDocument();
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

  it.only('should be able to upload a csv in the form', async () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()

    const mockSetState = jest.fn();
    jest.mock('react', () => ({
      useState: initial => [initial, mockSetState]
    }))

    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )

    const file = new File(['test@gmail.com','test@gmail.com'], 'test.csv', {type: 'text/csv'});
    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    userEvent.upload(input, file);
    button.disabled = false;
    userEvent.click(button);
    // console.log(input.files.item(0), 'file')
    // await waitFor(() => expect(mockSetFileAdded).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockSetEmails).toHaveBeenCalled());
  })

  it('button should be disabled if no file has been uploaded', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )

    const button = getByRole('button', {name: 'Verify'});

    fireEvent.click(button)

    expect(mockSetFileAdded).not.toHaveBeenCalled();
    expect(mockSetEmails).not.toHaveBeenCalled();
  })
})