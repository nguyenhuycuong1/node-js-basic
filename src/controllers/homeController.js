import multer from 'multer';
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

const deleteUser = async (req, res) => {
    const userId = req.body.userId;

    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

    return res.redirect('/');
}

const getEditPage = async (req, res) => {
    const id = req.params.id;
    
    const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    return res.render('update.ejs', { dataUser: user[0] });
}

const updateUser = async (req, res) => {
    const {firstName, lastName, email, address, id} = req.body;

    await pool.execute(
        'UPDATE users SET firstName=?, lastName=?, email=?, address=? WHERE id=?',
        [firstName, lastName, email, address, id]
        )

    return res.redirect('/');
}

const getUploadFilePage = async (req, res) => {

    return res.render('uploadFile.ejs');
}



const upload = multer().single('profile_pic');



const handleUploadFile = async (req, res) => {

    upload(req, res, function(err){

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }

        return res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

    });
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    updateUser,
    getUploadFilePage,
    handleUploadFile
}