function InterviewPrep({ applications }) {
  const interviewApplications = applications.filter(
    (application) => application.status === 'Interview'
  )

  return (
    <section className="dashboard">
      <h2>AI Interview Preparation</h2>
      <p>
        Prepare for upcoming interviews with suggested focus areas and practice questions.
      </p>

      {interviewApplications.length === 0 ? (
        <p>No interview preparation needed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Suggested Questions</th>
            </tr>
          </thead>

          <tbody>
            {interviewApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.company}</td>
                <td>{application.position}</td>
                <td>
                  Tell me about yourself.
                  <br />
                  Why are you interested in this role?
                  <br />
                  What relevant experience do you bring?
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default InterviewPrep