import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CsvParse from '@vtex/react-csv-parse'

const Form = (props) => {
	const [ fileInput, setFileInput ] = useState([]);

  const handleData = (data) => {
    setFileInput(data)
  }

  const test = () => {
    props.setFileAdded(true)
    props.setEmails(fileInput)
  }

  const key = ["email"]

  return(
    <CsvParse
      keys={key}
      onDataUploaded={handleData}
      render={onChange => {
        return(
          <form>
            <input
              type='file'
              name='inputFile'
              accept='.csv'
              onChange={onChange}
              aria-label='validate-emails'
            />
            <Link to='/verified-emails'>
              <button 
                onClick={test}
                type='button'
              >
                Validate
              </button>
            </Link>
          </form>)
      }}
  />
  ) 
}

export default Form;