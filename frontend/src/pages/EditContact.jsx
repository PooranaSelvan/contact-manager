import React, { useState, useEffect } from "react";
import { User, Phone, Mail, Briefcase, MapPin, Hash, Home, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet';

const EditContact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    address: "",
  });


  // inital aa data va get panni setContacts la store panrom
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);


  // runs on form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // get button on phone number 
  const handleGetPhone = () => {
    // if entered phone number wasnt matched to num we have in localStorage it displays error
    const contact = contacts.find(
      (c) => c.phone === formData.phone
    );
    // if it got it sets to setFormData
    if (contact) {
      setFormData(contact);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Contact Not Found",
        text: "No contact with this phone number exists.",
        timer: 2000,
      });
    }
  };

  // submit of form 
  const handleSubmit = (e) => {
    e.preventDefault();

    // if 2 nums were same it spreads form data & stores in the updatedContacts
    const updatedContacts = contacts.map((contact) => {
      if (contact.phone === formData.phone) {
        return { ...formData };
      } else {
        return contact;
      }
    });
  
    setContacts(updatedContacts); // update in setStudents
    localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // update in localStorage

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Contact Has Been Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    setFormData({ name: "", phone: "", email: "", company: "", jobTitle: "", address: "" }); // making empty for next data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
      <Helmet>
        <link rel="icon" href="/update.svg" />
        <title>Update Contact</title>
      </Helmet>
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 className="text-3xl font-bold text-white text-center">
              Update Contact
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="relative">
              <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full pl-10 pr-20 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out" required/>
              <button type="button" onClick={handleGetPhone} className="absolute right-1 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                Get
              </button>
            </div>
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out" required/>
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative">
              <Briefcase className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative">
              <Hash className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out"/>
            </div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out"/>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              Update Contact
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
          <Link to='/deletecontact'>
            <button className='bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-red-600 flex items-center'>
              <Trash2 className="mr-2" /> Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditContact;