import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAdmins from '../../hooks/useFetchAdmins';

const ListAdmins = () => {
  const { admins, error, loading } = useFetchAdmins();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

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