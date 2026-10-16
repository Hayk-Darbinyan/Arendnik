export function WorkflowSection({ role, t }) {
  return (
    <section className="experience-flow">
      <div className="experience-flow-heading">
        <span className="experience-eyebrow">
          <i />
          {t.workflowLabel}
        </span>
        <h2>{role.workflowTitle}</h2>
      </div>
      <ol className="experience-flow-list">
        {role.workflow.map((step, i) => (
          <li key={step}>
            <span>0{i + 1}</span>
            <b>{step}</b>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorkflowSection;
