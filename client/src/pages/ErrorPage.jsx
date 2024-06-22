import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center text-center mt-64">
        
        <h2 className='text-6xl text-black'>Page Not Found 404</h2>
        <Link to="/" className="btn primary text-2xl underline ">Go Back Home</Link>
      </div>
    </section>
  )
}

export default ErrorPage