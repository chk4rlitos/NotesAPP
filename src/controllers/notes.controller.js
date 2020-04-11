const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNotesForm = (req, res) =>{ 
    res.render("notes/new-note");
}
notesCtrl.createNewNote = async (req, res) =>{
    const {title,description} = req.body;
    const newNote = new Note({title, description});
    newNote.user=req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Succesfully');
    res.redirect("/notes");
}
notesCtrl.renderNotes = async (req,res) =>{
    const notes = await Note.find({user:req.user.id}).sort({createdAt:"desc"});
    res.render("notes/all-note", {notes});
}
notesCtrl.rendermodifyNoteForm = async (req,res)=>{
    const note =  await Note.findById(req.params.id);
    if(note.user != req.user.id){
        req.flash("error_msg","Not Notes");        
        return res.redirect("/notes");
    }
    res.render('notes/edit-note', {note});
}

notesCtrl.updateNoteForm = async (req,res)=>{
    const {title,description} = req.body;    
    const note = await Note.findByIdAndUpdate(req.params.id, {title,description});
    if(note.user != req.user.id){
        req.flash("error_msg","Not Notes");        
        return res.redirect("/notes");
    }    
    req.flash('success_msg', 'Note update Succesfully');    
    res.redirect("/notes");
}

notesCtrl.deleteNoteForm = async (req,res)=>{ 
    const note =await Note.findByIdAndDelete(req.params.id);
    if(note.user != req.user.id){
        req.flash("error_msg","Not Notes");        
        return res.redirect("/notes");
    }    
    req.flash('success_msg', 'Note delete Succesfully');       
    res.redirect("/notes");
}
module.exports=notesCtrl;