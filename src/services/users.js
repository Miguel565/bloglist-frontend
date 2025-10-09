import axios from 'axios'

const url = '/api/users'

export const getUsers = async () => {
    const response = await axios.get(url)
    return response.data
}

export const getUserById = async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response.data
}

export const createUser = async (newUser) => {
    const response = await axios.post(url, newUser)
    return response.data
}

export const removeUser = async (id) => {
    const response = await axios.delete(`${url}/${id}`)
    return response.data
}