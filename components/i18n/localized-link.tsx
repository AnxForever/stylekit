"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({
  href,
  ...props
}: LocalizedLinkProps) {
  const { locale } = useI18n();
  const localizedHref = typeof href === "string" ? localizeHref(href, locale) : href;

  return <Link href={localizedHref} {...props} />;
}
