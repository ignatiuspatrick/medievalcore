'use client'

import { FieldLabel, useField, useFieldPath } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import type { ChangeEvent } from 'react'

import styles from './HexColorPicker.module.scss'

const sixDigitHex = /^#(?:[\da-f]{6})$/i
const shortHex = /^#(?:[\da-f])([\da-f])([\da-f])$/i
const hexWithAlpha = /^#([\da-f]{6})([\da-f]{2})$/i
const legacyColors: Record<string, string> = {
  primary: '#cfe2c9',
  secondary: '#eef5ea',
  parchment: '#fff9e9',
  transparent: '#ffffff',
  sage: '#dce7d7',
  ink: '#173425',
}

const pickerValue = (value: unknown) => {
  if (typeof value !== 'string') return '#365546'
  if (value in legacyColors) return legacyColors[value]
  if (sixDigitHex.test(value)) return value

  const shorthand = value.match(shortHex)
  if (shorthand) return `#${shorthand[1]}${shorthand[1]}${shorthand[2]}${shorthand[2]}${shorthand[3]}${shorthand[3]}`

  const alpha = value.match(hexWithAlpha)
  return alpha ? `#${alpha[1]}` : '#365546'
}

/** Payload admin field for choosing text and surface colors. */
export const HexColorPicker: TextFieldClientComponent = ({ field, path: stalePath }) => {
  const currentPath = useFieldPath()
  const { setValue, value } = useField<string>({
    path: currentPath || stalePath,
    potentiallyStalePath: stalePath,
  })
  const inputValue = typeof value === 'string' ? value : ''
  const inputID = `field-${(currentPath || stalePath).replace(/[^a-zA-Z0-9_-]/g, '-')}`

  const onPickerChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return (
    <div className={styles.field}>
      <FieldLabel htmlFor={inputID} label={field.label} path={currentPath || stalePath} required={field.required} />
      <div className={styles.controls}>
        <input
          aria-label="Choose color"
          className={styles.picker}
          id={inputID}
          onChange={onPickerChange}
          type="color"
          value={pickerValue(inputValue)}
        />
        <output className={styles.value}>{inputValue || 'No custom color'}</output>
        {inputValue && (
          <button className={styles.clear} onClick={() => setValue(undefined)} type="button">
            Clear
          </button>
        )}
      </div>
      <p className={styles.description}>Optional. Choose a color from the picker.</p>
    </div>
  )
}
