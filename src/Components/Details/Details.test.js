import React from 'react';
import Details from './Details';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const sampleEmails = [
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
    "email": "test2@lol.com",   
    "did_you_mean": "test2@aol.com",
    "user": "test2",
    "domain": "lol.com",
    "format_valid": true,
    "mx_found": true,
    "smtp_check": false,
    "catch_all": null,
    "role": false,
    "disposable": false,
    "free": false,
    "score": 0.32
  }
]

describe('Details', () => {
  it('should display a table with headers', () => {
    const {getByText} = render(
      <MemoryRouter>
        <Details emails={sampleEmails}/>
      </MemoryRouter>
    )

    const emailTitle = getByText('Email');
    const didYouMeanTitle = getByText('Email');
    const userTitle = getByText('Email');
    const domainTitle = getByText('Email');
    const formatTitle = getByText('Email');
    const validDomainTitle = getByText('Email');
    const validUserTitle = getByText('Email');
    const disposableTitle = getByText('Email');
    const roleTitle = getByText('Email');
    const freeTitle = getByText('Email');
    const scoreTitle = getByText('Email');

    expect(emailTitle).toBeInTheDocument();
    expect(didYouMeanTitle).toBeInTheDocument();
    expect(userTitle).toBeInTheDocument();
    expect(domainTitle).toBeInTheDocument();
    expect(formatTitle).toBeInTheDocument();
    expect(validDomainTitle).toBeInTheDocument();
    expect(validUserTitle).toBeInTheDocument();
    expect(disposableTitle).toBeInTheDocument();
    expect(roleTitle).toBeInTheDocument();
    expect(freeTitle).toBeInTheDocument();
    expect(scoreTitle).toBeInTheDocument();
  });

  it('should display the data returned from the api', () => {
    const {getByText, getAllByText} = render(
      <MemoryRouter>
        <Details emails={sampleEmails}/>
      </MemoryRouter>
    )

    const trueValues = getAllByText('true');
    const falseValues = getAllByText('false');
    const email1 = getByText('test@gmail.com');
    const email2 = getByText('test2@lol.com');
    const didYouMean1 = getByText('test2@aol.com');
    const user1 = getByText('test');
    const user2 = getByText('test2');
    const domain1 = getByText('gmail.com');
    const domain2 = getByText('lol.com');
    const score1 = getByText('80%');
    const score2 = getByText('32%');

    expect(trueValues.length).toEqual(6);
    expect(falseValues.length).toEqual(6);
    expect(email1).toBeInTheDocument();
    expect(email2).toBeInTheDocument();
    expect(didYouMean1).toBeInTheDocument();
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(domain1).toBeInTheDocument();
    expect(domain2).toBeInTheDocument();
    expect(score1).toBeInTheDocument();
    expect(score2).toBeInTheDocument();
  })
})