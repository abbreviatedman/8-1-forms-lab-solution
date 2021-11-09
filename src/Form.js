import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      calculation: "",
      values: "",
    };
  }

  handleInput = (event) => {
    this.setState({ values: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !this.state.values ||
      this.state.values.split(",").some((num) => isNaN(num))
    ) {
      this.props.afterSubmit(this.state.calculation, "a");

      return;
    }

    this.props.afterSubmit(this.state.calculation, this.state.values);
    if (this.state.calculation) {
      this.setState({ values: "" });
    }
  };

  handleSelect = (event) => {
    this.setState({ calculation: event.target.value });
  };

  render() {
    return (
      <form>
        <input
          id="values"
          name="values"
          type="text"
          value={this.state.values}
          onChange={this.handleInput}
          className={this.props.error ? "error" : ""}
        />

        <select
          id="operation"
          name="operation"
          onChange={this.handleSelect}
          className={this.props.error ? "error" : ""}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>

        <button type="submit" onClick={this.handleSubmit}>
          Calculate
        </button>
      </form>
    );
  }
}

export default Form;
