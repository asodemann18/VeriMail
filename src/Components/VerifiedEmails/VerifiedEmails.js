import React from 'react';
import './VerifiedEmails.css';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";

const VerifiedEmails = ({ filteredEmails, error }) => {
  const verifiedResults = filteredEmails.map(email => {
    return (
      <tr key={email.email}>
        <td>{email.email}</td>
      </tr>
    );
  });

  const csvVerifiedEmails = filteredEmails.map(email => {
    return {verifiedEmails: email.email}
  })

  return (
    <>
      {error && 
        <section className='error-section'>
          <p className='error-message'>{error}</p>
        </section>}
      {!error && !verifiedResults.length && 
        <section className='error-section'>
          <p className='error-message'>No verified emails found. Make sure you are uploading a one column csv with headers.</p>
        </section>}
      {!error && verifiedResults.length > 0 && 
        <section className='verified-container'>
          <section className='verified-section'>
            <h3 className='verified-title'>Verified Emails</h3>
            <table>
              <tbody>
               {verifiedResults}
              </tbody>
            </table>
            <CSVLink data={csvVerifiedEmails} filename={'verified-emails'}>Download Results</CSVLink>
          </section>
        </section>
      } 
    </>
  );
}

export default VerifiedEmails;

VerifiedEmails.propTypes = {
  filteredEmails: PropTypes.array,
  error: PropTypes.string,
  verifiedResults: PropTypes.array,
};