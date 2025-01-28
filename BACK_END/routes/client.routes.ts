const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
let clients = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Get all clients
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

// Get a specific client by ID
app.get('/api/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const client = clients.find(c => c.id === clientId);

  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }

  res.json(client);
});

// Create a new client
app.post('/api/clients', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newClient = {
    id: clients.length + 1,
    name,
    email,
  };

  clients.push(newClient);
  res.status(201).json(newClient);
});

// Update an existing client
app.put('/api/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const clientIndex = clients.findIndex(c => c.id === clientId);

  if (clientIndex === -1) {
    return res.status(404).json({ message: 'Client not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  clients[clientIndex] = { id: clientId, name, email };
  res.json(clients[clientIndex]);
});

// Delete a client
app.delete('/api/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const clientIndex = clients.findIndex(c => c.id === clientId);

  if (clientIndex === -1) {
    return res.status(404).json({ message: 'Client not found' });
  }

  clients.splice(clientIndex, 1);
  res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
