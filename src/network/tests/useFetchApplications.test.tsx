import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchApplications, Application } from "../useFetchApplications";
import nock from "nock";

// Mock fetch API
nock("https://api.example.com")
  .persist()
  .get("/applications?_page=0&_limit=5")
  .reply(200, [
    {
      guid: "123",
      loan_amount: 1000,
      first_name: "John",
      last_name: "Doe",
      company: "Company",
      email: "john.doe@example.com",
      date_created: "2022-01-01",
      expiry_date: "2022-12-31",
    },
  ]);

describe("useFetchApplications", () => {
  it("should return initial state", async () => {
    const { result } = renderHook(() => useFetchApplications());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.applications).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.applications).toEqual([
      {
        guid: "123",
        loan_amount: 1000,
        first_name: "John",
        last_name: "Doe",
        company: "Company",
        email: "john.doe@example.com",
        date_created: "2022-01-01",
        expiry_date: "2022-12-31",
      },
    ]);
  });

  it("should load more applications", async () => {
    const { result } = renderHook(() => useFetchApplications());

    await waitFor(() => expect(result.current.applications.length).toBe(0));

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.applications.length).toBe(2));

    expect(result.current.applications[1]).toEqual({
      guid: "123",
      loan_amount: 1000,
      first_name: "John",
      last_name: "Doe",
      company: "Company",
      email: "john.doe@example.com",
      date_created: "2022-01-01",
      expiry_date: "2022-12-31",
    });
  });
});
