"use strict";

var fs = require('fs');

var chalk = require('chalk');

var getNotes = function getNotes() {
  // console.log('Your notes ...')
  return 'Your notes ...';
};

var addNote = function addNote(title, body) {
  var notes = loadNotes();
  var checkNotes = notes.find(function (note) {
    return note.title == title;
  }); // above is the short hand function for below 
  // const checkNotes = notes.filter((function(note){ 
  //     return note.title == title
  // }))
  // if (checkNotes.length == 0) {

  if (!checkNotes) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse(' Yours notes was added successfully '));
  } else {
    console.log(chalk.redBright.inverse('Notes title is already taken'));
  }
};

var removeNotes = function removeNotes(title) {
  var notes1 = loadNotes();
  var notesKeep = notes1.filter(function (note) {
    return note.title != title;
  });
  console.log(notesKeep.length);

  if (notesKeep.length >= 0) {
    saveNotes(notesKeep);
    console.log(chalk.green.inverse(' Yours notes was removed successfully '));
  } else {
    console.log(chalk.red.inverse(' No notes to removed '));
  }
};

var saveNotes = function saveNotes(notes) {
  // console.log('save notes called',notes);
  var data = JSON.stringify(notes); // console.log(data);

  fs.writeFileSync('notes.json', data);
};

var listNotes = function listNotes() {
  // const data = JSON.parse(fs.readFileSync('notes.json').toString());
  var notes1 = loadNotes();

  if (notes1.length >= 0) {
    console.log(chalk.whiteBright.inverse(' Your Notes '));
    var listData = notes1.forEach(function (element) {
      console.log(chalk.cyanBright.inverse(element.title));
    });
  } else {
    console.log(chalk.red.inverse(' No Notes to list '));
  }
};

var readNote = function readNote(title) {
  var notes = loadNotes();
  var notesKeep = notes.find(function (note) {
    return note.title == title;
  }); // console.log(notesKeep);
  // console.log(!notesKeep);
  // console.log(notesKeep);

  if (!notesKeep) {
    console.log(chalk.red.inverse(' No notes  '));
  } else {
    console.log(chalk.white.inverse(' Yours notes  '));
    console.log(chalk.yellow.inverse(notesKeep.title));
    console.log(chalk.green.inverse(notesKeep.body));
  }
};

var loadNotes = function loadNotes() {
  try {
    var dataBuffer = fs.readFileSync('notes.json');
    var data = dataBuffer.toString();
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote
};