"use client";

import styles from "../../components/corporate-clean/corporate-clean.module.css";

export default function CorporateCleanError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.centerState} role="alert">
      <span className={styles.stateIcon} data-error>!</span>
      <h2>工作区加载失败</h2>
      <p>当前页面没有修改任何数据。请重试，或检查服务端日志。</p>
      <button type="button" className={styles.primaryButton} onClick={reset}>重新加载</button>
    </div>
  );
}
