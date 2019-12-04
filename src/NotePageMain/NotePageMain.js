import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import config from '../config'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    onDeleteNote: () => { },
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.match.params;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId);
    console.log(note);

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleClickDelete}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
