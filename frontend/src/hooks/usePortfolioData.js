import { useState, useEffect } from 'react'
import { getPortfolioData, initializePortfolioData } from '../utils/storage'

export function usePortfolioData() {
  const [data, setData] = useState(null)

  useEffect(() => {
    initializePortfolioData()
    setData(getPortfolioData())
  }, [])

  return data
}
