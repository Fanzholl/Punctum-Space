import express from 'express';
import colors from 'colors';
import mongoose from 'mongoose';
import router from './router/router.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();
const PORT = process.env.PORT || 8003;
const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://punctum.space:3000");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

app.use(express.json());
app.use('/uploads/avatars', express.static('./uploads/avatars'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorMiddleware);

async function startServer() {
    try {

        await mongoose.connect(process.env.DB_URL)
            .then(res => console.log(colors.bgGreen(`База данных успешно подключена`)))
            .catch(err => console.log(colors.bgRed(`В процессе подключения к базе данных, произошла ошибка: ${err}`)));

        app.listen(PORT, () => {
            console.log(colors.bgGreen(`Сервер запущен и прослушивает порт ${PORT}`));
        });

    } catch (error) {
        console.log(colors.bgRed(`В процессе запуска сервера, произошла ошибка: ${error}`))
    }
}

startServer();