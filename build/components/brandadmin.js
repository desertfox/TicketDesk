/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var BrandAdmin =  React.createClass({displayName: "BrandAdmin",
	getInitialState: function() {
	    var	companies = [ 
		    { 
				"id": 1,
				"title": "Company 1",
				"routes": [	
					{
						"id": 1,
						"queue_id": 1,
						"queue_title": 'Queue 1',
						"autoresponse_id": 1,
						"conditions": [	
							{
								"id": 1,
								"field": "to_address",
								"value": "queue1@queue1.com"
							},
							{
								"id": 4,
								"field": "from_address",
								"value": "*@email.com"
							}
						]
					},
					{
						"id": 3,
						"queue_id": 3,
						"queue_title": 'Queue 3',
						"autoresponse_id": 1,
						"conditions": [ 
							{
								"id": 3,
								"field": "to_address",
								"value": "queue2@queue2.com"
							}
						]
					}	
				]
			},
			{
				"id": 2,
				"title": "Company 2",
				"routes": [ {
					"id": 2,
					"queue_id": 2,
					"queue_title": 'Queue 2',
					"autoresponse_id": 2,
					"conditions": [ {
						"id": 2,
						"field": "from_address",
						"value": "crazy@person.com"
					}]
				}]
			}
		];
	  
	  	var autoresponses = [
			{
				"id": 1,
				"title": 'Turtles',
				"subject": 'Subject',
				"body": 'I like turtles'
			},
		];

	    return {
	       	view: false,
	    	company: companies[0], 
	    	companies: companies, 
	    	route: companies[0].routes[0],
	    	showConditions: false,
	    	autoresponses: autoresponses
	    };
  	},
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
	toggleCondition: function() {
		this.setState({
			showConditions: this.state.showConditions ? false : true
		});
	},
	addForm: function(event) {
		var value = event.target.value;

		this.setState({
			view: value
		});
	},
	showForm: function() {
		var view = this.state.view;

		switch(view) {
			case "addCompany":
				return ( React.createElement(CompanyCreate, null) );
			case "addQueue":
				return ( React.createElement(QueueCreate, {companies: this.state.companies}) );
			case "addCondition":
				return ( React.createElement(ConditionCreate, null) );
			case "addRoute":
				return ( React.createElement(RouteCreate, {autoresponses: this.state.autoresponses}) );
			case "addAutoResponse":
				return ( React.createElement(AutoResponseCreate, null) );
		}
	},
	render: function() {
    	return ( 
    		React.createElement("div", null, 
	    		React.createElement("table", {className: "swamp-add"}, 
		    		React.createElement("tbody", null, 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, "Company:"), 
		    			React.createElement("td", null, React.createElement(AddButton, {value: "addCompany", callback: this.addForm}))
	    			
		    		), 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, "Queue/Dept:"), 
		    			React.createElement("td", null, React.createElement(AddButton, {value: "addQueue", callback: this.addForm}))
		    		), 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, "Route:"), 
		    			React.createElement("td", null, React.createElement(AddButton, {value: "addRoute", callback: this.addForm}))		    				    			
		    		), 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, "AutoResponses"), 
		    			React.createElement("td", null, React.createElement(AddButton, {value: "addAutoResponse", callback: this.addForm}))		    				
		    		), 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, "Conditions:"), 
		    			React.createElement("td", null, React.createElement(AddButton, {value: "addCondition", callback: this.addForm}))
		    		)
		    		)
		    	), 		    		
		    	
		    	this.state.view != 'NONE' && this.showForm(), 
		    	
		    	React.createElement("table", {className: "swamp-routes"}, 
		    		React.createElement("tbody", null, 
		    		React.createElement("tr", null, 
		    			React.createElement("td", null, React.createElement(CompanySelect, {companies: this.state.companies, callback: this.selectCompany})), 
		    			React.createElement("td", null, React.createElement(RouteSelect, {routes: this.state.company.routes, callback: this.selectQueue})), 
		    			React.createElement("td", null, React.createElement(AutoResponseSelect, {autoresponses: this.state.autoresponses})), 		    			
		    			React.createElement("td", null, React.createElement(ShowConditions, {callback: this.toggleCondition})), 
		    			React.createElement("td", null)
		    		)
		    		)
	    		)
			)
		);
  	}
});
//{this.state.showConditions && <Conditions conditions={this.state.route.conditions} />}

var CompanySelect = React.createClass({displayName: "CompanySelect",
	render: function() {
		return (
				React.createElement("select", {className: "companies", onChange: this.props.callback}, 
					this.props.companies.map(function(company) {
						return (
							React.createElement(CompanyOption, {value: company, key: company.id})
						);
					})
				)
		);
	}
});
var CompanyCreate = React.createClass({displayName: "CompanyCreate",
	render: function() {
		return (
			React.createElement("form", null, 
				"Name:", React.createElement("input", {type: "text"}), 
				"TLD:", React.createElement("input", {type: "text"}), 
				"user_portal:", React.createElement("input", {type: "text"}), 
				React.createElement("button", null, "ADD")
			)
		);
	}
});
var CompanyOption = React.createClass({displayName: "CompanyOption",
	render: function() {
		return (
			React.createElement("option", {value: this.props.value.id}, 
				this.props.value.title
			)
		);
	}
});
var RouteSelect = React.createClass({displayName: "RouteSelect",
	render: function() {
		return (
				React.createElement("select", {className: "routes", onChange: this.props.callback}, 
					this.props.routes.map(function(route) {
						return ( 
							React.createElement(RouteOption, {value: route, key: route.id})
						);
					})
				)
		);
	}
});
var RouteCreate = React.createClass({displayName: "RouteCreate",
	render: function() {
		return (
			React.createElement("form", null, 
				"Name:", React.createElement("input", {type: "text"}), 
				"Dept: ", React.createElement("select", null, React.createElement("option", null, "Def")), 
				"AutoResponses: ", React.createElement(AutoResponseSelect, {autoresponses: this.props.autoresponses}), 
				React.createElement("button", null, "ADD")
			)
		);
	}
});
var RouteOption = React.createClass({displayName: "RouteOption",
	render: function() {
		return (
			React.createElement("option", {value: this.props.value.id}, 
				"Route ID: ", this.props.value.id, " Dept: ", this.props.value.queue_title
			)
		);
	}
});
var AutoResponseSelect = React.createClass({displayName: "AutoResponseSelect",
	render: function() {
		return ( 
				React.createElement("select", {className: "autoresponses"}, 
					this.props.autoresponses.map(function(autoresponse) {
						return (
							React.createElement(AutoResponseOption, {value: autoresponse, key: autoresponse.id})
						);
					})
				)
		);
	}
});
var AutoResponseCreate = React.createClass({displayName: "AutoResponseCreate",
	render: function() {
		return (
			React.createElement("form", null, 
				"Name:", React.createElement("input", {type: "text"}), 
				"Subject:", React.createElement("input", {type: "text"}), 
				"Body:", React.createElement("input", {type: "textarea"}), 
				React.createElement("button", null, "ADD")
			)
		);
	}	
});
var AutoResponseOption = React.createClass({displayName: "AutoResponseOption",
	render: function() {
		return React.createElement("option", {value: this.props.value.id}, this.props.value.title);
	}
});
var Conditions = React.createClass({displayName: "Conditions",
	render: function() {
		return (
			React.createElement("div", {className: "conditions"}, 
				this.props.conditions.map(function(condition) {
					return (React.createElement("div", {key: condition.id}, 
						"ID:   ", condition.id, React.createElement("br", null), 
						"FIELD:", condition.field, React.createElement("br", null), 
						"VALUE:", condition.value, React.createElement("br", null)
					));
				})
			)
		);
	}
});
var ConditionCreate = React.createClass({displayName: "ConditionCreate",
	render: function() {
		return (
			React.createElement("form", null, 
				"FIELD:", React.createElement("input", {type: "text"}), 
				"VALUE:", React.createElement("input", {type: "text"}), 
				React.createElement("button", null, "ADD")
			)
		);
	}
});
var ShowConditions = React.createClass({displayName: "ShowConditions",
	render: function() {
		return React.createElement("button", {onClick: this.props.callback}, "SHOW")
	}
});
var QueueCreate = React.createClass({displayName: "QueueCreate",
	render: function() {
		return (
			React.createElement("form", null, 
				"Name:", React.createElement("input", {type: "text"}), 
				"Restricted:", React.createElement("input", {type: "text"}), 
				"Company:", React.createElement(CompanySelect, {companies: this.props.companies}), 
				React.createElement("button", null, "ADD")
			)
		);
	}
});
var QueueSelect = React.createClass({displayName: "QueueSelect",
	render: function() {
		return (
				React.createElement("select", {className: "queues", onChange: this.props.callback}, 
					this.props.routes.map(function(route) {
						return ( 
							React.createElement(QueueOption, {value: route, key: route.id})
						);
					})
				)
		);
	}
});
var QueueOption = React.createClass({displayName: "QueueOption",
	render: function() {
		return (
			React.createElement("option", {value: this.props.value.queue_id}, 
				this.props.value.queue_title
			)
		);
	}
});
var AddButton = React.createClass({displayName: "AddButton",
	render: function() {
		return React.createElement("button", {value: this.props.value, onClick: this.props.callback}, "+");
	}
});

module.exports = BrandAdmin;