import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from "@/app/components/Pagination";

describe("PaginationComponent", () => {
  it("renders the correct number of page links based on totalPages (max 5 pages)", () => {
    const setCurrentPage = jest.fn();

    const { rerender } = render(
      <PaginationComponent currentPage={1} setCurrentPage={setCurrentPage} totalPages={3} />
    );
    let links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);

    rerender(
      <PaginationComponent currentPage={1} setCurrentPage={setCurrentPage} totalPages={10} />
    );
    links = screen.getAllByRole("link");
    expect(links).toHaveLength(7);
  });

  it("calls setCurrentPage with a function to go to the previous page", () => {
    const setCurrentPage = jest.fn();
    render(
      <PaginationComponent currentPage={3} setCurrentPage={setCurrentPage} totalPages={10} />
    );

    const links = screen.getAllByRole("link");
    const previousButton = links[0];

    fireEvent.click(previousButton);

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
    const updateFn = setCurrentPage.mock.calls[0][0];

    expect(updateFn(3)).toBe(2);
  });

  it("calls setCurrentPage with the specific page number when a page link is clicked", () => {
    const setCurrentPage = jest.fn();
    render(
      <PaginationComponent currentPage={3} setCurrentPage={setCurrentPage} totalPages={10} />
    );

    const pageLink = screen.getByText("2");
    fireEvent.click(pageLink);

    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage with a function to go to the next page", () => {
    const setCurrentPage = jest.fn();
    render(
      <PaginationComponent currentPage={3} setCurrentPage={setCurrentPage} totalPages={10} />
    );

    const links = screen.getAllByRole("link");
    const nextButton = links[links.length - 1];

    fireEvent.click(nextButton);

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
    const updateFn = setCurrentPage.mock.calls[0][0];

    expect(updateFn(3)).toBe(4);
  });
});
