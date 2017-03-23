var Documents = require('../models/document.js');
var Articles = require('../models/article.js');
var multer  = require('multer');

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/docs'); // Make sure this folder exists
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
var upload = multer({ storage: storage }).single('doc');


module.exports =  function(app){

  app.post('/docs', function (req, res) {
      upload(req, res, function (err) {
          if(err) {
            res.json({
              error: {
                error: true,
                message: "There was a problem uploading the document"
              },
              code: 'DOCDIDNTUPLOAD',
              data: {

              }
            });
          }
          else {
            if (req.file) {

            Documents.forge().save({
              name: req.file.filename,
              path: req.file.path
            }).then( function (doc) {
              res.json({
                error: {
                  error: false,
                  message: ''
                },
                code: 'B103',
                data: {
                  doc: doc
                }
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
            } else {
                res.status(500).json({
                 error: {
                   error: true,
                   message: "No file in Request"
                 },
                 code: 'B104',
                 data: {

                 }
               });
            }
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

  /*app.post('/docs',function(req,res){

    Documents.forge().save({
        name: req.body.name
      }).then( function (doc) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B103',
          req: req,
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
*/
}