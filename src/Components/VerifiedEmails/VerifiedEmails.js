import React from 'react';
import './VerifiedEmails.css';

const VerifiedEmails = ({ filteredEmails }) => {
    const verifiedResults = filteredEmails.map(email => {
    return (
      <li>{email.email}</li>
    )
  })

  return (
    <section>
      <ul>{verifiedResults.length && verifiedResults}</ul>
    </section>
  )
}

export default VerifiedEmails;