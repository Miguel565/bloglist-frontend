import { useReducer, useCallback } from 'react'
import { login } from '../services/login'
import blogService from '../services/blogs'
import { useNotification } from './useNotification'

const authUserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const useAuthUser = () => {
    const { setNotification } = useNotification()
    const [authUser, dispatch] = useReducer(authUserReducer, null)

    const userLogin = useCallback(async (credentials) => {
        try {
            const user = await login(credentials)
            if (user.success) {
                window.localStorage.setItem('userData', JSON.stringify(user))
                blogService.setToken(user.token)
                setNotification({
                    type: 'info',
                    message: 'Success login!'
                }, 2000)
                dispatch({ type: 'LOGIN', payload: user.data })
            }
        } catch (error) {
            console.error('Login error: ', error)
            setNotification({
                type: 'error',
                message: 'Wrong user or password'
            }, 3000)
        }
    }, [])

    const userLogout = useCallback(() => {
        window.localStorage.removeItem('userData')
        blogService.setToken(null)
        setNotification({
            type: 'info',
            message: 'Success logout!'
        }, 2000)
        dispatch({ type: 'LOGOUT' })
    }, [])

    const checkUserStatus = useCallback(() => {
        const loggedUserJSON = window.localStorage.getItem('userData')
        if (loggedUserJSON) {
            const userJSON = JSON.parse(loggedUserJSON)
            blogService.setToken(userJSON.token)
            dispatch({ type: 'LOGIN', payload: userJSON })
        }
    }, [])

    return {
        authUser,
        userLogin,
        userLogout,
        checkUserStatus
    }
}