import React, { useState, useEffect } from 'react'
import './ContactList.css'
import EditableContact from './EditableContact'
import ContactSearch from './ContactSearch'

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [searchName, setSearchName] = useState('')
  const [creatingContact, setCreatingContact] = useState(false)
  const [newContactName, setNewContactName] = useState('') // Define state variables
  const [newContactAddress, setNewContactAddress] = useState('')
  const [newContactEmail, setNewContactEmail] = useState('')
  const [newContactPhone, setNewContactPhone] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // const accessToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTQzMjAzMiwiZXhwIjoxNjkxNDQ2NDMyfQ.TnUDwcH_WzYblP-PtnuoaEQZkX_glCK7-ECgOBhoeJE'

    fetch('http://localhost:8080/api/contacts', {
      headers: {
        // Authorization: `Bearer ${accessToken}`, // include access token here
        Authorization: 'none',
      },
    })
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching data;', error))
  }, [])

  const handleCreateContact = () => {
    setCreatingContact(true)
  }

  const handleSaveNewContact = async () => {
    const newContact = {
      name: newContactName,
      address: newContactAddress,
      email: newContactEmail,
      phone: parseInt(newContactPhone),
    }

    try {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTY1MjQ0NywiZXhwIjoxNjkxNjY2ODQ3fQ.SvmRJP7u5F7F7aIHEsIC2ySEw6runPYQaa2U0Pea0WQ'

      const response = await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newContact),
      })

      if (response.ok) {
        // Contact successfully added
        setShowSuccessMessage(true) // Show success message

        //Refresh the contact list
        handleSearchByName('')

        //Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false)
          setCreatingContact(false)
          setNewContactName('')
          setNewContactAddress('')
          setNewContactEmail('')
          setNewContactPhone(null)
        }, 3000)
      } else {
        console.error('Error adding contact:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleDeleteContact = (contactId) => {
    if (contactId) {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTY1MjQ0NywiZXhwIjoxNjkxNjY2ODQ3fQ.SvmRJP7u5F7F7aIHEsIC2ySEw6runPYQaa2U0Pea0WQ'
      fetch(`http://localhost:8080/api/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Contact successfully deleted
            setContacts((prevContacts) =>
              prevContacts.filter((contact) => contact._id !== contactId)
            )
          } else {
            console.error('Error deleting contact:', response.statusText)
          }
        })
        .catch((error) => console.error('Error deleting contact:', error))
    } else {
      console.error('Contact ID is undefined')
    }
  }

  const handleUpdateContact = (updatedContact) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTY1MjQ0NywiZXhwIjoxNjkxNjY2ODQ3fQ.SvmRJP7u5F7F7aIHEsIC2ySEw6runPYQaa2U0Pea0WQ'

    fetch(`http://localhost:8080/api/contacts/${updatedContact._id}`, {
      method: 'PUT', // Use PUT method for updating data
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact), // Convert updatedContact object to JSON
    })
      .then((response) => {
        if (response.ok) {
          // Contact successfully updated
          // Toggle the editMode off and update the state with the updated contact
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact._id === updatedContact._id
                ? { ...updatedContact, editMode: false }
                : contact
            )
          )
        } else {
          console.error('Error updating contact:', response.statusText)
        }
      })
      .catch((error) => console.error('Error updating contact:', error))
  }

  const handleSearchByName = (searchName) => {
    setSearchName(searchName)
    // const accessToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTY1MjQ0NywiZXhwIjoxNjkxNjY2ODQ3fQ.SvmRJP7u5F7F7aIHEsIC2ySEw6runPYQaa2U0Pea0WQ'

    fetch(`http://localhost:8080/api/contacts/${searchName}`, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        Authorization: 'none',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data)
        } else if (data._id) {
          setContacts([data])
        } else {
          setContacts([])
        }
      })
      .catch((error) => console.error('Error fetching name:', error))
  }

  const handleClearSearch = () => {
    setSearchName('')
    setContacts([])
  }

  return (
    <div>
      <div className="header">
        {' '}
        <div className="leftHeader">
          {' '}
          <h2>  
            Contact List
          </h2>{' '}
          {creatingContact && searchName ? null : ( // Conditionally render the button
            <button
              className="btn btn-success mb-3"
              onClick={handleCreateContact}
            >
              Add New Contact
            </button>
          )}{' '}
        </div>
        {/* <button className="btn btn-success mb-3" onClick={handleCreateContact}>
          Add New Contact
        </button>{' '} */}
        {/* Render create mode */}
        <div className="rightHeader">
          {' '}
          <ContactSearch
            onSearch={handleSearchByName}
            onClear={handleClearSearch}
          />
        </div>
      </div>
      {creatingContact && (
        <div className="col-md-4 mb-3">
          {showSuccessMessage ? (
            <div className="alert alert-success" role="alert">
              Contact added successfully!
            </div>
          ) : (
            <div className="create-form">
              {' '}
              <div className="card create-card">
                <div className="card-body custom-body">
                  <h5 className="custom-title">Create New Contact</h5>
                  <p className="textCreate">
                    Name:{' '}
                    <input
                      className="customField"
                      type="text"
                      name="name"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                    />
                  </p>
                  <p className="textCreate">
                    Address:{' '}
                    <input
                      className="customField"
                      type="text"
                      name="address"
                      value={newContactAddress}
                      onChange={(e) => setNewContactAddress(e.target.value)}
                    />
                  </p>
                  <p className="textCreate">
                    Email:{' '}
                    <input
                      className="customField"
                      type="email"
                      name="email"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                    />
                  </p>
                  <p className="textCreate">
                    Phone:{' '}
                    <input
                      className="customField"
                      type="tel"
                      name="phone"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                    />
                  </p>
                  <button
                    className="btn btn-primary w-25 m-3"
                    onClick={() => {
                      handleSaveNewContact()
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary w-25"
                    onClick={() => {
                      setCreatingContact(false)
                      setShowSuccessMessage(false)
                      setNewContactName('')
                      setNewContactAddress('')
                      setNewContactEmail('')
                      setNewContactPhone(null)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="container">
        <div className="row">
          {creatingContact
            ? null // Conditionally render the contact list
            : contacts.map((contact) => (
                <div className="col-md-4 mb-3" key={contact._id}>
                  {contact.editMode ? (
                    <EditableContact
                      contact={contact}
                      onSave={handleUpdateContact}
                    />
                  ) : (
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text">Address: {contact.address}</p>
                        <p className="card-text">Email: {contact.email}</p>
                        <p className="card-text">Phone: {contact.phone}</p>
                        <button
                          className="upDatebtn"
                          onClick={() =>
                            setContacts((prevContacts) =>
                              prevContacts.map((prevContact) =>
                                prevContact._id === contact._id
                                  ? { ...prevContact, editMode: true }
                                  : prevContact
                              )
                            )
                          }
                        >
                          Update Contact
                        </button>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          Delete Contact
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default ContactList
