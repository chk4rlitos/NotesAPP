const {Router} =require('express');
const router = Router();

const {
        renderNotesForm,
        createNewNote,
        renderNotes,
        rendermodifyNoteForm,
        updateNoteForm,
        deleteNoteForm
} = require('../controllers/notes.controller');



const {isAuthenticated} = require('../helpers/auth.js')

router.get('/notes/add',isAuthenticated,renderNotesForm)
router.post('/notes/new-note', isAuthenticated, createNewNote )

router.get('/notes',isAuthenticated, renderNotes)

router.get('/edit/notes/:id',isAuthenticated,  rendermodifyNoteForm)
router.put('/edit/notes/:id',isAuthenticated,  updateNoteForm)

router.delete('/delete/notes/:id',isAuthenticated,  deleteNoteForm)

module.exports = router;