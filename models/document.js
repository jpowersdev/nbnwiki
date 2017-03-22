var bookshelf = require('../bookshelf');
bookshelf.plugin('registry');
var Articles = require('./article');

var Document = bookshelf.Model.extend({
  tableName: 'documents',
  article: function() {
    return this.belongsTo('Article','article_id');
  }
});

module.exports = bookshelf.model('Document',Document);
