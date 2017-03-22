import React from 'react';
import Alert from 'react-s-alert';

class DocUpload extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e) {
    e.preventDefault();
    var doc = this.refs.doc.files[0];
    var formData = new FormData();
    formData.append('doc', doc);
    var myHeaders = new Headers({
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'POST',
                headers: myHeaders,
               body: formData
               };
    var that = this;
    fetch('/api/docfiles/',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error) {
        Alert.error(response.error.message);
      }
      else {
        //Alert.success("Made it to the drive");
        var file = response.data.file;
        var name = file.originalname;
        var path = './client/docs/' + name;

        var fileData = new FormData();
        fileData.append('name', name);
        fileData.append('path', path);

        var fileHeaders = new Headers({
          "x-access-token": window.localStorage.getItem('userToken')});
        
        var fileInit = { method: 'POST',
                      headers: fileHeaders,
                      body: fileData
                    };

        fetch('/api/docs/',fileInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if(response.error.error) {
            Alert.error(response.error.message);
          }
          else {
            Alert.success(name+" successfully uploaded to "+path);
            $('#docUpload').modal('hide');
          }
        });
      }
    });
  }

  render () {
    return(

        <div id="docUpload" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="docUploadLabel" aria-hidden="true">
         <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                <h4 className="modal-title" id="docUploadLabel">Select a Document</h4>
              </div>
              <div className="modal-body">
                <h4>Upload a New Document</h4>
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleUpload}>
                    <input type="file" name="doc" ref="doc" className="form-control"/>
                    <p>Please Select your File</p>
                    <br/>
                    <input type="submit" value="Upload Document" className="btn btn-default btn-block btn-lg"/>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
  );
  }
}

export default DocUpload;
