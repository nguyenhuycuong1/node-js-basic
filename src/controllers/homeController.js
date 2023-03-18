import connection from '../configs/connectDb';



const getHomePage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function(err, results, fields) {
            console.log('>>>mysql');
            console.log(results); // results contains rows returned by server
            data = results.map(row => row);
            return res.render('index.ejs', { dataUser: JSON.stringify(data) });
        }
    );
}

module.exports = {
    getHomePage
}