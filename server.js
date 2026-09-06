import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import emailRoutes from './routes/email.routes.js';

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

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Email configured: ${Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)}`);
  });
}
