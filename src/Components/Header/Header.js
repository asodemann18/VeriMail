import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({fileAdded}) => {

  return (
    <header>
      {!fileAdded && 
        <Link to='/'>
          <h1>VeriMail</h1>
        </Link>
      }
      {fileAdded && 
        <div>
          <Link to='/verified-emails'>
            <h1>VeriMail</h1>
          </Link>
          <section>
            <Link to='email-stats'>
              <h3>Stats</h3>
            </Link>
            <Link to='email-details'>
              <h3>Details</h3>
            </Link>
            <Link to='/'>
              <h3>Verify Emails</h3>
            </Link>
          </section>

        </div> 
      }
    </header>
  )
}

export default Header;