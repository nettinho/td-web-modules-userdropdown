/**
 * Clase responsable del layout de columnas que cada objeto tiene con sus hijos. Conforme a este layout pueden conocerse los tamaños de los elementos y sus posiciones.
 */
export class Layout {
  /**
   * Constructor del Layout
   * @constructor
   * @param {Object} owner - El objeto propietario del layout. Puede ser un CanvasObject o el DiagramCanvas. Sería ideal poder disponer de interfaces. Al no hacerlo, hay que recordar que DiagramCanvas también debe disponer de un contains.
   */
  constructor(owner) {
    this.columns = [];
    this.owner = owner;
    this.lastUsedHash = "";
    this.__columnIndex = [];
  }

  /**
   * Construye el layout. Las reglas son:
   * Si está relacionado por un depends, se coloca a la derecha del elemento.
   * Si no hay relación, se coloca debajo de la primera columna.
   * Como se puede imaginar, estas dos sencillas reglas son un liaco de puta madre en cuanto entran en juego referencias circulares, etc.
   * No devuelve nada, pero deja el layout en el array columns, que tiene una estructura como [[id1,id2,id3],[id4,id5],[id6,id7,id8,id10]]. Esto serían tres columnas, la primera con tres filas (id1,id2,id3), la segunda con dos (id4,id5) y la tecera columna con el resto de los ids hasta llegar al 10.
   * Ese array de columnas es el que configura toda la historia.
   * Antes de modificar, leer atentamente los comentarios.
   * @returns {undefined}
   */
  build() {
    // Solo construimos si el hash de los contains ha cambiado.
    // Hay varios métodos que llaman a buildLayout preventivamente, por si al
    // ir a consultar el columns no existe aún. Así cacheamos el columns
    if (this.hash !== this.lastUsedHash) {
      this.lastUsedHash = this.hash;
      if (!this.owner.contains || this.owner.contains.length === 0) {
        // Si no tenemos contains, tampoco tenemos que construir
        this.columns = [];
        return;
      }
      // Sacamos una copia de contains para poder modificarlo
      let contains = this.owner.contains.slice();
      // Saber el elemento de entrada es fundamental.
      // Lo necesitamos para colocarlo a la izquierda de todo.
      // Ese elemento de entrada es aquel que no es llamado por nadie. Puede haber varios que cumplan esa condición.

      // Tiramos de él, y luego dibujamos a la derecha o debajo
      // comprobando si el resto de los elementos están o no relacionados con él.
      // Ese elemento de entrada, es aquel del que ninguno depende.
      // Si hay referencias circulares, se coge el primer contains y se acabó
      let notCalledElements = contains.filter(d => d.pointsToMe.length === 0);
      // Si hay alguno, lo pillamos: si no, pillamos el primero que esté por ahí
      // Si no hay ninguno será, en general, por que hay una referencia circular entre los contains
      let firstRequestedObject = contains[0];
      if (notCalledElements.length > 0) {
        firstRequestedObject = notCalledElements.shift();
        // Lo eliminamos de notCalledElements. ¿Por qué? Por que luego seguiremod tirando de él.
      }
      // Inicializo mi layout
      this.columns = [[]];

      // Enchufo mi primer elmento en la primera posición de la coluna 0
      // Todo lo demás debería quedar debajo o a la derecha de él
      this.columns[0].push(firstRequestedObject.id);
      // Quitamos ese objeto del bucle para no caer en él al recorrerlo.
      let objIndex = contains.findIndex(d => d.id === firstRequestedObject.id);
      contains.splice(objIndex, 1)[0];

      // Ponemos un seguro para evitar bucles infinitos
      let seguro = contains.length * 2;
      // Mientras siga teniendo elementos en mi contains:
      while (contains.length !== 0 && seguro-- > 0) {
        // Voy a recorrer el layout de columnas, buscando elementos en el
        // contains que estén relacionados, para ponerlos a la derecha.
        // Si no encuentro elemntos relacionados, tendré que ponerlo en el
        // último elemento de la primera columna. Sabré si lo tengo que poner
        // debajo por que la longitud de contains no variará (por que no encontrará
        // relacionados. Por eso ahora me quedo con cuantos elementos tengo en el
        // contains.
        let startingNum = contains.length;
        for (
          let columnIndex = 0;
          columnIndex < this.columns.length;
          columnIndex++
        ) {
          for (
            let rowIndex = 0;
            rowIndex < this.columns[columnIndex].length;
            rowIndex++
          ) {
            // Busco para cada elemento los que pudieran estar relacionados
            let related = contains.filter(containedElement =>
              objectDispatcher
                .get(this.columns[columnIndex][rowIndex])
                .isRelatedWith(containedElement)
            );
            // ¿Tengo related? Los coloco a la derecha, es decir: en el rowIndex actual + 1
            if (related && related.length > 0) {
              // Si, esto modifica la longitud del array dentro del bucle for.
              // Pero no pasa nada: esta es mi moto y yo controlo.
              let nextIndex = columnIndex + 1;
              if (typeof this.columns[nextIndex] === "undefined") {
                this.columns[nextIndex] = [];
              }
              related.forEach(relatedObject => {
                this.columns[nextIndex].push(relatedObject.id);
                objIndex = contains.findIndex(d => d.id === relatedObject.id);
                // FUNDAMENTAL borrar el elemento del contains según entra en
                // this.columns. De otra manera, habrá duplicidades cuando encontremos
                // referencias circulares.
                contains.splice(objIndex, 1);
              });
            }
          }
        }
        if (startingNum === contains.length && contains.length > 0) {
          // Si después de la iteración, no se ha modificado la longitud de contains
          // PERO sigue quedando algún elemento dentro de contains
          // es por que el siguiente elemento
          // debe situarse debajo del último elemento de la primera columna.
          let nextElement = null;
          if (notCalledElements.length > 0) {
            nextElement = notCalledElements.shift().id;
            objIndex = contains.findIndex(d => d.id === nextElement);
            contains.splice(objIndex, 1);
          } else {
            nextElement = contains.shift().id;
          }
          this.columns[0].push(nextElement);
        }
        // Y vuelta a empezar (mientras queden contains)
      }
    }
  }

  /**
   * Devuelve los anchos de las columnas:
   * @returns {(Int|Array)} Devuelve un array tal que [anchoColumna1,anchoColumna2,anchoColumna3]
   */
  getColumnsWidth() {
    let widths = [];
    this.columns.forEach((d, index) => {
      let max = 0;
      d.forEach(i => {
        let obj = window.objectDispatcher.get(i);
        if (obj.width > max) max = obj.width;
      });
      widths[index] = max;
    });
    return widths;
  }

  /**
   * Devuelve los altos de las columnas:
   * @returns {(Int|Array)} Devuelve un array tal que [altoColumna1,altoColumna2,altoColumna3]
   */
  getColumnsHeight() {
    let heights = [];
    this.columns.forEach((d, index) => {
      heights[index] = this.getColumnHeigth(index);
    });
    return heights;
  }
  /**
   * Devuelve el índice a que pertenece un objeto dentro del layout de columnas. Inspecciona los contains de los elementos en toda su profundidad, de manera que es posible preguntarle al layout del diagramCanvas en qué columna está cualquiera de sus elementos.
   * @param {Int} id - El uuid del objeto sobre el que se pregunta.
   * @returns {Int} El índice de la columna en la que está este objeto.
   */
  getColumnIndex(id) {
    if (
      window.objectDispatcher.hash === this.lastUsedHash &&
      typeof this.__columnIndex[id] !== "undefined"
    ) {
      return this.__columnIndex[id];
    }
    this.lastHash = window.objectDispatcher.hash;
    this.__columnIndex[id] = (() => {
      for (let index = 0; index < this.columns.length; index++) {
        for (let record of this.columns[index]) {
          if (parseInt(record) === parseInt(id)) {
            return index;
          }
          let element = window.objectDispatcher.get(record);
          if (element.getAllContains().includes(id)) {
            return index;
          }
        }
      }
      return -1;
    })();
    return this.__columnIndex[id];
  }

  /**
   * Crea un HASH para el cacheo de los objetos.
   * @returns {String} El Hash es el de todos los elementos contenidos por el owner. Si cambia, es necesario recalcular el diagrama de columnas.
   */
  get hash() {
    return this.owner
      .getAllContains()
      .sort()
      .join("_");
  }

  /**
   * Devuelve el alto de una columna.
   * @param {Int} index - El indice de esa columna dentro del layout.
   * @returns {Int} El alto de una columna.
   */
  getColumnHeigth(index) {
    return (
      this.columns[index]
        .map(d => window.objectDispatcher.get(d))
        .reduce((a, b) => {
          return { height: a.height + b.height };
        }).height +
      this.columns[index].length * this.owner.elementGap
    );
  }
}

export default Layout;
