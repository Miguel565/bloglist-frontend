import { useNotification } from '../hooks/useNotification'

const Notification = () => {
	const { notification } = useNotification()

	if (!notification) {
		return null;
	}
	
	return (
		<div className={notification.type}>
			{notification.message}
		</div>
	)
}

export default Notification