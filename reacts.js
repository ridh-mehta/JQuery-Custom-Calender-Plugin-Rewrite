// Code goes here
var StarsFrame = React.createClass({
        render: function () {
            var stars = [], i;
            for (i = 0; i < this.props.numberOfStars; i = i + 1) {
                stars.push(<span className="glyphicon glyphicon-star"></span>);
    }
    return (
        <div id="stars-frame">
          <div className="well">
            {stars}
          </div>
        </div>
      )
  }
});

var ButtonFrame = React.createClass ({
  render: function () {
    var disabled,
        button, 
        correct = this.props.correct;
        
    switch (correct) {
      case true:
        button = (
            <button className="btn btn-success btn-lg">
              <span class="glyphicon glyphicon-ok"></span>
            </button>
          );
        break;
      case false:
        button = (
            <button className="btn btn-danger btn-lg">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          );
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
            <button className="btn btn-primary btn-lg" disabled={disabled}
            onCLick={this.props.checkAnswer}>=</button>
          );
    }
    return (
        <div id="button-frame">
          {button}
        </div>
      );
  }
});

var AnswerFrame = React.createClass ({
  render: function () {
    var props = this.props,
        selectedNumbers = props.selectedNumbers.map(function (i) {
          return (
            <span onClick={props.unclickNumber.bind(null, i)}>
            {i}
            </span>
          )
        });
    return (
        <div id="answer-frame">
          <div className = 'well'>
            {selectedNumbers}
          </div>
        </div>
      )
  }
});

var NumberFrame = React.createClass ({
  render: function () {
    var numbers = [],
    className,
    selectedNumbers = this.props.selectedNumbers,
    clickNumber = this.props.clickNumber;
    for (var i = 1; i <= 9; i = i + 1) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      numbers.push(<div className={className} onClick={clickNumber.bind(null, i)}>
      {i}
      </div>
      );
    }
    return (
        <div id="number-frame">
          <div className = 'well number'>
            {numbers}
          </div>
        </div>
      )
  }
});

var Game = React.createClass ({
  getInitialState: function () {
    return {
      numberOfStars: Math.floor(Math.random()*9) + 1,
      selectedNumbers : [],
      correct: null
    }
  },
  clickNumber: function (clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState(
        {
          selectedNumbers:this.state.selectedNumbers.concat(clickedNumber),
          correct: null
        }
      );
    }
  },
  unclickNumber: function (clickedNumber){
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);
        
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({selectedNumbers: selectedNumbers, correct: null});
  },
  sumOfSelectedNumbers: function () {
    return this.state.selectedNumbers.reduce (function (p,n) {
      return p+n;
    }, 0)
  },
  checkAnswer: function () {
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({correct: correct});
  },
  render: function () {
    var selectedNumbers=this.state.selectedNumbers,
        numberOfStars=this.state.numberOfStars,
        correct=this.state.correct;
    return (
        <div id="game">
          <h2>Play Nine</h2>
          <hr />
          <div className="clearfix">
            <StarsFrame numberOfStars={numberOfStars}/>
            <ButtonFrame selectedNumbers={selectedNumbers} correct={correct} 
            checkAnswer={this.checkAnswer} />
            <AnswerFrame selectedNumbers={selectedNumbers} 
            unclickNumber={this.unclickNumber} />
          </div>
          <NumberFrame selectedNumbers={selectedNumbers} 
          clickNumber={this.clickNumber} />
        </div>
      )
  }
});

React.render(<Game />, document.getElementById('container'));
