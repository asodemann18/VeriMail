import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css'
import CsvParse from '@vtex/react-csv-parse'
import PropTypes from 'prop-types';

const Form = (props) => {
	const [ fileInput, setFileInput ] = useState([]);

  const handleData = (data) => {
    setFileInput(data)
    props.setFileAdded(false)
  }

  const handleUpload = () => {
    props.setFileAdded(true)
    props.setEmails(fileInput)
  }

  const key = ["email"]
  const buttonsEnabled = fileInput.length !== 0;


  return(
    <CsvParse
      keys={key}
      onDataUploaded={handleData}
      render={onChange => {
        return(
          <section className='form-container'>
             <form>
            <label>Upload Csv</label>
            <p><strong>Note:</strong> Make sure the csv is one column and includes a header.</p>
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
                disabled={!buttonsEnabled}
              >
                Verify
              </button>
            </Link>
          </form>
          </section>
        )
      }}
    />
  ) 
}

export default Form;

Form.propTypes = {
  setFileAdded: PropTypes.func,
  setEmails: PropTypes.func,
  fileInput: PropTypes.array,
  setFileInput: PropTypes.func,
  handleData: PropTypes.func,
  handleUpload: PropTypes.func,
  key: PropTypes.array,
  buttonsEnabled: PropTypes.bool,
};