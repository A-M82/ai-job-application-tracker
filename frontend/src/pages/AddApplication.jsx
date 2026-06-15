import { useEffect, useState } from 'react'

function AddApplication({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
}) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company)
      setPosition(editingApplication.position)
      setStatus(editingApplication.status)
      setNotes(editingApplication.notes || '')
    }
  }, [editingApplication])

  function handleSubmit(event) {
    event.preventDefault()

    const applicationData = {
      company,
      position,
      status,
      notes,
    }

    if (editingApplication) {
      onUpdateApplication(applicationData)
    } else {
      onAddApplication(applicationData)
    }

    setCompany('')
    setPosition('')
    setStatus('Applied')
    setNotes('')
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

        <div>
          <label>Notes</label>
          <textarea
            placeholder="Interview scheduled for Friday..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <button type="submit">
          {editingApplication ? 'Update Application' : 'Save Application'}
        </button>
      </form>
    </section>
  )
}

export default AddApplication