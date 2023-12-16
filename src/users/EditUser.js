import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    
    let navigate = useNavigate();

    const {id} = useParams();

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });

    const {name, username, email} = user;

    const onInputChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
    };
    
    useEffect(() => {
        const loadUser = async () => {
            const result = await axios.get(`http://localhost:8081/addUser/${id}`);
            setUser(result.data);
        };
    
        loadUser();
    }, [id, setUser]);

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:8081/addUser/${id}`, user);
        navigate("/");
    };

    
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h4 className="mb-4">
                    Benutzer bearbeiten
                </h4>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group mb-3">
                        <label htmlFor="Name" className="form-label float-start">Vorname</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)} 
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Username" className="form-label float-start">Nachname</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="username" 
                            value={username}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Email" className="form-label float-start">E-Mail</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            value={email}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-success float-end">Speichern</button>
                    <Link className="btn btn-outline-danger float-end me-2" to="/">Abbrechen</Link>
                </form>
            </div> 
        </div>
    </div>
  )
}
