import React from "react";
import App from "./App";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { getEmailInfo } from "../../apiCalls";
import MutationObserver from "@sheerun/mutationobserver-shim";
import { createMemoryHistory } from 'history'
window.MutationObserver = MutationObserver;
jest.mock("../../apiCalls");

getEmailInfo.mockResolvedValue([
  {
    email: "test@gmail.com",
    did_you_mean: "",
    user: "test",
    domain: "gmail.com",
    format_valid: true,
    mx_found: true,
    smtp_check: true,
    catch_all: null,
    role: false,
    disposable: false,
    free: true,
    score: 0.8,
  },
  {
    email: "test@lol.com",
    did_you_mean: "test@aol.com",
    user: "test",
    domain: "lol.com",
    format_valid: true,
    mx_found: false,
    smtp_check: false,
    catch_all: null,
    role: false,
    disposable: false,
    free: true,
    score: 0.2,
  },
]);

describe("App", () => {
  it.skip("should be able to upload a file, then be directed to the verified email page that only shows verified emails", async () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const file = new File(['email\ntest@gmail.com'], "test.csv", {type: 'text/csv'});
    const input = getByPlaceholderText("upload csv");
    const button = getByRole("button", { name: "Verify" });
    // Object.defineProperty(input, 'files', {
    //   value: [file],
    // })
    // Object.defineProperty(input, 'value', {
    //   value: file.name,
    // });
    // console.log(file.fileParts, 'file')
    act(() => {
      fireEvent.change(input, {target: {files: [file]}});
      fireEvent.click(button);
    });    
    
    // const pageTitle = await waitFor(() => getByText("Verified Emails"));
    // const sampleEmail = await waitFor(() => getByText('test@gmail.com'));
    // expect(pageTitle).toBeInTheDocument();
    // expect(sampleEmail).toBeInTheDocument();
  });

  it('should take the user to the verified emails page that shows an error message if no file has been uploaded', () => {
    const history = createMemoryHistory();
    const { getByText } = render (
      <Router history={history}>
        <App />
      </Router>
    )
      
    const verifiedEmailsLink= getByText('Verified Emails');
    fireEvent.click(verifiedEmailsLink);

    const verifiedEmailsPage = getByText('No verified emails found. Make sure you are uploading a one column csv with headers.');
    expect(verifiedEmailsPage).toBeInTheDocument();
    expect(history.location.pathname).toBe("/verified-emails");
  });

  it('should take the user to the email stats page that shows an error message if no file has been uploaded', () => {
    const history = createMemoryHistory();
    const { getByText } = render (
      <Router history={history}>
        <App />
      </Router>
    );

    const emailStatsLink= getByText('Email Stats');
    fireEvent.click(emailStatsLink);

    const emailStatsPage = getByText('No stats found. Make sure you are uploading a one column csv with headers.');
    expect(emailStatsPage).toBeInTheDocument();
    expect(history.location.pathname).toBe("/email-stats")
  });

  it('should take the user to the email details page that shows an error message if no file has been uploaded', () => {
    const history = createMemoryHistory();
    const { getByText } = render (
      <Router history={history}>
        <App />
      </Router>
    );

    const emailDetailsLink= getByText('Email Details');
    fireEvent.click(emailDetailsLink);

    const emailDetailsPage = getByText('No details found. Make sure you are uploading a one column csv with headers.');
    expect(emailDetailsPage).toBeInTheDocument();
    expect(history.location.pathname).toBe("/email-details");
  });

  it('should take a user back to the homepage when they click on the page title', () => {
    const history = createMemoryHistory();
    const { getByText } = render (
      <Router history={history}>
        <App />
      </Router>
    );

    const emailDetailsLink= getByText('Email Details');
    const title= getByText('VeriMail');
    fireEvent.click(emailDetailsLink);
    const emailDetailsPage = getByText('No details found. Make sure you are uploading a one column csv with headers.');
    expect(emailDetailsPage).toBeInTheDocument();
    
    fireEvent.click(title);
    expect(history.location.pathname).toBe("/");
    
    const formTitle = getByText('Upload Csv');
    expect(formTitle).toBeInTheDocument();
  });

  it('should show an error message if a user goes to an undefined route', () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    const { getByText } = render (
      <Router history={history}>
        <App />
      </Router>
    );

    const errorMsg = getByText('This page cannot be found.');
    expect(errorMsg).toBeInTheDocument();
  });
});
