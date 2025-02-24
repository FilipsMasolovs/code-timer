'use client'

import { TimerSettings } from '@/types'
import { useState } from 'react'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
	settings: TimerSettings
	onSave: (newSettings: TimerSettings) => void
}

export const SettingsModal = ({ isOpen, onClose, settings, onSave }: SettingsModalProps) => {
	const [formData, setFormData] = useState(settings)

	if (!isOpen) return null

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave(formData)
		onClose()
	}

	function isNumeric(value: string) {
		return /^-?\d+$/.test(value)
	}

	const inputClasses =
		'p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200'>
			<div
				className='flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-6 w-96 transform transition-all duration-200 shadow-xl'
				style={{ height: '560px', width: '460px' }}
			>
				<h2 className='text-2xl font-semibold mb-4 text-gray-700 dark:text-white'>Settings</h2>
				<form className='w-full' onSubmit={handleSubmit}>
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
								Work Duration (minutes)
								<input
									type='text'
									inputMode='numeric'
									pattern='[0-9]+'
									value={formData.workDuration}
									onChange={(e) => {
										if (!isNumeric(e.target.value)) return
										setFormData({
											...formData,
											workDuration: Number(e.target.value),
										})
									}}
									className={inputClasses}
								/>
							</label>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
								Break Duration (minutes)
								<input
									type='text'
									inputMode='numeric'
									pattern='[0-9]+'
									value={formData.breakDuration}
									onChange={(e) => {
										if (!isNumeric(e.target.value)) return
										setFormData({
											...formData,
											breakDuration: Number(e.target.value),
										})
									}}
									className={inputClasses}
								/>
							</label>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
								Long Break Duration (minutes)
								<input
									type='text'
									inputMode='numeric'
									pattern='[0-9]+'
									value={formData.longBreakDuration}
									onChange={(e) => {
										if (!isNumeric(e.target.value)) return
										setFormData({
											...formData,
											longBreakDuration: Number(e.target.value),
										})
									}}
									className={inputClasses}
								/>
							</label>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
								Sessions Before Long Break
								<input
									type='text'
									inputMode='numeric'
									pattern='[0-9]+'
									value={formData.sessionsBeforeLongBreak}
									onChange={(e) => {
										if (!isNumeric(e.target.value)) return
										setFormData({
											...formData,
											sessionsBeforeLongBreak: Number(e.target.value),
										})
									}}
									className={inputClasses}
								/>
							</label>
						</div>
					</div>
					<div className='mt-6 flex justify-end space-x-3'>
						<button type='button' onClick={onClose} className='px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600'>
							Cancel
						</button>
						<button type='submit' className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
