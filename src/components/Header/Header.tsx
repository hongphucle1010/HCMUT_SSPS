import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Đây là Header</h1>
    </header>
  )
}

export default Header
