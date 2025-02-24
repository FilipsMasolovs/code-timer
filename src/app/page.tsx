'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const Timer = dynamic(() => import('@/components/Timer').then((mod) => mod.Timer), {
	ssr: false,
}) as React.FC

export default function Home() {
	return (
		<main>
			<Timer />
		</main>
	)
}
