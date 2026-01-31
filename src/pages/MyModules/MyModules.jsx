import styles from './MyModules.module.css';

function MyModules() {
  return (
    <div className={styles.MyModules}>
      <h1>Мои модули</h1>
      <div className={styles.plus}>
        <span>+</span>
      </div>
    </div>
  );
}

export default MyModules;