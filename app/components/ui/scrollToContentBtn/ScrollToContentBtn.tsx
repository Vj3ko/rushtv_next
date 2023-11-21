'use client'

import Link, { LinkProps } from 'next/link'
// mirror the props of next/link component
type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>
type ScrollLinkProps = AnchorProps & LinkProps

const HEADER_HEIGHT = 60

export const ScrollToContentBtn = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    e.preventDefault()
    //remove everything before the hash
    const targetId = e.currentTarget.href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    window.scrollTo({
      top: elem?.offsetTop! - HEADER_HEIGHT,
      behavior: 'smooth',
    })
  }

  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  )
}
