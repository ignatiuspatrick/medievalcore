'use client'

import { Button, Icon } from '@chakra-ui/react'

import styles from './ButtonSection.module.scss'

export function ButtonSection({
  label,
  href,
  variant = 'primary',
  openInNewTab,
}: {
  label?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  openInNewTab?: boolean
}) {
  if (!label || !href) return null

  return <div className={styles.wrap}>
    <Button asChild unstyled className={`${styles.button} ${styles[`variant_${variant}`]}`}>
      <a href={href} target={openInNewTab ? '_blank' : undefined} rel={openInNewTab ? 'noreferrer' : undefined}>
        {label}
        {variant === 'text'
          ? <Icon aria-hidden="true" className={styles.linkChevron} viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.75" /></Icon>
          : <span aria-hidden="true">→</span>}
      </a>
    </Button>
  </div>
}
