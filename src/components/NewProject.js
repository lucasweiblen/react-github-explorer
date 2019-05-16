import React, {useState} from 'react';
import axios from 'axios';

const NewProject = project => {
  const iconClass = `devicons devicons-${project.language.toLowerCase()}`;
  const localUrl = 'http://localhost:1323/users/3/bookmarked_projects';

  const addBookmarkProject = (e, project) => {
    e.preventDefault();
    console.log(project);
    //console.log(e);

    saveNewBookmarked(project);
  };

  const saveNewBookmarked = project => {
    axios
      .post(localUrl, {
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
      <div className="box" style={{height: '100%'}}>
        <div className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{project.name}</strong>
              </p>
              <p
                className="description"
                style={{
                  display: 'block',
                  minHeight: '48px',
                  overflow: 'hidden',
                }}>
                {project.description}
              </p>

              <p>
                <span>
                  <i className="far fa-user" />
                </span>
                &nbsp;&nbsp;
                <span>{project.author}</span>
              </p>
              <p>
                <i
                  className={iconClass}
                  style={{
                    fontSize: '30px',
                    marginLeft: '-8px',
                    position: 'relative',
                    top: '5px',
                  }}
                />
                &nbsp;&nbsp;
                {project.language}
              </p>
              <p style={{height: '48px'}}>
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
