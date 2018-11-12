/**
 * Padre de Group y de Resource, tiene sus métodos comunes.
 * Representa cada cajita en el diagrama.
 * Esa cajita debe de ser instanciada como Group cuando dependa directamente del
 * DiagramCanvas, y como Resources cuando dependa de otro CanvasObject.
 * Estoy hablando de dependencias, como incluidos dentro de un contains.
 */
import * as d3 from "d3";

import globalConf from "../conf/globalConf";
import { Layout } from "./Layout.js";
import { Relation } from "./Relation.js";
import { Group } from "./Group.js";

export class CanvasObject {
  /**
   * Constructor del CanvasObject. ¡Es abstracta! todas las instancias de CanvasObject
   * deben ser en realidad instancias de Resource o de Group
   * @constructor
   * @param {int} id - uuid del objeto recivido por el json y manejado por ObjectDispatcher.
   */
  constructor(info) {
    // ¡Abstracta!
    if (this.constructor === CanvasObject) {
      throw new TypeError(
        "Abstract class 'CanvasObject' cannot be instantiated directly."
      );
    }
    this.id = info[globalConf.fieldNames.id];
    this.name = info[globalConf.fieldNames.name];
    this.type = info[globalConf.fieldNames.type];
    this.contains = info[globalConf.fieldNames.contains];
    this.depends = info[globalConf.fieldNames.depends];
    this.depth = info[globalConf.fieldNames.depth];
    this.external_id = info[globalConf.fieldNames.external_id];
    this.relations = {};
    this.lateralOffset = globalConf.sizes.childMarginLeft;
    this.nodeSpacing = globalConf.sizes.nodeSpacing;
    this.horizontalGap = globalConf.sizes.horizontalGap;
    this.myLevel = info[globalConf.fieldNames.myLevel];
    this.emphasized = false;
    this.positionX = null;
    this.expanded = false;
    this.typeObject = null;
    // El hash me sirve para memoizar resultados de funciones
    // TODO: esta memoizacion es bastante cutre. Tratar de hacer como en el ejemplo:
    // https://elabismodenull.wordpress.com/2017/02/20/programacion-funcional-en-javascript-la-memoizacion/
    // Esto implica dejar de usar getters!
    this.lastHash = null;
    this.__existingDepends = null;
    this.__pointsToMe = null;
    this.__firstCommonAncestor = {};
    this.__parents = null;
    this.__dependsOnMe = null;
    this.__allDepends = null;
    this.__calculatedDepth = null;
    this.__allContains = null;
    this.__relatedWith = {};
    this.__neighbour = {};
    this.__toplevel = null;
    this.__visible = null;
    this.layout = new Layout(this);
    this.__startSlots = null;
    this.__relationCacheHash = null;
  }
  /**
   * Debe de ser implementada por los hijos.
   * @returns {undefined}
   */
  draw() {
    console.log("implement me!");
  }

  /**
   * Ilumina el elemento. No confundir con emphasize. Se usa cuando se entra al canvas, con los elementos que se han llamado y por los cuales se entra.
   * @returns {undefined}
   */
  highlight() {
    this.rect
      .attr("fill", globalConf.colours.group.highlightFill)
      .attr("stroke", globalConf.colours.group.highlightStroke);
  }

  /**
   * Provee de un null safe equals para el CanvasObject (Por eso es estática)
   * @param {CanvasObject} a - Primer término de la comparación.
   * @param {CanvasObject} b - Segundo término de la comparación.
   * @returns {Boolean} True si son el mismo objeto (tienen el mismo uuid) o si ambos son null
   */
  static equals(a, b) {
    const aid = a ? a.id : -1;
    const bid = b ? b.id : -1;
    return aid === bid;
  }

  /**
   * Devuelve, dentro del canvas, la posición X e Y.
   * Es importante notar que lo hace respecto al elemento mainGroup, y esto es importante para
   * conservar el Zoom
   * @returns {Object} Un objeto con propiedades x e y que representan las coordenadas del elemento.
   */
  getPos() {
    // Cuidado con hacer un getter con x e y:
    // D3 se hace la polla un lío
    if (!this.parent) {
      return { x: this.positionX, y: this.positionY };
    }
    let elem = document.getElementById(`r_${this.id}`);
    let seguro = 1000;
    const res = { x: 0, y: 0 };
    while (elem != null && elem.id !== "mainGroup" && seguro-- > 0) {
      const d3elem = d3.select(`#${elem.id}`);
      res.x += d3elem.attr("x") ? parseInt(d3elem.attr("x")) : 0;
      res.y += d3elem.attr("y") ? parseInt(d3elem.attr("y")) : 0;
      if (d3elem.attr("transform") != null) {
        const translation = d3elem
          .attr("transform")
          .match(/translate\s?\((\d+)[(,|\s)]\s?(\d+)\)/);
        if (translation && translation.length > 0) {
          res.x += parseInt(translation[1]);
          res.y += parseInt(translation[2]);
        }
      }
      elem = elem.parentNode;
    }
    return res;
  }

  /**
   * Busca en el objectDispatcher los últimos elementos, aquellos que no tienen más depends, y los pone en rojo.
   * Adicionalmente pone en verde aquellos de tipo operación. Queda por hacer parametrizar los colores en el globalConfig.
   * @returns {undefined}
   */
  colorLastAncestor() {
    // TODO: parametrizar colores
    this.objectDispatcher.lastAncertors.forEach(d => {
      d3.select(`#r_${d}`).attr("fill", "#D99");
    });
    this.objectDispatcher
      .getAll()
      .filter(d => d.type === "OPERACION")
      .forEach(d => {
        d3.select(`#r_${d.id}`).attr("fill", "#9D9");
      });
  }

  /**
   * Devuelve el ObjectDispatcher que se encuentra en window.ObjectDispatcher.
   * El ObjectDispatcher debería de estar inyectado, en vez de en un singelton colgando de window. Habría que enfocar esto de otro modo.
   * @returns {ObjectDispatcher} devuelve el ObjectDispatcher que cuelga de window.
   */
  get objectDispatcher() {
    // TODO: buscar una manera de inyectar
    return window.objectDispatcher;
  }

  /**
   * Devuelve la lista de depends que reamente existen en el documento. Ocurre que a veces la api devuelve los elementos 1,2 y 3, por ejemplo, pero en sus
   * depends aparece también el 5 y el y, que aún no tenemos. existingDepends solo te da los objetos que realmente tenemos en el objectDispatcher
   * @returns {(number|Array)} lista de uuids realmente existentes.
   */
  get existingDepends() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__existingDepends != null
    ) {
      return this.__existingDepends;
    }
    // Devuelve solo aquellos depends cuyo ID ya existe en el documento
    // (and thus se pueden dibujar)
    // Sin llamar a la API
    this.__existingDepends = this.depends.filter(d => {
      const id = d.id ? d.id : d;
      return this.objectDispatcher
        .getIds()
        .map(d => parseInt(d))
        .includes(id);
    });
    this.lastHash = this.objectDispatcher.hash;
    return this.__existingDepends;
  }

  /**
   * Como se comenta en existingDepends, a veces el api devuelve depends de objetos que no están aún en el objectDispatcher.
   * Esto dibuja solo las relaciones de los elementos existentes dentro del objectDispatcher
   * Esta function se diferencia del redraw por que crea el objeto Relation y lo mete la colección relations del objeto.
   * @returns {undefined} True si son el mismo objeto (tienen el mismo uuid) o si ambos son null
   */
  drawExistingRelations() {
    for (const i of this.existingDepends) {
      if (!this.relations[i]) {
        this.relations[i] = new Relation(this, this.objectDispatcher.get(i));
        if (!this.parents.includes(i)) {
          this.relations[i].draw();
        }
      }
    }
  }

  /**
   * Devuelve aquellos de los contains que están expandidos.
   * @returns {(Resource|Array)}
   */
  get expandedChilds() {
    return this.contains.filter(d => d.expanded);
  }

  /**
   * Redibuja las relaciones existentes dentro del objectDispatcher, sin crear el objeto Relation,
   * si no recorriéndolo. Necesario cuando los objetos cambian de lugar en el diagrama (cuando aparecen
   * más elementos por que se piden por ajax, o cuando se pliegan o despliegan elementos)
   * @returns {undefined}
   */
  redrawExistingRelations() {
    for (const i in this.relations) {
      if (!this.parents.includes(i)) {
        this.relations[i].draw();
      }
    }
  }

  /**
   * Devuelve la lista de uuids que apuntan hacia mi, o hacia mis contains (descendiendo hasta cualquier nivel),
   * bien de los objetos de mi padre (hasta el primer nivel) o, si estoy en un grupo, de todos los elementos del objectDispatcher
   * @returns {(CanvasObject|Array)} Objetos cuyos depends apuntan hacia mi o mis hijos
   */
  // Debe devolver cual de los contains (que no soy yo) apunta hacia mi o
  // tiene hijos que apuntan a mi o a mis hijos
  get pointsToMe() {
    // FIXME: No funciona!
    // debe de pillar los elementos que sean firstVisibleParents
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__pointsToMe != null
    ) {
      return this.__pointsToMe;
    }

    const inspectedObjects = this.parent
      ? this.parent.contains
      : this.objectDispatcher.getAll();
    const id = this.id;
    const exceptions = [id].concat(this.getAllContains()); // Ni yo ni nadie de los que tengo dentro!
    this.__pointsToMe = inspectedObjects.filter(inspected => {
      // ¿Soy yo mismo?
      if (exceptions.indexOf(inspected.id) !== -1) {
        return false;
      }
      // Está relacionado con alguno de los inspected?
      if (typeof inspected.relations[id] !== "undefined") {
        return true;
      }
      // ¿Alguno de mis hijos está relacionado?
      for (const contained of this.getAllContains()) {
        if (
          !contained &&
          typeof this.objectDispatcher(contained).relations[id] !== "undefined"
        ) {
          return true;
        }
      }

      // ¿Alguno de mis hijos está relacionado con alguno de sus hijos?
      for (const depending of inspected.getAllDepends()) {
        for (const contained of this.getAllContains()) {
          if (depending === contained) {
            return true;
          }
        }
      }

      // Nada que hacer
      return false;
    });
    this.lastHash = this.objectDispatcher.hash;
    return this.__pointsToMe;
  }

  /**
   * Las flechas que salen hacia otras cajas deben salir de puntos distintos en la coordenada y: de otra manera, al salir
   * todas del mismo punto, son desordenadas y confusas. Esta función da un sumatorio para esa coordenada Y, de tal manera
   * que pueda aplicarse ese sumatorio a la posición de la flecha al dibujarse.
   * Es necesario tener en cuenta:
   * 1.- Que la flecha puede estar a izquierda o a derecha.
   * 2.- Que la flecha debe de salir de más arriba cuanto más arriba esté el destino, para que no se cruce con las otras flechas.
   * se llama starSlots por que señala la flecha que sale, y el incremento Y desde el origen: aún sería necesario hacer lo mismo en el destino.
   * @returns {(Object|Array)} Los objetos devueltos tienen las propiedades y, id, y slot. El slot es en realidad el sumatorio, y el id se usa para filtrar el elemento.
   */
  get startSlots() {
    const relationCacheHash = Object.values(this.relations)
      .map(d => {
        const pos = d.destino.getPos();
        return `${pos.x}_${pos.y}`;
      })
      .join("_");
    if (
      this.__relationCacheHash === relationCacheHash &&
      this.__startSlots != null
    ) {
      return this.__startSlots;
    }
    this.__relationCacheHash = relationCacheHash;
    // Hay que hacer Izquierda y derecha!
    const calculate = relations => {
      const destinations = relations
        .map(d => ({ y: d.destino.getPos().y, id: d.destino.id }))
        .sort((a, b) => (b.y < a.y ? 1 : -1));
      const offset = parseInt(this.height / destinations.length, 10) / 2;
      for (let i = 0; i < destinations.length; i++) {
        destinations[i].slot =
          parseInt((i / destinations.length) * this.height, 10) + offset;
      }
      return destinations;
    };
    const left = Object.values(this.relations).filter(
      d => d.origen.getPos().x < d.destino.getPos().x
    );
    const right = Object.values(this.relations).filter(
      d => d.origen.getPos().x >= d.destino.getPos().x
    );
    this.__startSlots = calculate(left).concat(calculate(right));
    if (this.debug) console.log(left, right, this.__startSlots);
    return this.__startSlots;
  }

  /**
   * Dice si el elemento es visible o no.
   * @returns {Boolean} False si yo, o alguno de mis padres, tiene opacity a 0
   */
  get visible() {
    // Si alguno de mis padres tiene opacity a 0
    if (this.__visible !== null) {
      return this.__visible;
    }
    this.__visible = (() => {
      if (this.rect) {
        let element = this.rect.node();
        // Si llamamos al getAttribute en vez de usar d3, vamos mazo más rápido.
        while (element && element.nodeName !== "svg") {
          try {
            if (parseInt(element.getAttribute("opacity"), 10) === 0)
              return false;
          } catch (e) {
            console.log(e, element);
            break;
          }
          element = element.parentNode;
        }
      }
      return true;
    })();
    return this.__visible;
  }

  /**
   * Devuelve el primero de mis padres, o yo mismo, que es visible. Se usa MOGOLLÓN.
   * @returns {CanvasObject}
   */
  get firstVisibleParent() {
    if (this.visible) return this;
    if (!this.parent) return this;
    return this.parent.firstVisibleParent;
  }

  /**
   * Me da el id del rect que representa el cuadradito físico en el SVG, para manipularlo luego con d3. Va sin almohadilla.
   * @returns {String} Siempre va a ser r_ y el id del elemento.
   */
  get rectId() {
    return `r_${this.id}`;
  }

  /**
   * Devuelve el objeto d3 del rectángulo físico en el SVG, para poder manipularlo
   * @returns {Object} Objeto para poder manipularlo directamente.
   */
  get rect() {
    if (document.getElementById(this.rectId)) {
      return d3.select(`#${this.rectId}`);
    }
    return null;
  }

  /**
   * Me dice si dos objetos están contigüos; para dibujar una flecha sin articulaciones.
   * Hay que arreglarla, no fuciona demasiado bien. (por ejemplo, si los objetos tienen distintos padres)
   * @param {CanvasObject} canvasObj - Objeto del que se desea saber si es contiguo.
   * @returns {Boolean} True si están en columnas contiguas.
   */
  isNeighbour(canvasObj) {
    // ¿Cuando es mi vecino?
    const co = this.objectDispatcher.get(canvasObj);
    // Cuando tenemos el mismo padre, y estamos en columnas consecutivas
    if (
      co.parent &&
      this.parent &&
      this.parent.id === co.parent.id &&
      Math.abs(
        this.parent.layout.getColumnIndex(this.id) -
          co.parent.layout.getColumnIndex(co.id)
      ) === 1
    ) {
      return true;
    }
    return false;
  }

  /**
   * Dados dos CanvasObject, devuelve el primer ancestro común de entre sus padres.
   * @param {CanvasObject} canvasObj - Objeto del que se quiere sacar el primer ancestro común.
   * @returns {CanvasObject} Primer ancestro común de los dos objetos, por los que, navegando entre sus contains, se llega a los dos.
   */
  getFirstCommonAncestor(canvasObj) {
    let elem = this.objectDispatcher.get(canvasObj);
    if (
      this.objectDispatcher.hash === this.lastHash &&
      typeof this.__firstCommonAncestor[elem.id] !== "undefined"
    ) {
      return this.__firstCommonAncestor[elem.id];
    }
    this.lastHash = this.objectDispatcher.hash;
    const parents = this.parents;
    let seguro = 1000;
    this.__firstCommonAncestor[elem.id] = null;
    while (elem && seguro-- > 0) {
      if (elem.parent && parents.includes(elem.parent.id)) {
        this.__firstCommonAncestor[elem.id] = elem.parent.id;
        break;
      }
      elem = elem.parent;
    }
    return this.__firstCommonAncestor[elem.id];
  }

  /**
   * Me devuelve la lista de todos mis padres, incluyéndome a mi.
   * @returns {(Int|Array)} Lista de uuids
   */
  get parents() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__parents !== null
    ) {
      return this.__parents;
    }
    this.lastHash = this.objectDispatcher.hash;
    let elem = this;
    const ids = [];
    let seguro = 1000;
    while (elem && seguro-- > 0) {
      ids.push(elem.id);
      elem = elem.parent;
    }
    this.__parents = ids;
    return this.__parents;
  }

  /**
   * emphasize es el método que, al pasar el ratón por encima, ilumina las cajitas y las flechas. No confundir con highlight, que ilumina la caja sólo cuando se entra a través de ella en el diagrama (es decir, si se pide el elemento 1234, ese queda highligted: pero si pasas el ratón por encima del 8765, ese queda emphasized).
   * @returns {undefined}
   */
  emphasize() {
    if (window.diagramCanvas.locked) return;
    if (
      typeof this.relations !== "undefined" &&
      !this.emphasized &&
      this.visible
    ) {
      // TODO: Mantener el color si se ha pedido el elemento.
      this.emphasized = true;
      if (
        d3
          .select(`#r_${this.id}`)
          .attr("fill")
          .toLowerCase() === globalConf.colours.resource.fill.toLowerCase()
      ) {
        d3.select(`#r_${this.id}`).attr(
          "fill",
          globalConf.colours.resource.highlightFill
        );
        d3.select(`#r_${this.id}`).attr(
          "stroke",
          globalConf.colours.resource.highlightStroke
        );
      }
      for (const i in this.relations) {
        this.relations[i].emphasize();
      }
    }

    if (d3.event.type === "mouseover") {
      d3.event.stopPropagation();
    }
  }

  /**
   * Le quita el enfatizado (ver emphasize)
   * @returns {undefined}
   */
  underemphasize() {
    if (window.diagramCanvas.locked) return;
    if (
      typeof this.relations !== "undefined" &&
      this.visible &&
      this.emphasized
    ) {
      this.emphasized = false;
      if (
        d3
          .select(`#r_${this.id}`)
          .attr("fill")
          .toLowerCase() ===
        globalConf.colours.resource.highlightFill.toLowerCase()
      ) {
        d3.select(`#r_${this.id}`).attr(
          "fill",
          globalConf.colours.resource.fill
        );
        d3.select(`#r_${this.id}`).attr(
          "stroke",
          globalConf.colours.resource.stroke
        );
      }
      for (const i in this.relations) {
        this.relations[i].underemphasize();
      }
      if (
        this.objectDispatcher.requestedObjects.map(d => d.id).includes(this.id)
      ) {
        this.highlight();
      }
    }
  }

  /**
   * Dibuja todos sus contains, crea los elementos svg y asocia los eventos.
   * @returns {undefined}
   */
  drawChilds() {
    // Los childs son siempre resources.
    // Sin embargo, está en CanvasObject por que
    // puede también ser llamado por Group
    // Creamos dinámicamente los resources si no existen aún en el documento.
    this.expanded = true;
    if (this.contains && this.contains.length > 0) {
      d3.select(`#n_${this.id}`)
        .selectAll("g")
        .data([])
        .exit()
        .remove();
      this.childGroup = d3
        .selectAll(`#n_${this.id}`)
        .append("g")
        .attr("id", `child_${this.id}`)
        .selectAll("g")
        .data(this.contains)
        .enter()
        .append("g")
        .on("mouseover", d => d.emphasize())
        .on("mouseout", d => d.underemphasize());

      this.childGroup.attr("opacity", 0).attr("id", d => `n_${d.id}`);

      this.childGroup.attr("opacity", 1);

      this.recuadros = this.childGroup
        .attr("transform", (val, index) => {
          // Una posibilidad más limpia quizá sería
          // preguntar al elemento superior dónde está colocado, cual es su alto
          // y el gap necesario
          const y =
            index * (this.baseHeight + this.elementGap * 2) + val.offset;
          const ret = `translate(${globalConf.sizes.childMarginLeft},${y})`;
          return ret;
        })
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("id", d => `r_${d.id}`)
        .attr("width", d => d.width)
        .attr("height", d => d.baseHeight)
        .attr("rx", 5)
        .attr("fill", globalConf.colours.resource.fill)
        .attr("stroke", globalConf.colours.resource.stroke)
        .attr("stroke-width", 2)
        .on("click", d => {
          window.diagramCanvas.lock(d.id);
        });

      this.childGroup
        .append("text")
        .text(d => (d.name ? d.name : "Name not found"))
        .attr("id", d => `t_${d.id}`)
        // 25 es por el tamaño del nuevo icono
        // 25 más dependiendo de si el elemento es de tipo tabla
        .attr("x", d => d.textOffset + (d.contains.length > 0 ? 15 : 0) + 25)
        .attr("y", 17)
        .attr("fill", "#343434")
        .attr("font-family", "sans-serif;")
        .attr(
          "clip-path",
          d =>
            `url(#clip_${d.width -
              d.elementGap * 2 -
              (d.contains.length > 0 ? 20 : 0)})`
        )
        .on("mousemove", d => {
          if (d.visible) {
            window.diagramCanvas.tooltip.show();
            window.diagramCanvas.tooltip.text = d.name
              ? d.name
              : "Name not found";
          }
        })
        .on("mouseout", () => {
          window.diagramCanvas.tooltip.hide();
        })
        .on("click", d => {
          window.diagramCanvas.lock(d.id);
        });

      this.childGroup
        .append("image")
        .attr("xlink:href", require("@truedat/dl/svg/icons/collapse_up.svg"))
        .attr("id", d => `collapse_${d.id}`)
        .attr("width", 20)
        .attr("height", 20)
        .attr("opacity", d => (d.contains.length > 0 ? 0.6 : 0))
        .style("display", d => (d.contains.length > 0 ? "block" : "none"))
        .attr("transform", () => "translate(2,2)")
        .style("cursor", d => (d.contains.length > 0 ? "pointer" : "auto"))
        .on("click", d => {
          // La imagen hay que cambiarla en el propio switch
          d.switchExpandCollapse();
        });

      this.childGroup
        .append("foreignObject")
        .attr("width", 23)
        .attr("height", 23)
        .attr(
          "transform",
          d => `translate(${d.contains.length > 0 ? "25" : "10"},2)`
        )
        .html(d => `<i class="${d.type} icon" style="display: inline;"></i>`);

      this.contains.forEach(d => {
        d.drawChilds();
        d.drawExistingRelations();
        if (
          this.objectDispatcher.requestedObjects.map(d => d.id).includes(d.id)
        ) {
          d.highlight();
        }
      });

      this.redraw();
    }
    this.objectDispatcher.groups.forEach(d => d.colorLastAncestor());
  }

  /**
   * Expande o comprime el elemento según su estado.
   * @returns {undefined}
   */
  switchExpandCollapse() {
    if (!this.expanded) {
      this.expand();
    } else {
      this.collapse();
    }
    d3.select(`#exp_${this.id}`).attr("fill", !this.expanded ? "#88f" : "#00F");
  }

  /**
   * Clon de pointsToMe, pero no mira jerarquía de clases. Pienso que una de las dos puede que sobre. Refactorizar y quedarse con la más rápida.
   * @returns {(CanvasObject|Array)}
   */
  get dependsOnMe() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__dependsOnMe != null
    ) {
      return this.__dependsOnMe;
    }
    this.lastHash = this.objectDispatcher.hash;
    this.__dependsOnMe = this.objectDispatcher
      .getDependsOn(this.id)
      .map(d => this.objectDispatcher.get(d));
    return this.__dependsOnMe;
  }

  /**
   * Lista de todos los depends, incluyendo los depends de mis hijos.
   * @returns {(Int|Array)} Lista de uuids
   */
  // Devuelve los depends míos y de mis hijos
  getAllDepends() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__allDepends != null
    ) {
      return this.__allDepends;
    }
    this.lastHash = this.objectDispatcher.hash;
    let ret = this.depends;
    this.contains.forEach(element => {
      ret = ret.concat(element.getAllDepends());
    });
    this.__allDepends = [...new Set(ret)];
    return this.__allDepends;
  }

  /**
   * Devuelve la lista de todos los contains del elemento, incluyendo a todos sus hijos.
   * @returns {(Int|Array)} Lista de uuids
   */
  // Devuelve los contains míos y de mis hijos
  getAllContains() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__allContains != null
    ) {
      return this.__allContains;
    }
    this.lastHash = this.objectDispatcher.hash;
    let ret = this.contains.map(d => d.id);
    ret.push(this.id);
    this.contains.forEach(element => {
      ret = ret.concat(element.getAllContains());
    });
    this.__allContains = [...new Set(ret)];
    return this.__allContains;
  }

  /**
   * Devuelve true si el objeto sobre el que se invoca depende (él o sus hijos) del objeto que se pasa como argumento. Util para construir el layout:
   * Un objeto se coloca a la derecha SI depende del objeto a la izquierda es decir: izquierda.isRelatedWith(derecha)
   * @param {int} id - uuid del Objeto sobre el que se realiza la pregunta
   * @returns {Boolean} True si el objeto sobre el que se invoca depende del pasado como argumento o de sus hijos
   */
  isRelatedWith(id) {
    id = this.objectDispatcher.get(id).id;
    if (
      this.objectDispatcher.hash === this.lastHash &&
      typeof this.__relatedWith[id] !== "undefined"
    ) {
      return this.__relatedWith[id];
    }
    this.lastHash = this.objectDispatcher.hash;
    const allMyRelations = this.getAllDepends();
    const allTargetObjects = this.objectDispatcher.get(id).getAllContains();
    const sourceRelations = new Set(allMyRelations);
    const targetElements = new Set(allTargetObjects);
    const intersection = [...sourceRelations].filter(x =>
      targetElements.has(x)
    );
    this.__relatedWith[id] = intersection.length > 0;
    return this.__relatedWith[id];
  }

  /**
   * Devuelve el grupo a que pertenece un objeto.
   * @returns {Gruop}
   */
  get group() {
    if (this.objectDispatcher.hash === this.lastHash && this.__group != null) {
      return this.__group;
    }
    this.lastHash = this.objectDispatcher.hash;
    let element = this;
    this.__group = null;
    while (element) {
      if (element instanceof Group) {
        this.__group = element;
        return element;
      }
      element = element.parent;
    }
    return null;
  }

  /**
   * Devuelve true si el padre del objeto es el CanvasObject (o dicho de otra manera, no tiene padre)
   * @returns {Boolean}
   */
  get toplevel() {
    if (
      this.objectDispatcher.hash === this.lastHash &&
      this.__toplevel != null
    ) {
      return this.__toplevel;
    }
    this.lastHash = this.objectDispatcher.hash;
    this.__toplevel =
      this.objectDispatcher.topLevelElements.indexOf(this.id) !== -1;
    return this.__toplevel;
  }

  /**
   * Recoloca todos mis hijos de acuerdo al layout de columnas, y de cuales estén desplegadas y cuales no. Mazo importante.
   * Para colocar un elemento, hay que hacerlo en este método. Aún estoy pensando que esto quizá sea equivocado, que cada elemnto
   * debería de saber cual es su pocición X e Y (getPos te da la posicion real, no la que debería de tener), y que en funcion a eso,
   * el rearrange se haría solo: bastaría ponerlo en el redraw para que se colocase correctamente, igual que se calcula el width y height.
   * Ahora mismo, no es así, es el padre el que determina dónde se ponen sus hijos. Insisto en que quizá esto sea erroneo.
   * Es importante que esta parte, que es de las más complicadas, sea coherente: o cuando se recolocan los elementos se hace en este método
   * o se implementa como comento más arriba; pero este es uno de los puntos más cŕíticos y complicados de la aplicación, y guarrear aquí puede
   * tener resultados desastrosos en el mantenimiento a largo plazo del proyecto.
   * @returns {undefined}
   */
  rearrange() {
    // Coloca los objetos en el canvas, dependiendo del layout de columnas
    // Me pregunto si no es preferible que cada elmento tenga un X e Y que calcule
    // cada elmento sea responsable de saber dónde debe de encontrarse.
    // Ojo, lo que muevo son los grupos que contienen todo (caja, texto, etc)

    if (this.contains && this.contains.length > 0) {
      const columnsWidth = this.layout.getColumnsWidth();
      try {
        this.layout.build();
        let leftMargin = 0;
        for (
          let colIndex = 0;
          colIndex < this.layout.columns.length;
          colIndex++
        ) {
          let lastElementYPosition = this.offset + this.elementGap;
          const column = this.layout.columns[colIndex];
          if (colIndex > 0) {
            leftMargin += columnsWidth[colIndex - 1];
          }
          for (const row of column) {
            const element = window.objectDispatcher.get(row);
            const elemId = `#n_${element.id}`;
            // OK: no es el width: es el width del elemento más ancho de la columna anterior.
            const x =
              this.lateralOffset +
              (leftMargin + this.nodeSpacing * parseInt(colIndex)); // <- Incluso esto está mal: debería usarse el translate del objeto.
            d3.select(elemId).attr(
              "transform",
              `translate (${x}, ${lastElementYPosition})`
            );
            window.diagramCanvas.redrawActiveRelations();
            lastElementYPosition += element.height + this.elementGap;
          }
        }
        // Recursiva hacia abajo!
        // Seguramente haya que controlar esto para mejorar rendimiento. Quizá el que los rearrange deba ser el CanvasObject. Repensar.
        for (const containedElements of this.contains) {
          containedElements.rearrange();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  /**
   * Si el depth no viene en el nodo, lo calcula. Ojo: si viene mal no lo hace, y da lugar a fallos de visualización difíciles de depurar.
   * @returns {Int} Profundidad del elemento respecto a sus contains.
   */
  calculateDepth() {
    // Solo lo uso si no tengo la info en el array de entrada.
    if (this.objectDispatcher.hash === this.lastHash && this.__depth != null) {
      return this.__depth;
    }
    this.lastHash = this.objectDispatcher.hash;

    if (!this.parent) {
      this.__depth = 0;
    } else {
      this.__depth = 1 + this.parent.calculateDepth();
    }
    return this.__depth;
  }

  /**
   * Mueve físicamente el elemento a unas coordenadas X e Y.
   * @param {int} x - Coordinada horizontal.
   * @param {int} y - Coordinada vertical.
   * @returns {undefined}
   */
  translate(x, y) {
    const elemId = `#n_${this.id}`;
    d3.select(elemId).attr("transform", `translate (${x}, ${y})`);
  }

  /**
   * Devulve el total de elementos contenidos, incuyendo sus hijos, que están expandidos.
   * @returns {(CanvasObject|Array)} True si son el mismo objeto (tienen el mismo uuid) o si ambos son null
   */
  getTotalExpandedElements() {
    if (this.expanded) {
      return this.contains.reduce(
        (inicial, actual) =>
          inicial + (actual.expanded ? actual.getTotalExpandedElements() : 0),
        this.contains.length
      );
    }
    return 0;
  }

  /**
   * Da y calcula el ancho del elemento: no el real, si no el que debe de tener conforme a los elementos desplegados que contiene.
   * @returns {int}
   */
  get width() {
    // ¿Quizá podamos cachear?
    if (
      !this.contains ||
      this.contains.length === 0 ||
      this.getMaxVisibleElements() === 0
    ) {
      const depth = isNaN(this.depth) ? this.calculateDepth() : this.depth;
      const basicWidth =
        globalConf.groups.fixedWidth -
        (globalConf.sizes.childMarginLeft + globalConf.sizes.childMarginRight) *
          depth;
      return basicWidth;
    } else {
      // Tenemos que pillar el número de sus columnas
      // De cada columna, el más ancho de sus elementos
      // Sumar los anchos
      // Multiplicar el spacing por el número de columnas - 1
      // Si no tiene contienes, entonces se devuelve el fixedWith con el cálculo del depth
      // Por si no lo está ya.
      this.layout.build();
      let width = globalConf.sizes.childMarginLeft;
      for (const column of this.layout.columns) {
        const increment = column.reduce((actual, siguiente) => {
          siguiente = this.objectDispatcher.get(siguiente);
          return actual <= siguiente.width ? siguiente.width : actual;
        }, 0);
        width += increment;
      }
      width += this.nodeSpacing * (this.layout.columns.length - 1);
      width += globalConf.sizes.childMarginRight;
      return width;
    }
  }

  /**
   * Devuelve, de las columnas del layout,
   * la que más elementos expandidos tiene
   * Incluyendo los elementos expandidos que haya en ella
   * para calcular el ancho
   * @returns {int}
   */
  getMaxVisibleElements() {
    this.layout.build();
    if (this.visible) {
      const byColumns = [0];
      for (const column of this.layout.columns) {
        const expandedElements = column.filter(
          d => this.objectDispatcher.get(d).visible
        );
        // Hay que devolver estos, más los elementos expandidos de ellos.
        let totalExpanded = expandedElements.length;
        for (const element of expandedElements) {
          totalExpanded += this.objectDispatcher
            .get(element)
            .getMaxVisibleElements();
        }
        byColumns.push(totalExpanded);
      }
      return d3.max(byColumns);
    }
    return 0;
  }

  /**
   * Da y calcula el alto del elemento: no el real, si no el que debe de tener conforme al numero de elementos, desplegados y anidados, que contiene.
   * @returns {int}
   */
  get height() {
    // Pillamos la columna con más elementos visibles
    // La recorremos y vamos sumando el height de cada uno de sus elementos.
    // Más los márgenes adecuados.
    // Si no tienes contains, pues devuelces el altoBase.
    if (!this.visible) {
      return 0;
    }
    if (!this.layout.columns || this.layout.columns.length === 0) {
      return this.baseHeight;
    }
    // Encontrar la columna con más elementos visibles
    let longestColumn = 0;
    let maxColumnSize = 0;
    for (let i = 0; i < this.layout.columns.length; i++) {
      let columnHeight = 0;
      for (let j = 0; j < this.layout.columns[i].length; j++) {
        columnHeight += window.objectDispatcher.get(this.layout.columns[i][j])
          .height;
      }
      if (maxColumnSize < columnHeight) {
        maxColumnSize = columnHeight;
        longestColumn = i;
      }
    }
    let sum = 0;
    if (maxColumnSize !== 0) {
      // De otra manera, el elemento está plegado
      sum =
        this.layout.columns[longestColumn].length * this.elementGap +
        maxColumnSize;
    }
    return this.baseHeight + sum + this.elementGap;
  }

  /**
   * Ilumina el elemento si se entra por él al Canvas (ver emphasize). Deben implementarlo los hijos.
   * @returns {null}
   */
  static highlight() {
    console.log("implement me!");
    return null;
  }

  /**
   * Redibuja el elemento, ya existente en el documento, adaptando su alto y ancho, según su alto y ancho. Se le llama al expandirse y contraerse.
   * Ojo: es recursivo... ¡hacia arriba! redimensiona el padre, que es el que deberá de cambiar de tamaño si se pliega o despliega algo.
   * @returns {undefined}
   */
  redraw() {
    if (this.rect) {
      try {
        this.rect.attr("height", this.height).attr("width", this.width);
        d3.select(`#t_${this.id}`).attr(
          "clip-path",
          `url(#clip_${this.width - (this.contains.length > 0 ? 40 : 0)})`
        );
        d3.select(`#sep_${this.id}`).attr("x2", this.width);
        if (this.parent) {
          this.parent.redraw();
        }
        this.rearrange();
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default CanvasObject;
