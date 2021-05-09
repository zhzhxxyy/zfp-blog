import React from 'react'

const DEFAULT_PLACEHOLDER_IMAGE = 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'

const Transaction = ({ tx }) => {
  return (
    <div className="trans-view">
      <h2>{tx.hash}</h2>
    </div>
  )
}

export default Transaction