import { useEffect, useReducer } from "react";
import { API_URL } from "./constants";

export type Application = {
  guid: string;
  loan_amount: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  date_created: string;
  expiry_date: string;
};

type State = {
  applications: Application[];
  isLoading: boolean;
  page: number;
  loadedPages: number[];
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Application[] }
  | { type: "FETCH_ERROR" }
  | { type: "LOAD_MORE" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        applications: action.payload,
        isLoading: false,
        loadedPages: [...state.loadedPages, state.page],
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };
    case "LOAD_MORE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

export const useFetchApplications = (): {
  applications: Application[];
  isLoading: boolean;
  loadMore: () => void;
} => {
  const [state, dispatch] = useReducer(reducer, {
    applications: [],
    isLoading: false,
    page: 1,
    loadedPages: [],
  });

  const fetchApplications = async () => {
    if (state.loadedPages.includes(state.page)) {
      return;
    }

    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        `${API_URL}/applications?_page=${state.page}&_limit=5`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch({
        type: "FETCH_SUCCESS",
        payload: [...state.applications, ...data],
      });
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const loadMore = () => {
    dispatch({ type: "LOAD_MORE" });
  };

  useEffect(() => {
    fetchApplications();
  }, [state.page]);

  return {
    applications: state.applications,
    isLoading: state.isLoading,
    loadMore,
  };
};
