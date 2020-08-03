import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form';
import Header from '../Header/Header';
import Stats from '../Stats/Stats';
import Details from '../Details/Details';
import VerifiedEmails from '../VerifiedEmails/VerifiedEmails';
import { getEmailInfo } from '../../apiCalls';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const App = () => {
  const [ csvEmails, setCsvEmails ] = useState([]);
  const [ fileAdded, setFileAdded ] = useState(false);
  const [ emails, setEmails ] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if(fileAdded) {
      getEmailData();
    }
  },[fileAdded]);

  useEffect(() => {
    if(emails.length && emails[0].success===false) {
      setError('404: Could not verify Emails')
      console.log(emails)
      console.log(error,'error')
    }
  }, [emails])

  
  const getEmailData = async () => {
    try {     
      const data = await Promise.all(csvEmails.map(csvEmail => getEmailInfo(csvEmail.email)));    
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
      <Header />   
      <Switch>
        <Route 
          path='/email-details'
          render={() => (
            <Details emails={emails}/>
          )}
        />
         <Route 
          path='/email-stats'
          render={() => (
            <Stats statsBreakdown={statsBreakdown} avgScore={avgScore} error={error}/>
          )}
        />
        <Route 
          path='/verified-emails'
          render={() => (
            <VerifiedEmails filteredEmails={filteredEmails} error={error}/>
          )}
        />
         <Route 
          exact path='/'
          render={() => (
            <Form setFileAdded={setFileAdded} setCsvEmails={setCsvEmails}/>
          )}
        />
        <Route 
          path='/:undefined'
          render={() => (
            <p className='undefined-route'>This page cannot be found.</p>
          )}
        />
      </Switch>  
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