const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customers', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    try {   
        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }

            conn.query('INSERT INTO customers  set ?', [data], (err, customers) => {
                if (err) {
                    console.log('Error al guardar el cliente: ', err);
                    res.status(500).send('Error: Ocurrió un error al guardar el cliente');
                } else {
                    res.redirect('/');
                }
            });
        });
    }catch (err){
        console.log('Error al guardar el cliente: ', err);
        res.status(500).send('Error: Ocurrió un error al guardar el cliente');
    }
};

controller.edit = (req, res) => {
    const customerId = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customers WHERE CustomerId = ?', [customerId], (err, customers) => {
            res.render('edit', {
                data: customers[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const customerId = req.params.id;
    const newCustomer = req.body;
    try {
        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            conn.query('UPDATE customers set ? WHERE CustomerID = ?', [newCustomer, customerId], (err, customers) => {
                if (err) {
                    console.log('Error al actualizar el cliente: ', err);
                    res.status(500).send('Error: Ocurrió un error al actualizar el cliente');
                } else {
                    res.redirect('/');
                }
            });
        });
    } catch (err) {
        console.log('Error al actualizar el cliente: ', err);
        res.status(500).send('Error: Ocurrió un error al actualizar el cliente');
    }
}

controller.delete = (req, res) => {
    const customerId = req.params.id;
    try {
        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            conn.query('DELETE FROM customers WHERE CustomerID = ?', [customerId], (err, customers) => {
                if (err) {
                    console.log('Error al eliminar el cliente: ', err);
                    res.status(500).send('Error: Ocurrió un error al eliminar el cliente');
                } else {
                    res.redirect('/');
                }
            });
        });
    } catch (err) {
        console.log('Error al eliminar el cliente: ', err);
        res.status(500).send('Error: Ocurrió un error al eliminar el cliente');
    }
}

module.exports = controller;