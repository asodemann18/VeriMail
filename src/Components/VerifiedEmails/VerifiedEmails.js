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
    <section className='verified-section'>
      <h3 className='verified-title'>Verified Emails</h3>
      <table>
        {/* <thead>
          <tr>
            <th>V</th>
          </tr>
        </thead> */}
        <tbody>
          {/* <tr> */}
            {verifiedResults.length && verifiedResults}
          {/* </tr> */}
        </tbody>
      </table>
    </section>
  )
}

export default VerifiedEmails;