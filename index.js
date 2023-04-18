const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      return console.table(list);
    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
    case "add":
      await contacts.addContact(name, email, phone);
      return console.log(`${name} added to contacts`);
    case "remove":
      await contacts.removeContact(id);
      return console.log(`Contact with id ${id} removed from contacts`);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
