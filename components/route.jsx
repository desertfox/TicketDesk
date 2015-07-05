var React = require('react');
//var RouteSelect = 
module.exports = React.createClass({
	render: function() {
		return (
				<select className="routes" onChange={this.props.callback}>
					{this.props.routes.map(function(route) {
						return ( 
							<RouteOption value={route} key={route.id} />
						);
					})}
				</select>
		);
	}
});

var RouteCreate = React.createClass({
	render: function() {
		return (
			<form>
				Name:<input type="text" />
				Dept: <select><option>Def</option></select>
				AutoResponses: <AutoResponseSelect autoresponses={this.props.autoresponses} />
				<button>ADD</button>
			</form>
		);
	}
});



var RouteOption = React.createClass({
	render: function() {
		return (
			<option value={this.props.value.id}>
				Route ID: {this.props.value.id}	Dept: {this.props.value.queue_title}
			</option>
		);
	}
});