import { VerticalCardList } from "@/components/Common/VerticalCardsList";
import { Investment } from "@/endpoints/fetchHomeData";

interface HomeInvestmentsProps {
  investments: Investment[];
}

export function HomeInvestments({ investments }: HomeInvestmentsProps) {
  const cards = investments.map((investment) => {
    return {
      title: investment.title,
      description: investment.description,
      link: investment.link,
      image: investment.Image,
    };
  });

  return <VerticalCardList cards={cards} />;
}
