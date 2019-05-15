import React from 'react';

const NewProject = project => {
  const iconClass = `devicons devicons-${project.language.toLowerCase()}`;

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
            <div className="level">
              <a href="www.foobar.com" className="level-item level-right">
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
