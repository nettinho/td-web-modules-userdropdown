/**
 * Clase que pinta el DiagramCanvas y lo echa todo a andar.
 */
import { axios, JSON_OPTS } from "@truedat/core/services/api";
import globalConf from "../conf/globalConf";
import { ObjectDispatcher } from "./ObjectDispatcher.js";
import { DiagramCanvas } from "./DiagramCanvas.js";

export class Painter {
  start(data, endCanvasLoading) {
    if (data.paths.length !== 0) {
      // Hago mi datascrapping.
      window.objectDispatcher = new ObjectDispatcher(data.paths);
      window.objectDispatcher.requestedObjects = [];

      const { uuids } = data;

      // Singleton
      window.diagramCanvas = new DiagramCanvas(
        globalConf.sizes.canvasWidth +
          globalConf.sizes.canvasMargin.left +
          globalConf.sizes.canvasMargin.right,
        globalConf.sizes.canvasHeight +
          globalConf.sizes.canvasMargin.top +
          globalConf.sizes.canvasMargin.bottom
      );

      uuids.forEach(d => {
        const element = window.objectDispatcher.get(d);
        if (element) {
          window.objectDispatcher.requestedObjects.push(element);
        }
      });
      window.diagramCanvas.draw();
      // Resaltamos los objetos que hemos pedido
      window.g = d => window.objectDispatcher.get(d);
      document.getElementById("container").addEventListener("keypress", e => {
        if (e.keyCode === 27) window.diagramCanvas.unlock();
      });

      endCanvasLoading();
    }
  }

  /**
   * Ejecuta la acción del painter: crear el diagramCanvas, hace la petición a la Api con la información, etc.
   * @param {(Int|Array)} Lista de uuids de los objetos que se piden a la api
   * @return {undefined}
   */
  paint(queryParam, endCanvasLoading) {
    axios
      .post(`${globalConf.url.path}`, queryParam, JSON_OPTS)
      .then(response => {
        this.start(response.data.data, endCanvasLoading);
      })
      .catch(error => {
        console.log(error);
        endCanvasLoading();
      });
  }
}

export default Painter;
