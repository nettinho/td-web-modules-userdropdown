import * as d3 from "d3";

export class Tooltip {
  constructor() {
    this.tooltip = null;
    this.visible = false;
    this.textLayer = null;
    this.__text = "";
  }

  set text(text) {
    if (text !== this.__text) {
      this.__text = text;
      this.textLayer.data([this.__text]).text(d => d);
      this.rectLayer.attr(
        "width",
        parseInt(this.textLayer.node().getComputedTextLength()) + 10
      );
    }
  }

  draw(x = null, y = null) {
    x = x !== null ? x : 0;
    y = y !== null ? y : 0;
    if (this.visible) {
      if (!document.getElementById("tooltip")) {
        this.tooltip = d3
          .select("#container")
          .select("svg")
          .append("g")
          .attr("id", "tooltip")
          .attr("transform", `translate(${x},${y})`);
        this.rectLayer = this.tooltip
          .append("rect")
          .attr("width", 100)
          .attr("height", 20)
          .attr("x", -5)
          .attr("y", -15)
          .attr("fill", "rgb(244, 255, 255)")
          .attr("stroke", "rgb(100, 100, 150)");
        this.textLayer = this.tooltip
          .selectAll("text")
          .data([this.__text])
          .enter()
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .text(d => d);
      } else {
        this.tooltip
          .attr("transform", `translate(${x},${y})`)
          .attr("opacity", 1);
      }
    }
  }

  hide() {
    this.visible = false;
    if (!d3.select("#tooltip").empty()) {
      d3.select("#tooltip")
        .attr("opacity", 0)
        .style("display", "none");
    }
  }

  show() {
    this.visible = true;
    if (!d3.select("#tooltip").empty()) {
      d3.select("#tooltip")
        .attr("opacity", 1)
        .style("display", "block");
    } else {
      this.draw();
    }
  }
}

export default Tooltip;
