import React, { Component } from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { drawCanvas } from "../lib/merlin/js/lineage.js";

class CanvasContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasLoading: false
    };

    this.initCanvasLoading = this.initCanvasLoading.bind(this);
    this.endCanvasLoading = this.endCanvasLoading.bind(this);
  }

  initCanvasLoading() {
    if (!this.state.canvasLoading) {
      this.setState({ canvasLoading: true });
    }
  }

  endCanvasLoading() {
    if (this.state.canvasLoading) {
      this.setState({ canvasLoading: false });
    }
  }

  loadTrazabilidad() {
    drawCanvas(this.endCanvasLoading);
  }

  componentDidMount() {
    this.initCanvasLoading();
  }

  componentDidUpdate() {
    if (this.state.canvasLoading) {
      this.loadTrazabilidad();
    }
  }

  render() {
    const { canvasLoading } = this.state;

    return (
      <React.Fragment>
        <Dimmer active={canvasLoading} inverted>
          <Loader size="massive" inverted />
        </Dimmer>
        <Grid id="page-content-wrapper">
          <Grid.Row style={{ padding: 0 }}>
            <div id="container" />
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CanvasContainer;
