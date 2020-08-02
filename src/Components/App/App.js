import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form';
import Header from '../Header/Header';
import VerifiedEmails from '../VerifiedEmails/VerifiedEmails';
import { getEmailInfo } from '../../apiCalls';
import { Route } from 'react-router-dom';


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

  const filteredEmails = emails.filter(email => {
    return email.format_valid && email.mx_found && 
      email.smtp_check && !email.disposable
  })

  const statsList = [
    'format_valid',
    'mx_found',
    'smtp_check',
    'role',
    'disposable',
    'free' 
  ]

  const statsBreakdown = statsList.reduce((acc, stat) => {
    if (!acc[stat]) {
      acc[stat] = emails.filter(email => email[stat]).length / email.length
    }
    return acc
  },{})

  const avgScore = emails.reduce((acc, email) => {
    return acc += email.score / email.length
  }, 0)
  
  return (
    <main>
      <Header fileAdded={fileAdded}/>
      
      <Route 
        exact path='/'
        render={() => (
          <Form setFileAdded={setFileAdded} setEmails={setEmails}/>
        )}
      />
      <Route 
        exact path='/verified-emails'
        render={() => (
          <VerifiedEmails filteredEmails={filteredEmails}/>
          // <VerifiedEmails filteredEmails={emails}/>
        )}
      />

    </main>
  );
}

export default App;
