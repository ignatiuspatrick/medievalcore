'use client'

import { Button } from '@chakra-ui/react'

import styles from './ButtonSection.module.css'

export function ButtonSection({
  label,
  href,
  variant = 'primary',
  alignment = 'left',
  openInNewTab,
}: {
  label?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  alignment?: 'left' | 'center' | 'right'
  openInNewTab?: boolean
}) {
  if (!label || !href) return null

  return <div className={`${styles.wrap} ${styles[`align_${alignment}`]}`}>
    <Button asChild unstyled className={`${styles.button} ${styles[`variant_${variant}`]}`}>
      <a href={href} target={openInNewTab ? '_blank' : undefined} rel={openInNewTab ? 'noreferrer' : undefined}>{label}<span aria-hidden="true">→</span></a>
    </Button>
  </div>
}
