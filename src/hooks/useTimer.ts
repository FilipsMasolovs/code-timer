'use client'

import { useState, useEffect, useCallback } from 'react'
import { TimerSettings, TimerState } from '@/types'
import { sendTimerNotification } from '@/utils/desktop'

const DEFAULT_SETTINGS: TimerSettings = {
	workDuration: 25,
	breakDuration: 5,
	longBreakDuration: 15,
	sessionsBeforeLongBreak: 4,
}

export const useTimer = () => {
	const [timeLeft, setTimeLeft] = useState(0)
	const [totalTime, setTotalTime] = useState(0)
	const [isActive, setIsActive] = useState(false)
	const [timerState, setTimerState] = useState<TimerState>('idle')
	const [sessions, setSessions] = useState(0)
	const [settings, setSettings] = useState<TimerSettings>(() => {
		if (typeof window !== 'undefined') {
			const savedSettings = localStorage.getItem('timerSettings')
			return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS
		}
		return DEFAULT_SETTINGS
	})

	const startTimer = useCallback(() => {
		setIsActive(true)
		if (timerState === 'idle') {
			setTimerState('work')
			setTimeLeft(settings.workDuration * 60)
			setTotalTime(settings.workDuration * 60)
		}
	}, [timerState, settings])

	const pauseTimer = useCallback(() => {
		setIsActive(false)
	}, [])

	const resetTimer = useCallback(() => {
		setIsActive(false)
		setTimerState('idle')
		setTimeLeft(0)
		setTotalTime(0)
		setSessions(0)
	}, [])

	const updateSettings = useCallback(
		(newSettings: TimerSettings) => {
			setSettings(newSettings)
			localStorage.setItem('timerSettings', JSON.stringify(newSettings))
			if (timerState === 'idle') {
				setTimeLeft(newSettings.workDuration * 60)
				setTotalTime(newSettings.workDuration * 60)
			}
		},
		[timerState]
	)

	const switchPhase = useCallback(() => {
		if (timerState === 'work') {
			sendTimerNotification('Break Time!', 'Time to take a break.')
			setSessions((prev) => prev + 1)
			if (sessions + 1 >= settings.sessionsBeforeLongBreak) {
				setTimerState('longBreak')
				setTimeLeft(settings.longBreakDuration * 60)
				setTotalTime(settings.longBreakDuration * 60)
				setSessions(0)
			} else {
				setTimerState('break')
				setTimeLeft(settings.breakDuration * 60)
				setTotalTime(settings.breakDuration * 60)
			}
		} else {
			sendTimerNotification('Work Time!', 'Time to focus.')
			setTimerState('work')
			setTimeLeft(settings.workDuration * 60)
			setTotalTime(settings.workDuration * 60)
		}
	}, [timerState, sessions, settings])

	useEffect(() => {
		let interval: NodeJS.Timeout

		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((time) => time - 1)
			}, 1000)
		} else if (isActive && timeLeft === 0) {
			switchPhase()
		}

		return () => clearInterval(interval)
	}, [isActive, timeLeft, switchPhase])

	return {
		timeLeft,
		totalTime,
		isActive,
		timerState,
		sessions,
		settings,
		startTimer,
		pauseTimer,
		resetTimer,
		updateSettings,
	}
}
