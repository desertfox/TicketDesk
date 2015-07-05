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