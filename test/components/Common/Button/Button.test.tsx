import { Button } from "@/components/Common/Button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  it("Button is rendered", () => {
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} buttonType="primary">
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("Should have button--primary class", () => {
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} buttonType="primary">
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    expect(button).toHaveClass("button--primary");
  });

  it("Should have button--secondary class", () => {
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} buttonType="secondary">
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    expect(button).toHaveClass("button--secondary");
  });

  it("renders button unchanged", () => {
    const { container } = render(
      <Button onClick={() => {}} buttonType="primary">
        Click me
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
});
