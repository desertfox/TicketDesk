var React = require('react');
//var CompanySelect =
module.exports = React.createClass({
	render: function() {
		return (
				<select className="companies" onChange={this.props.callback}>
					{this.props.companies.map(function(company) {
						return (
							<CompanyOption value={company} key={company.id} />
						);
					})}
				</select>
		);
	}
});

var CompanyCreate = React.createClass({
	render: function() {
		return (
			<form>
				Name:<input type="text" />
				TLD:<input type="text" />
				user_portal:<input type="text" />
				<button>ADD</button>
			</form>
		);
	}
});

var CompanyOption = React.createClass({
	render: function() {
		return (
			<option value={this.props.value.id}>
				{this.props.value.title}
			</option>
		);
	}
});