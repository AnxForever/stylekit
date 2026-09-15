"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({
  href,
  prefetch = false,
  ...props
}: LocalizedLinkProps) {
  const { locale } = useI18n();
  const localizedHref = typeof href === "string" ? localizeHref(href, locale) : href;

  // StyleKit has many data-rich destinations. Waiting for user intent avoids
  // downloading several route payloads and their client chunks for every
  // visible card or navigation link on initial load. Callers can opt in for a
  // genuinely critical destination with prefetch={true}.
  return <Link href={localizedHref} prefetch={prefetch} {...props} />;
}
