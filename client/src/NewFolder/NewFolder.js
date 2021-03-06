import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config';

export default class NewFolder extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['foldername'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className="formContainer">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="new_note">New Folder: </label>
          <input
            id="foldername"
            name="foldername"
            type="text"
            maxLength='32'
            required
          />
          <button>Add</button>
        </form>
      </section>


    )
  }
}
