const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send('Name and email are required');
  
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.json(newUser);
});

// PUT to update a user
app.put('/users/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send('Name and email are required');

  user = { ...user, name, email };
  users = users.map(u => u.id === user.id ? user : u);
  res.json(user);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
});

app.listen(8000, () => console.log('Server running on port 8000'));

