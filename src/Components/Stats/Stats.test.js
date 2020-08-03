import React from 'react';
import Stats from './Stats';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const sampleStatsBreakdown = {
  format_valid: 100,
  mx_found: 100,
  smtp_check: 75,
  role: 25,
  disposable: 0,
  free: 75,
}

const sampleAvgScore = 68;

const sampleFailingStatsBreakdown = {
  format_valid: NaN,
  mx_found: NaN,
  smtp_check: NaN,
  role: NaN,
  disposable: NaN,
  free: NaN,
}

const sampleFailingAvgScore = NaN;

describe('Stats', () => {
  it('should display six charts and an average overall score', () => {
    const { getAllByTestId, getByText } = render(
      <MemoryRouter>
        <Stats statsBreakdown={sampleStatsBreakdown} avgScore={sampleAvgScore} />
      </MemoryRouter>
    )
    const avgTitle = getByText('Average Overall Score');
    const avgScore = getByText('68%');
    const charts = getAllByTestId('chart');
    
    expect(avgTitle).toBeInTheDocument();
    expect(avgScore).toBeInTheDocument();
    expect(charts.length).toEqual(6);
  })    

  it('should display an error message if no file has been uploaded', () => {
    const { getAllByTestId, getByText } = render(
      <MemoryRouter>
        <Stats statsBreakdown={sampleFailingStatsBreakdown} avgScore={sampleFailingAvgScore} />
      </MemoryRouter>
    )
    const errorMsg = getByText('No verified emails found. Make sure you are uploading a one column csv with headers.')
    expect(errorMsg).toBeInTheDocument();
  })  
})