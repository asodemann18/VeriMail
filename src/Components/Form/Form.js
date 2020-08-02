import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css'
import CsvParse from '@vtex/react-csv-parse'

const Form = (props) => {
	const [ fileInput, setFileInput ] = useState([]);

  const handleData = (data) => {
    setFileInput(data)
    props.setFileAdded(false)
  }

  const handleUpload = () => {
    // if(props.emails === []) {
      props.setFileAdded(true)
      props.setEmails(fileInput)
    // } 
    // else {
      
    //   props.setEmails(fileInput)
    // }
  }

  const key = ["email"]

  return(
    <CsvParse
      keys={key}
      onDataUploaded={handleData}
      render={onChange => {
        return(
          <form>
            <label>Upload Csv</label>
            <input
              type='file'
              name='inputFile'
              accept='.csv'
              placeholder='upload csv'
              onChange={onChange}
              aria-label='validate-emails'
            />
            <Link to='/verified-emails'>
              <button 
                onClick={handleUpload}
                type='button'
                className='form-button'
              >
                Verify
              </button>
            </Link>
          </form>)
      }}
  />
  ) 
}

export default Form;