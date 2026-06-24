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

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || ''
  })

  const [loginInput, setLoginInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

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

  function handleLogin(event) {
    event.preventDefault()

    if (!loginInput.trim() || !passwordInput.trim()) {
      return
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', loginInput)

    setUserName(loginInput)
    setIsLoggedIn(true)
    setLoginInput('')
    setPasswordInput('')
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    setIsLoggedIn(false)
    setUserName('')
  }

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

  if (!isLoggedIn) {
    return (
      <main className="app">
        <section className="hero">
          <h1>AI Job Application Tracker</h1>

          <p className="subtitle">
            Log in to manage your job applications, track your progress,
            and prepare for interviews.
          </p>

          <form onSubmit={handleLogin}>
            <div>
              <label>Name or Email</label>
              <input
                type="text"
                placeholder="Enter your name or email"
                value={loginInput}
                onChange={(event) => setLoginInput(event.target.value)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <section className="hero">
        <h1>AI Job Application Tracker</h1>

        <p className="subtitle">
          Welcome, {userName}. Manage job applications, track progress,
          prepare for interviews, and gain insights into your job search process.
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

          <button className="secondary" onClick={handleLogout}>
            Logout
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
          <p>
            Generate interviewer-led questions and role-specific prompts for
            interview-stage applications.
          </p>
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
          key={editingIndex === null ? 'new-application' : `edit-${editingIndex}`}
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