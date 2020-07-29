import React, { useEffect, useState } from 'react';
import CsvParse from '@vtex/react-csv-parse'

const Form = () => {
	const [ fileInput, setFileInput ] = useState([]);

  const handleData = (data) => {
    // this.setState({fileInput: data})
    setFileInput(data)
  }

  const keys = [
    "email"
  ]

  return(
    <CsvParse
      keys={keys}
      onDataUploaded={handleData}
      render={onChange => {
        return(
          <form>
            <input
              type="file"
              name="inputFile"
              accept=".csv"
              // value={this.state.emailInput}
              onChange={onChange}
              aria-label="validate-emails"
            />
              <button 
                // onClick={() => this.props.getEmailData(this.state.emailInput)}
                onClick={fileInput}
                type="button"
              >
                Validate
              </button>
          </form>)
      }}
  />
  ) 
}

export default Form;