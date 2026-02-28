"use client";

import { usePathname } from 'next/navigation';

export default function CanonicalTag() {
  const pathname = usePathname();
  const DOMAIN = "https://drsaratchandra.in"; // Your production domain

  const canonicalUrl = `${DOMAIN}${pathname}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}