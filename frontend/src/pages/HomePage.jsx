import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Book, UserPlus, Edit, Trash2, Phone } from 'lucide-react'
import { Helmet } from 'react-helmet'
import AOS from 'aos'
import 'aos/dist/aos.css'

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  // mapped down
  const buttons = [
    { to: '/contacts', text: 'View Contacts', color: 'bg-blue-600', icon: Book, aosDelay: '0' },
    { to: '/addcontact', text: 'Add Contact', color: 'bg-green-600', icon: UserPlus, aosDelay: '100' },
    { to: '/editcontact', text: 'Edit Contact', color: 'bg-yellow-600', icon: Edit, aosDelay: '200' },
    { to: '/deletecontact', text: 'Delete Contact', color: 'bg-red-600', icon: Trash2, aosDelay: '300' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 p-4 sm:p-8">
      {/* favicon */}
      <Helmet>
        <link rel="icon" href="/img.jpg" />
        <title>Contact Manager - Home</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <header className="text-white text-center mb-12" data-aos="fade-down">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 flex items-center justify-center">
            <Phone className="mr-4 h-12 w-12" />
            Contact Manager
          </h1>
          <p className="text-xl text-purple-200">Organize your connections effortlessly</p>
        </header>

        <main className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {buttons.map(({ to, text, color, icon: Icon, aosDelay }) => (
              <Link to={to} key={to} className="block" data-aos="zoom-in" data-aos-delay={aosDelay}>
                <button className={`w-full ${color} text-white p-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-4`}>
                  <Icon className="h-8 w-8" />
                  <span>{text}</span>
                </button>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white bg-opacity-20 rounded-2xl p-8" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white mb-6">How to use:</h2>
            <ul className="space-y-4 text-purple-100">
              {buttons.map(({ text, icon: Icon }) => (
                <li key={text} className="flex items-center">
                  <Icon className="h-6 w-6 mr-4 text-purple-300" />
                  <span>{text} to manage your contacts</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <footer className="mt-12 text-center text-purple-200">
          <p>&copy; 2024 Contact Management System. All rights reserved.</p>
          <p className='text-sm mt-2'>Fully Made By Poorana Selvan, DM me on Instagram: @ivlpoorana</p>
        </footer>
      </div>
    </div>
  )
}

export default HomePage