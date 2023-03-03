import { Accordion } from '@/components/Common/Accordion';
import { render, screen, act } from '@testing-library/react';

const data = {
  title: 'test',
  description: 'test description',
};

describe('Accordion', () => {
  beforeEach(() => {
    render(<Accordion {...data} />);
  });

  test('Should render correctly', async () => {
    expect(screen.queryByText(data.title)).toBeInTheDocument();
    expect(screen.queryByText(data.description)).not.toBeInTheDocument();
    expect(screen.queryByText('Ver mensagem')).toBeInTheDocument();
    expect(screen.queryByText('Esconder mensagem')).not.toBeInTheDocument();
  });

  test('Should show/hide description when button is pressed', async () => {
    const button = screen.getByTestId('accordion-button');

    act(() => {
      button.click();
    });

    expect(screen.queryByText(data.description)).toBeInTheDocument();
    expect(screen.queryByText('Ver mensagem')).not.toBeInTheDocument();
    expect(screen.queryByText('Esconder mensagem')).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(screen.queryByText(data.description)).not.toBeInTheDocument();
    expect(screen.queryByText('Ver mensagem')).toBeInTheDocument();
    expect(screen.queryByText('Esconder mensagem')).not.toBeInTheDocument();
  });
});
