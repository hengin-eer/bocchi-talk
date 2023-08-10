import Link from 'next/link'
import React from 'react'

export const AppHeader = () => {
	return (
		<div>
			<Link className='back-home' href="/">戻る</Link>
			<AppMenu />
		</div>
	)
}

export const AppMenu = () => {
	return (
		<div>
			app menu
		</div>
	)
}
