import connection from '../configs/connectDb';



const getHomePage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function(err, results, fields) {
            data = results.map(row => row);
            return res.render('index.ejs', { dataUser: data });
        }
    );
}

module.exports = {
    getHomePage
}