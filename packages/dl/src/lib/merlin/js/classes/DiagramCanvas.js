import * as d3 from "d3";
import globalConf from "../conf/globalConf";

import { Layout } from "./Layout.js";
import { Tooltip } from "./Tooltip.js";

/**
 * DiagramCanvas es el objecto sobre el que se representa todo el diagrama, el lienzo SVG en el que se pintan las cajas y las flechas.
 * En general sus métodos representan acciones que, o bien afectan a todos los nodos, o bien deben de propagarse desde él a los grupos.
 * Permanece en un singelton: window.diagramCanvas, al que se accede ocasionalmente para comprobar si está bloqueando el highlight de
 * los objetos, o para consultar el layout
 */
export class DiagramCanvas {
  /**
   * Constructor del Diagram Canvas. El alto y el ancho actualmente se especifican a través de CSS
   * Se mantienen las propiedades para poder hacer pruebas en los test.
   * @constructor
   * @param {int} width - Ancho del canvas.
   * @param {int} height - Alto del canvas.
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.posX = 0;
    this.posY = 0;
    this.__groups = [];
    this.zoom = null;
    this.layout = new Layout(this);
    this.locked = false;
    this.locking_id = null;
    this.typeObject = "diagramCanvas";
  }

  /**
   * Bloquea el realtado (método highlight de CanvasObject) en uno de los elementos del diagrama, junto con
   * todos sus flechas y depends, de manera que no lo pierda cuando el ratón se quite de encima suyo.
   * Si se le vuelve a llamar, con el mismo id del elemento que produjo el bloqueo, se produce un desbloqueo,
   * y el resto de los elementos pueden volver a tener highlight cuando el ratón pase por encima de ellos.
   * @param {int} id - El id del elemento que provoca el bloqueo.
   * @returns {undefined}
   */
  lock(id) {
    if (this.locked) {
      if (id === this.locking_id) {
        this.locked = false;
      }
    } else {
      this.locked = true;
      this.locking_id = id;
    }
  }

  /**
   * Desbloquea el highligt sobre el elemento bloqueado, y lo quita, para que vuelva activarse nuevamente con los eventos
   * mouseover y mouseout.
   * @returns {undefined}
   */
  unlock() {
    this.locked = false;
    window.objectDispatcher.get(this.locking_id).underemphasize();
    this.locking_id = null;
  }

  /**
   * getter del objectDispatcher. A pesar de estar en el namespace, desde el interior de la clase es preferible
   * usarlo como si estuviese inyectado de algún modo. Sería bueno encontrar una solución a esto, que no queda muy limpio.
   * @returns {Object}
   */
  get objectDispatcher() {
    return window.objectDispatcher;
  }

  /**
   * Comportamiento para el mousemove (en realidad, mover el tooltip si es visible).
   * @param {Event} event - El evento disparado.
   * @returns {undefined}
   */
  mousemove() {
    const coordinates = d3.mouse(
      document.getElementById("container").getElementsByTagName("svg")[0]
    );
    this.tooltip.draw(coordinates[0] + 10, coordinates[1] - 10);
  }

  /**
   * Redibuja las relaciones. Llamar si la posición de los nodos cambia en el canvas.
   * @returns {undefined}
   */
  redrawActiveRelations() {
    // FIXME: "Active", "Existing", "Visible", "Expanded"...
    // ¿En qué coño quedamos? Deberíamos tener una convención concreta para todo esto.
    const objects = this.objectDispatcher.getActiveRelationObjects();
    for (const object of objects) {
      object.redrawExistingRelations();
    }
  }

  /**
   * Devuelve un array con todos los objetos del objectDispatcher.
   * Hecho para que pueda tener una interfaz similar a CanvasObject.
   * Como ES6 no tiene interfaces, es difícil explicitarlo de otro modo.
   * @returns {(Int|Array)}
   */
  getAllContains() {
    return this.objectDispatcher.getAll().map(d => d.id);
  }

  /**
   * Devuelve los grupos de primer nivel.
   * @returns {(Int|Array)}
   */
  get contains() {
    return this.objectDispatcher.groups;
  }

  /**
   * Dibuja el canvas (SVG) y los objetos que hay en él (llamando al draw de sus grupos).
   * Asocia comportamientos.
   * Crea el tooltip.
   * @returns {undefined}
   */
  draw() {
    // TODO:
    // No borrar el svg, para no quitar el elemento de la transformacion
    // Copillarse, en realidad, todo su contenido.

    d3.select("#container")
      .selectAll("svg")
      .remove();

    d3.select("#container")
      .append("svg")
      .attr("id", "mySvgElem")
      .on(
        "mousemove",
        d =>
          typeof window.diagramCanvas.mousemove === "function"
            ? window.diagramCanvas.mousemove(d)
            : null
      )
      .attr("width", this.width)
      .attr("height", this.height)
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "#f7f7f7");

    this.mainGroup = d3
      .select("#container")
      .select("svg")
      .append("g")
      .attr("id", "mainGroup");
    if (typeof this.transformInfo !== "undefined") {
      d3.select("#mainGroup").attr("transform", this.transformInfo);
    }
    d3.select("#container")
      .select("svg")
      .call(
        d3.zoom().on("zoom", () => {
          this.transformInfo = d3.event.transform;
          d3.select("#mainGroup").attr("transform", d3.event.transform);
        })
      );
    d3.select("#container")
      .select("svg")
      .on("dblclick.zoom", null);
    // Son flechas para las relaciones.

    const defs = d3
      .select("#container")
      .select("svg")
      .append("defs");
    defs
      .append("marker")
      .attr("id", "arrowStart")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", globalConf.colours.relation.underemphasized)
      .attr("d", "M10,-5L10,5L0,0")
      .attr("class", "arrowHead");

    defs
      .append("marker")
      .attr("id", "arrowStartEm")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", globalConf.colours.relation.emphasized)
      .attr("d", "M10,-5L10,5L0,0")
      .attr("class", "arrowHead");

    defs
      .append("marker")
      .attr("id", "arrowEnd")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", globalConf.colours.relation.underemphasized)
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead");

    defs
      .append("marker")
      .attr("id", "arrowEndEm")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", globalConf.colours.relation.emphasized)
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead");
    const filter = defs
      .append("filter")
      .attr("id", "shadow")
      .attr("x", "0")
      .attr("y", "0")
      .attr("width", "200%")
      .attr("height", "200%");
    filter
      .append("feOffset")
      .attr("result", "offOut")
      .attr("in", "SourceGraphic")
      .attr("dx", 20)
      .attr("dy", 20);
    filter
      .append("feColorMatrix")
      .attr("result", "matrixOut")
      .attr("in", "offOut")
      .attr("type", "matrix")
      .attr("values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0");
    filter
      .append("feGaussianBlur")
      .attr("result", "blurOut")
      .attr("in", "matrixOut")
      .attr("stdDeviation", "10");
    filter
      .append("feBlend")
      .attr("in", "SourceGraphic")
      .attr("in2", "blurOut")
      .attr("mode", "normal");
    // Clipping de los textos.
    const maxWidth = globalConf.groups.fixedWidth * 10;
    const widths = [];
    let currentWidth = maxWidth;
    while (currentWidth > 0) {
      widths.push(currentWidth);
      currentWidth -=
        globalConf.sizes.childMarginLeft + globalConf.sizes.childMarginRight;
    }
    d3.select("#container")
      .select("svg")
      .selectAll("clipPath")
      .data(widths)
      .enter()
      .append("clipPath")
      .attr("id", d => `clip_${d}`)
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", d => d)
      .attr("height", globalConf.sizes.resource.baseHeight);

    this.drawGroups();
    this.objectDispatcher.groups.forEach(d => d.drawChilds());
    this.tooltip = new Tooltip();
  }

  /**
   * El conjunto de objetos puede mostrar relaciones que no existen aún.
   * (por que alguno de sus términos no se haya mandado aún por json)
   * Esto afecta sólo a los que están efectivamente en el documento.
   * @returns {undefined}
   */
  drawExistingRelations() {
    for (const i in this.index) {
      this.get(i).drawExistingRelations();
    }
  }

  /**
   * Limpia la info para cargar nuevos elementos en el canvas.
   * @returns {undefined}
   */
  clear() {
    this.__groups = [];
  }

  /**
   * Recoloca recursivamente los elementos del canvas, partiendo de los grupos.
   * @returns {undefined}
   */
  rearrange() {
    // BUF!
    // Estoy tratando este objeto como un canvasObject.
    // Quizá debería de serlo? ¿O de tener al menos un interfaz con los métodos necesarios?

    // TODO: establecer correctamente la posicion de los grupos
    // O quizá ignorarla y tratarla siempre con el rearrange

    this.layout.build();
    const width = document
      .getElementsByTagName("body")[0]
      .getBoundingClientRect().width;
    const objectsWidth =
      this.layout.getColumnsWidth().reduce((a, b) => a + b) +
      100 * (this.layout.columns.length - 1);
    let currentXCoordinate = width / 2 - objectsWidth / 2;
    let currentYCoordinate = globalConf.groups.yPos;
    currentXCoordinate = 300; // TODO: parametrizar, que parece que no llega bien
    const widths = this.layout.getColumnsWidth();
    for (let i = 0; i < this.layout.columns.length; i++) {
      currentYCoordinate = globalConf.groups.yPos;
      const column = this.layout.columns[i];
      // TODO: controlar el rearrange
      if (i > 0) {
        currentXCoordinate += widths[i - 1] + 100;
      }
      for (let j = 0; j < column.length; j++) {
        if (j > 0) {
          currentYCoordinate +=
            this.objectDispatcher.get(column[j - 1]).height + 100;
        }
        this.objectDispatcher.get(column[j]).positionX = currentXCoordinate;
        this.objectDispatcher.get(column[j]).positionY = currentYCoordinate;
        this.objectDispatcher
          .get(column[j])
          .translate(currentXCoordinate, currentYCoordinate);
      }
    }
  }

  /**
   * Dibuja los grupos en el canvas, y asocia los comportamientos necesarios.
   * @returns {undefined}
   */
  drawGroups() {
    // Esto se resolvería maravillosamente con variables estáticas.
    // Algo como Group.groups y DiagramCanvas.mainGroup
    this.diagramGroups = window.diagramCanvas.mainGroup
      .selectAll("g")
      .data(this.objectDispatcher.groups)
      .enter()
      .append("g")
      .attr("id", val => `n_${val.id}`);

    this.diagramGroups
      .append("rect")
      .attr("id", val => `r_${val.id}`)
      .attr("rx", globalConf.groups.rx)
      .attr("ry", globalConf.groups.ry)
      .attr("stroke", globalConf.colours.group.stroke)
      .attr("stroke-width", 1)
      .attr("width", d => d.width)
      .attr("height", 50)
      .attr("fill", globalConf.colours.group.fill)
      .attr("filter", "url(#shadow)");

    this.diagramGroups
      .append("image")
      .attr("xlink:href", require("@truedat/dl/svg/icons/collapse_up.svg"))
      .attr("id", d => `collapse_${d.id}`)
      .attr("width", 20)
      .attr("height", 20)
      .attr("opacity", 0.6)
      .attr("transform", () => "translate(0,5)")
      .style("cursor", "pointer")
      .on("click", d => {
        d3.select(`#collapse_${d.id}`).attr(
          "xlink:href",
          d.expanded
            ? require("@truedat/dl/svg/icons/collapse_down.svg")
            : require("@truedat/dl/svg/icons/collapse_up.svg")
        );
        if (d.expanded) d.collapse();
        else d.expand();
      });

    this.diagramGroups
      .append("foreignObject")
      .attr("width", 23)
      .attr("height", 23)
      .attr("transform", d => "translate(23, 5)")
      .html(
        d =>
          `<i aria-hidden="true" class="${
            d.type
          } icon" style="display: inline;"></i>`
      );

    this.diagramGroups
      .append("line")
      .attr("id", d => `sep_${d.id}`)
      .attr("x1", 0)
      .attr("y1", 30)
      .attr("x2", d => d.width)
      .attr("y2", 30)
      .attr("stroke", globalConf.colours.group.stroke);

    this.diagramGroups
      .append("text")
      .attr("opacity", 1)
      .attr("x", d => d.textOffset + 25)
      .style("font-weight", "bold")
      .attr("y", 21)
      .attr("fill", "#343494")
      .attr("font-family", "sans-serif;")
      .attr("id", d => `t_${d.id}`)
      .text(element => element.name)
      .on("mousedown", () => {
        window.diagramCanvas.tooltip.hide();
        window.clicked = true;
      })
      .on("mousemove", d => {
        window.clicked = false;
        if (d.visible) {
          window.diagramCanvas.tooltip.show();
          window.diagramCanvas.tooltip.text = d.name;
        }
      })
      .on("mouseout", () => {
        window.diagramCanvas.tooltip.hide();
      });
    this.rearrange();
  }
}

export default DiagramCanvas;
