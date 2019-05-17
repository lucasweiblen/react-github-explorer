import React from 'react';
import NewProject from './NewProject';

function ProjectsContainer({projects}) {
  const _projects = projects.map((project, key) => {
    return <NewProject key={key} {...project} />;
  });

  return <div className="columns is-multiline is-3">{_projects}</div>;
}

export default ProjectsContainer;
