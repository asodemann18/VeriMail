import React from 'react';
import Form from './Form';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Form', () => {
  it('should display a form', () => {
    const mockSetFileAdded = jest.fn()
    const mockSetEmails = jest.fn()
    const { getByPlaceholderText } = render(
      <Form 
       setFileAdded={mockSetFileAdded}
       setEmails={mockSetEmails}
      />
    )
  })
})