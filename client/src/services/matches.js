import api from './apiConfig'

export const getMatches = async () => {
  try {
    const response = await api.get('/matches')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserMatches = async (id) => {
  try {
    const response = await api.get(`/matches/user/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMatch = async id => {
  try {
    const response = await api.get(`/matches/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const searchMatches = async query => {
  try {
    const response = await api.get(`/matches/search/${query}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createMatch = async (id, match) => {
  try {
    const response = await api.post(`/matches/${id}`, match)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateMatch = async (id, match) => {
  try {
    const response = await api.put(`/matches/${id}`, match)
    return response.data
  } catch (error) {
    throw error
  }
}

export const voteMatch = async (id, obj) => {
  // obj should be {votes1: user_id} or {votes2: user_id}
  try {
    const response = await api.put(`/matches/${id}/vote`, obj)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteMatch = async id => {
  try {
    const response = await api.delete(`/matches/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}