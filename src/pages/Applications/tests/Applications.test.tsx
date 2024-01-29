import { render, screen } from "@testing-library/react";
import Applications from "../Applications";
import { getSingleApplicationFixture } from "../../../__fixtures__/applications.fixture.js";
import userEvent from "@testing-library/user-event";

const applications = getSingleApplicationFixture;

const mockLoadMore = vi.fn();

vi.mock("../../../network/useFetchApplications", () => ({
  useFetchApplications: () => ({
    applications: applications,
    isLoading: false,
    loadMore: mockLoadMore,
  }),
}));

describe("Applications", () => {
  test("renders applications and load more button", () => {
    // Render the Applications component
    render(<Applications />);

    // Assert that the applications are rendered
    const application1 = screen.getByText(applications[0].company);
    const application2 = screen.getByText(applications[1].company);
    expect(application1).toBeInTheDocument();
    expect(application2).toBeInTheDocument();

    // Assert that the load more button is rendered
    const loadMoreButton = screen.getByText("Load more");
    expect(loadMoreButton).toBeInTheDocument();
  });

  test("calls loadMore function when load more button is clicked", () => {
    // Render the Applications component
    render(<Applications />);

    // Simulate a click on the load more button
    const loadMoreButton = screen.getByText("Load more");
    userEvent.click(loadMoreButton);

    // Assert that the loadMore function is called
    expect(mockLoadMore).toHaveBeenCalled();
  });
});
