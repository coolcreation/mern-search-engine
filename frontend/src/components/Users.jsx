import { useEffect, useState } from 'react'
import CreateUserForm from './CreateUserForm'
import EditUserForm from './EditUserForm';
import SortedList from './SortedList';
import userFrontendSchema from '../validation/userValidation'

/*
// Basic workflow for asking admin if they want to update user:  
const handleUpdateUser = () => {
  if (formIsValid()) {
    setShowModal(true); // Open confirmation modal
  } else {
    setFormErrors(...); // Show error messages
  }
};


const onModalConfirm = () => {
  submitForm(); // Real form submission
};
*/


function Users() {

  // create and initialize empty state variables so we can call DatePickerUI and UserForm and send them for filling with values
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null);        // joi
  const [age, setAge] = useState('')
  const [ageError, setAgeError] = useState(null);        // joi
  const [users, setUsers] = useState([]) 
  const [selectedUser, setSelectedUser] = useState(null) // for Details Pane upon button click
  const [updateName, setUpdateName] = useState('');
  const [updateAge, setUpdateAge] = useState('');

  const [isSortActive, setIsSortActive] = useState(false)
  const [showModal, setShowModal] = useState(false);  // Modal for upate form


  // gets the initial list of users, but also runs a second time after the POST request if it's successful
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
      console.log('Server response:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])      // useEffect only handles the initial data load (runs once), which is our state array

  const handleUserCreated = () => {
    fetchData()     // add new user
  }


  // Used with CreateUserForm
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name, age })
      })

      const result = await response.json()
      console.log('Server response:', result)

      if (response.ok) {
        console.log('User created successfully')
        handleUserCreated()   // call method to add new user if successful

        // Clear all fields/inputs if successful
        setName('')
        setAge('')

      } else {
        console.error('Failed to create user')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Used with EditUserForm
  const handleUpdateUser = async (e) => {
     e.preventDefault();
     console.log(selectedUser, updateAge)

         // Clear Joi
    setNameError('');
    setAgeError('');
    
    // Use Joi to validate the data
    const validationResult = userFrontendSchema.validate({ name: updateName, age: updateAge });

    if (validationResult.error) {
        const errors = validationResult.error.details
        errors.forEach(error=>{
            switch(error.context.key){
                case 'name':
                    setNameError(error.message)
                    break;
                case 'age':
                    setAgeError(error.message)
                    break;
                default:
                    break;
            }
        })
        return;
    }
    setShowModal(true)  // if validation is good show modal  
  }


  const confirmUpdateUser = async () => { // New function for the API call
    try {
      const response = await fetch(`http://localhost:8000/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name: updateName, age: updateAge, }),
      });
      console.log(response)
      if (response.ok) {
        fetchData();
        setSelectedUser(null);
        setShowModal(false); 
      } else {
        console.error('Failed to update user')
      }
    } catch (error) {
      console.error('Error:', error)
    }

  }
 

  // Used with SortedList
  const handleDetailsBtnClick = (user) => {
    setSelectedUser(user);
    setUpdateName(user.name);
    setUpdateAge(user.age);
  };

  // SORT TOGGLING FOR DISPLAY
  const toggleSorting = () => {
    setIsSortActive(!isSortActive);
  };


  return (
    <div className="container d-flex flex-column bg-light border border-1 rounded-4 gap-0 py-2 p-lg-3 my-2 my-lg-4">

    {/* Modal */}
    {showModal && (
      <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-modal="true" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Update</h1>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to update {selectedUser.name}?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmUpdateUser}>Confirm</button> 
            </div>
          </div>
        </div>
      </div>
    )}

      <button className='btn btn-outline-success mx-auto col-11 col-lg-4'
          onClick={toggleSorting}>
          {isSortActive ? 'Show All Users' : 'Users over 18'}
      </button>

      {/* UserForm gets called and uses our empty state variables we already initilized, and fills them with values*/}
      <CreateUserForm
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        handleSubmit={handleSubmit}
      />

      {/* DETAILS PANE */}
      {selectedUser && (
        <div
          className="w-100 details-pane mx-auto bg-white border border-2 mb-4"
          id={`details-pane-${selectedUser._id}`}>

            {/* UPDATE USER FORM -  selectedUser, updateName, setUpdateName, updateAge, setUpdateAge, handleUpdateUser */}
            <EditUserForm 
              selectedUser={selectedUser}
              updateName={updateName}
              setUpdateName={setUpdateName}
              nameError={nameError}            // joi
              updateAge={updateAge}
              setUpdateAge={setUpdateAge}
              ageError={ageError}              // joi
              handleUpdateUser={handleUpdateUser}
            />

        </div>
      )}

      {/* CARDS WRAPPER */}

      {isSortActive ? (
      <div className='col-11 col-lg-5 my-3 mx-auto'>
        <SortedList 
        users={users} 
        setSelectedUser={setSelectedUser} 
        setUpdateName={setUpdateName}
        setUpdateAge={setUpdateAge}
        handleDetailsClick={handleDetailsBtnClick}
        />
      </div>
      ) : (

     users.map((user) => (
        <div className="cards-wrapper mx-auto" key={user._id}>
          <div className="card rounded-0 d-flex flex-column gap-3 flex-lg-row justify-content-lg-around align-items-lg-center p-3 p-lg-1 m-0">
            <div className="col-3 fw-semibold">{user.name}</div>
            <div className="col-3 fw-semibold">{user.age}</div>

            <div className='d-flex gap-2'>
            <button type="button" className="btn btn-outline-dark p-1"
                onClick={() => {
                setSelectedUser(user);
                setUpdateName(user.name);
                setUpdateAge(user.age);
                }}>
              Details
            </button>

            <button type="button" className="btn btn-outline-danger p-1"
               onClick={() => setSelectedUser(user)}>
              Delete
            </button>
            </div>

          </div>
        </div>
      ))
      )}

     
    </div> // END container
  );
}

export default Users;
