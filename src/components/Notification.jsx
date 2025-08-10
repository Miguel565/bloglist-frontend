const Notification = ({ message }) => {
	const textStyle = {
        color: 'green',
        background: 'lightgrey'
    }

	if(!message) {
		return null
	} else if (message.type === 'error') {
		textStyle.color = 'red';
        textStyle.background = 'lightpink';
	}
	return (
		<div className={message.type} >
			{message.text}
		</div>
	)
}

export default Notification