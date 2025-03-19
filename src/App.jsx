import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    id: new Date().valueOf(),
    name: '',
    email: ''
  })

  const initialUser = {
    id: new Date().valueOf(),
    name: 'John',
    email: 'john@gmaill.com',
  }

  const [userList, setUserList] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userList));
  }, [userList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('name and email required')
    } else {
      
      const newUser = {
        id: new Date().valueOf(),
        name: formData.name,
        email: formData.email
      }

      setUserList([...userList, newUser]);

      // reset form inputs
      setFormData({
        id: null,
        name: '',
        email: ''
      })
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const deleteUser = (userId) => {
    const deletedUser = userList.filter(user => user.id !== userId);
    setUserList(deletedUser);
  }

  return (
    <div>
      <main>
      <form onSubmit={handleSubmit}>

        <aside>
          <p>
          <label htmlFor='name'>Name*</label>
          </p>
          
          <input
            type="text"
            value={formData.name}
            placeholder="enter user name"
            name="name"
            onChange={handleInputChange}
          />
        </aside>
        
        <aside>
          <p>
          <label htmlFor='email'>Email*</label>
          </p>          

          <input
            type="email"
            value={formData.email}
            placeholder="enter user email"
            name="email"
            onChange={handleInputChange}
          />
        </aside>        

        <button type="submit">Add User</button>
      </form>

      <section>
        <h2>System Users</h2>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>{user.name} : {user.email}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      </main>         
    </div>
  )
}

export default App
