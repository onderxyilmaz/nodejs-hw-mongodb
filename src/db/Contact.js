const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    default: 'personal',
    required: true,
  },
}, { 
  timestamps: true,
  collection: 'contacts'
});

const Contact = mongoose.model('Contact', contactSchema);

// Örnek verileri ekleme fonksiyonu
const initializeContacts = async () => {
  try {
    // Koleksiyonda veri var mı kontrol et
    const count = await Contact.countDocuments();
    if (count === 0) {
      // Örnek veriler
      const sampleContacts = [
        {
          name: "John Doe",
          phoneNumber: "+1234567890",
          email: "john@example.com",
          contactType: "personal"
        },
        {
          name: "Jane Smith",
          phoneNumber: "+9876543210",
          email: "jane@example.com",
          contactType: "work"
        }
      ];

      // Verileri ekle
      await Contact.insertMany(sampleContacts);
      console.log('Sample contacts added successfully');
    }
  } catch (error) {
    console.error('Error initializing contacts:', error);
  }
};

// İlk çalıştırmada örnek verileri ekle
initializeContacts();

module.exports = Contact; 