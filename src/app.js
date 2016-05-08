// @flow

var React = require('react');
var ReactDOM = require('react-dom');

var whiteKeyStyle = {
  background: 'white',
  width: '30px',
  height: '80px',
  border: 'solid 1px black',
  display: 'inline-block'
};

var blackKeyStyle = {
  background: 'black',
  width: '30px',
  height: '50px',
  display: 'inline-block'
};

var keyboardStyle = {
  background: 'white',
  width: '1000px',
  height: '1000px',
  border: 'solid 1px black'
};

var WhiteKey = React.createClass({
  handleClick: function() {
    var audio = document.createElement('audio');
    audio.src = 'a.wav';
    audio.play();
  },

  render: function() {
    return <div onClick={this.handleClick} style={whiteKeyStyle}></div>;
  }
});

var BlackKey = React.createClass({
  handleClick: function() {
    var audio = document.createElement('audio');
    audio.src = 'a.wav';
    audio.play();
  },

  render: function() {
    return <div onClick={this.handleClick} style={blackKeyStyle}></div>;
  }
});

var Keyboard = React.createClass({
  render: function() {
    var result = [];
    for (var i = 0; i < 10; i += 2) {
      result.push(<WhiteKey key={i} />);
      result.push(<BlackKey key={i+1} />);
    }
    return <div style={keyboardStyle}>{result}</div>;
  }
});

ReactDOM.render(
  <Keyboard />,
  document.getElementById('container')
);
