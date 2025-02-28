import { render, screen } from "@testing-library/react";
import LoadingSkeleton, { HeaderSkeleton, CardSkeleton } from "@/app/components/LoadingSkeleton";

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className: string }) => <div data-testid="skeleton" className={className} />,
}));

jest.mock("@/components/ui/accordion", () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("LoadingSkeleton Components", () => {
  test("renders HeaderSkeleton with avatar and username skeletons", () => {
    render(<HeaderSkeleton />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(2);
    expect(skeletons[0]).toHaveClass("w-8 h-8 rounded-full");
    expect(skeletons[1]).toHaveClass("w-24 h-4");
  });

  test("renders CardSkeleton with multiple skeleton elements", () => {
    render(<CardSkeleton />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(5);
    expect(skeletons[0]).toHaveClass("w-32 h-6");
    expect(skeletons[1]).toHaveClass("w-6 h-6");
    expect(skeletons[2]).toHaveClass("w-4 h-4"); 
    expect(skeletons[3]).toHaveClass("w-full h-4");
    expect(skeletons[4]).toHaveClass("w-3/4 h-4 mt-2");
  });

  test("renders LoadingSkeleton component", () => {
    render(<LoadingSkeleton userIndex={1} />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(7);
  });
});
