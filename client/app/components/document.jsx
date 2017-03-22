import React from 'react';
import {Link, hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {doc: {}, loading: true};
  }

  componentDidMount(){
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/docs/'+this.props.params.id,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({doc: response.data})
      }
      that.setState({loading: false})
    });

  }

  render () {
    if(this.state.loading)
      return <Loader/>;
    else if(this.state.doc && this.state.doc.article) {
      return(
        <div>
          <a href={this.state.doc.path}>{this.state.doc.name}</a>
        </div>
      );
    }
  }
}

export default Document;
