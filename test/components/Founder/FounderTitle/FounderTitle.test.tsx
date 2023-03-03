import { FounderTitle } from '@/components/Founder/FounderTitle';
import { render, screen } from '@testing-library/react';

const data = {
  title: 'Test',
  description: 'Test description',
  imageUrl:
    'https://www.google.com/search?q=google&tbm=isch&source=iu&ictx=1&vet=1&fir=mM5eejaz-bUIsM%252C0UCf55-GTy6fDM%252C%252Fm%252F045c7b&usg=AI4_-kSYAGYPZdf4mjV9iTOVhdppGBfSaw&sa=X&ved=2ahUKEwjI-v_4m5X7AhWarZUCHaluA1AQ_B16BAhSEAI#imgrc=mM5eejaz-bUIsM',
};

describe('Founder Title', () => {
  test('Should render correctly', async () => {
    render(<FounderTitle {...data} />);

    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
    expect(screen.getByTestId('founder-title-img')).toBeInTheDocument();
  });
});
