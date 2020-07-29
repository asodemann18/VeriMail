import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form';
import { getEmailInfo } from '../../apiCalls';

const App = () => {
  const [ emails, setEmails ] = useState([]);
  const [ fileAdded, setFileAdded ] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if(fileAdded) {
      getEmailData();
    }
  });
  
  const getEmailData = async () => {
    try {
      const data = await getEmailInfo(emails);
      setEmails(data);
    } catch(error) {
      setError(error); 
    }
  }
  
  return (
    <main>
      <header >
        VeriMail
      </header>
      <Form setFileAdded={setFileAdded}/>
    </main>
  );
}

export default App;
