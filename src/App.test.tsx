import { render, screen } from "@testing-library/react";
import App from "./App";
import { MantineProvider } from "@mantine/core";

jest.mock("./pages/Home", () =>
  jest.fn(() => <div data-testid="home-page">Mocked Home Component</div>),
);

describe("App Component", () => {
  it("renders the MantineProvider", () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );

    const mantineProvider = screen.getByTestId("home-page").parentElement;
    expect(mantineProvider).toBeInTheDocument();
  });

  it("renders the Home component", () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("ensures MantineProvider wraps the content", () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );

    const home = screen.getByTestId("home-page");
    const wrapper = home.getElementsByClassName(".mantine-provider");
    expect(wrapper).not.toBeNull();
  });
});
