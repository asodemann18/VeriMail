import React, { useEffect, useState } from 'react';
import './App.css';
import Form from '../Form/Form'

const App = () => {
	const [ emails, setEmails ] = useState([]);
  
  return (
    <main className="App">
      <header >
        VeriMail
      </header>
      <Form />
    </main>
  );
}

export default App;
