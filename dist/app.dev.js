"use strict";

var chalk = require('chalk');

var _require = require('yargs'),
    argv = _require.argv;

var yargs = require('yargs');

var notes = require('./notes.js'); // console.log(chalk.redBright.inverse(getNotes()));
// console.log(process.argv)
// Add, Remove, Read, List,
// Add notes Command
// yargs.version('1.1.0')


yargs.command({
  command: "add",
  describe: "This is the add Command",
  builder: {
    title: {
      describe: "This is the title to add",
      demandOption: true,
      type: "string"
    }
  },
  handler: function handler(argv) {
    // console.log(argv.title,argv.body);
    notes.addNote(argv.title, argv.body);
  }
}); // Remove

yargs.command({
  command: "remove",
  describe: "This is the used to remove command",
  builder: {
    title: {
      describe: "This is the title desc",
      demandOption: true,
      type: "string"
    }
  },
  handler: function handler(argv) {
    notes.removeNotes(argv.title);
  }
}); // read

yargs.command({
  command: "read",
  describe: "This is used to read the notes",
  builder: {
    title: {
      describe: "This is the title read",
      demandOption: true,
      type: "string"
    }
  },
  handler: function handler() {
    // console.log(`This is the read title`+ argv.title +  argv.body);
    notes.readNote(argv.title);
  }
}); // List

yargs.command({
  command: "list",
  describe: "This is the command for List the notes",
  handler: function handler() {
    notes.listNotes();
  }
}); // console.log(yargs.argv)

yargs.parse();