import React from "react";
import { Modal } from "@/components/Common/Modal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal", () => {
  test("Render correctly", async () => {
    render(
      <Modal
        onClose={() => {}}
        isOpen={true}
        label="modal-test"
        title="Modal Title"
        bottomCloseButtonLabel="Close"
      >
        Modal
      </Modal>
    );

    expect(await screen.findByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal")).toBeInTheDocument();

    const closeModalBottomButton = screen.getByRole("button", {
      name: "Close",
    });
    expect(closeModalBottomButton).toBeInTheDocument();

    const topCloseButton = screen.getByRole("button", { name: "close-button" });
    expect(topCloseButton).toBeInTheDocument();
  });

  test("when isOpen is false the modal doesnt appear in the dom", () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose} isOpen={false} label="modal-test">
        Modal
      </Modal>
    );

    expect(screen.queryByText(/modal-text/i)).not.toBeInTheDocument();
  });

  test("calls onClose function", async () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <Modal
        onClose={onClose}
        isOpen={true}
        label="modal-test"
        bottomCloseButtonLabel="close"
      >
        Modal
      </Modal>
    );
    expect(await screen.findByLabelText(/modal-test/i)).toBeInTheDocument();

    const closeButton = await screen.findByRole("button", {
      name: "close-button",
    });
    fireEvent.click(closeButton);

    jest.runAllTimers();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
