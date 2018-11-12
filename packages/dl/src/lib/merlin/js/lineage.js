// Pillamos uuids del querystring
import { Painter } from "./classes/Painter.js";

function getQueryStringParam() {
  const querystring = window.location.href.split("?");
  if (querystring.length > 1) {
    const datalist = querystring[1].split("&");
    const paramStrings = datalist.reduce((inicial, actual) => {
      const a = actual.split("=");
      inicial[a[0].toLowerCase()] = a[1];
      return inicial;
    }, {});

    const levels = paramStrings.levels ? paramStrings.levels : -1;
    const toplevel = paramStrings.toplevel
      ? paramStrings.toplevel
      : "lineage-load";
    const type_analysis = paramStrings.type_analysis
      ? paramStrings.type_analysis
      : "lineage";

    if (paramStrings.uuids) {
      return {
        uuids: paramStrings.uuids.split(","),
        toplevel,
        levels,
        type_analysis
      };
    }
    if (paramStrings.titles) {
      return {
        titles: paramStrings.titles.split(","),
        toplevel,
        levels,
        type_analysis
      };
    }
  } else {
    return {
      uuids: [233],
      toplevel: "Load",
      levels: 4,
      type_analysis: "lineage"
    };
  }
}

export function drawCanvas(endCanvasLoading) {
  const painter = new Painter();
  painter.paint(getQueryStringParam(), endCanvasLoading);
}
