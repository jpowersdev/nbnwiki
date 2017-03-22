var Documents = require('../models/document.js');
var Articles = require('../models/article.js');
var multer  = require('multer');

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './client/docs'); // Make sure this folder exists
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
var upload = multer({ storage: storage }).single('doc');


module.exports =  function(app){

  app.post('/docfiles', function (req, res) {
      upload(req, res, function (err) {
          if(err) {
            res.json({
              error: {
                error: true,
                message: "There was a problem uploading the document"
              },
              code: 'LOGODIDNTUPLOAD',
              data: {

              }
            });
          }
          else {
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'LOGOUPLOADED',
              file: {
                name: req.file.originalname,
                path: './client/docs/' + req.file.originalname
              },
              data: {
              }
            });
          }
      });
    });

  app.get('/docs/:id/',function(req,res){
    
    Documents.forge({id: req.params.id})
    .fetch()
      .then(function (doc) {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B113',
            data: doc.toJSON()
          });
        })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B114',
          data: {

          }
        });
      });
    });

  app.post('/docs',function(req,res){

    Documents.forge().save({
        name: req.body.name,
        path: req.body.path,
      }).then( function (doc) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B103',
          data: doc
        });     // responds back to request
     })
     .catch(function (error) {
       res.status(500).json({
         error: {
           error: true,
           message: error.message
         },
         code: 'B104',
         data: {

         }
       });
     });
  });

}