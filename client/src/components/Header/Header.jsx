import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <img src="../logo.png" alt="logo" />
      <div>
        <h1>WordFlip</h1>
        <h3>Карточная игра для быстрого изучения слов</h3>
      </div>
    </div>
  );
}

export default Header;