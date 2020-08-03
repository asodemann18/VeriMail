import React from "react";
import App from "./App";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getEmailInfo } from "../../apiCalls";
import MutationObserver from "@sheerun/mutationobserver-shim";
import { act } from "react-dom/test-utils";
import CsvParse from '@vtex/react-csv-parse'
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
  it("should be able to upload a file, then be directed to the verified email page that only shows verified emails", async () => {
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
});
