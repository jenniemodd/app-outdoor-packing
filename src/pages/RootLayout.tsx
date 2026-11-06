import { NavLink, Outlet } from 'react-router'
import styles from './RootLayout.module.css'

const RootLayout = () => {
  return (
    <>
      <header className={styles.header}>
        {/* Höjdkurvorna. aria-hidden: rent dekorativa, skärmläsare hoppar över dem */}
        <svg
          className={styles.contours}
          viewBox="0 0 390 76"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-10 64 C 50 44, 110 74, 190 54 S 320 30, 400 46" />
          <path d="M-10 50 C 60 30, 120 60, 200 40 S 320 16, 400 30" />
          <path d="M-10 36 C 70 18, 130 46, 210 26 S 320 4, 400 14" />
          <path d="M220 76 C 250 60, 300 62, 330 50 S 380 40, 400 42" />
        </svg>

        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.logo}>
            Packlistan
          </NavLink>

          <nav className={styles.nav} aria-label="Huvudmeny">
            <NavLink to="/" end className={styles.navLink}>
              Alla prylar
            </NavLink>
            <NavLink to="/items/new" className={styles.navLink}>
              Lägg till pryl
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout