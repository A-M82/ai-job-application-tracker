function Analytics({ applications }) {
  const totalApplications = applications.length

  const interviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length

  const rejected = applications.filter(
    (application) => application.status === 'Rejected'
  ).length

  const accepted = applications.filter(
    (application) => application.status === 'Accepted'
  ).length

  const interviewRate =
    totalApplications > 0
      ? Math.round((interviews / totalApplications) * 100)
      : 0

  const rejectionRate =
    totalApplications > 0
      ? Math.round((rejected / totalApplications) * 100)
      : 0

  const successRate =
    totalApplications > 0
      ? Math.round((accepted / totalApplications) * 100)
      : 0

  return (
    <section className="dashboard">
      <h2>Analytics & Insights</h2>
      <p>Key insights into the current job search progress.</p>

      <div className="stats">
        <div>
          <h3>{interviewRate}%</h3>
          <p>Interview Rate</p>
        </div>

        <div>
          <h3>{rejectionRate}%</h3>
          <p>Rejection Rate</p>
        </div>

        <div>
          <h3>{successRate}%</h3>
          <p>Success Rate</p>
        </div>
      </div>
    </section>
  )
}

export default Analytics