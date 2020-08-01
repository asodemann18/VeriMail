import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should display only a title when no file is uploaded', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Header 
         fileAdded={false}
        />
      </MemoryRouter>
    )

    const title = getByText('VeriMail');
    const details = queryByText('Email Details');

    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
  })

  it('should display a title and multiple links when no file is uploaded', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header 
         fileAdded={true}
        />
      </MemoryRouter>
    )

    const title = getByText('VeriMail');
    const details = getByText('Email Details');
    const stats = getByText('Email Stats');
    const verifyEmails = getByText('Verify Emails');

    expect(title).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(stats).toBeInTheDocument();
    expect(verifyEmails).toBeInTheDocument();
  })
})