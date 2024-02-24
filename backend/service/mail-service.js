import nodemailer from 'nodemailer';

export default new class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            auth: {
                user: "fanzholl@yandex.ru",
                pass: "vrjpjyixtqqvoczg",
            }
        });
    }

    async sendActivationMail(to, link) {
        console.log(link);
        try {
            const info = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                secure: false,
                subject: `Активация аккаунта Punctum Space`,
                attachments: [{
                    filename: 'Gwent.jpg',
                    path: '../backend/images/Gwent.jpg',
                    cid: 'fanzhollsasaaw' //my mistake was putting "cid:logo@cid" here! 
                }],
                text: ``,
                html:
                    `
    
                    <header>
                    
                        <style>
                        
                            * {
                                padding: 0;
                                margin: 0;
                                font-family: Arial, Helvetica, sans-serif;
                                box-sizing: border-box;
                            }
                    
                            h1 {
                                font-size: 24px;
                            }
                            
                            
                        
                        </style>
    
                    </header>
    
                    <div>
                    
                        <h1>Добро пожаловать на платформу Punctum!</h1>
                        <a href="${link}">Пожалуйста, активируйте свой аккаунт: ${link}.</a>
    
                    </div>
    
                    <img style="width:250px;" cid:unique@cid>
                    
                    `
            });
        } catch(err) {
            console.log(err);
        }

    }

    async sendLoginMail(to, ip) {
        try {
            const mail = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                secure: false,
                subject: `Осуществлён вход в ваш аккаунт`,
                text: ``,
                html: `
                
                    <header>
                        
                            <style>
                            
                                * {
                                    padding: 0;
                                    margin: 0;
                                    font-family: Arial, Helvetica, sans-serif;
                                    box-sizing: border-box;
                                }
                        
                                h1 {
                                    font-size: 24px;
                                }
    
                                p {
                                    font-size: 24px;
                                }
                                
                                
                            
                            </style>
    
                        </header>
    
                        <div>
                        
                            <h1>Добро пожаловать на платформу Punctum!</h1>
                            <p>В Вашу учётную запись, была произведена авторизация с IP: ${ip}</p>
                            <a href="${process.env.CLIENT_URL}">Если это были не вы - сообщите, о случившемся службе поддержки сервиса по ссылке далее или отправьте ответное письмо нам на почту: ${process.env.CLIENT_URL}.</a>
    
                        </div>
                
                `
            });
        } catch(err) {
            console.log(err);
        }
    }
}