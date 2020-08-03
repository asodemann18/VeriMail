import React, {useEffect} from 'react';
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
    const mockSetCsvEmails = jest.fn()
    const { getByText, getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         mockSetCsvEmails={mockSetCsvEmails}
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
    const mockSetCsvEmails = jest.fn()
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         mockSetCsvEmails={mockSetCsvEmails}
        />
      </MemoryRouter>
    )

    const input = getByPlaceholderText('upload csv');
    fireEvent.change(input, {target: {files: ['test.csv']}});
      
    expect(input.files).toEqual(['test.csv']);
  })

  it('should be able to upload a csv in the form', async () => {
    const mockSetFileAdded = jest.fn()
    const mockSetCsvEmails = jest.fn()

    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, 'useState');
    // useStateSpy.mockImplementation((init) => [[{email: 'test@gmail.com'}], setState]);

    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         mockSetCsvEmails={mockSetCsvEmails}
        />
      </MemoryRouter>
    )

    const file = new File(['test1@gmail.com','test2@gmail.com'], 'test.csv', {type: 'text/csv'});
    const input = getByPlaceholderText('upload csv');
    const button = getByRole('button', {name: 'Verify'});

    await waitFor(() => userEvent.upload(input, file));
    // button.disabled = false;
    await waitFor(() => userEvent.click(button));
    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file)
    expect(input.files).toHaveLength(1)
    // await waitFor(() => expect(mockSetFileAdded).toHaveBeenCalledWith(true));
    // await waitFor(() => expect(mockSetCsvEmails).toHaveBeenCalled());
  })

  it('button should be disabled if no file has been uploaded', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetCsvEmails = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <Form 
         setFileAdded={mockSetFileAdded}
         mockSetCsvEmails={mockSetCsvEmails}
        />
      </MemoryRouter>
    )

    const button = getByRole('button', {name: 'Verify'});

    fireEvent.click(button)

    expect(mockSetFileAdded).not.toHaveBeenCalled();
    expect(mockSetCsvEmails).not.toHaveBeenCalled();
  })
})