import React from 'react';
import './Details.css';

const Details = ({emails}) => {
  const emailDetailsTitles = emails.map(title => {
    return (
      <tr key={title.email}>
        <td className='table-data'>{title.email}</td>
        <td className='table-data'>{title.did_you_mean}</td>
        <td className='table-data'>{title.user}</td>
        <td className='table-data'>{title.domain}</td>
        <td className='table-data'>{title.format_valid.toString()}</td>
        <td className='table-data'>{title.mx_found.toString()}</td>
        <td className='table-data'>{title.smtp_check.toString()}</td>
        <td className='table-data'>{title.role.toString()}</td>
        <td className='table-data'>{title.disposable.toString()}</td>
        <td className='table-data'>{title.free.toString()}</td>
        <td className='table-data'>{title.score*100 + '%'}</td>
      </tr>
    )
  })

  return (
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
          {emailDetailsTitles}
        </tbody>
      </table>
      </section>
    </section>
  )
}

export default Details;