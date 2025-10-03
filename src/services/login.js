import axios from 'axios'

const baseUrl = '/api/login'

export const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}