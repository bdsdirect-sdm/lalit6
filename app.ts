import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use('/api/v1/user', userRoutes);
app.post('/api/v1/user/register', (req, res) => {
    res.status(201).send('Registered!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// sequelize.sync().then(() => {
//     app.listen(3000, () => {
//         console.log('Server is running on http://localhost:3000');
//     });
// }).catch((err) => {
//     console.error('Unable to connect to the database:', err);
// });

