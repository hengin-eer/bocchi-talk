import React, { useState } from 'react'

export const ChatArea = () => {
	const [text, setText] = useState('')
	const [messages, setMessage] = useState([])

	const sendMessage = (e) => {
		e.preventDefault()
		if (isTextEmpty) {
		} else {
			setMessage([...messages, text])
			setText('')
		}
	}

	const isTextEmpty = text === ''

	return (
		<div className='chat-area'>
			<ul>
				{messages.map((message, index) => (
					<li className='messages' key={index}>{message}</li>
				))}
			</ul>
			<form onSubmit={(e) => sendMessage(e)}>
				<input type='text' value={text} onChange={(e) => setText(e.target.value)} />
				<button type='submit'>send</button>
			</form>
		</div>
	)
}
