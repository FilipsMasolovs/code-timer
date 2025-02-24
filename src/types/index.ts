export interface TimerSettings {
	workDuration: number
	breakDuration: number
	longBreakDuration: number
	sessionsBeforeLongBreak: number
}

export type TimerState = 'work' | 'break' | 'longBreak' | 'idle'

export interface SessionStats {
	totalSessions: number
	totalWorkTime: number
	currentStreak: number
	todaySessions: number
	lastSessionDate: string | null
}
