import { InfoCard } from "@/components/Common/InfoCard";
import { render, screen } from "@testing-library/react";

const cardPropsMock = {
  title: "Mesa de operações",
  phoneNumber: "(11) 2789-2001",
  infoMessage: "Mesa de Operações Agentes autônomos: (11) 2789-2160",
};

const cardPropsMock2 = {
  title: "Atendimento",
  phoneNumber: "(11) 2789-2000",
  email: "atendimento.ctvm@miraeinvest.com.br",
};

describe("Platforms card", () => {
  test("Should render correctly", () => {
    render(<InfoCard {...cardPropsMock} />);

    expect(screen.getByText(cardPropsMock.title)).toBeInTheDocument();
    expect(screen.getByText(cardPropsMock.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(cardPropsMock.infoMessage)).toBeInTheDocument();
  });

  test("Should render a link with email if email is passed by props", () => {
    render(<InfoCard {...cardPropsMock2} />);

    expect(screen.getByText(cardPropsMock2.title)).toBeInTheDocument();
    expect(screen.getByText(cardPropsMock2.phoneNumber)).toBeInTheDocument();

    const emailLink = screen.getByRole("link", {
      name: cardPropsMock2.email,
    });
    expect(emailLink).toHaveProperty("href", `mailto:${cardPropsMock2.email}`);
  });
});
