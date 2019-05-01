import React from 'react';

const AddLangForm = () => {
  return (
    <div>
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Add new language" />
        </div>
        <div className="control">
          <button className="button is-outlined">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLangForm;
