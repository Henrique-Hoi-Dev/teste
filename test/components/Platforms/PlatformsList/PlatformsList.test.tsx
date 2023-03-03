import { PlatformsList } from "@/components/Platforms/PlatformsList";
import { render, screen, within } from "@testing-library/react";
import { data } from "./mock";

describe("Platforms list", () => {
  test("Should render correctly", async () => {
    render(<PlatformsList data={data} />);

    const platformsListByDeveloper = await screen.findAllByRole("list");
    expect(platformsListByDeveloper.length).toEqual(4);

    expect(screen.getByText("Cedro")).toBeInTheDocument();
    expect(screen.getByText(/Plug and trade/i)).toBeInTheDocument();
    expect(screen.getByText("Nelogica")).toBeInTheDocument();
    expect(screen.getByText("Cellbroker")).toBeInTheDocument();

    const cedroPlatformsContainer = screen.getByLabelText("Cedro-platforms");
    const cedroPlatforms = within(cedroPlatformsContainer).getAllByRole(
      "listitem"
    );
    expect(cedroPlatforms.length).toEqual(2);
  });
});
