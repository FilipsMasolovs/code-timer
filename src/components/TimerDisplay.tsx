'use client'

import { TimerState } from '@/types'
import { ProgressRing } from './ProgressRing'

interface TimerDisplayProps {
	timeLeft: number
	totalTime: number
	timerState: TimerState
}

export const TimerDisplay = ({ timeLeft, totalTime, timerState }: TimerDisplayProps) => {
	const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}

	const getProgressColor = () => {
		switch (timerState) {
			case 'work':
				return 'stroke-blue-500'
			case 'break':
				return 'stroke-green-500'
			case 'longBreak':
				return 'stroke-purple-500'
			default:
				return 'stroke-gray-500'
		}
	}

	return (
		<ProgressRing progress={progress} size={300} strokeWidth={6} className={getProgressColor()}>
			<div className='text-center'>
				<div className='font-mono text-7xl text-gray-800 dark:text-gray-100'>{formatTime(timeLeft)}</div>
				<div className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
					{timerState === 'work' ? 'Work Session' : timerState === 'break' ? 'Break Time' : timerState === 'longBreak' ? 'Long Break' : 'Ready'}
				</div>
			</div>
		</ProgressRing>
	)
}
