import { axios } from "@truedat/core/services/api";
import globalConf from "../conf/globalConf";
import { Group } from "./Group.js";
import { Resource } from "./Resource.js";

/**
 * Clase que mantiene el índice de los objetos cargados en memoria, el encargado de manejarlos.
 */
export class ObjectDispatcher {
  /**
   * Constructor del Layout
   * @constructor
   * @param {(Object|Array)} data - Recibe la lista json que devuelve la api, para convertirla en elementos dentro del índice.
   */
  constructor(data) {
    this.index = {};
    this.data = [];
    this.dataScrapping(data);
    this.registerElements();
    this.lastAncertors = [];
    this.requestedObjects = [];
    // Para memoizar los métodos de las clases necesito saber si el modelo ha cambiado
    // El object dispatcher lleva la cuenta de este modelo, y es a él a quien hay que
    // preguntar por este hash.
    this.hash = "";
    this.calculatehash();
    // Alias for debugging
    window.g = d => this.get(d);
  }

  /**
   * Calcula el hash para la caché de las funciones.
   * @return {undefined}
   */
  calculatehash() {
    this.hash = this.getIds()
      .sort()
      .join("_");
  }

  /**
   * Registra nuevos elementos dentro del índice general.
   * @return {undefined}
   */
  registerElements() {
    const topLevelElements = this.topLevelElements;
    for (const element of this.data) {
      let object = this.get(element.id);
      if (typeof object === "undefined") {
        // Deberíamos de tener un método mejor de determinar quien es el grupo
        // Mirar, como en topelement, quien no está contenido por nadie
        // Pero creo que en este punto, esa lista de elementos no la tenemos aún.
        if (topLevelElements.indexOf(element.id) !== -1) {
          object = new Group(element);
        } else {
          object = new Resource(element);
        }
        this.register(object);
      } else {
        object.contains = element.contains;
        object.depends = element.depends;
      }
    }
    // Debo quedarme con los contains antiguos si existen
    // Y además añadir los nuevos que me puedan venir
    for (const i in this.index) {
      if (!this.index[i].contains) {
        this.index[i].contains = [];
      }
      for (const j in this.index[i].contains) {
        this.index[i].contains[j] = this.get(this.index[i].contains[j]);
        this.index[i].contains[j].parent = this.index[i];
        // Y asignamos el parent
      }
    }
  }

  /**
   * Convierte los elementos del json recibidos por el Api en objetos Group y Resource asociados al DiagramCanvas.
   * @return {undefined}
   */
  dataScrapping(data) {
    let element = data.pop();
    while (element) {
      const index = this.data.findIndex(d => d.uuid === element.uuid);
      if (index !== -1) {
        for (const i in element) {
          if (i !== "id") {
            this.data[index][i] = element[i];
          }
        }
      } else {
        element.id = element.uuid;
        this.data.push(element);
      }
      element = data.pop();
    }
    data = null; // Libero memoria
  }

  /**
   * Busca en el índice de objetos por título.
   * @return {CanvasObject}
   */
  getByName(name) {
    const results = this.data.filter(d => d.name === name);
    if (results && results.length > 0) {
      return this.get(results[0].id);
    }
    return null;
  }

  /**
   * Devuelve la lista de todos los elementos en memoria.
   * @return {(CanvasObject|Array)}
   */
  getAll() {
    return Object.values(this.index);
  }

  /**
   * Devuelve la lista de Ids
   * @return {(Int|Array)}
   */
  getIds() {
    return Object.keys(this.index);
  }

  /**
   * REVISAR: está repetida en CanvasObject, y no sé si se usa.
   * Devuelve aquellos elementos que dependen del objeto pasado como argumento.
   * @param {Object} object Objeto por el que se pregunta.
   * @return {undefined}
   */
  getDependsOn(object) {
    // Me da igual que me pasen el objeto o el id
    // Así no me lío con los depends
    object = this.get(object);
    // ¿Cuales son los objetos tienen "depende" que me apuntan?
    return this.data.filter(d => d.depends.includes(object.id)).map(d => d.id);
  }

  /**
   * REVISAR: Creo que no se usa.
   * Devuelve los objetos que tienen relaciones con otros.
   * @return {(Object|Array)} Lista de objetos con relaciones
   */
  getActiveRelationObjects() {
    return this.getAll().filter(d => Object.values(d.relations).length > 0);
  }

  /**
   * Método FUNDAMENTAL. Siempre que se acuda a un contains, a un depends, o a cualquier otra cosa, muchas veces, no sabemos si el resultado de una funcion es un objeto o un uuid. Hay que pasarlo por window.objectDispatcher.get(elemento) y así estamos seguros de que, sea lo que sea, tenemos el elemento correcto dentro del índice del object dispatcher; y podemos trabajar con él sin crear duplicados. Hay un alias en el namespace global llamado "g". Es perferible no usarlo más que para propósitos de debug-
   * @param {Object} id Un uuid o un objeto.
   * @return {Object} El objeto dentro del índice del objectDispatcher
   */
  get(id) {
    if (id.id && (id instanceof Resource || id instanceof Group)) {
      // Pero... ¡me ha pasado el mismo objeto que busca!
      // ¡¡será merluzo!!
      // Hala, pa tí
      return id;
    }
    if (this.index[id]) {
      return this.index[id];
    }
  }

  /**
   * Reconstruye el índice con el nuevo data. Eso implica que si la info cambia (vienen nuevos depends o contains, o cambia el depth) actualiza los viejos objetos con la nueva información.
   * @param {data} data Lista de elemetos que viene del json de la api.
   * @return {undefined}
   */
  rebuild(data) {
    // Ok, si me varían los contains o los depends, y crecen,
    // debo añadir los nuevos elementos, y nunca, nunca, borrar los antiguos
    for (const index in data) {
      const oldObj = this.get(data[index].uuid);
      const relations = ["contains", "depends"];
      for (const relationType of relations) {
        if (oldObj && oldObj[relationType] && data[index][relationType]) {
          const oldRelations = oldObj[relationType].map(
            d => (isNaN(parseInt(d)) ? d.id : d)
          );
          const newRelations = [
            ...new Set(data[index][relationType].concat(oldRelations))
          ];
          data[index][relationType] = newRelations;
        }
      }
    }
    this.dataScrapping(data);
    this.registerElements();
    window.diagramCanvas.draw();
    window.objectDispatcher.groups.forEach(d => d.drawChilds());
    for (const i in this.index) {
      this.index[i].buildLayout(true);
      this.index[i].rearrange();
    }
  }

  /**
   * Devuelve los objetos que cuelgan del diagramCanvas. Los grupos, los que engloban a todos los demas.
   * @return {(Object|Array)}
   */
  get topLevelElements() {
    // Aquel que no está contenido por nadie
    const allContains = [
      ...new Set(
        this.data
          .reduce((a, b) => {
            let aContains = [];
            if (typeof a.contains !== "undefined" && a.contains.length) {
              aContains = a.contains;
            }
            let bContains = [];
            if (typeof b.contains !== "undefined" && b.contains.length) {
              bContains = b.contains;
            }
            return { contains: aContains.concat(bContains) };
          })
          .contains.map(
            d => (typeof d !== "undefined" && !isNaN(d.id) ? d.id : d)
          )
      )
    ];
    const allIds = [
      ...new Set(
        this.data.map(
          d => (typeof d !== "undefined" && !isNaN(d.id) ? d.id : d)
        )
      )
    ];
    return allIds.filter(d => allContains.indexOf(d) === -1);
  }

  /**
   * Devuelve los grupos que cuelgan del diagramCanvas. Revisar donde se usan, por que es equivalente a topLevelElements, y depende de ella.
   * @return {(Object|Array)}
   */
  get groups() {
    return Object.values(this.index).filter(d => d.toplevel);
  }

  /**
   * Integra un objeto dentro del índice del objectDispatcher
   * @param {Object} object Objeto que quiere integrarse.
   * @return {undefined}
   */
  register(object) {
    if (object.length) {
      for (const trueObject of object) {
        if (!this.index[trueObject.id]) {
          this.index[trueObject.id] = trueObject;
        } else {
          // TODO: Pero si ya existe, puede que se esté actualizando!
        }
      }
    } else if (object.id) {
      this.index[object.id] = object;
    }
  }
}

export default ObjectDispatcher;
