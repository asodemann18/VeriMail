# [VeriMail](https://verimail.netlify.app/)

# Project By: [Alex Sodemann](https://github.com/asodemann18)

# About
VeriMail was created for small business owners who want to ensure they're sending email campaigns to qualified addresses. A user can upload a csv of emails, and then see all the verified addresses from their list. They can also see overall statistics (% valid domain, % valid user, etc) and take a detailed look at the information for every email from their file.

The email validation is being done through the [mailboxlayer](https://mailboxlayer.com/) api.

# Project Goals
* Effectively use React, Router, and Async JavaScript
* Deliver a unique product that solves a problem using an api

# In Action
![In Action](https://media.giphy.com/media/IfxhDIxI2d0pDD45NB/giphy.gif)

## Setup
[View it here.](https://verimail.netlify.app/)

Download Instructions: 
```bash 
git clone [this file path]
cd verimail
npm install 
npm start
```

### Technologies Used:
* React
  * Hooks
* React Testing Library
* Jest
* HTML/CSS
* npm
  * react-chartjs-2
  * react-csv-parse

### Future Plans
* Allow a user to download the results
* Let a user add weights and calculate their own score for the email data vs using the one that comes from the api directly 
