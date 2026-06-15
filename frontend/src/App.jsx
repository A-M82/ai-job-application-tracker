import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'

function App() {
  const [applications, setApplications] = useState([
    {
      company: 'Volkswagen',
      position: 'Project Manager',
      status: 'Interview',
    },
    {
      company: 'Siemens Energy',
      position: 'Senior Project Manager',
      status: 'Applied',
    },
    {
      company: 'Mapbox',
      position: 'Principal Technical Program Manager',
      status: 'Rejected',
    },
  ])

  function handleAddApplication(newApplication) {
    setApplications([...applications, newApplication])
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="badge">AI Full Stack Bootcamp Project</p>

        <h1>AI Job Application Tracker</h1>

        <p className="subtitle">
          Manage job applications, track progress, prepare for interviews,
          and gain insights into your job search process.
        </p>

        <div className="actions">
          <button>View Applications</button>
          <button className="secondary">Add New Application</button>
        </div>
      </section>

      <section className="features">
        <div>
          <h2>Application Tracking</h2>
          <p>Organize companies, positions, salaries, contacts, and status updates.</p>
        </div>

        <div>
          <h2>AI Interview Prep</h2>
          <p>Generate interview questions and preparation tips based on job descriptions.</p>
        </div>

        <div>
          <h2>Analytics</h2>
          <p>Understand success rates, interview progress, and rejection patterns.</p>
        </div>
      </section>

      <Dashboard applications={applications} />

      <AddApplication onAddApplication={handleAddApplication} />
    </main>
  )
}

export default App