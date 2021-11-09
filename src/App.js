import React from "react";
import Form from "./Form";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { result: "No result yet.", error: false };
  }

  calculate = (calculation, values) => {
    if (values.split(",").some((num) => isNaN(num))) {
      this.setState({ result: "Invalid input.", error: true });

      return;
    }

    const nums = values.split(",").map(Number);
    switch (calculation) {
      case "sum":
        this.setState({
          result: nums.reduce((sum, num) => sum + Number(num), 0),
          error: false,
        });

        break;

      case "average":
        this.setState({
          result: nums.reduce((sum, num) => sum + Number(num), 0) / nums.length,
          error: false,
        });

        break;

      case "mode":
        const counts = {};
        nums.forEach((num) => (counts[num] = counts[num] + 1 || 1));
        this.setState({
          result: Object.keys(counts).reduce(
            (max, num) => (counts[num] > counts[max] ? num : max),
            Object.keys(counts)[0]
          ),

          error: false,
        });

        break;

      default:
        this.setState({ result: "Please select an option.", error: true });
        break;
    }
  };

  render() {
    return (
      <main>
        <p>Enter each number in the array, separated by a ','</p>
        <Form afterSubmit={this.calculate} error={this.state.error} />
        <section id="result">
          <p>{this.state.result}</p>
        </section>
      </main>
    );
  }
}

export default App;
