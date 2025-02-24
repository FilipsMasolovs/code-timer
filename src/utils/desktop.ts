'use client'

import { isPermissionGranted, sendNotification } from '@tauri-apps/api/notification'
import { appWindow, PhysicalSize } from '@tauri-apps/api/window'

const WINDOW_SIZES = {
	full: {
		width: 524,
		height: 624,
	},
	mini: {
		width: 200,
		height: 56,
	},
} as const

export const sendTimerNotification = async (title: string, body: string) => {
	const permissionGranted = await isPermissionGranted()
	if (!permissionGranted) {
		console.warn('Notification permission not granted.')
		return
	}
	sendNotification({ title, body })
}

export const setMiniMode = async (isMini: boolean) => {
	try {
		const factor = await appWindow.scaleFactor()
		if (isMini) {
			await appWindow.setSize(new PhysicalSize(Math.round(WINDOW_SIZES.mini.width * factor), Math.round(WINDOW_SIZES.mini.height * factor)))
			await appWindow.setDecorations(false)
			await appWindow.setAlwaysOnTop(true)
		} else {
			await appWindow.setSize(new PhysicalSize(Math.round(WINDOW_SIZES.full.width * factor), Math.round(WINDOW_SIZES.full.height * factor)))
			await appWindow.setDecorations(true)
			await appWindow.setAlwaysOnTop(false)
		}
		await appWindow.center()
	} catch (error) {
		console.error('Failed to toggle window mode:', error)
	}
}

export const startWindowDrag = async () => {
	try {
		await appWindow.startDragging()
	} catch (error) {
		console.error('Failed to start window drag:', error)
	}
}
