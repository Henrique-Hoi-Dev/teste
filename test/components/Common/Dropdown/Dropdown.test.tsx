import { Dropdown } from "@/components/Common/Dropdown";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Dropdown", () => {
  it("Dropdown is rendered correctly", async () => {
    render(
      <Dropdown actionButtonTitle="Open">
        <li>item a</li>
        <li>item b</li>
      </Dropdown>
    );

    const openDropdownButton = screen.getByText("Open");

    expect(screen.queryByText("item a")).not.toBeInTheDocument();
    expect(screen.queryByText("item b")).not.toBeInTheDocument();

    fireEvent.click(openDropdownButton);

    expect(await screen.findByText("item a")).toBeInTheDocument();
    expect(await screen.findByText("item a")).toBeInTheDocument();

    fireEvent.click(openDropdownButton);

    expect(screen.queryByText("item a")).not.toBeInTheDocument();
    expect(screen.queryByText("item b")).not.toBeInTheDocument();
  });
});
