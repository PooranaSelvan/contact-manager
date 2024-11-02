import React, { useState, useEffect } from 'react';
import { User, Hash, Phone, Mail, Briefcase, MapPin, Home, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { Helmet } from 'react-helmet';

const AddContact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    address: ''
  });

  // inital aa data va get panni setContacts la store panrom
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  // runs on form inputs onChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when click submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // required field validator for form name & num
    if (!formData.name || !formData.phone) {
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        text: "Please enter both name and phone number.",
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // if entered num or name were already exists in the setStudents means it display errors
    const alreadyExists = contacts.some((contact) => contact.phone === formData.phone);
    
    if (alreadyExists) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Entry",
        text: "This phone number already exists. Please enter a unique phone number.",
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    // if the num & name wasnt matched
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Contact has been successfully added.",
      confirmButtonColor: '#3085d6',
    });
  
    const newContact = { ...formData }; // spreading all contacts we entered
    const updatedContacts = [...contacts, newContact]; // adding with contacts we got from localStorage
    setContacts(updatedContacts); // setting in setContacts
    localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // storing in localStorage
    setFormData({ name: '', phone: '', email: '', company: '', jobTitle: '', address: '' }); // clearing formData to enter next data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-6 lg:p-8">
      <Helmet>
        <link rel="icon" href="/add.svg" />
        <title>Add Contact</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-800 p-6 text-white">
          <h2 className="text-3xl font-bold text-center">Add New Contact</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out" required/>
            </div>
            <div className="relative">
              <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out" required/>
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address (Optional)" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative">
              <Briefcase className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company (Optional)" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative">
              <Hash className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title (Optional)" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative md:col-span-2">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address (Optional)" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"/>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            Add Contact
          </button>
        </form>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        <Link to='/home'>
          <button className='bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-gray-700 flex items-center'>
            <Home className="mr-2" /> Home
          </button>
        </Link>
        <Link to='/contacts'>
          <button className='bg-green-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-green-600 flex items-center'>
            <Eye className="mr-2" /> View Contacts
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AddContact;