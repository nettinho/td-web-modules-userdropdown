import * as d3 from "d3";
import globalConf from "../conf/globalConf";
/*
 * Relation cuelga de cada CanvasObject, de la coleccion objetos relations, cuyo índice el el destino de la relacion
 * Trata todo lo relativo a las flechas de las relaciones
*/
export class Relation {
  /**
   * Constructor del Relation
   * Recibe los nodos de origen y destino.
   * @constructor
   * @param {CanvasObject} origen - El objeto del que parte la relacion.
   * @param {CanvasObject} destino - El objeto relacionado, contenido en el depends del origen.
   */
  constructor(origen, destino) {
    this.id = `relation_${origen.id}_${destino.id}`;
    // Volvemos al rollo de siempre.
    // AL pasarlo como argumento, es una copia o una referencia?
    // Mirar a ver para ver si es necesario pasar solo el núnero
    this.origen = origen;
    this.destino = destino;
    this.spaceFromHome = parseInt(Math.random() * 50, 10) + 5;
    this.altura = parseInt(Math.random() * 40, 10) + 20;
    this.visibleCache = "";
    this.__path = [];
  }

  /**
   * Devuelve el array de coordendadas que conforman los puntos de la flecha.
   * @return {(Object|Array)} Devuelve la colección de objetos que necesita el objeto path de d3. He aquí una buena guía: https://www.dashingd3js.com/svg-paths-and-d3js Lo que se contiene en la variable lineData del ejemplo es lo que devuelve elte método.
   */
  get path() {
    // TODO: cachear
    const pos = this.determinePos();
    const direccion = pos.origen.x < pos.destino.x ? 1 : -1;
    // Simplemente, estar en la misma coordendada X
    // Se puede complicar más, pero con esto basta.
    const inTheSameColumn =
      this.origen.firstVisibleParent.getPos().x ===
      this.destino.firstVisibleParent.getPos().x;
    const closeEnough =
      globalConf.groups.fixedWidth > Math.abs(pos.origen.x - pos.destino.x) &&
      globalConf.groups.fixedWidth < Math.abs(pos.origen.y - pos.destino.y);
    const neighbour =
      this.origen.isNeighbour(this.destino) ||
      (globalConf.groups.fixedWidth > Math.abs(pos.origen.x - pos.destino.x) &&
        globalConf.groups.fixedWidth > Math.abs(pos.origen.y - pos.destino.y));

    // Si son vecinos, la flecha es directa
    if (inTheSameColumn) {
      return this.__sameColumnPath(pos, direccion);
    }

    if (closeEnough) {
      // Si la distancia de X entre origen y destino es menor que el anchoBase
      return this.__closeEnoughPath(pos, direccion);
    }

    if (neighbour) {
      return this.__neighbourPath(pos, direccion);
    }

    return this.__bracketPath(pos, direccion);
  }

  /**
   * Auxiliar de get path; devuelve los puntos en caso de que los elementos relacionados estén en la misma columna.
   * @param {Object} pos - Las coordenadas X e Y de origen y destino, siendo estos las del primer padre visible de cada objeto.
   * @param {Int} direccion - 1 o -1, dependiende de si la flecha va a la izquierda o a la derecha.
   * @return {(Object|Array)} Devuelve la colección de objetos que necesita el objeto path de d3.
   */
  __sameColumnPath(pos) {
    const points = [];
    points.push({ x: pos.origen.x, y: pos.origen.y });
    points.push({ x: pos.origen.x - this.spaceFromHome, y: pos.origen.y });
    points.push({
      x: pos.destino.x - this.destino.width - this.spaceFromHome,
      y: pos.destino.y
    });
    points.push({ x: pos.destino.x - this.destino.width, y: pos.destino.y });
    return points;
  }

  /**
   * Auxiliar de get path; devuelve los puntos en caso de que los elementos estén tan cercanos que sea posible relacionarlos con una flecha directa.
   * @param {Object} pos - Las coordenadas X e Y de origen y destino, siendo estos las del primer padre visible de cada objeto.
   * @param {Int} direccion - 1 o -1, dependiende de si la flecha va a la izquierda o a la derecha.
   * @return {(Object|Array)} Devuelve la colección de objetos que necesita el objeto path de d3.
   */
  __closeEnoughPath(pos, direccion) {
    const points = [];
    if (direccion > 0) {
      // Hacia la izquierda
      points.push({ x: pos.origen.x, y: pos.origen.y });
      points.push({ x: pos.origen.x + this.spaceFromHome, y: pos.origen.y });
      points.push({ x: pos.origen.x + this.spaceFromHome, y: pos.destino.y });
      points.push({ x: pos.destino.x, y: pos.destino.y });
    } else {
      points.push({ x: pos.origen.x, y: pos.origen.y });
      points.push({
        x: pos.origen.x - this.spaceFromHome * 2,
        y: pos.origen.y
      });
      points.push({
        x: pos.origen.x - this.spaceFromHome * 2,
        y: pos.destino.y
      });
      points.push({ x: pos.destino.x, y: pos.destino.y });
    }
    return points;
  }

  /**
   * Auxiliar de get path; devuelve los puntos en caso de que los elementos sean contiguos el uno con el otro.
   * @param {Object} pos - Las coordenadas X e Y de origen y destino, siendo estos las del primer padre visible de cada objeto.
   * @param {Int} direccion - 1 o -1, dependiende de si la flecha va a la izquierda o a la derecha.
   * @return {(Object|Array)} Devuelve la colección de objetos que necesita el objeto path de d3.
   */
  __neighbourPath(pos, direccion) {
    // Es vecino
    const points = [];
    if (direccion > 0) {
      points.push({ x: pos.origen.x, y: pos.origen.y });
      points.push({ x: pos.destino.x, y: pos.destino.y });
    } else {
      points.push({ x: pos.origen.x, y: pos.origen.y });
      points.push({ x: pos.destino.x, y: pos.destino.y });
    }
    return points;
  }

  /**
   * Auxiliar de get path; devuelve los puntos en caso de que los elementos estén separados entre si por otros elementos. Es una flecha de tipo corchete.
   * @param {Object} pos - Las coordenadas X e Y de origen y destino, siendo estos las del primer padre visible de cada objeto.
   * @param {Int} direccion - 1 o -1, dependiende de si la flecha va a la izquierda o a la derecha.
   * @return {(Object|Array)} Devuelve la colección de objetos que necesita el objeto path de d3.
   */
  __bracketPath(pos, direccion) {
    // Todas las otras flechas, con forma de corchete [
    // Si no es vecino.
    const points = [];
    points.push({ x: pos.origen.x, y: pos.origen.y });
    points.push({
      x: pos.origen.x + this.spaceFromHome * direccion,
      y: pos.origen.y
    });
    const limits = this.__topLeftLimits(pos, direccion);
    points.push({
      x: pos.origen.x + this.spaceFromHome * direccion,
      y: limits.y
    });
    points.push({ x: limits.x, y: limits.y });
    points.push({ x: limits.x, y: pos.destino.y });
    points.push({ x: pos.destino.x, y: pos.destino.y });
    return points;
  }

  /**
   * Auxiliar de get __bracketPath; Calcula las coordenadas y e y que no se deben rebasar para no colisionar con otros elementos.
   * @param {Object} pos - Las coordenadas X e Y de origen y destino, siendo estos las del primer padre visible de cada objeto.
   * @param {Int} direccion - 1 o -1, dependiende de si la flecha va a la izquierda o a la derecha.
   * @return {(Object|Array)} Un objeto tal que {x: coordenadaX, y: coordenadaY}
   */
  __topLeftLimits(pos, direccion) {
    const origGroupCoords = this.origen.getPos();

    let newY = 0;
    // Si el destino está por debajo del origen

    const myHeight = this.origen.getPos().y - this.origen.group.getPos().y;
    const destinoPorDebajoOrigen = myHeight < this.origen.group.height / 2;
    if (destinoPorDebajoOrigen) {
      // Estoy por encima: debo salir por encima del grupo
      newY = this.origen.group.getPos().y - this.altura;
    } else {
      // Pillemos la mayor altura de las columnas intermedias y usémosla de base
      if (
        this.origen.parent &&
        this.destino.parent &&
        this.origen.parent.id === this.destino.parent.id
      ) {
        const origCol = this.origen.parent.layout.getColumnIndex(
          this.origen.id
        );
        const destCol = this.origen.parent.layout.getColumnIndex(
          this.destino.id
        );
        const columnHeights = this.origen.parent.layout.getColumnsHeight();
        const orig = origCol > destCol ? destCol : origCol;
        const dest = origCol > destCol ? origCol : destCol;
        let maxAlt = 0;
        for (let i = orig; i < dest; i++) {
          if (columnHeights[i] > maxAlt) {
            maxAlt = columnHeights[i];
          }
          if (i > 10000) break; // Always prevent infinite loop
        }
        newY =
          this.origen.group.getPos().y +
          maxAlt +
          this.altura / 2 +
          this.origen.parent.offset;
      } else {
        // Ok, puede ocurrir que los dos elementos estén en distintos grupos
        if (this.origen.group.id !== this.destino.group.id) {
          const origenH =
            this.origen.group.getPos().y + this.origen.group.height;
          const destinoH =
            this.destino.group.getPos().y + this.destino.group.height;
          newY = destinoH < origenH ? origenH : destinoH;
          newY += this.altura;
        } else {
          newY = origGroupCoords.y + this.altura;
        }
      }
    }

    // La flecha irá por debajo del grupo
    // También! Si estamos dentro de un layout de grupos, y en la columna hay más de un grupo
    // al plegarlo, hay que alargar la flecha en X tanto como largo sea el ancho de la columna.

    let newX = pos.destino.x - this.spaceFromHome * direccion;
    if (!this.origen.group.expanded && direccion > 0) {
      // Veamos si en mi columna hay otros que sí están expandidos.
      // Dame el layout del grupo
      const layout = window.diagramCanvas.layout;
      // Dime cual es mi columna
      const index = layout.getColumnIndex(this.origen.group.id);
      // ¿hay en esta columna alguno que no esté colapsado?
      const expanded =
        layout.columns[index].filter(
          d => window.objectDispatcher.get(d).expanded
        ).length > 0;
      if (expanded) {
        // Si es que si, el nuevo X va a ser la posición del grupo, más el ancho de la columna,
        const width = layout.getColumnsWidth()[index];
        newX = this.origen.group.getPos().x + width + this.spaceFromHome;
        newY = this.origen.group.getPos().y + this.origen.group.height / 2;
      }
    }
    return { x: newX, y: newY };
  }

  /**
   * Auxiliar de createLine; devuelve el objeto funcion para dibujar el path
   * @return {Object}
   */
  get lineFunction() {
    return d3
      .line()
      .x(d => d.x)
      .y(d => d.y);
  }

  /**
   * Dibuja la flecha, o la recoloca si ya existe.
   * @param {function} callback - Ya no se usa, pero es posible llamar a un callback al dibujar la flecha.
   * @param {Object} callbackArgs - Argumentos del callback
   * @return {undefined}
   */
  draw(callback, ...callbackArgs) {
    if (!document.getElementById(this.id)) {
      this.createLine(callback, callbackArgs);
    } else {
      this.moveLine();
    }
  }

  /**
   * Devuelve las coordenadas de los objetos de origen y destino, teniendo en cuenta el slot y que sea el primer padre visible-
   * @return {Object} Un objeto tal que {origen: {x: coordenadaX, y: coordenadaY}, destino:  {x: coordenadaX, y: coordenadaY}}
   */
  determinePos() {
    // El slot de origen tiene que pertenecer al padre.
    // Tiene que mirar respecto al destino (o los destinos)
    // ordenados de mayor a menor altura
    //
    // OK: aunque el origen y el destino de un objeto sea solo uno
    // Para mostrarlo se buscará el origen y destino del primer padre visible

    let startSlots = this.origen.startSlots.filter(
      d => d.id === this.destino.id
    );
    if (!startSlots || startSlots.length === 0) {
      this.origen.lastHash = "";
      startSlots = this.origen.startSlots.filter(d => d.id === this.destino.id);
    }
    let startSlot = startSlots[0].slot;
    // FIXME: A veces no lo pilla bien
    if (startSlot === 0) startSlot = this.origen.firstVisibleParent.height / 2;
    // FIXME: Si eres un grupo
    if (this.origen.firstVisibleParent.id !== this.origen.id)
      startSlot = this.origen.firstVisibleParent.height / 2;
    const posOrig = this.origen.firstVisibleParent.getPos();
    const posDest = this.destino.firstVisibleParent.getPos();

    let x1,
      x2 = null;
    if (posOrig.x < posDest.x) {
      // El origen está a la derecha
      x1 = posOrig.x + this.origen.firstVisibleParent.width;
      x2 = posDest.x;
    } else {
      x1 = posOrig.x;
      x2 = posDest.x + this.destino.firstVisibleParent.width;
    }
    return {
      origen: { x: x1, y: posOrig.y + startSlot }, // TODO: parametrizar altura elemento
      destino: {
        x: x2,
        y: posDest.y + this.destino.firstVisibleParent.height / 2
      }
    };
  }

  /**
   * Colorea la flechita si el diagramCanvas no está bloqueado al pasar el ratón por encima.
   * @return {undefined}
   */
  emphasize() {
    if (window.diagramCanvas.locked) return;
    // d3.select('#mainGroup').node().removeChild(this.lineElement.node())
    // d3.select('#mainGroup').node().appendChild(this.lineElement.node())
    this.lineElement.attr("stroke", globalConf.colours.relation.emphasized);
    if (globalConf.relations.direction === "right") {
      this.lineElement.attr("marker-end", "url(#arrowEndEm)");
    } else {
      this.lineElement.attr("marker-start", "url(#arrowStartEm)");
    }
    this.destino.emphasize();
  }

  /**
   * Devuelve a la flechita su color natural.
   * @return {undefined}
   */
  underemphasize() {
    if (window.diagramCanvas.locked) return;

    this.lineElement.attr("stroke", globalConf.colours.resource.stroke);
    if (globalConf.relations.direction === "right") {
      this.lineElement.attr("marker-end", "url(#arrowEnd)");
    } else {
      this.lineElement.attr("marker-start", "url(#arrowStart)");
    }
    this.destino.underemphasize();
  }

  /**
   * Crea la flechita en el documento.
   * @param {function} callback - Ya no se usa, pero es posible llamar a un callback al dibujar la flecha.
   * @param {Object} callbackArgs - Argumentos del callback
   * @return {undefined}
   */
  createLine(callback, callbackArgs) {
    this.lineElement = d3
      .select("#mainGroup")
      .append("path")
      .attr("id", this.id)
      .attr("d", this.lineFunction(this.path))
      .attr("stroke", globalConf.colours.resource.stroke)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("class", "arrow")
      .on("mouseover", () => this.emphasize())
      .on("mouseout", () => this.underemphasize());

    if (
      this.origen.firstVisibleParent.id === this.destino.firstVisibleParent.id
    ) {
      this.lineElement.attr("opacity", 0);
    }
    if (globalConf.relations.direction === "right") {
      this.lineElement.attr("marker-end", "url(#arrowEnd)");
    } else {
      this.lineElement.attr("marker-start", "url(#arrowStart)");
    }
    if (callback && typeof callback === "function") {
      callback(callbackArgs);
    }
  }

  /**
   * Mueve la flecha según las nuevas coordenadas
   * @return {undefined}
   */
  moveLine() {
    // Habría que cachear también, si cambia la visibiliad de los elementos.
    if (this.lineElement && !this.lineElement.empty()) {
      // Para saber si los hijos del origen y el destino están relacionados
      // Tenemos que buscar un destino que esté en el depends del origen
      // o un origen que esté en el depends del destino.
      // Si es así, no mostramos la flecha.
      const destinos = this.destino
        .getAllContains()
        .filter(d => d !== this.destino.id);
      const origenes = this.origen
        .getAllContains()
        .filter(d => d !== this.origen.id);
      const allDependsDestinos = new Set(
        destinos.reduce(
          (a, destino) =>
            a.concat(window.objectDispatcher.get(destino).getAllDepends()),
          []
        )
      );
      const allDependsOrigenes = new Set(
        origenes.reduce(
          (a, origen) =>
            a.concat(window.objectDispatcher.get(origen).getAllDepends()),
          []
        )
      );
      const hijosRelacionados =
        destinos.filter(d => allDependsOrigenes.has(d)).length !== 0 ||
        origenes.filter(d => allDependsDestinos.has(d)).length !== 0;
      if (
        this.origen.firstVisibleParent.id === this.destino.firstVisibleParent.id
      ) {
        // Si el primer elemento visible del origen y el destino son el mismo
        // Es que el objeto está plegado y que no necesitamos mostrar la flecha
        this.lineElement.attr("opacity", 0);
      } else if (hijosRelacionados) {
        // Si tengo algún hijo relacionado entre sí, no muestro la flecha
        this.lineElement.attr("opacity", 0);
      } else {
        this.lineElement
          .attr("d", this.lineFunction(this.path))
          .attr("opacity", 1);
      }
    }
  }
}

export default Relation;
