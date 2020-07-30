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
  },[fileAdded]);
  
  const getEmailData = async () => {
    try {     
      const data = await Promise.all(emails.map(email => getEmailInfo(email.email)));      
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
      <Form setFileAdded={setFileAdded} setEmails={setEmails}/>
    </main>
  );
}

export default App;
