import { useEffect, useState } from 'react'

function AddApplication({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
}) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')

  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company)
      setPosition(editingApplication.position)
      setStatus(editingApplication.status)
    }
  }, [editingApplication])

  function handleSubmit(event) {
    event.preventDefault()

    const applicationData = {
      company,
      position,
      status,
    }

    if (editingApplication) {
      onUpdateApplication(applicationData)
    } else {
      onAddApplication(applicationData)
    }

    setCompany('')
    setPosition('')
    setStatus('Applied')
  }

  return (
    <section className="dashboard">
      <h2>{editingApplication ? 'Edit Application' : 'Add New Application'}</h2>

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

        <button type="submit">
          {editingApplication ? 'Update Application' : 'Save Application'}
        </button>
      </form>
    </section>
  )
}

export default AddApplication