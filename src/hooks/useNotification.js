import { useReducer, useRef, useCallback } from 'react'

const initialState = null

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'APPEND_MESSAGE':
            return action.payload
        
        case 'CLEAR_NOTIFICATION':
            return initialState

        default:
            return state
    }
}

export const useNotification = () => {
    const [notification, dispatch] = useReducer(notificationReducer, initialState)
    const timeoutRef = useRef(null)

    const clearTimeoutRef = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    const appendMessage = useCallback((notify) => {
        dispatch({ type: 'APPEND_MESSAGE', payload: notify })
    }, [])

    const clearNotification = useCallback(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, [])

    const setNotification = useCallback((notify, timer = 5000) => {
        clearTimeoutRef()
        appendMessage(notify)

        timeoutRef.current = setTimeout(() => {
            clearNotification()
        }, timer)
    }, [appendMessage, clearNotification, clearTimeoutRef])

    return {
        notification,
        appendMessage,
        clearTimeoutRef,
        clearNotification,
        setNotification
    }
}