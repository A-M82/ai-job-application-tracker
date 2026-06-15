import { useState } from 'react'

function AddApplication({ onAddApplication }) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')

  function handleSubmit(event) {
    event.preventDefault()

    const newApplication = {
      company,
      position,
      status,
    }

    onAddApplication(newApplication)

    setCompany('')
    setPosition('')
    setStatus('Applied')
  }

  return (
    <section className="dashboard">
      <h2>Add New Application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label>
          <input
            type="text"
            placeholder="Volkswagen"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            placeholder="Project Manager"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
        </div>

        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Accepted</option>
          </select>
        </div>

        <button type="submit">Save Application</button>
      </form>
    </section>
  )
}

export default AddApplication