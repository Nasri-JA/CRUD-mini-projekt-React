import React from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    
    const [users, setUsers] = React.useState([]);

    const {id} = useParams();
    
    React.useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers=async()=>{
        const result = await axios.get("http://localhost:8081/allUsers");
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        console.log('Deleting user with ID:', id);
        await axios.delete(`http://localhost:8081/deleteUser/${id}`);
        loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vorname</th>
                        <th scope="col">Nachname</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Aktion</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {
                        users.map((user,index)=>
                        (
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link 
                                        type="button" 
                                        className="btn btn-info"
                                        to={`/viewUser/${user.id}`}
                                        >Ansicht
                                    </Link>
                                    <div className="btn-group ms-2" role="group">
                                        <Link 
                                            type="button" 
                                            className="btn btn-secondary"
                                            to={`/editUser/${user.id}`}
                                            >Bearbeiten
                                        </Link>
                                        <button 
                                            type="button" 
                                            className="btn btn-danger"
                                            onClick={() => deleteUser(user.id)}
                                            >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                         ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
