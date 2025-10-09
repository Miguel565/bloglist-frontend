import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

export const createComment = async (content) => {
    const response = await axios.post(`${baseUrl}/${content.blogId}/comments`, content.newComment)
    return response.data
}

export const update = async (updatedBlog) => {
    const request = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    return request.data
}

export const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { setToken }