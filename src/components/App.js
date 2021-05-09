import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Transtion from "./Transaction";
import Search from "./Search";
import Summary from "./Summary";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const TRANSATION_API_URL = "https://blockchain.info/rawblock/";

const initialState = {
  loading: true,
  transation: [],
  errorMessage: null,
  page: 1,
  pageSize: 5,
  total: 0,
  list: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRANSTION_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_TRANSTION_SUCCESS":
      return {
        ...state,
        loading: false,
        transation: action.payload.transation,
        page: 1,
        total: action.payload.total,
        list: action.payload.list,
      };
    case "SEARCH_TRANSTION_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case "SEARCH_TRANSTION_PAGE":
      return {
        ...state,
        page: action.payload.page,
        list: action.payload.list,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const { pageSize } = state;
      const response = await fetch(
        `${TRANSATION_API_URL}00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa`
      );
      const jsonResponse = await response.json();
      const total = jsonResponse.tx ? jsonResponse.tx.length : 0;
      let list = [];
      if (total > 0) {
        list = jsonResponse.tx.slice(0, pageSize);
      }
      dispatch({
        type: "SEARCH_TRANSTION_SUCCESS",
        payload: {
          total: total,
          list: list,
          transation: jsonResponse,
        },
      });
    })();
  }, []);

  const search = async (searchValue) => {
    dispatch({
      type: "SEARCH_TRANSTION_REQUEST",
    });

    const response = await fetch(`${TRANSATION_API_URL}${searchValue}`);
    const jsonResponse = await response.json();
    if (jsonResponse.Response === "True") {
      dispatch({
        type: "SEARCH_TRANSTION_SUCCESS",
        payload: jsonResponse.Search,
      });
    } else {
      dispatch({
        type: "SEARCH_TRANSTION_FAILURE",
        error: jsonResponse.Error,
      });
    }
  };

  const onPageChange = (page) => {
    const { transation, total, pageSize } = state;
    let list = [];
    if (total > (page - 1) * pageSize) {
      list = transation.tx.slice((page - 1) * pageSize, page * pageSize);
    }
    dispatch({
      type: "SEARCH_TRANSTION_PAGE",
      payload: { page: page, list: list },
    });
  };

  const {
    transation,
    errorMessage,
    loading,
    page,
    pageSize,
    total,
    list,
  } = state;
  return (
    <div className="App">
      <Header title="Blockchain.com" />
      <Search search={search} />
      <Summary transation={transation} />
      <div className="transtion">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          list &&
          list.map((tx, index) => <Transtion key={`${index}`} tx={tx} />)
        )}
      </div>
      {total > 0 ? (
        <div className="paginationDiv">
          <Pagination
            onChange={onPageChange}
            total={total}
            current={page}
            pageSize={pageSize}
          />
        </div>
      ) : null}
    </div>
  );
};
export default App;
