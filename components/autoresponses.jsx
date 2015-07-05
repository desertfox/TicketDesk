var React = require('react');

//var AutoResponseSelect
module.exports = React.createClass({
	render: function() {
		return ( 
				<select className="autoresponses">
					{this.props.autoresponses.map(function(autoresponse) {
						return (
							<AutoResponseOption value={autoresponse} key={autoresponse.id} />
						);
					})}
				</select>
		);
	}
});

var AutoResponseCreate = React.createClass({
	render: function() {
		return (
			<form>
				Name:<input type="text" />
				Subject:<input type="text" />
				Body:<input type="textarea" />
				<button>ADD</button>
			</form>
		);
	}	
});

var AutoResponseOption = React.createClass({
	render: function() {
		return <option value={this.props.value.id}>{this.props.value.title}</option>;
	}
});