import { NavLink, Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <header>
        <NavLink to="/">🎒 Packlistan</NavLink>

        <nav>
          <NavLink to="/" end>Alla prylar</NavLink>
          <NavLink to="/items/new">Lägg till pryl</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout