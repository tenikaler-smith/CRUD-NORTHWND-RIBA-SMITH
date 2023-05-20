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
        // Verificar si algún campo requerido está vacío
    if (!data.CompanyName || !data.ContactName || !data.ContactTitle || !data.Address || !data.City || !data.Region || !data.PostalCode || !data.Country || !data.Phone || !data.Fax || !data.totalordenes) {
        return res.status(400).redirect('/'); // Redirigir al formulario con un código de estado 400 (Bad Request)
    }
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

    // Verificar si algún campo requerido está vacío
    if (!newCustomer.CompanyName || !newCustomer.ContactName || 
        !newCustomer.ContactTitle || !newCustomer.Address || 
        !newCustomer.City || !newCustomer.Region || !newCustomer.PostalCode || 
        !newCustomer.Country || !newCustomer.Phone || !newCustomer.Fax || 
        !newCustomer.totalordenes) {
        return res.status(400).redirect('/'); // Redirigir al formulario con un código de estado 400 (Bad Request)
    }

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