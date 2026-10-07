import { defaultData } from '../data/defaultData'

const STORAGE_KEY = 'vikash_portfolio_data'

export function initializePortfolioData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
}

export function getPortfolioData() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch (err) {
      console.error('Could not parse portfolio data:', err)
      return defaultData
    }
  }
  return defaultData
}

export function savePortfolioData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
