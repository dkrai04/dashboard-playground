import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageContainer } from "@/components";

describe("PageContainer", () => {
  it("renders children", () => {
    render(
      <PageContainer>
        <span>hello</span>
      </PageContainer>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies the default p-6 class", () => {
    const { container } = render(<PageContainer>content</PageContainer>);
    expect(container.firstChild).toHaveClass("p-6");
  });

  it("merges a custom className with the default", () => {
    const { container } = render(
      <PageContainer className="mt-4">content</PageContainer>
    );
    expect(container.firstChild).toHaveClass("p-6");
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("does not duplicate p-6 when no className is passed", () => {
    const { container } = render(<PageContainer>content</PageContainer>);
    const classes = (container.firstChild as HTMLElement).className;
    expect(classes.split(" ").filter((c) => c === "p-6")).toHaveLength(1);
  });
});
