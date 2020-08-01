import React from 'react';
import './VerifiedEmails.css';

const VerifiedEmails = ({ filteredEmails }) => {
  const verifiedResults = filteredEmails.map(email => {
    return (
      <tr key={email.email}>
        <td>{email.email}</td>
      </tr>
    )
  })

  return (
    <section className='verified-section'>
      <h3 className='verified-title'>Verified Emails</h3>
      <table>
        <tbody>
          {verifiedResults.length && verifiedResults}
        </tbody>
      </table>
    </section>
  )
}

export default VerifiedEmails;