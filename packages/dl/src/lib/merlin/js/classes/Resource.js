import * as d3 from "d3";
import globalConf from "../conf/globalConf";
import { CanvasObject } from "./CanvasObject";
/**
 * Hijo de CanvasObject, representa los nodos que cuelgan directamente dentro de otrso CanvasObject a través de sus contains
 */
export class Resource extends CanvasObject {
  /**
   * Constructor del group
   * Recibe los datos del json, del que toma su título, id, etc
   * @constructor
   * @param {Object} info - El objeto, tal y como se recibe del json que devuelve la api
   */
  constructor(info, parent) {
    super(info);
    this.parent = parent;
    this.typeObject = "resource";
    // Los nombres de los campos están en la configuración para no tener que matarse cuando cambien.
    this.textOffset = globalConf.sizes.resource.textOffset;
    this.elementGap = globalConf.sizes.resource.gap;
    this.baseHeight = globalConf.sizes.resource.baseHeight;
    this.offset = globalConf.sizes.resource.offsetY;
  }

  /**
   * Expande el elemento.
   * @returns {undefined}
   */
  expand() {
    // Borramos la cache de lo visible.
    // TODO: meter en un método del objectDispatcher.
    window.objectDispatcher.getAll().forEach(d => {
      d.__visible = null;
    });
    d3.select(`#collapse_${this.id}`).attr(
      "xlink:href",
      require("@truedat/dl/svg/icons/collapse_up.svg")
    );
    this.expanded = true;
    if (!this.parent.expanded) {
      this.parent.expand();
    }
    if (!document.getElementById(`child_${this.id}`)) {
      this.childGroup = d3
        .selectAll(`#n_${this.id}`)
        .append("g")
        .attr("opacity", 0)
        .style("display", "none")
        .attr("id", d => `child_${d.id}`)
        .selectAll("g")
        .data(this.contains)
        .enter()
        .append("g")
        .attr("id", d => `n_${d.id}`);
    }
    // Redibujo para que el alto del elemento tenga la distancia adecuada.
    // Y recoloco los elementos si se han movido
    // Finalmente lo muestro
    d3.select(`#child_${this.id}`)
      .attr("opacity", 1)
      .style("display", "block");
    // TODO: Esto redibuja TODAS las relaciones
    // Hay que redibujar solo las de los objetos afectados:
    // El que se mueve, y los que se relacionan con el que se mueve.

    this.redraw();
    window.diagramCanvas.rearrange();
    window.diagramCanvas.redrawActiveRelations();
  }

  /**
   * Colapsa el elemento.
   * @returns {undefined}
   */
  collapse() {
    window.objectDispatcher.getAll().forEach(d => (d.__visible = null));
    d3.select(`#collapse_${this.id}`).attr(
      "xlink:href",
      require("@truedat/dl/svg/icons/collapse_down.svg")
    );
    if (this.contains) {
      this.expanded = false;
    }
    d3.select(`#child_${this.id}`)
      .attr("opacity", 0)
      .style("display", "none");
    this.redraw();
    window.diagramCanvas.rearrange();
    // FIXME: Esto redibuja TODAS las relaciones
    // Hay que redibujar solo las de los objetos afectados:
    // El que se mueve, y los que se relacionan con el que se mueve.
    window.diagramCanvas.redrawActiveRelations();
  }
}

export default Resource;
