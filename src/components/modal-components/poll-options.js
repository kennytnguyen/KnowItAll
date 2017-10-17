import React, {Component} from 'react'

export default class PollOptions extends Component {
	constructor(props) {
		super(props)
		this.state = {selectedOption: null, options: [], inputText: ""};
	}

	componentDidMount() {
		var componentThis = this
		$('#createModal').on('hidden.bs.modal', function () {
			const modalSelect = $('#modalSelect')
			componentThis.setState({selectedOption: null, options: [], inputText: ""})
        	$(modalSelect).html('').end()
       	 })
	}
	
	onKeyPress(event) {
		const val = event.target.value;

		if(event.key == 'Enter') {
			if(this.state.options.includes(event.target.value)) {
				return
			}
			
			if(this.state.options.length == 0 && val !== "") {
				this.props.getOptions([...this.state.options, val])
				this.setState({selectedOption: val, options: [...this.state.options, val]})
			}
			else if(val !== "") {
				this.props.getOptions([...this.state.options, val])
				this.setState({options: [...this.state.options, val]})
			}

			this.setState({inputText: ""})
  		}
	}

	onRemoveClicked(event) {
		event.preventDefault();
		if(this.state.selectedOption) {
			const tempOptions = this.state.options.slice(0)
			const removeIndex = tempOptions.indexOf(this.state.selectedOption)
			tempOptions.splice(removeIndex, 1);
			this.setState({selectedOption: tempOptions[0], options: tempOptions})
		}
	}

	render() {
		return (
			<div className="form-group">
	            <label className="col-sm-12 control-label" htmlFor="pollOptions">Poll Options</label>
	            <div className="col-sm-12">
	              	<input onChange={(event)=>{this.setState({inputText: event.target.value})}} value={this.state.inputText} style={{paddingLeft: "8px"}} onKeyPress={this.onKeyPress.bind(this)}type="text" placeholder="Add Poll Option" className="form-control" />
	              	<select id="modalSelect" style={{paddingLeft: "10px"}} onChange={(event)=>{this.setState({selectedOption: event.target.value})}} className="form-control">
              			{this.state.options.map((option)=>{
							return (
								<option key={option}>{option}</option>
							)
              			})}
                    </select>
                    <div onClick={this.onRemoveClicked.bind(this)} className="col-sm-12 btn btn-danger">Remove Selected Element</div>
	            </div>
        	</div>
        )
	}
}