"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bookmark, BookOpen, Check, ShoppingBag, X } from "lucide-react";
import type { MobileLocale, MobileScenario } from "@/lib/mobile/types";
import styles from "./phone-preview.module.css";

export type { MobileScenario } from "@/lib/mobile/types";

type ReaderPage = "read" | "saved" | "profile";

type PhonePreviewProps = {
  scenario: MobileScenario;
  locale: MobileLocale;
};

type ReadingPreviewProps = {
  locale: MobileLocale;
  saved: boolean;
  page: ReaderPage;
  onSave: () => void;
  onPageChange: (page: ReaderPage) => void;
};

type CommercePreviewProps = {
  locale: MobileLocale;
  portal: HTMLDivElement | null;
  size: "280" | "360";
  count: number;
  open: boolean;
  onSizeChange: (size: "280" | "360") => void;
  onCountChange: () => void;
  onOpenChange: (open: boolean) => void;
};

const taskDescriptions = {
  zh: ["灵感与素材", "产品页面", "和团队同步"],
  en: ["Ideas and references", "Product page", "Share with the team"],
};

function ReadingPreview({
  locale,
  saved,
  page,
  onSave,
  onPageChange,
}: ReadingPreviewProps) {
  const zh = locale === "zh";
  const pages: { id: ReaderPage; label: string }[] = [
    { id: "read", label: zh ? "阅读" : "Read" },
    { id: "saved", label: zh ? "书架" : "Saved" },
    { id: "profile", label: zh ? "我的" : "You" },
  ];

  return (
    <>
      <div className={styles.read}>
        {page === "read" && (
          <article className={styles.article}>
            <div className={styles.readArt} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className={styles.meta}>
              <span>{zh ? "城市观察" : "FIELD NOTES"}</span>
              <span>{zh ? "6 分钟" : "6 MIN READ"}</span>
            </div>
            <h3>{zh ? "把一场雨读完" : "A city, read in the rain"}</h3>
            <p className={styles.deck}>
              {zh
                ? "沿着一条安静的街，看看天气如何改变我们看见的东西。"
                : "A quiet walk through the streets and the small ways weather changes what we notice."}
            </p>
            <div className={styles.author}>
              <span className={styles.avatar} aria-hidden="true">
                林
              </span>
              <span>{zh ? "林知夏 · 10 月 4 日" : "Lin Zhixia · Oct 4"}</span>
              <button
                type="button"
                className={styles.bookmark}
                aria-pressed={saved}
                aria-label={
                  saved
                    ? zh
                      ? "移除收藏"
                      : "Remove from saved"
                    : zh
                      ? "收藏文章"
                      : "Save article"
                }
                onClick={onSave}
              >
                <Bookmark
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            </div>
            <hr />
            <p>
              {zh
                ? "雨把街道的边界放慢了。骑车的人停在屋檐下，玻璃上的倒影替熟悉的路添了一层新的颜色。"
                : "Rain softens the edges of a street. Cyclists pause beneath the eaves; reflections give a familiar route a different color."}
            </p>
            <blockquote>
              {zh ? "有时，慢下来就是抵达。" : "Sometimes, slowing down is how we arrive."}
            </blockquote>
            <p>
              {zh
                ? "沿着水痕继续向前，平常匆忙经过的店门口，多了一张写着今日汤品的小纸条。"
                : "Following the water line, I notice a handwritten note about today’s soup outside a shop I usually pass."}
            </p>
          </article>
        )}
        {page === "saved" && (
          <div className={styles.library}>
            <small>{zh ? "你的阅读清单" : "YOUR READING LIST"}</small>
            <h3>{zh ? "稍后再读" : "Saved for later"}</h3>
            {saved ? (
              <article className={styles.saved}>
                <i aria-hidden="true" />
                <div>
                  <p>{zh ? "城市观察 · 6 分钟" : "FIELD NOTES · 6 MIN"}</p>
                  <h2>{zh ? "把一场雨读完" : "A city, read in the rain"}</h2>
                </div>
              </article>
            ) : (
              <p className={styles.empty}>
                {zh
                  ? "点开文章旁的书签，把喜欢的故事留在这里。"
                  : "Save a story with the bookmark to find it here."}
              </p>
            )}
          </div>
        )}
        {page === "profile" && (
          <div className={styles.profile}>
            <small>{zh ? "阅读者档案" : "READER PROFILE"}</small>
            <h3>
              {zh ? "留一点时间给好故事。" : "Make room for a good story."}
            </h3>
            <p>
              <b>{saved ? "01" : "00"}</b>
              {zh ? " 篇已收藏" : " stories saved"}
            </p>
          </div>
        )}
      </div>
      <nav
        className={styles.bottomNav}
        aria-label={zh ? "阅读导航" : "Reader navigation"}
      >
        {pages.map(({ id, label }) => (
          <button
            type="button"
            key={id}
            className={styles.navButton}
            aria-current={page === id ? "page" : undefined}
            onClick={() => onPageChange(id)}
          >
            <i aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}

function CommercePreview({
  locale,
  portal,
  size,
  count,
  open,
  onSizeChange,
  onCountChange,
  onOpenChange,
}: CommercePreviewProps) {
  const zh = locale === "zh";

  return (
    <>
      <div className={styles.commerce}>
        <div className={styles.productHead}>
          <small>{zh ? "日常器物 · 01" : "OBJECTS FOR EVERYDAY · 01"}</small>
          <h3>{zh ? "留白陶杯" : "Quiet Form Cup"}</h3>
          <p>{zh ? "手工陶 · 哑光釉" : "Hand-thrown ceramic · matte glaze"}</p>
        </div>
        <div
          className={styles.productArt}
          role="img"
          aria-label={
            zh ? "暖白陶杯的几何插画" : "Geometric illustration of an ivory ceramic cup"
          }
        >
          <i />
          <i>
            <b />
            <em />
          </i>
          <i />
          <span>{zh ? "手作 · 01" : "STUDIO · 01"}</span>
        </div>
        <div className={styles.details}>
          <div>
            <p>
              {zh
                ? "窑变釉面，每只略有不同"
                : "A kiln-fired glaze; every cup is a little different."}
            </p>
            <small>280 ml / 360 ml</small>
          </div>
          <b>¥168</b>
        </div>
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <div className={styles.actions}>
            <Dialog.Trigger asChild>
              <button type="button" className={styles.choose}>
                {zh ? "规格：" : "Size: "}
                {size} ml
              </button>
            </Dialog.Trigger>
            <button
              type="button"
              className={styles.add}
              onClick={onCountChange}
            >
              {zh ? "加入购物袋" : "Add to bag"}
            </button>
          </div>
          <p className={styles.live} aria-live="polite" aria-atomic="true">
            {count > 0 &&
              (zh ? "已加入购物袋 · " + count : "Added to bag · " + count)}
          </p>
          <Dialog.Portal container={portal ?? undefined}>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.sheet}>
              <i className={styles.handle} aria-hidden="true" />
              <div className={styles.sheetHead}>
                <div>
                  <Dialog.Title className={styles.sheetTitle}>
                    {zh ? "选择容量" : "Choose a size"}
                  </Dialog.Title>
                  <Dialog.Description className={styles.sheetDesc}>
                    {zh
                      ? "釉色和手作纹理会有细微差别。"
                      : "Each handmade glaze has subtle variations."}
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className={styles.close}
                    aria-label={zh ? "关闭规格面板" : "Close size options"}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>
              <div
                className={styles.options}
                role="group"
                aria-label={zh ? "杯子容量" : "Cup capacity"}
              >
                {(["280", "360"] as const).map((item) => (
                  <button
                    type="button"
                    className={styles.option}
                    aria-pressed={size === item}
                    key={item}
                    onClick={() => onSizeChange(item)}
                  >
                    <b>{item} ml</b>
                    <small>
                      {item === "280"
                        ? zh
                          ? "日常小杯"
                          : "Everyday"
                        : zh
                          ? "分享大杯"
                          : "For sharing"}
                    </small>
                  </button>
                ))}
              </div>
              <Dialog.Close asChild>
                <button type="button" className={styles.confirm}>
                  {zh ? "确认规格" : "Confirm size"}
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className={styles.footnote}>
        {zh ? "工作室现货 · 2 个工作日内发出" : "In stock · ships in 2 business days"}
      </div>
    </>
  );
}

function WorkspacePreview({ locale }: { locale: MobileLocale }) {
  const zh = locale === "zh";
  const [tasks, setTasks] = useState([true, false, false]);
  const names = zh
    ? ["整理灵感板", "确认首页文案", "发出设计评审"]
    : ["Sort the inspiration board", "Review homepage copy", "Send the design review"];
  const done = tasks.filter(Boolean).length;
  const progressText = zh
    ? "已完成 " + done + " / 3 项"
    : done + " of 3 tasks complete";

  return (
    <div className={styles.workspace}>
      <div className={styles.workspaceHead}>
        <small>{zh ? "10 月 4 日 · 周日" : "SUNDAY · OCT 4"}</small>
        <h3>{zh ? "留出一段专注时间。" : "Make room to focus."}</h3>
        <p>
          {zh ? "小步完成今天的设计工作。" : "Small steps for today’s design work."}
        </p>
      </div>
      <div className={styles.progress}>
        <div>
          <small>{zh ? "今日进度" : "TODAY"}</small>
          <b>{done} / 3</b>
        </div>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={zh ? "今日任务完成进度" : "Today’s task progress"}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={done}
          aria-valuetext={progressText}
        >
          <i style={{ width: (done / 3) * 100 + "%" }} />
        </div>
        <p aria-live="polite" aria-atomic="true">{progressText}</p>
      </div>
      <div className={styles.tasks}>
        {names.map((name, index) => (
          <label className={styles.task} key={name}>
            <input
              type="checkbox"
              checked={tasks[index]}
              onChange={() =>
                setTasks((current) =>
                  current.map((value, taskIndex) =>
                    taskIndex === index ? !value : value
                  )
                )
              }
            />
            <span>
              <span className={tasks[index] ? styles.done : undefined}>{name}</span>
              <small>{taskDescriptions[locale][index]}</small>
            </span>
            <i aria-hidden="true">
              {tasks[index] && <Check size={15} />}
            </i>
          </label>
        ))}
      </div>
      <div className={styles.hint}>
        <i aria-hidden="true" />
        <p>{zh ? "先做最清楚的一步。" : "Start with the clearest next step."}</p>
      </div>
    </div>
  );
}

export function PhonePreview({ scenario, locale }: PhonePreviewProps) {
  const zh = locale === "zh";
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState<ReaderPage>("read");
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"280" | "360">("280");
  const [count, setCount] = useState(0);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const headings = {
    reading: zh ? "拾页阅读" : "Margin Reader",
    commerce: zh ? "物件研究所" : "Object Study",
    workspace: zh ? "今日计划" : "Today’s plan",
  };

  return (
    <section
      className={styles.device}
      data-scenario={scenario}
      aria-label={
        zh
          ? headings[scenario] + "移动端预览"
          : headings[scenario] + " mobile preview"
      }
    >
      <div className={styles.bezel}>
        <div className={styles.screen} ref={setPortal}>
          <div className={styles.status} aria-hidden="true">
            <span>9:41</span>
            <span className={styles.signal}>
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className={styles.header}>
            <span className={styles.mark} aria-hidden="true" />
            <b>{headings[scenario]}</b>
            {scenario === "reading" && (
              <BookOpen size={19} aria-hidden="true" />
            )}
            {scenario === "commerce" && (
              <span
                className={styles.bag}
                aria-label={
                  zh
                    ? "购物袋，" + count + " 件"
                    : "Shopping bag, " + count + " items"
                }
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {count > 0 && <i>{count}</i>}
              </span>
            )}
            {scenario === "workspace" && (
              <span className={styles.day}>{zh ? "周日" : "SUN"}</span>
            )}
          </div>
          {scenario === "reading" && (
            <ReadingPreview
              locale={locale}
              saved={saved}
              page={page}
              onSave={() => setSaved((current) => !current)}
              onPageChange={setPage}
            />
          )}
          {scenario === "commerce" && (
            <CommercePreview
              locale={locale}
              portal={portal}
              size={size}
              count={count}
              open={open}
              onSizeChange={setSize}
              onCountChange={() => setCount((current) => current + 1)}
              onOpenChange={setOpen}
            />
          )}
          {scenario === "workspace" && <WorkspacePreview locale={locale} />}
        </div>
      </div>
    </section>
  );
}
