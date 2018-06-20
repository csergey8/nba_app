import React, { Component } from 'react';
import FormFields from '../widgets/FormFields/FormFields';
import style from './Dashboard.css';

class Dashboard extends Component {
  state = {
    postError: '',
    loading: false,
    formdata: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'Enter a title'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      
    }
  }

  updateForm = (element) => {
    const newFormdata = {
      ...this.state.formdata
    }
    const newElement = {
      ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;
    if(element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;


    this.setState({
      formdata: newFormdata
    })
  }

  validate = (element) => {
    let error = [true, ''];

    if(element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  }

  submitButton = () => (
    this.state.loading ? 
    'loading...' :
    <div>
      <button type="submit">Add Post</button>
    </div>
  );

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value
    }
    for(let key in this.state.formdata) {
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    console.log(dataToSubmit);

    if(formIsValid) {
      console.log('Submit post');
    } else {
      this.setState({
        postError: 'Something went wrong'
      })
    }
  }

  showError = () => (
    this.state.postError !== '' ?
    <div className={style.error}>{this.state.postError}</div> :
    ''
  );

  render() {
    return (
      <div className={style.postContainer}>
        <form onSubmit={this.submitForm} >
        <h2>Add post</h2>
          <FormFields
            id={'author'}
            formdata={this.state.formdata.author}
            change={(element) => this.updateForm(element)}
           />
          <FormFields
            id={'title'}
            formdata={this.state.formdata.title}
            change={(element) => this.updateForm(element)}
          />
            {this.submitButton()}
            {this.showError()}
        </form>
      </div>
    )
  }
}

export default Dashboard;