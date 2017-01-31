/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  index
 * POST    /products              ->  create
 * GET     /products/:id          ->  show
 * PUT     /products/:id          ->  update
 * DELETE  /products/:id          ->  destroy
 */

'use strict';

const _ = require('lodash');
const Products = require('./product.model');

// Get list of products
exports.index = (req, res) => {
  Products.find()
  .populate({
    path: 'bids.user',
    select: 'name'
  })
  .exec((err, products) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = (req, res) => {
  Products.findById(req.params.id, (err, product) => {
    if (err) {
      return handleError(res, err);
    }
    if (!product) {
      return res.status(404).send('Not Found');
    }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = (req, res) => {
  const prod = _.merge(req.body, {
    created: Date.now(),
    updated: Date.now(),
    currentPrice: req.body.startPrice,
    bids: []
  });

  Products.create(prod, (err, product) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.created) {
    delete req.body.created;
  }
  req.body.updated = Date.now();

  Products.findById(req.params.id, (err, product) => {
    if (err) {
      return handleError(res, err);
    }
    if (!product) {
      return res.status(404).send('Not Found');
    }
    const updated = _.merge(product, req.body);
    updated.save(err => {
      if (err) {
        return handleError(res, err);
      }
    });
  })
  .populate({
    path: 'bids.user',
    select: 'name'
  })
  .exec((err, product) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(product);
  });
};

exports.bid = (req, res) => {
  Products.findById(req.params.id, (err, product) => {
    if (err) {
      return handleError(res, err);
    }

    if (!product) {
      return res.status(404).send('Not Found');
    }

    const bid = _.merge(req.body, {
      time: Date.now(),
      user: req.user.id
    });
    const updated = _.merge(product, {
      bids: _.concat(product.bids, bid),
      updated: Date.now(),
      currentPrice: product.currentPrice + bid.value
    });

    updated.save(err => {
      if (err) {
        return handleError(res, err);
      }
    });
  })
  .populate({
    path: 'bids.user',
    select: 'name'
  })
  .exec((err, products) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(products);
  });
};

// Deletes a product from the DB.
exports.destroy = (req, res) => {
  Products.findById(req.params.id, (err, products) => {
    if (err) {
      return handleError(res, err);
    }
    if (!products) {
      return res.status(404).send('Not Found');
    }
    products.remove(err => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

/* =================================== */

function handleError(res, err) {
  return res.status(500).send(err);
}
