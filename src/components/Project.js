import React from 'react';

function ProjectHeader({name}) {
  return <p className="title">{name}</p>;
}

function ProjectContent({project}) {
  return (
    <div>
      <p>
        <span>
          <i className="far fa-user" />
        </span>
        &nbsp;&nbsp;
        <span>{project.author}</span>
      </p>
      <p>
        <span>
          <i className="devicon-go-line colored" />
        </span>
        &nbsp;&nbsp;
        <span>{project.language}</span>
      </p>
      <p>
        <span>
          <i className="fas fa-link" />
        </span>
        &nbsp;&nbsp;
        <span>
          <a href="foobar.com">{project.url}</a>
        </span>
      </p>
      <p>
        <span>
          <i className="far fa-star" />
        </span>
        &nbsp;&nbsp;
        <span>{project.stars}</span>
      </p>
    </div>
  );
}

function ProjectFooter() {
  return (
    <footer className="card-footer">
      <p className="card-footer-item">
        <span>
          <button>
            <i className="fas fa-heart" />
          </button>
        </span>
        &nbsp; &nbsp;
        <span>
          <button>
            <i className="fas fa-trash" />
          </button>
        </span>
      </p>
    </footer>
  );
}

function Project(project) {
  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <ProjectHeader name={project.name} />
          <ProjectContent project={project} />
        </div>
        <ProjectFooter />
      </div>
    </div>
  );
}

export default Project;
