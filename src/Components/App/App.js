import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form';
import { getEmailInfo } from '../../apiCalls';

const App = () => {
  const [ fileEmails, setFileEmails ] = useState([]);
  const [ fileAdded, setFileAdded ] = useState(false);
  const [ emails, setEmails ] = useState([])
  const [error, setError] = useState('');

  useEffect(() => {
    if(fileAdded) {
      getEmailData();
    }
  },[fileAdded]);
  
  const getEmailData = async () => {
    try {
      const data = await Promise.all(fileEmails.map(m => {
        getEmailInfo(m.email)
        console.log(m.email);   
      }));      
      // console.log(fileEmails)
      // const data = await Promise.all([{email: 'margarita'}, {email: 'martini'}].map(m => getEmailInfo(m.email)))
    // const data = await Promise.all([{email: 'margarita'},{email: 'martini'}].map((async (email) => {
    //   const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${email.email}`)
    //   return response.json();
    // })))      
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
      <Form setFileAdded={setFileAdded} setFileEmails={setFileEmails}/>
    </main>
  );
}

export default App;
