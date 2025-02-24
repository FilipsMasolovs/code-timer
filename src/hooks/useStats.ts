'use client'

import { useState, useCallback } from 'react'
import { SessionStats } from '@/types'

const DEFAULT_STATS: SessionStats = {
	totalSessions: 0,
	totalWorkTime: 0,
	currentStreak: 0,
	todaySessions: 0,
	lastSessionDate: null,
}

export const useStats = () => {
	const [stats, setStats] = useState<SessionStats>(() => {
		if (typeof window !== 'undefined') {
			const savedStats = localStorage.getItem('sessionStats')
			if (savedStats) {
				const parsedStats = JSON.parse(savedStats)
				const today = new Date().toLocaleDateString()
				if (parsedStats.lastSessionDate !== today) {
					return {
						...parsedStats,
						todaySessions: 0,
						lastSessionDate: today,
					}
				}
				return parsedStats
			}
		}
		return DEFAULT_STATS
	})

	const updateStats = useCallback((workDuration: number) => {
		const today = new Date().toLocaleDateString()

		setStats((prevStats) => {
			const isNewDay = prevStats.lastSessionDate !== today
			const newStats = {
				totalSessions: prevStats.totalSessions + 1,
				totalWorkTime: prevStats.totalWorkTime + workDuration,
				currentStreak: isNewDay ? prevStats.currentStreak + 1 : prevStats.currentStreak,
				todaySessions: isNewDay ? 1 : prevStats.todaySessions + 1,
				lastSessionDate: today,
			}
			localStorage.setItem('sessionStats', JSON.stringify(newStats))
			return newStats
		})
	}, [])

	return { stats, updateStats }
}
