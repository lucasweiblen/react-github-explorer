import React from 'react';

const AddLangForm = () => {
  return (
    <div>
      <div class="field has-addons">
        <div class="control">
          <input className="input" type="text" placeholder="Add new language" />
        </div>
        <div class="control">
          <button className="button is-outlined">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLangForm;
