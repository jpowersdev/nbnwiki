var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Articles = require('./article');

var Document = bookshelf.Model.extend({
  tableName: 'documents'
});

module.exports = bookshelf.model('Document',Document);
