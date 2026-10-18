"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, Box, Check, File, Layers, LockKeyhole, Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalClose, ModalDescription, ModalOverlay, ModalPortal, ModalTitle } from "@/components/ui/modal";
import { downloadPacks, getDownloadPack } from "@/lib/downloads/catalog";
import { filterDownloadPacks, getDownloadFilterHref, parseDownloadFilters, type DownloadFilterStyle, type DownloadFilterTheme } from "@/lib/downloads/filters";
import type { DownloadPack, DownloadPreview, LocalizedText } from "@/lib/downloads/types";
import styles from "./downloads.module.css";

const categories: { id: DownloadFilterStyle; label: LocalizedText }[] = [
  { id: "all", label: { zh: "全部风格", en: "All styles" } },
  { id: "low-poly", label: { zh: "低多边形", en: "Low poly" } },
  { id: "clay", label: { zh: "黏土", en: "Clay" } },
  { id: "voxel", label: { zh: "体素", en: "Voxel" } },
  { id: "futuristic", label: { zh: "未来科技", en: "Futuristic" } },
  { id: "cartoon", label: { zh: "卡通", en: "Cartoon" } },
  { id: "toy", label: { zh: "玩具场景", en: "Toy scenes" } },
];

const themes: { id: DownloadFilterTheme; label: LocalizedText }[] = [
  { id: "all", label: { zh: "全部主题", en: "All subjects" } },
  { id: "props", label: { zh: "道具", en: "Props" } },
  { id: "creatures", label: { zh: "生物", en: "Creatures" } },
  { id: "architecture", label: { zh: "建筑", en: "Architecture" } },
  { id: "scenes", label: { zh: "场景", en: "Scenes" } },
  { id: "furniture", label: { zh: "家具", en: "Furniture" } },
];

function canDownload(pack: DownloadPack) {
  return pack.publication === "published" && pack.license.status === "confirmed";
}

function fileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function ResourcePreview({ preview, locale }: { preview: DownloadPreview; locale: "zh" | "en" }) {
  return <Image src={preview.src} alt={preview.alt[locale]} width={960} height={640} unoptimized className={styles.previewImage} />;
}

function PackDetails({ pack, locale }: { pack: DownloadPack; locale: "zh" | "en" }) {
  const tx = (zh: string, en: string) => locale === "zh" ? zh : en;
  const ready = canDownload(pack);
  const bundle = pack.files.find((file) => file.role === "bundle");
  const [activePreview, setActivePreview] = useState(0);
  const previews = pack.previews.length ? pack.previews : [pack.cover];
  const preview = previews[activePreview] ?? previews[0];

  return (
    <>
      <div className={styles.detailHeading}>
        <span className={styles.kindLabel}><Box size={15} aria-hidden="true" />{categories.find((category) => category.id === pack.style)?.label[locale]}</span>
        <ModalTitle className={styles.detailTitle}>{pack.name[locale]}</ModalTitle>
        <ModalDescription className={styles.detailDescription}>{pack.description[locale]}</ModalDescription>
      </div>
      <div className={styles.detailColumns}>
        <div className={styles.previewColumn}>
          <div className={styles.detailPreview}>
            <ResourcePreview key={preview.src} preview={preview} locale={locale} />
          </div>
          {previews.length > 1 && (
            <div className={styles.previewChoices} role="group" aria-label={tx("选择预览", "Choose a preview")}>
              {previews.map((item, index) => (
                <button key={item.src} type="button" aria-pressed={activePreview === index} onClick={() => setActivePreview(index)}>
                  <Image src={item.src} alt="" width={100} height={75} unoptimized />
                  <span className={styles.choiceLabel}>{item.alt[locale]}</span>
                </button>
              ))}
            </div>
          )}
          <p className={styles.previewCaption}>{preview.alt[locale]}</p>
          <p className={styles.previewCaption}>{tx("图片来自实际模型渲染。这里展示的是静态预览。", "Rendered from the actual models. These are static previews.")}</p>
        </div>
        <div className={styles.downloadColumn}>
          <dl className={styles.packFacts}>
            <div><dt>{tx("模型", "Models")}</dt><dd>{pack.itemCount} {tx("个", "models")}</dd></div>
            <div><dt>{tx("版本", "Version")}</dt><dd>{pack.version}</dd></div>
            <div><dt>{tx("整包大小", "Bundle size")}</dt><dd>{bundle ? fileSize(bundle.bytes) : "—"}</dd></div>
            <div><dt>{tx("许可", "License")}</dt><dd>{pack.license.status === "confirmed" ? pack.license.name ?? tx("已确认", "Confirmed") : tx("待确认", "Pending")}</dd></div>
            <div><dt>{tx("主题", "Subject")}</dt><dd>{themes.find((theme) => theme.id === pack.theme)?.label[locale]}</dd></div>
            {pack.geometry?.triangles !== undefined && <div><dt>{tx("三角面", "Triangles")}</dt><dd>{pack.geometry.triangles.toLocaleString(locale === "zh" ? "zh-CN" : "en-US")}</dd></div>}
            {pack.geometry?.dimensions && <div><dt>{tx("尺寸（米）", "Dimensions (m)")}</dt><dd>{pack.geometry.dimensions.map((value) => value.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { maximumFractionDigits: 3 })).join(" × ")}</dd></div>}
          </dl>
          {ready && bundle ? (
            <a className={`${buttonVariants({ variant: "secondary", size: "lg" })} ${styles.bundleButton}`} href={`/api/downloads/${pack.slug}/${bundle.id}`} download>
              <ArrowDownToLine size={17} aria-hidden="true" />{tx("下载完整资源包", "Download the pack")}
            </a>
          ) : (
            <div className={styles.releaseNote}>
              <LockKeyhole size={17} aria-hidden="true" />
              <div><strong>{pack.license.status === "pending" ? tx("授权待确认", "License pending") : tx("等待发布", "Release pending")}</strong><p>{tx("当前可预览并查看文件清单。授权与发布确认后开放下载。", "Explore the previews and file list. Downloads open once licensing and release are confirmed.")}</p></div>
            </div>
          )}
          {pack.license.text && <p className={styles.licenseText}>{pack.license.text[locale]}</p>}
          <ul className={styles.packNotes}>{pack.notes.map((note, index) => <li key={index}>{note[locale]}</li>)}</ul>
          {pack.styleSlugs.length > 0 && <div className={styles.relatedStyles}><span>{tx("搭配风格", "Pair with")}</span>{pack.styleSlugs.map((slug) => <LocalizedLink key={slug} href={`/styles/${slug}`}>{slug}<ArrowUpRight size={12} aria-hidden="true" /></LocalizedLink>)}</div>}
        </div>
      </div>
      <section className={styles.fileSection} aria-labelledby="download-files-heading">
        <h3 id="download-files-heading">{tx("文件清单", "Included files")} <span>{pack.files.length}</span></h3>
        <ul className={styles.fileList}>
          {pack.files.map((file) => (
            <li key={file.id}>
              <File size={16} aria-hidden="true" className={styles.fileIcon} />
              <div className={styles.fileName}><span>{file.name}</span><small>{file.format} <span aria-hidden="true">/</span> {fileSize(file.bytes)}</small></div>
              {ready ? <a href={`/api/downloads/${pack.slug}/${file.id}`} download className={styles.fileDownload} aria-label={`${tx("下载", "Download")} ${file.name}`}><ArrowDownToLine size={18} aria-hidden="true" /></a> : <LockKeyhole size={14} className={styles.fileLock} aria-label={tx("尚未开放下载", "Download not released")} />}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function DownloadsContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => locale === "zh" ? zh : en;
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = parseDownloadFilters(searchParams.toString());
  const packs = filterDownloadPacks(downloadPacks, filters.style, filters.theme, filters.query);
  const selectedPack = filters.selected ? getDownloadPack(filters.selected) : undefined;
  const featured = downloadPacks.find((pack) => pack.theme !== "furniture") ?? downloadPacks[0];
  const lastTrigger = useRef<HTMLAnchorElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const catalogHeading = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    if (searchInput.current) searchInput.current.value = filters.query;
  }, [filters.query]);
  const allCount = downloadPacks.reduce((sum, pack) => sum + pack.itemCount, 0);
  const releasedCount = downloadPacks.filter(canDownload).length;
  const availableCategories = categories.filter((category) => category.id === "all" || category.id === filters.style || downloadPacks.some((pack) => pack.style === category.id));
  const availableThemes = themes.filter((theme) => theme.id === "all" || theme.id === filters.theme || downloadPacks.some((pack) => pack.theme === theme.id));
  const hrefFor = (updates: Parameters<typeof getDownloadFilterHref>[1]) => getDownloadFilterHref(new URL(`https://stylekit.invalid/${locale}/downloads?${searchParams.toString()}`), updates);
  const navigate = (updates: Parameters<typeof getDownloadFilterHref>[1]) => router.push(getDownloadFilterHref(new URL(window.location.href), updates), { scroll: false });
  const openDetails = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    lastTrigger.current = event.currentTarget;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate({ selected: slug });
  };
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ query: String(new FormData(event.currentTarget).get("q") ?? ""), selected: null });
  };

  return (
    <div className={styles.page} data-cursor-aura="off">
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.breadcrumb}><LocalizedLink href="/resources">{tx("设计资源", "Design resources")}</LocalizedLink><span aria-hidden="true">/</span>{tx("3D 模型库", "3D models")}</p>
          <h1>{tx("有形状，也有性格。", "Objects with a point of view.")}</h1>
          <p className={styles.heroDescription}>{tx("探索不同美术风格的 3D 模型与小场景。查看真实渲染和文件清单，找到适合你下一次创作的立体灵感。", "Explore 3D objects and small scenes with distinct visual styles. Inspect the actual renders and files, and find a new dimension for your next project.")}</p>
          <div className={styles.heroActions}><a href="#download-catalog" className={buttonVariants({ variant: "secondary", size: "lg" })}>{tx("探索模型", "Explore the models")}<ArrowDown size={16} aria-hidden="true" /></a><LocalizedLink href="/resources" className={styles.textLink}>{tx("网页设计工具", "Web design tools")}<ArrowUpRight size={15} aria-hidden="true" /></LocalizedLink></div>
          <p className={styles.collectionFacts}>{tx(`${downloadPacks.length} 套作品，${allCount} 个模型`, `${downloadPacks.length} collections, ${allCount} models`)}<span>{releasedCount ? tx(`${releasedCount} 套已开放下载`, `${releasedCount} packs ready to download`) : tx("首批预览 · 授权待确认", "First collection preview · licensing pending")}</span></p>
        </div>
        {featured && <Link href={hrefFor({ selected: featured.slug })} prefetch={false} scroll={false} className={styles.featured} onClick={(event) => openDetails(event, featured.slug)} aria-label={`${tx("预览", "Preview")} ${featured.name[locale]}`}><Image src={featured.cover.src} alt={featured.cover.alt[locale]} width={960} height={600} loading="eager" unoptimized /><div className={styles.featuredCaption}><span>{featured.name[locale]}</span><span>{tx("查看模型", "Take a closer look")}<ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>}
      </header>

      <section id="download-catalog" className={styles.catalog} aria-labelledby="download-catalog-heading">
        <div className={styles.catalogHeading}><div><h2 ref={catalogHeading} tabIndex={-1} id="download-catalog-heading">{tx("模型展台", "The model collection")}</h2><p>{tx("按美术风格与主题，找到你喜欢的作品。", "Find your next object by style and subject.")}</p></div><form role="search" onSubmit={search} className={styles.searchForm}><label htmlFor="download-search" className="sr-only">{tx("搜索模型", "Search models")}</label><Search size={17} aria-hidden="true" /><Input ref={searchInput} id="download-search" name="q" type="search" defaultValue={filters.query} maxLength={120} placeholder={tx("搜索名称、风格、关键词…", "Search names, styles, keywords…")} /><Button type="submit" variant="secondary" size="sm">{tx("搜索", "Search")}</Button></form></div>
        <div className={styles.filterBar}><div className={styles.categories} role="group" aria-label={tx("美术风格", "Art style")}>{availableCategories.map((category) => <button key={category.id} type="button" aria-pressed={filters.style === category.id} onClick={() => navigate({ style: category.id, selected: null })}>{category.label[locale]}<span>{category.id === "all" ? downloadPacks.length : downloadPacks.filter((pack) => pack.style === category.id).length}</span></button>)}</div><p className={styles.resultCount} role="status">{tx(`${packs.length} 套作品`, `${packs.length} collections`)}{filters.query && <Button variant="ghost" size="sm" onClick={() => navigate({ query: "", selected: null })}>{tx("清除搜索", "Clear search")}<X size={13} aria-hidden="true" /></Button>}</p></div>
        <div className={`${styles.categories} ${styles.themeFilters}`} role="group" aria-label={tx("模型主题", "Model subject")}>{availableThemes.map((theme) => <button key={theme.id} type="button" aria-pressed={filters.theme === theme.id} onClick={() => navigate({ theme: theme.id, selected: null })}>{theme.label[locale]}</button>)}</div>
        {filters.selected && !selectedPack && <p className={styles.missingPack} role="status">{tx("未找到这个资源包。", "This resource pack could not be found.")}<Button variant="link" onClick={() => navigate({ selected: null })}>{tx("返回素材列表", "Back to the collection")}</Button></p>}
        {packs.length ? <div className={styles.grid}>{packs.map((pack) => {
          const ready = canDownload(pack);
          const bundle = pack.files.find((file) => file.role === "bundle");
          return <article className={styles.card} key={pack.slug}><Link href={hrefFor({ selected: pack.slug })} prefetch={false} scroll={false} className={styles.cardLink} onClick={(event) => openDetails(event, pack.slug)}><div className={styles.cover}><Image src={pack.cover.src} alt={pack.cover.alt[locale]} width={720} height={450} loading={pack.slug === featured?.slug ? "eager" : "lazy"} unoptimized /><span className={styles.previewTag}>{tx("查看预览", "View preview")}<ArrowUpRight size={14} aria-hidden="true" /></span></div><div className={styles.cardBody}><div className={styles.cardMeta}><span className={styles.kindLabel}><Box size={15} aria-hidden="true" />{categories.find((category) => category.id === pack.style)?.label[locale]}</span><span>{pack.itemCount} {tx("个模型", "models")}</span></div><h3>{pack.name[locale]}</h3><p>{pack.description[locale]}</p><div className={styles.cardFoot}><span>{Array.from(new Set(pack.files.filter((file) => ["GLB", "BLEND"].includes(file.format.toUpperCase())).map((file) => file.format))).join(" / ")}{bundle ? ` · ${fileSize(bundle.bytes)}` : ""}</span><span className={styles.status}>{ready ? <Check size={12} aria-hidden="true" /> : <LockKeyhole size={12} aria-hidden="true" />}{ready ? tx("可下载", "Available") : pack.license.status === "pending" ? tx("授权待确认", "License pending") : tx("待发布", "Unreleased")}</span></div></div></Link></article>;
        })}</div> : <div className={styles.empty}><Search size={28} aria-hidden="true" /><h3>{tx("还没找到合适的模型", "No matching models")}</h3><p>{tx("试试其他关键词，或清除筛选查看全部模型。", "Try another keyword, or reset the filters to explore the full collection.")}</p><Button variant="outline" onClick={() => navigate({ style: "all", theme: "all", query: "", selected: null })}>{tx("重置筛选", "Reset filters")}</Button></div>}
        <aside className={styles.collectionNote}><Layers size={21} aria-hidden="true" /><div><h3>{tx("看清模型，再开始创作", "Inspect first, create next")}</h3><p>{tx("每套作品附真实渲染、模型文件与可编辑源文件清单。当前标注「授权待确认」的模型仅供预览；后续发布会逐包说明使用许可。", "Each collection includes actual renders and a list of model files and editable sources. Models marked “License pending” are preview-only. Each release will include its own usage terms.")}</p></div></aside>
      </section>

      <Modal open={Boolean(selectedPack)} onOpenChange={(open) => { if (!open) navigate({ selected: null }); }}>
        {selectedPack && <ModalPortal><ModalOverlay className="motion-reduce:animate-none" /><Dialog.Content className={styles.detail} onCloseAutoFocus={(event) => { event.preventDefault(); const trigger = lastTrigger.current; if (trigger?.isConnected) trigger.focus(); else catalogHeading.current?.focus(); }}><ModalClose className={styles.closeButton} aria-label={tx("关闭详情", "Close details")}><X size={21} aria-hidden="true" /></ModalClose><PackDetails key={selectedPack.slug} pack={selectedPack} locale={locale} /></Dialog.Content></ModalPortal>}
      </Modal>
    </div>
  );
}
