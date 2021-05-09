import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Transtion from './Transaction'
import Search from './Search'
import Summary from './Summary'

const TRANSATION_API_URL = 'https://blockchain.info/rawblock/'

const initialState = {
  loading: true,
  TRANSTION: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRANSTION_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_TRANSTION_SUCCESS':
      return {
        ...state,
        loading: false,
        transation: action.payload
      }
    case 'SEARCH_TRANSTION_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    (async () => {
      const response = await fetch(`${TRANSATION_API_URL}00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa`)
      const jsonResponse = await response.json()
      console.log(jsonResponse, "jsonResponse")
      dispatch({
        type: 'SEARCH_TRANSTION_SUCCESS',
        payload: jsonResponse
      })
    })()
  }, [])

  const search = async searchValue => {
    dispatch({
      type: 'SEARCH_TRANSTION_REQUEST'
    })

    const response = await fetch(`${TRANSATION_API_URL}${searchValue}`)
    const jsonResponse = await response.json()
    if (jsonResponse.Response === 'True') {
      dispatch({
        type: 'SEARCH_TRANSTION_SUCCESS',
        payload: jsonResponse.Search
      })
    } else {
      dispatch({
        type: 'SEARCH_TRANSTION_FAILURE',
        error: jsonResponse.Error
      })
    }
  }

  const { transation, errorMessage, loading } = state
  let transList = [] 
  if(transation && transation.tx.length > 4){
    transList = transation.tx.splice(0, 4)
  }
  console.log(transation, "这是多少")
  return (
    <div className="App">
      <Header title="Blockchain.com"/>
      <Search search={search} />
      <Summary transation={transation} />
      <div className="transtion">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          transList && transList.map((tx, index) => (
            <Transtion key={`${index}`} tx={tx} />
          ))
        )}
      </div>
    </div>
  )
}
export default App;
