import { useState } from 'react'

function buildInterviewPrep(application) {
  const role = application.position || 'this role'
  const company = application.company || 'the company'

  return {
    interviewerQuestions: [
      `Can you walk me through your recent experience that is most relevant to ${role}?`,
      `Tell me about a time you handled a difficult challenge similar to what someone at ${company} might face.`,
      `How do you prioritize competing deadlines when multiple stakeholders need your attention?`,
      `What would success look like in your first 90 days in ${role}?`,
      `How do you respond to feedback when a project changes direction?`,
    ],
    positionQuestions: [
      `What are the top priorities for ${role} in the first 6 months?`,
      `How does the team at ${company} measure success in this position?`,
      `What are the biggest challenges someone in ${role} should be prepared for?`,
      `How does this role collaborate with other teams or departments?`,
      `What skills or experience make someone especially successful in this position?`,
    ],
  }
}

function InterviewPrep({ applications }) {
  const [generatedPrep, setGeneratedPrep] = useState({})

  const interviewApplications = applications.filter(
    (application) => application.status === 'Interview'
  )

  function getPrepKey(application, index) {
    return `${application.company || 'company'}::${application.position || 'position'}::${index}`
  }

  function handleGenerateInterviewPrep() {
    const prepByApplication = {}

    interviewApplications.forEach((application, index) => {
      const key = getPrepKey(application, index)
      prepByApplication[key] = buildInterviewPrep(application)
    })

    setGeneratedPrep(prepByApplication)
  }

  return (
    <section className="dashboard">
      <h2>AI Interview Preparation</h2>

      <p>
       Generate interviewer-led questions for each interview stage role, plus
       role-specific questions the candidate should be ready to answer.
      </p>

      <div style={{ textAlign: 'center', margin: '25px 0' }}>
       <button
         onClick={handleGenerateInterviewPrep}
         disabled={interviewApplications.length === 0}
       >
         Generate Interview Prep
       </button>
      </div>

      {interviewApplications.length === 0 ? (
       <p>No interview preparation needed yet.</p>
      ) : (
       <table>
         <thead>
           <tr>
             <th>Company</th>
             <th>Position</th>
             <th>Questions for the interviewer to ask</th>
             <th>Questions the candidate may be asked</th>
           </tr>
         </thead>

         <tbody>
           {interviewApplications.map((application, index) => (
             <tr key={getPrepKey(application, index)}>
               <td>{application.company}</td>
               <td>{application.position}</td>
               <td>
                 {generatedPrep[getPrepKey(application, index)] ? (
                   <ul>
                     {generatedPrep[getPrepKey(application, index)].interviewerQuestions.map(
                       (question) => (
                         <li key={question}>{question}</li>
                       )
                     )}
                   </ul>
                 ) : (
                   <p>Click "Generate Interview Prep" to create interviewer questions.</p>
                 )}
               </td>
               <td>
                 {generatedPrep[getPrepKey(application, index)] ? (
                   <ul>
                     {generatedPrep[getPrepKey(application, index)].positionQuestions.map(
                       (question) => (
                         <li key={question}>{question}</li>
                       )
                     )}
                   </ul>
                 ) : (
                   <p>Click "Generate Interview Prep" to create position-specific questions.</p>
                 )}
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