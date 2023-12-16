import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });
    
    const {id} = useParams();

    useEffect(() => {
        const loadUser = async () => {
            const result = await axios.get(`http://localhost:8081/addUser/${id}`);
            setUser(result.data);
        };
    
        loadUser();
    }, [id, setUser]);

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h4 className="mb-4">
                        Benutzer Ansicht
                    </h4>
                    <div className="card">
                        <div className="card-header">
                            Daten des Benutzers
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Vorname: {user.username} </li>
                                <li className="list-group-item">Nachname: {user.name} </li>
                                <li className="list-group-item">E-Mail: {user.email} </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link className="btn btn-primary mt-2" to="/">
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    </div>
  )
}
