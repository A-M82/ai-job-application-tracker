function Dashboard({ applications, onDeleteApplication }) {
  const totalApplications = applications.length

  const interviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length

  const applied = applications.filter(
    (application) => application.status === 'Applied'
  ).length

  const rejected = applications.filter(
    (application) => application.status === 'Rejected'
  ).length

  return (
    <section className="dashboard">
      <h2>Application Dashboard</h2>
      <p>Overview of current job applications and their status.</p>

      <div className="stats">
        <div>
          <h3>{totalApplications}</h3>
          <p>Total Applications</p>
        </div>

        <div>
          <h3>{interviews}</h3>
          <p>Interviews</p>
        </div>

        <div>
          <h3>{applied}</h3>
          <p>Applied</p>
        </div>

        <div>
          <h3>{rejected}</h3>
          <p>Rejected</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{application.company}</td>
              <td>{application.position}</td>
              <td>{application.status}</td>
              <td>
                <button onClick={() => onDeleteApplication(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Dashboard