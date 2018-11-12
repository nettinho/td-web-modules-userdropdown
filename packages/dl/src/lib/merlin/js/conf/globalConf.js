import { API_LINEAGE_GROUPS, API_LINEAGE_PATH } from "../../../../api";

const globalConf = {
  // Considerar mover este groups al grupo sizes
  // Mirar si se puede meter por css para interpolar las clases
  groups: {
    rx: 5,
    ry: 5,
    textX: 20,
    fixedWidth: 290,
    offsetY: 40,
    baseHeight: 45,
    elementGap: 20,
    yPos: 120,
    xPos: 300
  },

  fieldNames: {
    name: "name",
    tipo: "type",
    type: "type",
    external_id: "external_id",
    contains: "contains",
    depends: "depends",
    depth: "depth",
    id: "uuid",
    myLevel: "myLevel"
  },

  colours: {
    resource: {
      fill: "#d1def1",
      stroke: "#9faab8",
      highlightFill: "#F6AE47",
      highlightStroke: "#cf9d6b"
    },
    group: {
      fill: "#dae8fc",
      stroke: "#9faab8",
      highlightFill: "#ffcc99",
      highlightStroke: "#cf9d6b"
    },
    relation: {
      emphasized: "#F66503",
      underemphasized: "#9faab8"
    }
  },
  sizes: {
    childMarginLeft: 5,
    childMarginRight: 5,
    nodeSpacing: 70,
    canvasWidth: 3000,
    canvasHeight: 1300,
    canvasMargin: {
      top: 10,
      right: 0,
      bottom: 10,
      left: 0
    },
    resource: {
      gap: 5,
      baseHeight: 25,
      textOffset: 5,
      offsetY: 25
    }
  },
  relations: {
    direction: "right"
  },
  // url: 'https://apl-web-d-02u.cajamar.int:8443/vis-lineage',
  url: {
    groups: API_LINEAGE_GROUPS,
    path: API_LINEAGE_PATH
  }
};

export default globalConf;
