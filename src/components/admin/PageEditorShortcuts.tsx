'use client'

import { useEffect } from 'react'

/** Adds a non-conflicting publish shortcut to the Page editor's native controls. */
export function PageEditorShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const hasCommandModifier = event.metaKey || event.ctrlKey
      const isPublishShortcut = hasCommandModifier && event.shiftKey && !event.altKey && event.key.toLowerCase() === 'p'

      if (!isPublishShortcut || event.repeat) return

      const publishButton = document.getElementById('action-save')
      if (!(publishButton instanceof HTMLButtonElement) || publishButton.disabled) return

      event.preventDefault()
      publishButton.click()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return null
}
