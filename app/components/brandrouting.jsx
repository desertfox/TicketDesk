var React = require('react');
var _ = require('lodash');

var BrandRouting = React.createClass({
	selectCompany: function(event) {
		var companyID = event.target.value;

		var company = _.find(this.state.companies, function(company) {
			return company.id == companyID;
		});

		this.setState({
			company: company,
			route: company.routes[0]
		});
	},
	selectQueue: function(event) {
		var queueID = event.target.value;

		var queue = _.find(this.state.company.routes, function(route) {
			return route.queue_id == queueID;
		});

		this.setState({
			route: queue
		});
	},
	render: function() {
		return (		    	
				{this.state.showConditions && <Conditions conditions={this.state.route.conditions} />}
		    	
		    	<div className="swamp-routes">
		    		<ul>
		    			<li>
		    			<CompanySelect companies={this.state.companies} callback={this.selectCompany} />
		    			<RouteSelect routes={this.state.company.routes} callback={this.selectQueue} />
		    			<AddButton value="addCondition" callback={this.addForm} />Conditions
		    			<AutoResponseSelect autoresponses={this.state.autoresponses} />  			
		    			<ShowConditions callback={this.toggleCondition} />
		    			</li>
		    		</ul>
	    		</div>
	    );
	}
});
var CompanySelect = React.createClass({
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
var RouteSelect = React.createClass({
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
var AutoResponseSelect = React.createClass({
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
var QueueSelect = React.createClass({
	render: function() {
		return (
				<select className="queues" onChange={this.props.callback}>
					{this.props.routes.map(function(route) {
						return ( 
							<QueueOption value={route} key={route.id} />
						);
					})}
				</select>
		);
	}
});
module.exports = BrandRouting;