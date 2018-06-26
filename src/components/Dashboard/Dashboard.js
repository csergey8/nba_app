import React, { Component } from 'react';
import FormFields from '../widgets/FormFields/FormFields';
import Uploader from '../widgets/FileUploader/FileUploader';
import style from './Dashboard.css';
import { firebaseTeams,  firebaseArticles, firebase } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
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
      body: {
        element: 'text-editor',
        value: '',
        valid: true
      },
      team: {
        element: 'select',
        value: '',
        config: {
          name: 'team',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      image: {
        element: 'image',
        value: '',
        valid: true
      }
      
    }
  }

  updateForm = (element, content = '') => {
    const newFormdata = {
      ...this.state.formdata
    }
    const newElement = {
      ...newFormdata[element.id]
    }

    if(content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    
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
    console.log(formIsValid);


    if(formIsValid) {
      this.setState({
        loading: true,
        postError: ''
      })
      firebaseArticles.orderByChild('id').limitToLast(1).once('value')
        .then((snapshot) => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          })
           dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
           dataToSubmit['id'] = articleId + 1;
           dataToSubmit['team'] = parseInt(dataToSubmit['team']);

           firebaseArticles.push(dataToSubmit)
            .then((article) => {
              this.props.history.push(`/articles/${article.key}`);
            })
            .catch(err => {
              this.setState({
                postError: err.message
              })
            })
        })
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

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    console.log(html);
    this.updateForm({
      id: 'body'
    }, html)
    this.setState({
      editorState
    });
  }

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once('value')
      .then((snapshot) => {
        let team = [];
        snapshot.forEach((childSnapshot) => {
          team.push({
            id: childSnapshot.val().teamId,
            name: childSnapshot.val().city
          })
        })
        const newFormData = {...this.state.formdata};
        const newElement = {...newFormData['team']};
        newElement.config.options = team;
        newFormData['team'] = newElement;

        this.setState({
          formdata: newFormData
        })
      })
  }

  storeFilename = (filename) => {
    this.updateForm({id: 'image'}, filename)
  }

  render() {
    return (
      <div className={style.postContainer}>
        <form onSubmit={this.submitForm} >
        <h2>Add post</h2>

          <Uploader
            filename={ (filename) => this.storeFilename(filename)}
          />

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

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          
          />

            <FormFields
              id={'team'}
              formdata={this.state.formdata.team}
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