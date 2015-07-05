var React = require('react');
//var Conditions =
module.exports = React.createClass({
	render: function() {
		return (
			<div className="conditions">
				{this.props.conditions.map(function(condition) {
					return (<div key={condition.id}>
						ID:   {condition.id}<br />
						FIELD:{condition.field}<br />
						VALUE:{condition.value}<br />
					</div>);
				})}
			</div>
		);
	}
});

//var ConditionCreate =
module.exports = React.createClass({
	render: function() {
		return (
			<form>
				FIELD:<input type="text" />
				VALUE:<input type="text" />
				<button>ADD</button>
			</form>
		);
	}
});

//var ShowConditions =
module.exports = React.createClass({
	render: function() {
		return <button onClick={this.props.callback}>SHOW</button>
	}
});