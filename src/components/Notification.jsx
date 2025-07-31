const Notification = ({ message }) => {  // Step 4
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
		<div className="alert" style={textStyle} >
			{message.text}
		</div>
	)
}

export default Notification