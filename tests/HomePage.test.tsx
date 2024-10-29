import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

// Mock the entire prisma module
vi.mock("../app/lib/prisma", () => ({
  default: {
    image: {
      findMany: vi.fn(),
    },
  },
}));

describe("HomePage", () => {
  it("renders list of images", async () => {
    const mockImages = [
      { id: "1", title: "Image 1", url: "/image1.jpg" },
      { id: "2", title: "Image 2", url: "/image2.jpg" },
    ];

    const prisma = (await import("../app/lib/prisma")).default;
    prisma.image.findMany.mockResolvedValue(mockImages);

    const page = await HomePage();
    render(page);

    expect(screen.getByText("Choose Map")).toBeInTheDocument();

    mockImages.forEach((image) => {
      expect(screen.getByText(image.title)).toBeInTheDocument();
    });
  
  });

  it("handles empty image list", async () => {
    const prisma = (await import("../app/lib/prisma")).default;
    prisma.image.findMany.mockResolvedValue([]);

    const page = await HomePage();
    render(page);

    expect(screen.getByText("Choose Map")).toBeInTheDocument();
    expect(screen.queryByText("Image 1")).toBeNull();
    expect(screen.queryByText("Image 2")).toBeNull();
    expect(screen.queryByText("Image 3")).toBeNull();
  });
});
