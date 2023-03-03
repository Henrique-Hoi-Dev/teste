import React from "react";
import { Header } from "@/components/Header";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

const headerMock = {
  data: {
    id: 1,
    attributes: {
      title: "Default",
      createdAt: "2022-11-06T18:59:16.655Z",
      updatedAt: "2022-11-07T01:51:40.494Z",
      publishedAt: "2022-11-06T18:59:18.082Z",
      menu: [
        {
          href: "/algo",
          label: "Sobre",
          subItems: [
            {
              href: "/something",
              label: "Quem somos",
              subItems: [
                {
                  href: "/algo",
                  label: "Fundador",
                },
                {
                  href: "/algo",
                  label: "Sobre nós sub",
                },
              ],
            },
            {
              href: "/something",
              label: "O que fazemos",
            },
          ],
        },
        {
          href: "/algo",
          label: "Comece a investir",
        },
        {
          href: "/algo",
          label: "Para investidores",
        },
      ],
      logo: {
        data: {
          id: 10,
          attributes: {
            name: "Logo.svg",
            alternativeText: "Logo.svg",
            caption: "Logo.svg",
            width: 190,
            height: 68,
            hash: "Logo_cc90a926e0",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 26.36,
            url: "/uploads/Logo_cc90a926e0.svg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-31T13:46:56.335Z",
            updatedAt: "2022-11-06T17:21:26.559Z",
          },
        },
      },
      create_account_link: {
        id: 9,
        Url: "https://corretora.miraeasset.com.br/Cadastro/Passo1",
        Label: "Criar conta",
      },
      login_link: {
        id: 10,
        Url: "https://corretora.miraeasset.com.br/Home/Login",
        Label: "Entrar",
      },
    },
  },
};

describe("header", () => {
  test("Renders correctly", async () => {
    const mock = headerMock.data.attributes;

    render(<Header {...headerMock.data.attributes} />);

    const logo = screen.getByRole("img", {
      name: mock.logo.data.attributes.alternativeText,
    });
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining(mock.logo.data.attributes.url)
    );

    expect(
      screen.getByRole("link", {
        name: mock.login_link.Label,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: mock.create_account_link.Label,
      })
    ).toBeInTheDocument();
  });

  describe("Menu", () => {
    test("Renders all categorys", () => {
      const mock = headerMock.data.attributes;

      render(<Header {...headerMock.data.attributes} />);

      mock.menu.map((item) => {
        const menu = screen.getByText(item.label);
        expect(menu).toBeInTheDocument();
      });
    });

    test("Renders the submenu when the mouse is hovered the menu", async () => {
      render(<Header {...headerMock.data.attributes} />);

      const aboutLink = screen.getByText("Sobre");
      fireEvent.mouseOver(aboutLink);

      const aboutSubMenus = {
        href: "/something",
        label: "Quem somos",
        subItems: [
          {
            href: "/algo",
            label: "Fundador",
          },
          {
            href: "/algo",
            label: "Sobre nós sub",
          },
        ],
      };

      const whoWheAreButton = await screen.findByText(aboutSubMenus.label);

      //Submenu Test
      fireEvent.mouseOver(whoWheAreButton);
      expect(await screen.findByText("Fundador")).toBeInTheDocument();
    });

    test("Menu closes when a click outside the menu is detected", async () => {
      render(<Header {...headerMock.data.attributes} />);

      const aboutLink = screen.getByText("Sobre");
      fireEvent.mouseOver(aboutLink);

      await screen.findByText("Quem somos");

      fireEvent.click(document.body);
      expect(screen.queryByText("Quem somos")).not.toBeInTheDocument();
    });
  });
});
