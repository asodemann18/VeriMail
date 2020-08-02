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
    
    expect(charts.length).toEqual(6);
    expect(avgTitle).toBeInTheDocument();
    expect(avgScore).toBeInTheDocument();

    // debug();
  })    
})