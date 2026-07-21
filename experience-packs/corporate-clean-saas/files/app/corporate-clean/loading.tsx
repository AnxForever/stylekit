import styles from "../../components/corporate-clean/corporate-clean.module.css";

export default function CorporateCleanLoading() {
  return (
    <div className={styles.centerState} role="status" aria-label="正在加载 Corporate Clean 工作区">
      <span className={styles.stateIcon}>…</span>
      <h2>正在准备工作区</h2>
      <p>界面将在数据与权限检查完成后显示。</p>
    </div>
  );
}
