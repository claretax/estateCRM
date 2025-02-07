import { Link } from 'react-router-dom';
import styles from '../assets/css/header.module.css'; // Ensure this path is correct

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>hello</h1>
    </header>
  );
}