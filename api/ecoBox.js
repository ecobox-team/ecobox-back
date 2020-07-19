const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const pool = require('../database/mysqlPool');

router.get('/', (req, res) => res.send('EcoBox API Server'));

router.get('/restaurants', (req, res) => {
  pool.getConnection(function(err, connection) {
    if(err) { 
      res.send({
        'code': 3, 
        'msg': 'restaurants: database connection error',
        'err': err
      });
      return;
    }

    const query = util.format(
      'SELECT * FROM restaurant;'
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.send({
        'code': 2, 
        'msg': 'restaurants: database query error',
        'err': err
        });
        connection.release();
        return;
      } 

      if(!(data.toString() === "")) { 
        res.send({
          'code': 0, 
          'msg': 'restaurants: successfully found',
          'data' : data
        });
      } else { 
        res.send({
          'code': 1, 
          'msg': 'restaurants: data not found'
        });
      }
      connection.release();
    });
  });
});

router.post('/restaurant', (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const food_type = req.body.food_type;
  const plan_type = req.body.plan_type;
  const max_stock = req.body.max_stock;
  const current_stock = req.body.current_stock;
  
  const query = util.format(
    'INSERT INTO restaurant (name, address, food_type, plan_type, max_stock, current_stock) VALUES (%s, %s, %s, %d, %d, %d);',
    mysql.escape(name),
    mysql.escape(address),
    mysql.escape(food_type),
    plan_type,
    max_stock,
    current_stock
  );

  pool.getConnection(function(err, connection) {
    if (err) {
      res.send({
        "code": 2,
        "msg": "restaurant insert: mysql connection error",
        "err": err
      });
      connection.release();
      return;
    }

    connection.query(query, function(err, data) {
      if (err) {
        res.send({
          "code": 1,
          "msg": "restaurant insert: error in inserting data to restaurant",
          "err": err
        });
        connection.release();
        return;
      }

      res.send({
        "code": 0,
        "msg": "restaurant insert: add restaurant data to DB",
        "data": data
      });
      connection.release();
    });
  });
});

router.put('/restaurant', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const food_type = req.body.food_type;
  const plan_type = req.body.plan_type;
  const max_stock = req.body.max_stock;
  const current_stock = req.body.current_stock;

  const query = util.format(
    'UPDATE restaurant SET name = %s, address = %s, food_type = %s, plan_type = %d, max_stock = %d, current_stock = %d where id = %d;',
    mysql.escape(name),
    mysql.escape(address),
    mysql.escape(food_type),
    plan_type,
    max_stock,
    current_stock,
    id
  );

  pool.getConnection(function(err, connection) {
    if (err) {
      res.send({
        "code": 2,
        "msg": "restaurant update: mysql connection error",
        "err": err
      });
      connection.release();
      return;
    }

    connection.query(query, function(err, data) {
      if (err) {
        res.send({
          "code": 1,
          "msg": "restaurant update: error in updating data to restaurant",
          "err": err
        });
        connection.release();
        return;
      }

      res.send({
        "code": 0,
        "msg": "restaurant update: update restaurant data to DB",
        "data": data
      });
      connection.release();
    });
  });
});

router.get('/restaurant/:id', (req, res) => {
  const id = req.params.id;
  pool.getConnection(function(err, connection) {
    if(err) { 
      res.send({
        'code': 3, 
        'msg': 'specific restaurant: database connection error',
        'err': err
      });
      return;
    }

    const query = util.format(
      'SELECT * FROM restaurant where id = %d;',
      id
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.send({
        'code': 2, 
        'msg': 'specific restaurant: database query error',
        'err': err
        });
        connection.release();
        return;
      } 

      if(!(data.toString() === "")) { 
        res.send({
          'code': 0, 
          'msg': 'specific restaurant: successfully found',
          'data' : data
        });
      } else { 
        res.send({
          'code': 1, 
          'msg': 'specific restaurants: data not found'
        });
      }
      connection.release();
    });
  });
});

router.get('/stockRecord/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  pool.getConnection(function(err, connection) {
    if(err) { 
      res.send({
        'code': 3, 
        'msg': 'specific stockRecord: database connection error',
        'err': err
      });
      return;
    }

    const query = util.format(
      'SELECT * FROM stock_record where restaurant_id = %d;',
      id
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.send({
        'code': 2, 
        'msg': 'specific stockRecord: database query error',
        'err': err
        });
        connection.release();
        return;
      } 

      if(!(data.toString() === "")) { 
        res.send({
          'code': 0, 
          'msg': 'specific stockRecord: successfully found',
          'data' : data
        });
      } else { 
        res.send({
          'code': 1, 
          'msg': 'specific stockRecords: data not found'
        });
      }
      connection.release();
    });
  });
});

router.post('/stockRecord', (req, res) => {
  const restaurant_id = req.body.restaurant_id;
  const customer_address = req.body.customer_address;
  const stock_change = req.body.stock_change;
  const type = req.body.type;

  const query = util.format(
    'INSERT INTO stock_record (restaurant_id, customer_address, stock_change, type, createdAt) VALUES (%d, %s, %d, %d, now());',
    restaurant_id,
    mysql.escape(customer_address),
    stock_change,
    type
  );

  pool.getConnection(function(err, connection) {
    if (err) {
      res.send({
        "code": 2,
        "msg": "stockRecord insert: mysql connection error",
        "err": err
      });
      connection.release();
      return;
    }

    connection.query(query, function(err, data) {
      if (err) {
        res.send({
          "code": 1,
          "msg": "stockRecord insert: error in inserting data to stockRecord",
          "err": err
        });
        connection.release();
        return;
      }

      res.send({
        "code": 0,
        "msg": "stockRecord insert: add stockRecord data to DB",
        "data": data
      });
      connection.release();
    });
  });
});

router.get('/orders', (req, res) => {
  pool.getConnection(function(err, connection) {
    if(err) { 
      res.send({
        'code': 3, 
        'msg': 'orders: database connection error',
        'err': err
      });
      return;
    }

    const query = util.format(
      'SELECT id, type, container_type1_amount, container_type2_amount, container_type3_amount, ' +
      'container_type4_amount, status, date_format(createdAt,"%Y-%m-%d %H:%i:%s") as createdAt, ' +
      'date_format(updatedAt,"%Y-%m-%d %H:%i:%s") as updatedAt FROM ecobox_order;'
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.send({
        'code': 2, 
        'msg': 'orders: database query error',
        'err': err
        });
        connection.release();
        return;
      } 

      if(!(data.toString() === "")) { 
        res.send({
          'code': 0, 
          'msg': 'orders: successfully found',
          'data' : data
        });
      } else { 
        res.send({
          'code': 1, 
          'msg': 'orders: data not found'
        });
      }
      connection.release();
    });
  });
});

router.post('/order', (req, res) => {
  const restaurant_id = req.body.restaurant_id;
  const type = req.body.type;
  const container_type1_amount = req.body.container_type1_amount;
  const container_type2_amount = req.body.container_type2_amount;
  const container_type3_amount = req.body.container_type3_amount;
  const container_type4_amount = req.body.container_type4_amount;
  const status = req.body.status;

  const query = util.format(
    'INSERT INTO ecobox_order (restaurant_id, type, container_type1_amount, container_type2_amount, ' +
    'container_type3_amount, container_type4_amount, status, createdAt, updatedAt) VALUES (%d, %d, %d, %d, %d, %d, %d, now(), now());',
    restaurant_id,
    type,
    container_type1_amount,
    container_type2_amount,
    container_type3_amount,
    container_type4_amount,
    status
  );

  pool.getConnection(function(err, connection) {
    if (err) {
      res.send({
        "code": 2,
        "msg": "order insert: mysql connection error",
        "err": err
      });
      connection.release();
      return;
    }

    connection.query(query, function(err, data) {
      if (err) {
        res.send({
          "code": 1,
          "msg": "order insert: error in inserting data to order",
          "err": err
        });
        connection.release();
        return;
      }

      res.send({
        "code": 0,
        "msg": "order insert: add order data to DB",
        "data": data
      });
      connection.release();
    });
  });
});

router.put('/order', (req, res) => {
  const id = req.body.id;
  const status = req.body.status;

  const query = util.format(
    'UPDATE ecobox_order SET status = %d, updatedAt = now() where id = %d;',
    status,
    id
  );

  pool.getConnection(function(err, connection) {
    if (err) {
      res.send({
        "code": 2,
        "msg": "order update: mysql connection error",
        "err": err
      });
      connection.release();
      return;
    }

    connection.query(query, function(err, data) {
      if (err) {
        res.send({
          "code": 1,
          "msg": "order update: error in inserting data to order",
          "err": err
        });
        connection.release();
        return;
      }

      res.send({
        "code": 0,
        "msg": "order update: add stockRecord data to DB",
        "data": data
      });
      connection.release();
    });
  });
});

router.get('/stockRecords', (req, res) => {
  const id = req.params.restaurantId;
  pool.getConnection(function(err, connection) {
    if(err) { 
      res.send({
        'code': 3, 
        'msg': 'stockRecords: database connection error',
        'err': err
      });
      return;
    }

    const query = util.format(
      'SELECT id, restaurant_id, customer_address, stock_change, type, date_format(createdAt,"%Y-%m-%d %H:%i:%s") as createdAt FROM stock_record;'
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.send({
        'code': 2, 
        'msg': 'stockRecords: database query error',
        'err': err
        });
        connection.release();
        return;
      } 

      if(!(data.toString() === "")) { 
        res.send({
          'code': 0, 
          'msg': 'stockRecords: successfully found',
          'data' : data
        });
      } else { 
        res.send({
          'code': 1, 
          'msg': 'stockRecords: data not found'
        });
      }
      connection.release();
    });
  });
});

module.exports = router;