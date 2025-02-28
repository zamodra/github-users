import React from "react";
import { render, screen } from "@testing-library/react";
import RepoCard from "@/app/components/RepoCard";

describe("RepoCard Component", () => {
  const mockRepo = {
    id: 1,
    name: "Test Repo",
    stargazers_count: 42,
    description: "This is a test repository",
    html_url: "https://github.com/test/repo",
  };

  it("renders the repository name", () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByText("Test Repo")).toBeInTheDocument();
  });

  it("displays the correct star count", () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows the correct description", () => {
    render(<RepoCard repo={mockRepo} />);
    expect(screen.getByText("This is a test repository")).toBeInTheDocument();
  });

  it("renders default message when description is missing", () => {
    const repoWithoutDescription = { ...mockRepo, description: "" };
    render(<RepoCard repo={repoWithoutDescription} />);
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("contains a link to the repository", () => {
    render(<RepoCard repo={mockRepo} />);
    const link = screen.getByRole("link", { name: /View Repository/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockRepo.html_url);
  });
});
