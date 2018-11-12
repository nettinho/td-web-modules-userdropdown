import * as d3 from "d3";
import globalConf from "../conf/globalConf";
import { CanvasObject } from "./CanvasObject";
/**
 * Hijo de CanvasObject, representa los nodos que cuelgan directamente del DiagramCanvas
 */
export class Group extends CanvasObject {
  /**
   * Constructor del group
   * Recibe los datos del json, del que toma su título, id, etc
   * @constructor
   * @param {Object} info - El objeto, tal y como se recibe del json que devuelve la api
   */
  constructor(info) {
    super(info);
    // Los nombres de los campos están en la configuración para no tener que matarse cuando cambien.
    this.typeObject = "group";
    this.elementGap = globalConf.groups.elementGap;
    this.textOffset = globalConf.groups.textX;
    this.offset = globalConf.groups.offsetY;
    this.baseHeight = globalConf.groups.baseHeight;
    this.positionY = globalConf.groups.yPos;
    this.positionX = globalConf.groups.XPos;
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
    this.expanded = false;

    d3.select(`#doc_${this.id}`).attr("opacity", 0);

    this.childGroup.attr("opacity", 0).style("display", "none");

    d3.select(`#r_${this.id}`).attr("height", this.baseHeight);
    d3.select(`#r_${this.id}`).attr("width", this.width);
    d3.select(`#t_${this.id}`).attr(
      "clip-path",
      `url(#clip_${this.width - (this.contains.length > 0 ? 40 : 0)})`
    );
    d3.select(`#sep_${this.id}`).attr("x2", this.width);
    // TODO: Esto redibuja TODAS las relaciones
    // Hay que redibujar solo las de los objetos afectados:
    // El que se mueve, y los que se relacionan con el que se mueve.
    window.diagramCanvas.rearrange();
    window.diagramCanvas.redrawActiveRelations();
  }

  /**
   * Expande el elemento.
   * @returns {undefined}
   */
  expand() {
    window.objectDispatcher.getAll().forEach(d => (d.__visible = null));
    d3.select(`#collapse_${this.id}`).attr(
      "xlink:href",
      require("@truedat/dl/svg/icons/collapse_up.svg")
    );
    // No he cambiado el opacity del elemento doc_ porque de momento no quiero que se muestre

    this.expanded = true;
    if (this.contains) {
      if (this.childGroup) {
        // Solo mostramos.
        // TODO: Deberíamos hacer método show y llamar a él sin más-
        this.childGroup.attr("opacity", 1).style("display", "block");
        d3.select(`#r_${this.id}`).attr("height", this.height);
        d3.select(`#r_${this.id}`).attr("width", this.width);
        d3.select(`#sep_${this.id}`).attr("x2", this.width);
        d3.select(`#t_${this.id}`).attr(
          "clip-path",
          `url(#clip_${this.width - (this.contains.length > 0 ? 40 : 0)})`
        );
        window.diagramCanvas.rearrange();
        window.diagramCanvas.redrawActiveRelations();
      }
    }
  }
}

export default Group;
