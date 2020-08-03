import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form';
import Header from '../Header/Header';
import Stats from '../Stats/Stats';
import Details from '../Details/Details';
import VerifiedEmails from '../VerifiedEmails/VerifiedEmails';
import { getEmailInfo } from '../../apiCalls';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const App = () => {
  const [ emails, setEmails ] = useState([]);
  const [ fileAdded, setFileAdded ] = useState(false);
  const [error, setError] = useState('');
  console.log(emails, 'emails');
  

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
      setError(error.toString()); 
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
      acc[stat] = Math.round((emails.filter(email => email[stat]).length / emails.length)*100)
    }
    return acc
  },{})

  const avgScore = emails.reduce((acc, email) => {
    return acc += Math.round((email.score / emails.length)*100)
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
          <VerifiedEmails filteredEmails={filteredEmails} error={error}/>
        )}
      />
      <Route 
        exact path='/email-stats'
        render={() => (
          <Stats statsBreakdown={statsBreakdown} avgScore={avgScore}/>
        )}
      />
      <Route 
        exact path='/email-details'
        render={() => (
          <Details emails={emails}/>
        )}
      />

    </main>
  );
}

export default App;

App.propTypes = {
  emails: PropTypes.array,
  setEmails: PropTypes.func,
  fileAdded: PropTypes.bool,
  setFileAdded: PropTypes.func,
  getEmailData: PropTypes.func,
  filteredEmails: PropTypes.array,
  statsList: PropTypes.array,
  statsBreakdown: PropTypes.object,
  avgScore: PropTypes.number,
};