# Filosofía de desarrollo

## Propósito de la aplicación.

El propósito general es crear un diagrama de flujo que permita seguir la traza de una operación mediante nodos que contienen otros nodos, y que mantienen relaciones de "depende" entre ellas, representado mediante flechas direccionales.

**Ejemplo**:
![Diagrama](../../imgs/doc/diagrama.png "Diagrama")

Las cajas pueden plegarse, de manera que se vayan agrupando, y las flechas sigan apuntando correctamente a los destinos, desde la caja contenida dentro suyo.

Cuando el ratón se pasa por encima de un elemento, ese elemento, sus flechas, y todos los que están relacionados con él se iluminan (highlight). Este highlight se puede bloquear. Ahora mismo ese bloqueo se dispara pulsando sobre el elemento, pero es de suponer que el trigger del evento cambiará.

## Notas breves sobre la tecnología usada.

Se ha usado D3 como motor, para realizar el diagrama sobre SVG. Hay alguna cosa en JQuery. Sería una buena idea reducir la dependencia con JQuery, en las llamadas a Ajax, usando d3.defer o similar; y evitando así esta pequeña ensalada de librerías.

## Estructura de clases.

El diagrama se pinta sobre una clase, que representa el "Lienzo" SVG. Esta clase se llama **DiagramCanvas** y contiene la creación de los nodos principales, y algunos métodos que representan comportamientos generales, como el bloqueo del highlight. DiagramCanvas queda colgando, como un singleton, en **window.diagramCanvas**. Debería de haber una manera de inyectarlo en las clases sin contaminar el namespace global: eso queda para una refactorización posterior.

Otro elemento que queda flotando dentro de window es **globalConfig**, que es un objeto que contiene los colores y tamaños que deben de tener las cajas, junto con alguna nota sobre su funcionamiento. Algún tamaño queda hardcodeado por ahí: queda pendiente para una futura refactorización el inyectarlo en las otras clases de una manera más limpia.

Todo se pone en marcha activado por **Painter**, cuyo único método **draw()** hace la primera petición Ajax y pone las cosas en escena.

Los objetos, los nodos, quedan representados por la clase **CanvasObject**, siendo una clase abstracta que debe instanciarse como de dos tipos concretos: **Group** y **Resource**, siendo Group los grupos en el mayor nivel de la jerarquía (SAS VA y SAS BASE en el ejemplo de la imagen) y cualquier otro Resource (Todos los demás del ejemplo de la imagen superior: AA_Monitoring_V3, Sector Asset Allocation, etc. Todos.) Estos objetos tienen en su interior una colección llamada relations que contiene instancias de la clase **Relation**, que representan, pintan y manejan las flechas, y que tienen un origen (El CanvasObject del que sale la flecha) y un destino (el CanvasObject al que llega).

Todos los objetos DiagramCanvas se manejan desde una clase llamada **ObjectDispatcher**, que es la encargada de tenerlas indexadas para no tener que buscarlas continuamente en un array de elementos. Dos de sus métodos son particularmente útiles: get() al que se le pasa un uuid como argumento y getByName(). ObjectDispatcher cuelga también del namespace global en **window.objectDispatcher**. El método window.objectDispatcher.get(), que suele usarse continuamente, está metido por comodidad como el alias "**g()**", invocable desde el namespace global, aunque solo debe usarse así para depurar.

Por último, la clase **Layout** coloca, según una disposición en columnas, cada elemento dentro de su parent. Si se ve la imagen de ejemplo, SAS VA tiene un layout con tres columnas: la primera columna contiene dos CanvasObject (AA_Monigoring... y Informe Concentración...;), la segunda otros dos (La ruta y el histórico) y la tercera columna un único AanvasObject (la ruta de SASDATOS...)

A su vez, AA_Monitoring_V3 tiene una columna con un único elemento (Sector Asset Allocation) y Informe Concetración tiene otra única columna con otro único elemento (%PD).

El layout de columnas se decide con las siguientes reglas, especificadas en el método **build()** de la clase **Layout**:

1.  Se toman todos los elementos contenidos (en la propiedad contains del padre) y se busca aquellos que no estén en el depends de nadie.
2.  Si no hay ningun elemento que no esté relacionado con nadie, por referencias circulares, se toma el primero que pille.
3.  Se toma el primer elemento no relacionado con nadie y se pone en la columna 0, elemento 0.
4.  Se toman los elementos relacionados directamente con él y se colocan a su derecha.
5.  Se recorren esos elementos colocados a su derecha, y se buscan sus relaciones de depende. Se haberlas, se colocan a su vez a su derecha.
6.  Se repite el punto 5 recursivamente, hasta que no quedan más elementos que poner a la derecha.
7.  En caso de que aún queden elementos no asignados que colocar en las columnas, se coge uno cualquiera y se coloca en la columna 0, posición siguiente.
8.  Se repiten los pasos 4 y 5, pero relacionados con el nuevo elemento.
9.  Se repiten el paso 7, por cada elemento contenido en el padre que aún no se haya asignado a ningún elemento.

Para situar cada nodo en su sitio, cada CanvasObject tiene un getter de width y de height, y cada parent tiene un método rearrange que los coloca en su x e y a cada uno de sus hijos, en función . Quizá esta aproximación es erronea y haya que refactorizar.

Igualmente hay muchas llamadas de métodos de padres a hijos y de nuevo de los hijos a los padres que seguramente estén provocando problemas de rendimiento, que seguramente puedan arreglarse, haciendo una única llamada a todos los objetos del ObjectDispatcher.
