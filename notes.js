const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    const checkNotes = notes.find(((note) => note.title == title)) 

    // ****** above is the short hand function for below 

    // const checkNotes = notes.filter((function(note){ 
    //     return note.title == title
    // }))

    // ***** if (checkNotes.length == 0) {
        if(!checkNotes){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse(' Yours notes was added successfully '));
    } else {
        console.log(chalk.redBright.inverse('Notes title is already taken'));
    }
}

const removeNotes = (title) => {
    const notes1 = loadNotes();
    const notesKeep = notes1.filter(((note) => note.title != title ));
    console.log(notesKeep.length);
    if (notesKeep.length >= 0) {
        saveNotes(notesKeep);
        console.log(chalk.green.inverse(' Yours notes was removed successfully '));
    }else{
    console.log(chalk.red.inverse(' No notes to removed '));
    }
}
const saveNotes = (notes) => {
    // console.log('save notes called',notes);
    const data = JSON.stringify(notes);
    // console.log(data);
    fs.writeFileSync('notes.json', data);
}

const listNotes = () =>{
    // const data = JSON.parse(fs.readFileSync('notes.json').toString());
    const notes1 = loadNotes();
    if(notes1.length >= 0){
        console.log(chalk.whiteBright.inverse(' Your Notes '))
        const listData = notes1.forEach(element => {
            console.log(chalk.cyanBright.inverse(element.title));
        })
    }else
    {
        console.log(chalk.red.inverse(' No Notes to list '))
    }
}

const readNote = (title) =>{
    debugger
    const notes = loadNotes();
    const notesKeep = notes.find(((note) => note.title == title ));
    if(notesKeep){
       
        console.log(chalk.white.inverse(' Yours notes  '));
        console.log(chalk.yellow.inverse(notesKeep.title));
        console.log(chalk.green.inverse(notesKeep.body));
    }else{

        console.log(chalk.red.inverse(' No notes  '));
    }
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const data = dataBuffer.toString();
        return JSON.parse(data);
    } catch (e) {
        return []
    }
}
module.exports = {
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote:readNote
}