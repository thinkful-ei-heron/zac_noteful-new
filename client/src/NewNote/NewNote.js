import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config';
import './NewNote.css'



export default class NewNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['name'].value,
      content: e.target['content'].value,
      folder_id: e.target['folder_id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folder_id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders = [] } = this.context
    return (
      <section className="formContainer">
        <form
          onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="new_note">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength='32'
          />
          <label htmlFor="new_note">Content: </label>
          <textarea
            id="content"
            name="content"
            cols="30"
            rows="10"
            required
            maxLength='1024'
          ></textarea>
          <select id="folder_id" name='folder_id'>
            <option value=''>Choose a folder</option>
            {folders.map(folder =>
              <option
                value={folder.id}
                key={folder.id}
              >
                {folder.name}
              </option>
            )}
          </select>
          <button type='submit'>Add</button>
        </form>
      </section>
    )
  }
}
