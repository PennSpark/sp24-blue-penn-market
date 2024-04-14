const pg = require('pg');
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({origin: true, credentials: true}))
app.use(express.json());

// for new users
async function registerIntoDB(name, email, id) {

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

    if (resCheck.rowCount == 0) {
        const queryText = 'INSERT INTO ' + tableName + ' (username, email, uid) VALUES ($1, $2, $3)';
        const values = [name, email, id];
        res = await client.query(queryText, values);
    }

    //close connection
    await client.end();

    console.log(res);
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

// for buying a product
// for posting a product
async function buyProduct(iid, buy) {

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
    const valuesCheck = [buy];
    const resCheck = await client.query(queryTextCheck, valuesCheck); 

    console.log("HERE");

    const itemsTable = 'items';
    const queryItemsCheck = 'SELECT * FROM ' + itemsTable + ' WHERE iid = $1';
    const item = [iid];
    const itemsCheck = await client.query(queryItemsCheck, item); 

    if ((resCheck.rowCount != 0) && (itemsCheck.rowCount != 0)) {
        const tableName = 'items';

        // update the table
        const queryText = 'UPDATE ' + tableName + ' SET buyer = $1 WHERE iid = $2';
            const values = [buy, iid];
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
    const queryText = 'SELECT i.iid, i.name, i.description, i.category, i.price, u1.username AS seller, u2.username AS buyer FROM items AS i JOIN login AS u1 ON i.seller = u1.uid LEFT JOIN login AS u2 ON i.buyer = u2.uid';
    res = await client.query(queryText);

    //close connection
    await client.end();

    return res;

}

async function checkUserExists(id) {

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
    console.log(id);

    // ADD USER SESSION
    const queryText = 'SELECT * FROM ' + tableName + ' WHERE uid = $1';
    const values = [id];
    const res = await client.query(queryText, values);

    //close connection
    await client.end();

    return res;

}

app.post('/register', async (req, res) => {

    const response = await registerIntoDB(req.body.username, req.body.email, req.body.id);

    if (response.rowCount <= 0) {
        res.send({message : 'Username already exists.'})
    } else {
        res.send(response);
    }

})

app.get('/landing', async (req, res) => {
    const userId = req.query.sessionID;

    if (!userId) {
        // Handle missing session ID gracefully
        res.status(400).send("Session ID is required");
        return; // Ensures that no further code is executed after this response
    }

    try {
        // Check if user exists in the database
        const userExists = await checkUserExists(userId);
        if (userExists.rowCount <= 0) {
            return; // Prevents any further code execution after the redirect
        } else {
            // Return 200 OK if user exists
            res.sendStatus(200);
            return; // Prevents any further code execution after sending the status
        }
    } catch (error) {
        // Handle potential errors
        console.error('Database error:', error);
        if (!res.headersSent) {
            res.status(500).send("Internal Server Error");
        }
        return; // Ensures no further execution after handling the error
    }
});


app.post('/post', async (req, res) => {

    const response = await postProduct(req.body.name, req.body.description, req.body.category, req.body.price, req.body.seller);

    if (response != null) {
        res.send(response);
    } else {
        res.send({message: "Invalid seller."})
    }

})

app.post('/buy', async (req, res) => {

    const response = await buyProduct(req.body.item, req.body.buyer);

    if (response != null) {
        res.send(response);
    } else {
        res.send({message: "Invalid item or buyer."})
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