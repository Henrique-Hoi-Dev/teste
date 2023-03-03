import { Card } from "@/components/Platforms/Card";
import { render, screen } from "@testing-library/react";

const cardPropsMock = {
  img: "cedro.png",
  alt: "cedro",
  title: "Start trade",
  price: "R$ 39,90/mês",
  description: `Versão Start da Fast trade na medida para atender o trader que procura
   custo benefício aliados a boas funcionalidades gráficas, ferramentas
   como Times & Trades, Chart Trading, Resumo das Bolsas entre outros.`,
  demoPeriod: "*Demonstrativo: 7 dias",
  buyButtonText: "Contratar",
  href: "https://corretora.miraeasset.com.br/Home/Login",
};

describe("Platforms card", () => {
  test("Should match snapshot", () => {
    const { container } = render(<Card {...cardPropsMock} />);
    expect(container).toMatchSnapshot();
  });

  test("Should render all the required infos", () => {
    render(<Card {...cardPropsMock} />);

    const img = screen.getByRole("img");
    expect(img).toHaveProperty(
      "src",
      expect.stringContaining(cardPropsMock.img)
    );

    expect(screen.getByText(cardPropsMock.title)).toBeInTheDocument();
    expect(screen.getByText(cardPropsMock.price)).toBeInTheDocument();
    expect(
      screen.getByText(cardPropsMock.demoPeriod, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(cardPropsMock.demoPeriod)).toBeInTheDocument();

    const buyButton = screen.getByRole("link", {
      name: cardPropsMock.buyButtonText,
    });
    expect(buyButton).toHaveProperty("href", cardPropsMock.href);
  });
});
