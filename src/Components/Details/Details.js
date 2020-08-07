import React from 'react';
import './Details.css';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";


const Details = ({emails, error}) => {
  const fixNulls = (data) => {
    return data ? data.toString() : 'false';
  }

  const emailDetails = emails.map(email => {
    return (
      <tr key={email.email}>
        <td className='table-data'>{email.email}</td>
        <td className='table-data'>{email.did_you_mean}</td>
        <td className='table-data'>{email.user}</td>
        <td className='table-data'>{email.domain}</td>
        <td className='table-data'>{fixNulls(email.format_valid)}</td>
        <td className='table-data'>{fixNulls(email.mx_found)}</td>
        <td className='table-data'>{fixNulls(email.smtp_check)}</td>
        <td className='table-data'>{fixNulls(email.role)}</td>
        <td className='table-data'>{fixNulls(email.disposable)}</td>
        <td className='table-data'>{fixNulls(email.free)}</td>
        <td className='table-data'>{fixNulls(email.score)*100+'%'}</td>
      </tr>
    );
  })

  const csvEmailDetails = emails.map(email => {
    return {
      email: email.email,
      did_you_mean: email.did_you_mean,
      user: email.user,
      domain: email.domain,
      valid_format: fixNulls(email.format_valid),
      valid_domain: fixNulls(email.mx_found),
      valid_user:  fixNulls(email.smtp_check),
      role: fixNulls(email.role),
      disposable: fixNulls(email.disposable),
      free: fixNulls(email.free),
      score: fixNulls(email.score)*100+'%',
    }
  })

  return (
    <>
      {error && 
        <section className='error-section'>
          <p className='error-message'>{error}</p>
        </section>}
      {!error && !emails.length && 
        <section className='error-section'>
          <p className='error-message'>No details found. Make sure you are uploading a one column csv with headers.</p>
        </section>}
      {!error && emails.length > 0 &&
        <section className='detail-container'>
          <section className='detail-section'>
          <h3 className='detail-title'>Email Details</h3>
          <table>
            <thead>
              <tr>
                <th className='table-header'>Email</th>
                <th className='table-header'>Did you mean?</th>
                <th className='table-header'>User</th>
                <th className='table-header'>Domain</th>
                <th className='table-header'>Valid Format</th>
                <th className='table-header'>Valid Domain</th>
                <th className='table-header'>Valid User</th>
                <th className='table-header'>Role</th>
                <th className='table-header'>Disposable</th>
                <th className='table-header'>Free</th>
                <th className='table-header'>Score</th>
              </tr>
            </thead>
            <tbody>
              {emailDetails}
            </tbody>
          </table>
          <CSVLink data={csvEmailDetails} filename={'email-details'}>Download Results</CSVLink>
          </section>
        </section>
      }
    </>
  );
}

export default Details;

Details.propTypes = {
  emails: PropTypes.array,
  fixNulls: PropTypes.func,
  emailDetailsTitles: PropTypes.array,
  error: PropTypes.string,
};