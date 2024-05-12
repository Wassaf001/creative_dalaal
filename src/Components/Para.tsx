
  interface ParaProps {
    textContent: string;
  }

  function Para({ textContent }: ParaProps) {
    return (
      <div className="card mt-4">
        <div className="card-body" dangerouslySetInnerHTML={{ __html: textContent }} />
      </div>
    );
  }

  export default Para;
