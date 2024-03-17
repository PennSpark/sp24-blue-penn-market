const pg = require('pg');
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({origin: true, credentials: true}))
app.use(express.json());

// for new users
async function registerIntoDB(name, password) {

    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information
        user: 'postgres',
        database: 'pennmarket',
        password: 'strokeseat', 
        port: 5432,
    });

    //connect client
    await client.connect();

    const tableName = 'login';

    res = null;

    const queryTextCheck = 'SELECT * FROM ' + tableName + ' WHERE username = $1';
    const valuesCheck = [name];
    const resCheck = await client.query(queryTextCheck, valuesCheck);

    console.log(resCheck.rowCount == 0);

    if (resCheck.rowCount == 0) {
        const queryText = 'INSERT INTO ' + tableName + ' (username, password) VALUES ($1, $2)';
        const values = [name, password];
        res = await client.query(queryText, values);
    }

    //close connection
    await client.end();

    console.log(res);
    return res;

}

// for returning users
async function logIntoDB(name, password) {

    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information
        user: 'postgres',
        database: 'pennmarket',
        password: 'strokeseat', 
        port: 5432,
    });

    //connect client
    await client.connect();

    const tableName = 'login';

    const queryText = 'SELECT * FROM ' + tableName + ' WHERE username = $1 AND password = $2';
    const values = [name, password];
    const res = await client.query(queryText, values);

    //close connection
    await client.end();

    return res;

}

// for posting a product
async function postProduct(name, des, cat, price, sell) {

    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information
        user: 'postgres',
        database: 'pennmarket',
        password: 'strokeseat', 
        port: 5432,
    });

    //connect client
    await client.connect();

    res = null;

    const checkTable = 'login';

    const queryTextCheck = 'SELECT * FROM ' + checkTable + ' WHERE uid = $1';
    const valuesCheck = [sell];
    const resCheck = await client.query(queryTextCheck, valuesCheck); 

    if (resCheck.rowCount != 0) {
        const tableName = 'items';

        // ADD USER SESSION.....
        const queryText = 'INSERT INTO ' + tableName + ' (seller, name, description, category, price) VALUES ($1, $2, $3, $4, $5)';
            const values = [sell, name, des, cat, price];
            res = await client.query(queryText, values);
    }

    //close connection
    await client.end();

    console.log(res);
    return res;
}

// getting all
async function getAllProd() {

    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information
        user: 'postgres',
        database: 'pennmarket',
        password: 'strokeseat', 
        port: 5432,
    });

    //connect client
    await client.connect();

    const tableName = 'items';

    // ADD USER SESSION... for now just using 33 bc i know it will be in user database
    const queryText = 'SELECT  i.name, i.description, i.category, i.price, u.username FROM items AS i JOIN login AS u ON i.seller = u.uid';
    res = await client.query(queryText);

    //close connection
    await client.end();

    console.log(res);
    return res;

}

app.post('/register', async (req, res) => {

    const pattern = 'upenn\.edu$'
    const matches = req.body.email.match(pattern)

    if (!matches) {
        res.send({message: "Invalid email."})
    } else {
        const response = await registerIntoDB(req.body.username, req.body.password);
        console.log(response);
        if (response == null) {
            res.send({message : 'Username already exists.'})
        } else {
            res.send(response);
        }
    }

})

app.post('/login', async (req, res) => {

    const response = await logIntoDB(req.body.username, req.body.password);

    if (response.rowCount > 0) {
        res.send(response);
    } else {
        res.send({message: "Wrong username/password combination."})
    }

})

app.post('/post', async (req, res) => {

    const response = await postProduct(req.body.name, req.body.description, req.body.category, req.body.price, req.body.seller);

    if (response != null) {
        res.send(response);
    } else {
        res.send({message: "Invalid seller."})
    }

})

app.get('/getall', async (req, res) => {

    const response = await getAllProd();
    res.send(response);

})

const port = 3256
const host = 'localhost'
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})