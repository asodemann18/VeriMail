import React from 'react';
import './Details.css';

const Details = ({emails}) => {
  const emailDetailsTitles = emails.map(title => {
    return (
      <tr>
        <td>{title.email}</td>
        <td>{title.did_you_mean}</td>
        <td>{title.user}</td>
        <td>{title.domain}</td>
        <td>{title.format_valid.toString()}</td>
        <td>{title.mx_found.toString()}</td>
        <td>{title.smtp_check.toString()}</td>
        <td>{title.role.toString()}</td>
        <td>{title.disposable.toString()}</td>
        <td>{title.free.toString()}</td>
        <td>{title.score*100}</td>
      </tr>
    )
  })

  return (
    <section className='detail-section'>
      <h3>Email Details</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Did you mean?</th>
            <th>User</th>
            <th>Domain</th>
            <th>Valid Format</th>
            <th>Valid Domain</th>
            <th>Valid User</th>
            <th>Role</th>
            <th>Disposable</th>
            <th>Free</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {emailDetailsTitles}
        </tbody>
      </table>
    </section>
    
  )
}

export default Details;