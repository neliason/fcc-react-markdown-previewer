var STARTING_TEXT = "# Heading\n## Subheading\n`mono`  \n*italics*  \n**bold**";

function Markdown(props) {
  return React.createElement(
    "div",
    { className: "markdown text-center" },
    React.createElement("textarea", { rows: "15", cols: "35", value: props.text, onChange: props.onchange })
  );
}

Markdown.propTypes = {
  text: React.PropTypes.string.isRequired,
  onchange: React.PropTypes.func.isRequired
};

function Output() {
  return React.createElement("div", { id: "output" });
}

function Title(props) {
  return React.createElement(
    "div",
    { className: "title text-center" },
    React.createElement(
      "h1",
      null,
      props.title
    )
  );
}

Title.propTypes = {
  title: React.PropTypes.string
};

var Application = React.createClass({
  displayName: "Application",


  propTypes: {
    initialText: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      title: "Markdown Previewer"
    };
  },

  getInitialState: function getInitialState() {
    return {
      text: this.props.initialText
    };
  },

  componentDidMount: function componentDidMount() {
    document.getElementById("output").innerHTML = marked(this.props.initialText);
  },


  onInputChange: function onInputChange(event) {
    document.getElementById("output").innerHTML = marked(event.target.value);
    this.setState({
      text: event.target.value
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Title, { title: this.props.title }),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-12 col-sm-6" },
          React.createElement(Markdown, { text: this.state.text, onchange: this.onInputChange })
        ),
        React.createElement(
          "div",
          { className: "col-xs-12 col-sm-6" },
          React.createElement(Output, null)
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Application, { initialText: STARTING_TEXT }), document.getElementById('container'));