import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({fileAdded}) => {

  return (
    <header>
      {!fileAdded && 
        <Link to='/'>
          <h1 className='app-title'>VeriMail</h1>
        </Link>
      }
      {fileAdded && 
        <div className='uploaded-header'>
          <Link to='/verified-emails'>
            <h1 className='app-title'>VeriMail</h1>
          </Link>
          <section className='links'>
            <Link to='email-stats'>
              <h3 className='link-name'>Stats</h3>
            </Link>
            <Link to='email-details'>
              <h3 className='link-name'>Details</h3>
            </Link>
            <Link to='/'>
              <h3 className='link-name'>Verify Emails</h3>
            </Link>
          </section>
        </div> 
      }
    </header>
  )
}

export default Header;