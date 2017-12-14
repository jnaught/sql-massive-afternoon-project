module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db');
        const {name, description, price, image_url} = req.body
        db.create_product([name, description, price, image_url])
        .then(()=> res.status(200).send())
        .catch(console.log)
    },
     // get queried info from 'products' table in database.   
    getOne: (req, res, next) => {
        const db = req.app.get('db'); // defining req.app.get('db') as "db"
        const {params} = req; // defining {params} as "req"
        console.log(params)
        db.read_product(req.params.id) //selecting which info you want to return from single query by "id"
        .then(product => {
            res.status(200).send(product)})
        // .catch(console.log)
    },
    // get all info from the 'products' table in database.
    getAll: (req, res, next) => {
        const db = req.app.get('db');

        db.read_products()
        .then(products => {
            // console.log(products);
            return res.status(200).send(products)

        })
        .catch(console.log);
    },
    // updates info on 'products' table in database.
    update: (req, res, next) => {
        const db = req.app.get('db');

        db.update_product([params.id, query.desc])
        .then(() => res.status(200).send())
        .catch(console.log);
    },
    // removes data from 'products' table on database.
    delete: (req, res, next) => {
        const db = res.app.get('db')

        db.delete_product(params.id)       // deletes info from table by selected 'id'
        .then(() => res.status(200).json())
        .catch(console.log);
    }
}
