import React from 'react';
import './VerifiedEmails.css';

const VerifiedEmails = ({ emails }) => {
  const filteredEmails = emails.filter(email => {
    return email.format_valid && email.mx_found && 
      email.smtp_check && !email.disposable
  })

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