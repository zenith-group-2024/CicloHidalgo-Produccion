import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/users')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAdmins(data);
      })
      .catch((error) => setError('Error al obtener los administradores'));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div>
      <h2>Lista de Administradores</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nombre}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleEdit(admin.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAdmins;