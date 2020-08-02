import React from 'react';
import './VerifiedEmails.css';

const VerifiedEmails = ({ filteredEmails }) => {
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
            {verifiedResults.length && verifiedResults}
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default VerifiedEmails;