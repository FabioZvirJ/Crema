import React from 'react';
import { getSafeHref, isSafeExternalUrl } from '@/security/safeUrl';

export interface SafeExternalLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'rel'> {
  readonly href: string;
  readonly children: React.ReactNode;
}

/**
 * Security-hardened external anchor element.
 * Validates URL against the protocol/domain allowlist and enforces `rel="noopener noreferrer"`.
 */
export function SafeExternalLink({
  href,
  target = '_blank',
  children,
  onClick,
  ...rest
}: SafeExternalLinkProps) {
  const safeHref = getSafeHref(href);
  const valid = isSafeExternalUrl(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={safeHref}
      target={target}
      rel="noopener noreferrer"
      referrerPolicy="strict-origin-when-cross-origin"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

