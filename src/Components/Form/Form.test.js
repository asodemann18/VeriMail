import React from 'react';
import Form from './Form';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Form', () => {
<<<<<<< HEAD
  it('should display a form with a label', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByPlaceholderText, getByRole, getByText } = render(
=======
  it('should display a form with instructions and a title', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByText, getByPlaceholderText, getByRole } = render(
>>>>>>> main
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         setEmails={mockSetEmails}
        />
      </MemoryRouter>
    )
<<<<<<< HEAD
    const title = getByText('Upload Csv');
=======
    
    const title = getByText('Upload Csv')
    const instructions = getByText('Make sure the csv is one column and includes a header.')
>>>>>>> main
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

  it.skip('should be able to upload a csv in the form', () => {
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
<<<<<<< HEAD
      
=======

    const file = new File(['test@gmail.com'], 'test.csv');
>>>>>>> main
    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    fireEvent.change(input, {target: {files: [file]}});
    fireEvent.click(button)

    expect(mockSetFileAdded).toHaveBeenCalled();
    // expect(mockSetEmails).toHaveBeenCalled();
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