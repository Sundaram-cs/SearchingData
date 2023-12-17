import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    Object.values(user)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by name, username, email, or phone"
        style={styles.input}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Name</th>
            <th style={styles.header}>Username</th>
            <th style={styles.header}>Email</th>
            <th style={styles.header}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td style={styles.cell}>{user.name}</td>
              <td style={styles.cell}>{user.username}</td>
              <td style={styles.cell}>{user.email}</td>
              <td style={styles.cell}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    background: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
};

export default App;
