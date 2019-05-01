import React from 'react';
import Project from './Project';

function ProjectsContainer({projects}) {
  const _projects = projects.map((project, key) => {
    return <Project key={key} {...project} />;
  });

  return <div className="columns">{_projects}</div>;
}

export default ProjectsContainer;
