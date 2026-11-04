import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <>
      <h1>404 – Sidan hittades inte</h1>
      <Link to="/">Tillbaka till packlistan</Link>
    </>
  )
}

export default NotFoundPage