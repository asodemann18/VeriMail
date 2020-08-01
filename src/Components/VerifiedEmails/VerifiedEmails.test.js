import React from 'react';
import VerifiedEmails from './VerifiedEmails';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const testFilteredEmails = [
  {
    "email": "test@gmail.com",
    "did_you_mean": "",
    "user": "test",
    "domain": "gmail.com",
    "format_valid": true,
    "mx_found": true,
    "smtp_check": true,
    "catch_all": null,
    "role": false,
    "disposable": false,
    "free": true,
    "score": 0.8
  },
  {
    "email": "test@aol.com",
    "did_you_mean": "",
    "user": "test",
    "domain": "aol.com",
    "format_valid": true,
    "mx_found": true,
    "smtp_check": true,
    "catch_all": null,
    "role": false,
    "disposable": false,
    "free": true,
    "score": 0.8
  }  
]

describe('Verified Emails', () => {
  it('should display emails that have been verified', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <VerifiedEmails filteredEmails={testFilteredEmails}/>
      </MemoryRouter>
    )

    const title = getByText('Verified Emails');
    const passingEmail = getByText('test@gmail.com')
    const failingEmail = queryByText('test@aol.com')

    expect(title).toBeInTheDocument();
    expect(passingEmail).toBeInTheDocument();
    expect(failingEmail).toBeInTheDocument();
  })
})