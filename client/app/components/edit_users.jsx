import React from 'react';
import {hashHistory} from 'react-router';
import Alert from 'react-s-alert';
import Loader from './loader.jsx';

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {loading: true, name: "", about: "", email: "", password: "", grp: ""}
  }

  handleChange() {
    this.setState({name: this.refs.user_name.value, about: this.refs.user_about.value, email: this.refs.user_email.value, password: this.refs.user_password.value, grp: this.refs.grp.value});
  }

  componentDidMount() {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/users/'+this.props.params.userId,myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        that.setState({name: response.data.name, about: response.data.about, email: response.data.email, grp: response.data.grp, loading: false})
      }
    });
  }

  editUser(e) {
    var user = {
      name: encodeURIComponent(this.refs.user_name.value),
      about: encodeURIComponent(this.refs.user_about.value),
      email: encodeURIComponent(this.refs.user_email.value),
      password: encodeURIComponent(this.refs.user_password.value),
      grp: encodeURIComponent(this.refs.user_group.value),
      id: encodeURIComponent(this.props.params.userId)
    };
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": window.localStorage.getItem('userToken')
    });
    var myInit = { method: 'PUT',
               headers: myHeaders,
               body: "name="+user.name+"&about="+user.about+"&email="+user.email+"&password="+user.password+"&grp"+user.grp+"&id="+user.id
               };
    var that = this;
    fetch('/api/users/',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success('User has been edited');
          hashHistory.push('admin');
      }
    });
  }


  render () {
    if(this.state.loading)
      return <Loader />
    else
        return(
          <div>
                  <div className="row">
                    <div className="col-md-12 col-sd-12">
                      <h1><b>Update User</b></h1>
                      <br/>
                        <form>
                          <div className="col-sm-12 form-group">
                            <p className="create-user">Name</p>
                            <input type="text" className="form-control" ref="user_name" id="inputUserName" value={this.state.name} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <p className="create-user">About</p>
                            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" value={this.state.about} onChange={this.handleChange}/>
                          </div>
                          <div className="col-sm-12 form-group">
                            <p className="create-user">Email</p>
                            <input type="text" className="form-control" ref="user_email" id="inputUserName" value={this.state.email} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <p className="create-user" data-toggle="tooltip">Group</p>
                            <input type="text" className="form-control" ref="user_group" id="inputUserGroup" value={this.state.grp} onChange={this.handleChange} />
                          </div>
                          <div className="col-sm-12 form-group">
                            <p className="create-user">Password</p>
                            <input type="password" className="form-control" ref="user_password" id="inputUserName" value={this.state.password} onChange={this.handleChange} />
                          </div>
                      <div className="col-sm-12 form-group">
                        <button onClick={this.editUser} className="btn btn-default btn-block btn-lg">Update User</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>);
  }
}

export default EditUser;
