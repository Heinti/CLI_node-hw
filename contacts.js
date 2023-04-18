const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.join(__dirname, "db", "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const searchContact = list.find((item) => item.id === contactId);
  return searchContact || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const res = list.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
  return res;
};

const addContact = async (name, email, phone) => {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
