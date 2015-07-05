var React = require('react');
//AddButton
module.exports = React.createClass({
	render: function() {
		return <button value={this.props.value} onClick={this.props.callback}>+</button>;
	}
});