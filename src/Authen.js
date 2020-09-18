import React, { useState } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
  apiKey: 'AIzaSyDhnb0yoAu7NT06J1SDSyaum11QnshVdBQ',
  authDomain: 'ulogin-7fc9e.firebaseapp.com',
  databaseURL: 'https://ulogin-7fc9e.firebaseio.com',
  projectId: 'ulogin-7fc9e',
  storageBucket: 'ulogin-7fc9e.appspot.com',
  messagingSenderId: '935323818834',
  appId: '1:935323818834:web:cd259da94427edbe10f88b',
  measurementId: 'G-0TDQ3K9TWM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Authen = () => {
  const ud = uuid.v1();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [change, setChange] = useState('');
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState({
    ans1: '',
    ans2: '',
    ans3: '',
  });
  const [isSubmit, setSubmit] = useState(false);
  function handleChange(event) {
    if (event.target.name === 'email') {
      var em = event.target.value;
      setEmail(em);
    } else if (event.target.name === 'password') {
      var pass = event.target.value;
      setPwd(pass);
    } else if (event.target.name === 'name') {
      var nm = event.target.value;
      setChange(nm);
    }
  }
  //   function handleChange(event) {
  //     setChange(event.target.value);
  //   }
  function handleSubmit(event) {
    event.preventDefault();
    setName(change);
  }

  function handleLogin() {
    var promise = firebase.auth().signInWithEmailAndPassword(email, pwd);
    promise.then(user => {
      var out = document.getElementById('logout');
      out.classList.remove('hide');
      var txt = document.getElementById('TextBox');
      txt.classList.remove('hide');
      var h = document.getElementById('Hey');
      h.classList.remove('hide');
      var su = document.getElementById('signUp');
      su.classList.add('hide');
      var l = document.getElementById('login');
      l.classList.add('hide');
      var g = document.getElementById('google');
      g.classList.add('hide');
      var msg = 'Welcome ' + user.user.email;
      setErr(msg);
    });
    promise.catch(e => {
      var erro = e.message;
      setErr(erro);
    });
  }
  function handleSignUp() {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pwd);
    promise.then(user => {
      var msg = 'Welcome ' + user.user.email;
      firebase
        .database()
        .ref('Usignin/' + user.user.uid)
        .set({ email: user.user.email });
      console.log(user);

      setErr(msg);
      //console.log(user);
    });
    promise.catch(e => {
      var erro = e.message;
      setErr(erro);
    });
  }
  function handleLogout() {
    var promise = firebase.auth().signOut();
    promise.then(() => {
      var msg = 'Succesfully Logged Out ';
      setErr(msg);
      var out = document.getElementById('logout');
      out.classList.add('hide');
      var su = document.getElementById('signUp');
      su.classList.remove('hide');
      var l = document.getElementById('login');
      l.classList.remove('hide');
      var g = document.getElementById('google');
      g.classList.remove('hide');
      setEmail('');
      setPwd('');
    });
    promise.catch(e => {
      var erro = e.message;
      setErr(erro);
    });
  }
  function handleGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var out = document.getElementById('logout');
        out.classList.remove('hide');
        var txt = document.getElementById('TextBox');
        txt.classList.remove('hide');
        var h = document.getElementById('Hey');
        h.classList.remove('hide');
        var su = document.getElementById('signUp');
        su.classList.add('hide');
        var l = document.getElementById('login');
        l.classList.add('hide');
        var g = document.getElementById('google');
        g.classList.add('hide');
        var msg = 'Succesfully Logged In by google as ' + result.user.email;
        firebase
          .database()
          .ref('googleUser/' + result.user.uid)
          .set({ email: result.user.email });
        setErr(msg);
      })
      .catch(e => {
        var erro = e.message;
        setErr(erro);
      });
  }
  var studentName, questions;

  function handleSelect(event) {
    const { name, value } = event.target;

    setAnswers(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmitQues() {
    firebase
      .database()
      .ref('Usurvey/' + ud)
      .set({
        studentName: name,
        answers,
      });
    setSubmit(true);
  }
  if (name === '' && isSubmit === false) {
    studentName = (
      <div>
        <h1 id='Hey' className='hide'>
          Hey,Student...please enter your name!
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            id='TextBox'
            className='hide'
            name='name'
            onChange={handleChange}
            type='text'
            placeholder='enter your name'
            value={change}
          />
        </form>
      </div>
    );
    questions = '';
  } else if (name !== '' && isSubmit === false) {
    studentName = <h1>Welcome to U-Survey,{name}</h1>;
    questions = (
      <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={handleSubmitQues}>
          <div className='card'>
            <label>What kind of courses you like the most: </label>
            <br />
            <input
              type='radio'
              name='ans1'
              value='Technology'
              onChange={handleSelect}
            />
            Technology
            <input
              type='radio'
              name='ans1'
              value='Design'
              onChange={handleSelect}
            />
            Design
            <input
              type='radio'
              name='ans1'
              value='Marketing'
              onChange={handleSelect}
            />
            Marketing
          </div>
          <div className='card'>
            <label>You are a: </label>
            <br />
            <input
              type='radio'
              name='ans2'
              value='Student'
              onChange={handleSelect}
            />
            Student
            <input
              type='radio'
              name='ans2'
              value='in-job'
              onChange={handleSelect}
            />
            in-job
            <input
              type='radio'
              name='ans2'
              value='Looking-job'
              onChange={handleSelect}
            />
            Looking-job
          </div>
          <div className='card'>
            <label>Learning Helpful: </label>
            <br />
            <input
              type='radio'
              name='ans3'
              value='yes'
              onChange={handleSelect}
            />
            yes
            <input
              type='radio'
              name='ans3'
              value='no'
              onChange={handleSelect}
            />
            no
            <input
              type='radio'
              name='ans3'
              value='maybe'
              onChange={handleSelect}
            />
            maybe
          </div>
          <input className='feedback-button' type='submit' value='submit' />
        </form>
      </div>
    );
  } else if (isSubmit === true) {
    studentName = <h1>Thank you {name}</h1>;
  }
  return (
    <div>
      <input
        onChange={handleChange}
        id='email'
        type='email'
        placeholder='Enter your email'
        name='email'
        value={email}
      />
      <br />
      <input
        onChange={handleChange}
        id='pass'
        type='password'
        placeholder='Enter your password'
        name='password'
        value={pwd}
      />
      <br />
      <p>{err}</p>
      <br />
      <button id='login' onClick={handleLogin}>
        Login
      </button>
      <button id='signUp' onClick={handleSignUp}>
        SignUp
      </button>
      <button id='logout' className='hide' onClick={handleLogout}>
        Logout
      </button>

      <button className='google' id='google' onClick={handleGoogle}>
        Sign in with google
      </button>
      <div>
        {studentName}
        <br />
        {questions}
      </div>
    </div>
  );
};
export default Authen;
