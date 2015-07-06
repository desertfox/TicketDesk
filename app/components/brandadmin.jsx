/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var BrandAdmin =  React.createClass({
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
				return ( <CompanyCreate /> );
			case "addQueue":
				return ( <QueueCreate companies={this.state.companies} /> );
			case "addCondition":
				return ( <ConditionCreate  /> );
			case "addRoute":
				return ( <RouteCreate autoresponses={this.state.autoresponses} /> );
			case "addAutoResponse":
				return ( <AutoResponseCreate /> );
		}
	},
	render: function() {
    	return ( 
    		<div>
	    		<table className="swamp-add">
		    		<tbody>
		    		<tr>
		    			<td>Company:</td>
		    			<td><AddButton value="addCompany" callback={this.addForm} /></td>
	    			
		    		</tr>
		    		<tr>
		    			<td>Queue/Dept:</td>
		    			<td><AddButton value="addQueue" callback={this.addForm} /></td>
		    		</tr>
		    		<tr>
		    			<td>Route:</td>
		    			<td><AddButton value="addRoute" callback={this.addForm} /></td>		    				    			
		    		</tr>
		    		<tr>
		    			<td>AutoResponses</td>
		    			<td><AddButton value="addAutoResponse" callback={this.addForm} /></td>		    				
		    		</tr>
		    		<tr>
		    			<td>Conditions:</td>
		    			<td><AddButton value="addCondition" callback={this.addForm} /></td>
		    		</tr>
		    		</tbody>
		    	</table>		    		
		    	
		    	{this.state.view != 'NONE' && this.showForm()}
		    	
		    	<table className="swamp-routes">
		    		<tbody>
		    		<tr>
		    			<td><CompanySelect companies={this.state.companies} callback={this.selectCompany} /></td>
		    			<td><RouteSelect routes={this.state.company.routes} callback={this.selectQueue} /></td>
		    			<td><AutoResponseSelect autoresponses={this.state.autoresponses} /></td>		    			
		    			<td><ShowConditions callback={this.toggleCondition} /></td>
		    			<td></td>
		    		</tr>
		    		</tbody>
	    		</table>
			</div>
		);
  	}
});
//{this.state.showConditions && <Conditions conditions={this.state.route.conditions} />}

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
var Conditions = React.createClass({
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
var ConditionCreate = React.createClass({
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
var ShowConditions = React.createClass({
	render: function() {
		return <button onClick={this.props.callback}>SHOW</button>
	}
});
var QueueCreate = React.createClass({
	render: function() {
		return (
			<form>
				Name:<input type="text" />
				Restricted:<input type="text" />
				Company:<CompanySelect companies={this.props.companies} />
				<button>ADD</button>
			</form>
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
var QueueOption = React.createClass({
	render: function() {
		return (
			<option value={this.props.value.queue_id}>
				{this.props.value.queue_title}
			</option>
		);
	}
});
var AddButton = React.createClass({
	render: function() {
		return <button value={this.props.value} onClick={this.props.callback}>+</button>;
	}
});

module.exports = BrandAdmin;