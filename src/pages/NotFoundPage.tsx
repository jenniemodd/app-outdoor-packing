import { Link } from 'react-router'
import styles from './FormPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404 – Sidan hittades inte</h1>
      <p className={styles.message}>Den här stigen leder ingenstans.</p>
      <Link to="/">Tillbaka till packlistan</Link>
    </div>
  )
}

export default NotFoundPage