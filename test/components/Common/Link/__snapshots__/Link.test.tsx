import { Link } from "@/components/Common/Link";
import { render, screen } from "@testing-library/react";

describe("Link", () => {
  it("Link renders, and have the right href", () => {
    render(<Link href="/home"> Home Link </Link>);

    const link = screen.getByRole("link", { name: "Home Link" });
    expect(link).toHaveProperty("href", expect.stringContaining("/home"));
  });

  it("renders link unchanged", () => {
    const { container } = render(<Link href="/home">Link</Link>);
    expect(container).toMatchSnapshot();
  });
});
