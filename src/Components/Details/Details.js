import React from 'react';
import './Details.css';
import PropTypes from 'prop-types';

const Details = ({emails, error}) => {
  const fixNulls = (data) => {
    return data ? data.toString() : 'false';
  }

  const emailDetails = emails.map(title => {
    return (
      <tr key={title.email}>
        <td className='table-data'>{title.email}</td>
        <td className='table-data'>{title.did_you_mean}</td>
        <td className='table-data'>{title.user}</td>
        <td className='table-data'>{title.domain}</td>
        <td className='table-data'>{fixNulls(title.format_valid)}</td>
        <td className='table-data'>{fixNulls(title.mx_found)}</td>
        <td className='table-data'>{fixNulls(title.smtp_check)}</td>
        <td className='table-data'>{fixNulls(title.role)}</td>
        <td className='table-data'>{fixNulls(title.disposable)}</td>
        <td className='table-data'>{fixNulls(title.free)}</td>
        <td className='table-data'>{fixNulls(title.score)*100+'%'}</td>
      </tr>
    );
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