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
    // <section>
    //   <ul>{verifiedResults.length && verifiedResults}</ul>
    // </section>
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
  )
}

export default VerifiedEmails;