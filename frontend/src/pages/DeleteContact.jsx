import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Phone, Mail, Search, Trash2, CircleMinus, Home, UserPlus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const DeleteContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  // inital aa data va get panni setContacts la store panrom
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  // filtering contacts
  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           contact.phone.includes(searchTerm);
  });

  // passing phone numbers to ths func 
  const handleDelete = (phone) => {
    // conformation message
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // if confirmed filter it by number 
      if (result.isConfirmed) {
        const updatedContacts = contacts.filter((contact) => contact.phone !== phone);
        setContacts(updatedContacts); // updating setContacts
        localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // updating localStorage
        // deleted toast
        Swal.fire(
          'Deleted!',
          'The contact has been deleted.',
          'success'
        )
      }
    })
  }

  const handleClearAll = () => {
    // deleting all contacts that in the array in the localStorage
    Swal.fire({
      title: 'Delete all contacts?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!'
    }).then((result) => {
      // if yes make the setContacts empty and remove contacts from localStorage
      if (result.isConfirmed) {
        setContacts([]);
        localStorage.removeItem('contacts');
        Swal.fire(
          'Deleted!',
          'All contacts have been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 sm:p-8">
      <Helmet>
        <link rel="icon" href="/delete.svg" />
        <title>Delete Contacts</title>
      </Helmet>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-gray-800 p-6 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Delete Contact Details</h1>
        </header>

        <div className="p-6">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative flex items-center">
              <input type="text" placeholder="Search by name or phone number" className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {contacts.length >= 1 && (
              <button className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center"onClick={handleClearAll}>
                <CircleMinus className="mr-2" /> Clear All Contacts
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200" key={contact.phone}>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">{contact.name}</h2>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-blue-500" />
                      <span>Phone: {contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-green-500" />
                      <span>Email: {contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-purple-500" />
                      <span>Company: {contact.company}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-yellow-500" />
                      <span>Job Title: {contact.jobTitle}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-500" />
                      <span className="capitalize">{contact.address}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 px-6 py-4">
                  <button className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center"onClick={() => handleDelete(contact.phone)}>
                    <Trash2 className="mr-2" /> Delete Contact
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No contacts found. Try a different search or add new contacts.</p>
          )}
        </div>

        <footer className="bg-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to='/home'>
              <button className='bg-gray-800 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-gray-700 flex items-center'>
                <Home className="mr-2" /> Home
              </button>
            </Link>
            <Link to='/add-contact'>
              <button className='bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-green-600 flex items-center'>
                <UserPlus className="mr-2" /> Add Contact
              </button>
            </Link>
            <Link to='/edit-contact'>
              <button className='bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-yellow-600 flex items-center'>
                <Edit className="mr-2" /> Edit Contact
              </button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DeleteContact;