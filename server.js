const express = require('express');
const exphbs =require('express-handlebars');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const keysOauth = require('./keysOauth.json');
const keysSheets = require('./keysSheets.json');

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main', extname: 'hbs' });
const PORT = process.env.PORT || 3000;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}))
app.use(express.json({type: 'text/plain'}))
app.use(cors());	
app.use(express.static(__dirname + "/IMAGES"));
app.use(express.static(__dirname + "/SCRIPTS"));
app.use(express.static(__dirname + "/STYLES"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/shop', function(req, res) {

    const client = new google.auth.JWT(
        keysSheets.client_email,
        null,
        keysSheets.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    async function gsrun (cl) {

        const gsapi = google.sheets({version: 'v4', auth: cl});
    
        const pods = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A3:D19'
        };
        const mods = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A21:D39'
        };
        const mech = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A41:D60'
        };
        const amerika = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A63:D80'
        };
        const rus = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A82:D100'
        };
        const dripka = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A103:D120'
        };
        const bak = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A122:D140'
        };
        const rdta = {
            spreadsheetId: '1tWamjuomBO6niOrulm1DZhkw-J1a2ZiyS5jmM_OFYZg',
            range: 'Лист1!A142:D160'
        };

        let dataArray = await Promise.all([
            gsapi.spreadsheets.values.get(pods),
            gsapi.spreadsheets.values.get(mods),
            gsapi.spreadsheets.values.get(mech),
            gsapi.spreadsheets.values.get(amerika),
            gsapi.spreadsheets.values.get(rus),
            gsapi.spreadsheets.values.get(dripka),
            gsapi.spreadsheets.values.get(bak),
            gsapi.spreadsheets.values.get(rdta),
        ]);
    
        let dataPods = dataArray[0];
        let dataMods = dataArray[1];
        let dataMech = dataArray[2];
        let dataAmerika = dataArray[3];
        let dataRus = dataArray[4];
        let dataDripka = dataArray[5];
        let dataBak = dataArray[6];
        let dataRdta = dataArray[7];
    
        let dataPodsArray = dataPods.data.values;
        let dataModsArray = dataMods.data.values;
        let dataMechArray = dataMech.data.values;
        let dataAmerikaArray = dataAmerika.data.values;
        let dataRusArray = dataRus.data.values;
        let dataDripkaArray = dataDripka.data.values;
        let dataBakArray = dataBak.data.values;
        let dataRdtaArray = dataRdta.data.values;

        res.render('shop.hbs', {
            dataPodsArray,
            dataModsArray,
            dataMechArray,
            dataAmerikaArray,
            dataRusArray,
            dataDripkaArray,
            dataBakArray,
            dataRdtaArray,
        });
    
    }

    client.authorize(function(err, tokens){

        if (err) {
            console.log(err);
            return err;
        } else {
            gsrun (client);
        }
    
    });
});

app.get('/news', function(req, res) {
    res.sendFile(__dirname + '/news.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/agreement', function(req, res) {
    res.sendFile(__dirname + '/agreement.html');
});

app.post('/order', function (req, res) {
    if(!req.body) return res.sendStatus(400);

    async function mailSend () {

        const oauth2Client = new OAuth2(
            keysOauth.ClientID,
            keysOauth.ClientSecret,
            keysOauth.RedirectURL
       );

        oauth2Client.setCredentials({
            refresh_token: keysOauth.refresh_token
        });

        const accessToken = oauth2Client.getAccessToken()

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: keysOauth.user, 
                clientId: keysOauth.ClientID,
                clientSecret: keysOauth.ClientSecret,
                refreshToken: keysOauth.refresh_token,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "gustoyshopandlounge@gmail.com",
            to: "gustoyshopandlounge@gmail.com",
            subject: "Новый заказ!",
            generateTextFromHTML: true,
            html: `<p>${JSON.stringify(req.body)}<p>`
        };

        smtpTransport.sendMail(mailOptions, (e, d) => {
            console.log(e);
            smtpTransport.close();
        });

        res.json('ok');

    }

    mailSend().catch(console.error);
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/404.html');
});

app.listen(PORT, () => {
    console.log('работаем');
});