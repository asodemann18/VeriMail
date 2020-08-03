import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should display a title and multiple links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header 
         fileAdded={true}
        />
      </MemoryRouter>
    );

    const title = getByText('VeriMail');
    const details = getByText('Email Details');
    const stats = getByText('Email Stats');
    const verifiedEmails = getByText('Verified Emails');

    expect(title).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(stats).toBeInTheDocument();
    expect(verifiedEmails).toBeInTheDocument();
  })
})