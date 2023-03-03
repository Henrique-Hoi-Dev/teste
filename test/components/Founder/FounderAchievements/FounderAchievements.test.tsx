import { FounderAchievements } from '@/components/Founder/FounderAchievements';
import { render, screen } from '@testing-library/react';

const data = [
  {
    year: 2022,
    description: 'Appointed as Global Investment Strategy Officer (GISO)',
  },
  {
    year: 2021,
    description: 'Awarded 26th Dasan Financial Grand Prize',
  },
  {
    year: 2004,
    description:
      'Awarded KASBA (Korean Academic Society of Business Administration) Best Company Award',
  },
];

describe('Founder Achievements', () => {
  test('Should render correctly', async () => {
    render(<FounderAchievements achievements={data} />);

    const achievements = await screen.findAllByTestId('founder-achievement');
    expect(achievements.length).toBe(3);
    expect(screen.getByText(data[0].year)).toBeInTheDocument();
    expect(screen.getByText(data[0].description)).toBeInTheDocument();
    expect(screen.getByText(data[1].year)).toBeInTheDocument();
    expect(screen.getByText(data[1].description)).toBeInTheDocument();
    expect(screen.getByText(data[2].year)).toBeInTheDocument();
    expect(screen.getByText(data[2].description)).toBeInTheDocument();
  });
});
