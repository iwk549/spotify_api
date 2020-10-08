import React, { Component } from "react";
import {
  VictoryBar,
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryGroup,
} from "victory";

class Chart extends Component {
  render() {
    console.log(this.props.data);
    if (this.props.data.length === 0) return null;

    let chartData = [];
    this.props.data.forEach((d) => {
      chartData.push({
        x: d[this.props.xAxis],
        y: d[this.props.yAxis],
        label: d.name,
      });
    });
    return (
      <VictoryChart
        height={200}
        width={225}
        // domainPadding={20}
        animate={{ duration: 1000, easing: "bounce" }}
      >
        <VictoryAxis label={this.props.xAxis} tickValues={[0, 1]} />
        <VictoryAxis
          label={this.props.yAxis}
          dependentAxis
          tickValues={[0, 1]}
        />
        <VictoryScatter
          labelComponent={
            <VictoryTooltip
              center={{ x: 115, y: 30 }}
              constrainToVisibleArea={true}
            />
          }
          data={chartData}
          size={0.3}
        />
      </VictoryChart>
    );
  }
}

export default Chart;
