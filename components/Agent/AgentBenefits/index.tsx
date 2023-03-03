import { AgentBenefitsItem } from '@/components/Agent/AgentBenefits/AgentBenefitsItem';
import { Button } from '@/components/Common/Button';
import { Content } from '@/endpoints/fetchAgentPageData';
import { ChevronLeft } from '@/icons/ChevronLeft';
import { ChevronRight } from '@/icons/ChevronRight';
import { useWindow } from 'hooks/useWindow';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import styles from './styles.module.scss';

interface AgentBenefitsProps {
  title: string;
  items: Content[];
}

export function AgentBenefits({ title, items }: AgentBenefitsProps) {
  const ref = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindow();

  const slidesToShow = width && width > 800 ? 2 : 1;
  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
  };

  function handleNext() {
    ref?.current?.slickNext();
    setCurrentSlide((oldState) => oldState + 1);
  }

  function handlePrevious() {
    ref?.current?.slickPrev();

    if (currentSlide === slidesToShow) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((oldState) => oldState - 1);
    }
  }

  return (
    <section
      aria-labelledby='agent-benefits'
      className={styles['agent-benefits']}
    >
      <h3 id='agent-benefits'>{title}</h3>
      <ul>
        <Slider ref={ref} {...settings}>
          {items.map((benefit) => (
            <AgentBenefitsItem key={benefit.title} item={benefit} />
          ))}
        </Slider>
      </ul>

      <footer>
        <Button
          buttonType='primary'
          onClick={handlePrevious}
          disabled={currentSlide === 0}
        >
          <ChevronLeft />
        </Button>
        <Button
          buttonType='primary'
          onClick={handleNext}
          disabled={currentSlide >= items.length - slidesToShow}
        >
          <ChevronRight />
        </Button>
      </footer>
    </section>
  );
}
