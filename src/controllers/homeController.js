import pool from '../configs/connectDb';



const getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows });
}

const getDetailPage = async (req, res) => {
    const userId = req.params.userId;
    const [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return res.send(JSON.stringify(user));
}

const createNewUser = async (req, res) => {
    const {firstName, lastName, email, address} = req.body;
    
    await pool.execute(
        'INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)', 
        [firstName, lastName, email, address]
    );
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser
}