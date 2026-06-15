function AddApplication() {
  return (
    <section className="dashboard">
      <h2>Add New Application</h2>

      <form>
        <div>
          <label>Company</label>
          <input type="text" placeholder="Volkswagen" />
        </div>

        <div>
          <label>Position</label>
          <input type="text" placeholder="Project Manager" />
        </div>

        <div>
          <label>Status</label>
          <select>
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