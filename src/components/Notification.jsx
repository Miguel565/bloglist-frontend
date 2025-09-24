import { useNotificationContext } from '../context/NotificationContext'

const Notification = () => {
	const { notification } = useNotificationContext()
	
	return (
		<div className={notification.type}>
			{notification.message}
		</div>
	)
}

export default Notification