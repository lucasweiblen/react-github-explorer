import React from 'react';
import {config} from '../../config/httpClient';
import './NewProject.css';

const NewProject = project => {
  const iconClass = `project__languageicon devicons devicons-${project.language.toLowerCase()}`;
  const id = JSON.parse(localStorage.getItem('user')).id;
  const url = `users/${id}/bookmarked_projects`;

  const addBookmarkProject = (e, project) => {
    e.preventDefault();
    saveNewBookmarked(project);
  };

  const saveNewBookmarked = project => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.appAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    config.appAPI
      .post(url, {
        name: project.name,
        description: project.description,
        author: project.author,
        language: project.language,
        url: project.url,
      })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          //console.log(response.data);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  return (
    <div className="column is-one-third">
      <div className="box project__box">
        <div className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{project.name}</strong>
              </p>
              <p className="project__description">{project.description}</p>

              <p>
                <span>
                  <i className="far fa-user" />
                </span>
                &nbsp;&nbsp;
                <span>{project.author}</span>
              </p>
              <p>
                <i className={iconClass} />
                &nbsp;&nbsp;
                {project.language}
              </p>
              <p className="project__url">
                <span>
                  <i className="fas fa-link" />
                </span>
                &nbsp;&nbsp;
                <span>
                  <a href={project.url}>{project.url}</a>
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
            <div className="level">
              <a
                href="www.foobar.com"
                onClick={e => {
                  addBookmarkProject(e, project);
                }}
                className="level-item level-right">
                <span className="icon is-small">
                  <i className="fas fa-heart" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
