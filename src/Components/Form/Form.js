import React, { useState } from 'react';
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
            <button 
              onClick={test}
              type='button'
            >
              Validate
            </button>
          </form>)
      }}
  />
  ) 
}

export default Form;