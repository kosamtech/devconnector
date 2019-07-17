import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password});
    }
  
  };

  //Redirect if register success
  if(isAuthenticated) {
    return <Redirect to="/dashboard" /> 
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i>Create Your Account</p>
      <form onSubmit={e => onSubmit(e)} className="form">
        <div className="form-group">
          <input
           type="text"
           placeholder="Name"
           name="name"
           value={name}
           onChange={e => onChange(e)}
           required="required"
           />
        </div>
        <div className="form-group">
          <input
           type="email"
           name="email"
           value={email}
           onChange={e => onChange(e)}
           placeholder="Email Address"
           required="required"
           />
          <small className="form-text">This site uses Gravatar so if you want a profile image then use gravatar email <address></address></small>
        </div>
        <div className="form-group">
          <input
           type="password"
           name="password"
           value={password}
           onChange={e => onChange(e)}
           placeholder="Password"
           minLength="6"
            />
        </div>
        <div className="form-group">
          <input
           type="password"
           name="password2"
           value={password2}
           onChange={e => onChange(e)}
           placeholder="Confirm Password"
            />
        </div>
        <input
         type="submit"
         className="btn btn-primary" value="Register"
          />
        <p className="my-1">Already have an account? <Link to="/login">Sign In</Link></p>
      </form>
    </Fragment>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state  => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
