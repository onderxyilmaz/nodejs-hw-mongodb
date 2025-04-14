const contactsService = require('../services/contacts');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    if (error.message === 'Contact not found') {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllContacts,
  getContactById,
}; 