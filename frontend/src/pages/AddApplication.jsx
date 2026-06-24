import { useState } from 'react'

function AddApplication({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
}) {
  //const [company, setCompany] = useState('')
  //const [position, setPosition] = useState('')
  //const [status, setStatus] = useState('Applied')
  //const [notes, setNotes] = useState('')

  //useEffect(() => {
   // if (editingApplication) {
    //  setCompany(editingApplication.company)
   //   setPosition(editingApplication.position)
  //    setStatus(editingApplication.status)
  //    setNotes(editingApplication.notes || '')
 //   } else {
 //     setCompany('')
 //     setPosition('')
 //     setStatus('Applied')
  //    setNotes('')
  //  }
  //}, [editingApplication])

  const [company, setCompany] = useState(editingApplication?.company || '')
  const [position, setPosition] = useState(editingApplication?.position || '')
  const [status, setStatus] = useState(editingApplication?.status || 'Applied')
  const [notes, setNotes] = useState(editingApplication?.notes || '')

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
            placeholder="Write company name"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            placeholder="Write position title"
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
            placeholder="Add notes about this application"
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