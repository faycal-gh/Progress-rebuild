const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path'); // Import path module
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Ensure 'public' folder exists for static files

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path as needed
});

// Other routes
app.post('/auth', async (req, res) => {
  try {
    const response = await axios.post(
      'https://progres.mesrs.dz/api/authentication/v1/',
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Server error'
    });
  }
});

app.get('/student-data/:uuid', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const uuid = req.params.uuid;

    const response = await axios.get(
      `https://progres.mesrs.dz/api/infos/bac/${uuid}/dias`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Server error'
    });
  }
});

app.get('/exams/:uuid/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const uuid = req.params.uuid;
    const id = req.params.id;

    const response = await axios.get(
      `https://progres.mesrs.dz/api/infos/bac/${uuid}/dias/${id}/periode/bilans`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
