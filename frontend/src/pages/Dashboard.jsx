function Dashboard() {
  const applications = [
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

  return (
    <section>
      <h2>Application Dashboard</h2>
      <p>Overview of current job applications and their status.</p>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{application.company}</td>
              <td>{application.position}</td>
              <td>{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Dashboard