'use client'

import { startWindowDrag } from '@/utils/desktop'
import { HiPlay, HiPause, HiOutlineArrowsExpand } from 'react-icons/hi'

interface MiniTimerProps {
	timeLeft: number
	isActive: boolean
	onToggleTimer: () => void
	onExitMiniMode: () => void
}

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60)
	const secs = seconds % 60
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const MiniTimer = ({ timeLeft, isActive, onToggleTimer, onExitMiniMode }: MiniTimerProps) => {
	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden' onMouseDown={startWindowDrag}>
			<div className='p-2 cursor-move'>
				<div className='flex items-center justify-between'>
					<div className='font-mono text-xl text-gray-800 dark:text-gray-200'>{formatTime(timeLeft)}</div>
					<div className='flex gap-2'>
						<button
							onClick={(e) => {
								e.stopPropagation()
								onToggleTimer()
							}}
							className='p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
						>
							{isActive ? <HiPause size={24} /> : <HiPlay size={24} />}
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation()
								onExitMiniMode()
							}}
							className='p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
						>
							<HiOutlineArrowsExpand size={24} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
