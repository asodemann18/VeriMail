import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>       
      <div className='uploaded-header'>
        <Link to='/'>
          <h1 className='app-title'>VeriMail</h1>
        </Link>
        <section className='links'>
          <Link to='/verified-emails'>
            <h3 className='link-name'>Verified Emails</h3>
          </Link>
          <Link to='email-stats'>
            <h3 className='link-name'>Email Stats</h3>
          </Link>
          <Link to='email-details'>
            <h3 className='link-name'>Email Details</h3>
          </Link>
        </section>
      </div> 
    </header>
  )
}

export default Header;
