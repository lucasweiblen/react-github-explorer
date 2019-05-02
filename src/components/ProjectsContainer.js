import React from 'react';
//import Project from './Project';
import NewProject from './NewProject';

function ProjectsContainer({projects}) {
  //const _projects = projects.map((project, key) => {
  //return <Project key={key} {...project} />;
  //});
  const _projects = projects.map((project, key) => {
    return <NewProject key={key} {...project} />;
  });

  //return <div className="columns">{_projects}</div>;
  return <div className="columns is-multiline is-3">{_projects}</div>;
}

export default ProjectsContainer;
