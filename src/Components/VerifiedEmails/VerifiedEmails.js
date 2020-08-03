import React from 'react';
import './VerifiedEmails.css';
import PropTypes from 'prop-types';

const VerifiedEmails = ({ filteredEmails, error }) => {
  const verifiedResults = filteredEmails.map(email => {
    return (
      <tr>
        <td>{email.email}</td>
      </tr>
    )
  })

  return (
    <section className='verified-container'>
      <section className='verified-section'>
        <h3 className='verified-title'>Verified Emails</h3>
        <table>
          <tbody>
           {error && <p>404: Unable to verify emails</p>}
           {!error && verifiedResults}
           {!error && !verifiedResults.length && <p>No verified emails found. Make sure you're uploading a one column csv with headers!</p>}
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default VerifiedEmails;

VerifiedEmails.propTypes = {
  filteredEmails: PropTypes.array,
  // error: PropTypes.???,
  verifiedResults: PropTypes.array,
};