import './mock';
import { Carousel } from '@/components/Common/Carousel';
import { render, screen, act } from '@testing-library/react';

const data = {
  heading: 'title',
  items: [
    {
      title: 'test',
      description: 'test description',
      content: 'content',
      footer: 'footer',
    },
    {
      title: 'testt',
      description: 'test descriptionn',
      content: 'contentt',
      footer: 'footerr',
    },
  ],
};

describe('Carousel', () => {
  beforeEach(() => {
    render(<Carousel {...data} />);
  });

  test('Should render correctly', async () => {
    expect(screen.queryByText(data.heading)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].title)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].description)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].content)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].footer)).toBeInTheDocument();
  });

  test('Should change to the second item and back to first', async () => {
    const button2 = screen.getByText('2');
    const button1 = screen.getByText('1');

    act(() => {
      button2.click();
    });

    expect(screen.queryByText(data.items[1].title)).toBeInTheDocument();
    expect(screen.queryByText(data.items[1].description)).toBeInTheDocument();
    expect(screen.queryByText(data.items[1].content)).toBeInTheDocument();
    expect(screen.queryByText(data.items[1].footer)).toBeInTheDocument();

    act(() => {
      button1.click();
    });

    expect(screen.queryByText(data.items[0].title)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].description)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].content)).toBeInTheDocument();
    expect(screen.queryByText(data.items[0].footer)).toBeInTheDocument();
  });
});
