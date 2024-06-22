import React from 'react'
import {Link} from 'react-router-dom'

const GotoProductPageCard = () => {
  return (
    <section className="bg-white py-12">
    <div className="container mx-auto md:w-9/12 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FF794D]">Boycott for Peace</h2>
      <p className="text-lg leading-relaxed text-slate-500 mb-6">A call for a global boycott against Israeli companies, and businesses operating substantially in Israel, aims to encourage put pressure on the Israeli government to stop settlements and comply with international law.</p>
      <p className="text-lg leading-relaxed text-slate-500 mb-8">This economic pressure is intended to promote dialogue and actions that mitigate ongoing suffering and advance a resolution to the conflict. Mindful consumption choices can empower individuals globally to support this peaceful endeavor towards a harmonized region.</p>
      <Link to="/productpage">
        <button className="bg-emerald-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded inline-block mb-6 border-2 border-slate-200 hover:shadow-md">SEE THE BOYCOTT LIST</button>
      </Link>
    </div>
    <div className="card border-2 border-slate-200 hover:shadow-md p-6 md:p-12 rounded">
      {/* card content */}
    </div>
  </section>
  
  )
}

export default GotoProductPageCard
