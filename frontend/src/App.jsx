import { useEffect, useRef, useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import Analytics from './pages/Analytics'
import InterviewPrep from './pages/InterviewPrep'

function App() {
  const dashboardRef = useRef(null)
  const addApplicationRef = useRef(null)
  const analyticsRef = useRef(null)
  const interviewPrepRef = useRef(null)

  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem('applications')

    if (savedApplications) {
      return JSON.parse(savedApplications)
    }

    return [
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
    ]
  })

  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      'applications',
      JSON.stringify(applications)
    )
  }, [applications])

  function scrollToSection(sectionRef) {
    sectionRef.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  function handleAddApplication(newApplication) {
    setApplications([...applications, newApplication])
  }

  function handleUpdateApplication(updatedApplication) {
    const updatedApplications = applications.map((application, index) => {
      if (index === editingIndex) {
        return updatedApplication
      }

      return application
    })

    setApplications(updatedApplications)
    setEditingIndex(null)
  }

  function handleDeleteApplication(indexToDelete) {
    const updatedApplications = applications.filter(
      (application, index) => index !== indexToDelete
    )

    setApplications(updatedApplications)
  }

  function handleEditApplication(index) {
    setEditingIndex(index)
    scrollToSection(addApplicationRef)
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
          <button onClick={() => scrollToSection(dashboardRef)}>
            View Applications
          </button>

          <button
            className="secondary"
            onClick={() => scrollToSection(addApplicationRef)}
          >
            Add New Application
          </button>
        </div>
      </section>

      <section className="features">
        <div onClick={() => scrollToSection(dashboardRef)}>
          <h2>Application Tracking</h2>
          <p>Organize companies, positions, salaries, contacts, and status updates.</p>
        </div>

        <div onClick={() => scrollToSection(interviewPrepRef)}>
          <h2>AI Interview Prep</h2>
          <p>Generate interview questions and preparation tips based on job descriptions.</p>
        </div>

        <div onClick={() => scrollToSection(analyticsRef)}>
          <h2>Analytics</h2>
          <p>Understand success rates, interview progress, and rejection patterns.</p>
        </div>
      </section>

      <section ref={dashboardRef}>
        <Dashboard
          applications={applications}
          onDeleteApplication={handleDeleteApplication}
          onEditApplication={handleEditApplication}
        />
      </section>

      <section ref={addApplicationRef}>
        <AddApplication
          onAddApplication={handleAddApplication}
          onUpdateApplication={handleUpdateApplication}
          editingApplication={applications[editingIndex]}
        />
      </section>

      <section ref={analyticsRef}>
        <Analytics applications={applications} />
      </section>

      <section ref={interviewPrepRef}>
        <InterviewPrep applications={applications} />
      </section>
    </main>
  )
}

export default App