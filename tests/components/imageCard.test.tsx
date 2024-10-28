import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageCard from "../../app/ui/imageCard";

describe("ImageCard", () => {
  it("renders image and title", () => {
    render(<ImageCard url="/test-image.jpg" title="Test Image" id="123" />);

    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    expect(screen.getByText("Test Image")).toBeInTheDocument();
  });
});
