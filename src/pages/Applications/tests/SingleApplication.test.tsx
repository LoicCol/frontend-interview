import { render } from "@testing-library/react";
import SingleApplication from "../SingleApplication";

describe("SingleApplication", () => {
  const application = {
    company: "ABC Company",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    loan_amount: 10000,
    date_created: new Date("2022-01-01"),
    expiry_date: new Date("2022-01-31"),
  };

  it("renders application details correctly", () => {
    const { getByText } = render(
      <SingleApplication application={application} />
    );

    expect(getByText("Company")).toBeInTheDocument();
    expect(getByText("ABC Company")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("john.doe@example.com")).toBeInTheDocument();
    expect(getByText("Loan Amount")).toBeInTheDocument();
    expect(getByText("£10,000")).toBeInTheDocument();
    expect(getByText("Application Date")).toBeInTheDocument();
    expect(getByText("01-01-2022")).toBeInTheDocument();
    expect(getByText("Expiry date")).toBeInTheDocument();
    expect(getByText("31-01-2022")).toBeInTheDocument();
  });
});
