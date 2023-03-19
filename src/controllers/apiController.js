import pool from "../configs/connectDb";

const getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'OK',
        data: rows
    })
}

const createNewUser = async (req, res) => {
    const {firstName, lastName, email, address} = req.body;
    
    if(!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "Missing required params"
        })
    }

    await pool.execute(
        'INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)', 
        [firstName, lastName, email, address]
    );
    return res.status(200).json({
        message: "Create Successful"
    })
}

const updateUser = async (req, res) => {
    const {firstName, lastName, email, address, id} = req.body;

    if(!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "Missing required params"
        })
    }

    await pool.execute(
        'UPDATE users SET firstName=?, lastName=?, email=?, address=? WHERE id=?',
        [firstName, lastName, email, address, id]
        );

    return res.status(200).json({
        message: 'OK'
    })
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if(!userId) {
        return res.status(200).json({
            message: "Missing required params"
        })
    }
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.status(200).json({
        message: 'OK'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}