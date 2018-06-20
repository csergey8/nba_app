import React from 'react';
import style from './FormFields.css';

const FormFields = ({formdata, change, id}) => {

  const showError = () => {
    let errorMessage = null;

    if(formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className={style.errorLabel}>
          {formdata.validationMessage}
        </div>
      );
    }

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formdata.element){
      case('input'):
        formTemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => change({
                event,
                id,
                blur: false
              })}
              onBlur={(event) => change({
                event,
                id,
                blur: true
              })}
              />
              {showError()} 
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;


  }
  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormFields;
