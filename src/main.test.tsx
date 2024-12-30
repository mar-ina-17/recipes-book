import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));

jest.mock("./App", () => jest.fn(() => <div data-testid="app">App</div>));

describe("Entry Point (main.tsx)", () => {
  it("renders the app within StrictMode", () => {
    const mockRender = jest.fn();
    const mockRoot = { render: mockRender };
    (createRoot as jest.Mock).mockReturnValue(mockRoot);

    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    require("./main");

    expect(createRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    document.body.removeChild(rootElement);
  });
});
