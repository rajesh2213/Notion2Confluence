// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const html2JiraMarkup = require('html-2-jira-markup');

// firebase admin setup
const NotionPageToHtml = require('notion-page-to-html');



let serviceAccount = require("./covid-vac-a0182-firebase-adminsdk-ls1rc-22d655c0cd.json");
const { hasUncaughtExceptionCaptureCallback } = require('process');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// aws config

const aws = require('aws-sdk');
const dotenv = require('dotenv');
const { url } = require('inspector');

dotenv.config();

//aws parameters
const region = "ap-south-1";
const bucketName = "ecom-website-osproto";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})
// init s3
const s3 = new aws.S3();


// generate image upload link
async function generateUrl() {
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000);

    const imageName = `${id}${date.getTime()}.jpg`;

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, //300 ms
        ContentType: 'image/jpeg'
    })
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}

// declare static path
let staticPath = path.join(__dirname);



// initializing express.js

const app = express();

//middlewares
app.use(cors())
app.use(express.static(staticPath));
app.use(express.json());
//routes
//home route

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));

})
//signup route

app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    
    // form validation
    if (name.length < 3) {
        return res.json({ 'alert': 'name must be 3 letters long' });
    } else if (!email.length) {
        return res.json({ 'alert': 'enter your email' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'password must be 8 letters long' });
    } else if (!number.length) {
        return res.json({ 'alert': 'enter your phone number' })
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number, please enter valid one' })
    } else if (!tac) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' })
    }

    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'email already exists' });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller
                                })
                            })
                    })
                })
            }
        })

})


//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' });
    }
    db.collection('users').doc(email).get()
        .then(user => {
            if (!user.exists) {
                return res.json({ 'alert': 'email does not exists' })
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller,
                        })
                    } else {
                        return res.json({ 'alert': 'password is incorrect' });
                    }
                })
            }
        })
})



// add product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
})

app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
})
// get the upload link
app.get('/s3url', (req, res) => {
    generateUrl().then(url => res.json(url));
})
//add product
app.post('/add-product', (req, res) => {
    let { name, shortDes, des, images, sizes, actualPrice, discount, sellPrice, stock, tags, tac, email, draft, id } = req.body;

    // validation 

    if (!draft) {
        if (!name.length) {
            return res.json({ 'alert': 'enter product name' });
        } else if (!des.length) {
            return res.json({ 'alert': 'enter detail description about the product' });
        } else if (!actualPrice.length) {
            return res.json({ 'alert': 'you must add pricings' })
        } else if (!tags.length) {
            return res.json({ 'alert': 'enter few tags to help ranking your product in search' })
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree to our terms and condition' });
        }
    }

    // add product

    let docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}` : id;
    db.collection('products').doc(docName).set(req.body)
        .then(data => {
            res.json({ 'product': name });
        })
        .catch(err => {
            return res.json({ 'alert': 'some error occured. Try again' });
        })
})

//get products
app.post('/get-products', (req, res) => {
    let { email, id, tag } = req.body;

    if(id){
        docRef = db.collection('products').doc(id);
    }else if(tag){
        docRef = db.collection('products').where('tags', 'array-contains', tag);
    }else{
        docRef = db.collection('products').where('email', '==', email);
    }

    docRef.get()
        .then(products => {
            if (products.empty) {
                return res.json('no products');
            }
            let productArr = [];
            if (id) {
                return res.json(products.data());
            } else {
                products.forEach(item => {
                    let data = item.data();
                    data.id = item.id;
                    productArr.push(data);
                })
                res.json(productArr);
            }

        })
})

app.post('/delete-product', (req, res) => {
    let { id } = req.body;

    db.collection('products').doc(id).delete()
        .then(data => {
            res.json('success');
        }).catch(err => {
            res.json('err');
        })
})

// product page

app.get('/products/:id', (req,res) => {
    res.sendFile(path.join(staticPath, "product.html"))
})

var htmlData=''
var jiraMarkupString = ''
app.post('/search/:key', (req, res) => {
    let { url } = req.body;
    async function getPage() {
        const { title, icon, cover, html } = await NotionPageToHtml.convert(url);
        setTimeout(function(){
        console.log(htmlData)

        htmlData = htmlData + html
        jiraMarkupString = jiraMarkupString + html2JiraMarkup.converter(htmlData)
        },10000)

        
      }
      
      getPage();
    


})
async function sendPage(){
app.get('/search/abc', (req,res) => {
    res.json(htmlData)
})
app.get('/search/html', (req,res) => {
    res.send(htmlData)
})

app.get('/search/confluence', (req,res) => {
    res.send(jiraMarkupString)
})
}
sendPage()


app.get('/search/:key', (req,res) => {
    res.sendFile(path.join(staticPath, "search.html"));



})
//https://thomasfrank.notion.site/Ultimate-Tasks-for-Notion-4d33fcd22458489698d2eb14a293bbba





app.post('/order', (req, res) => {
    const { order, email , add} = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOption = {
        from: 'valid sender email id',
        to: email,
        subject: 'Clothing : Order Placed',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body{
            min-height: 90vh;
            background: #f5f5f5;
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .heading{
            text-align: center;
            font-size: 40px;
            width: 50%;
            display: block;
            line-height: 50px;
            margin: 30px auto 60px;
            text-transform: capitalize;
        }
        .heading span{
            font-weight: 300;
        }
        .btn{
            width: 200px;
            height: 50px;
            border-radius: 5px;
            background: #3f3f3f;
            color: #fff;
            display: block;
            margin: auto;
            font-size: 18px;
            text-transform: capitalize;
        }
    </style>

</head>
<body>
    
    <div>
        <h1 class="heading">dear ${email.split('@')[0]}, <span>your order is successfully placed</span></h1>
        <button class="btn">check status</button>
    </div>

</body>
</html>
        `
    }

    let docName = email + Math.floor(Math.random() * 123719287419824);
    db.collection('order').doc(docName).set(req.body)
    .then(data => {

        transporter.sendMail(mailOption, (err, info) => {
            if(err){
                res.json({'alert': 'opps! its seems like some err occured. Try again'})
            }else{
                res.json({'alert': 'your order is placed'})
            }
        })

    })
})

// 404 
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})


app.listen(2000, () => {
    console.log('listening on port 2000....')
})


