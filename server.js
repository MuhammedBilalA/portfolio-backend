import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import emailRoutes from './routes/email.routes.js';





dotenv.config();
const app = express();
const PORT = process.env.PORT || 4578;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Backend!');
});
app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


