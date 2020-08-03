import React,  { useState as useStateMock } from "react";
import App from "./App";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getEmailInfo } from "../../apiCalls";
import MutationObserver from "@sheerun/mutationobserver-shim";
import { act } from "react-dom/test-utils";
window.MutationObserver = MutationObserver;
jest.mock("../../apiCalls");

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

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
  it.only("should be able to upload a file, then be directed to the verified email page that only shows verified emails", async () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
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
      fireEvent.change(input, {target: {files: [file]}})
      fireEvent.click(button);
    });
    // fireEvent.change(input);
    
    
    const pageTitle = await waitFor(() => getByText("Verified Emails"));
    // const sampleEmail = await waitFor(() => getByText('test@gmail.com'));
    expect(pageTitle).toBeInTheDocument();
    // expect(sampleEmail).toBeInTheDocument();
  });

  it('should take the user to the verified emails page that shows an error message if no file has been uploaded', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const verifiedEmailsLink= getByText('Verified Emails');
    fireEvent.click(verifiedEmailsLink);

    const verifiedEmailsPage = getByText('No verified emails found. Make sure you are uploading a one column csv with headers.')
    expect(verifiedEmailsPage);
  })

  it('should take the user to the email stats page that shows an error message if no file has been uploaded', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const emailStatsLink= getByText('Email Stats');
    fireEvent.click(emailStatsLink);

    const emailStatsPage = getByText('No stats found. Make sure you are uploading a one column csv with headers.')
    expect(emailStatsPage);
  })


  it('should take the user to the email details page that shows an error message if no file has been uploaded', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const emailDetailsLink= getByText('Email Details');
    fireEvent.click(emailDetailsLink);

    const emailDetailsPage = getByText('No details found. Make sure you are uploading a one column csv with headers.')
    expect(emailDetailsPage);
  })
});
