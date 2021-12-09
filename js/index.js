require([
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Bookmarks",
    "esri/core/lang",
    "esri/core/promiseUtils",
    "esri/core/watchUtils",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/BasemapToggle",
    "esri/widgets/ScaleBar"
  ], function(MapView, 
          WebMap, 
          Legend, 
          Expand, 
          Bookmarks, 
          lang, 
          promiseUtils, 
          watchUtils,
          LayerList, 
          Search,
          BasemapToggle,
          ScaleBar) 
  {

    // load a web map containing homicide statistics
    // from a portal item

    const webmap = new WebMap({
      portalItem: {
        id: "74d8654260674f588ec926d783aa5822"
      }
    });

    const view = new MapView({
      map: webmap,
      container: "viewDiv",
      constraints: {
        minScale: 300000
      },
      highlightOptions: {
        color: "black",
        haloOpacity: 0.65,
        fillOpacity: 0.45
      }
    });

    // Add UI elements to the view
    const legendExpand = new Expand({
      view: view,
      content: new Legend({
        view: view
      }),
      expanded: view.widthBreakpoint !== "xsmall"
    });
    view.ui.add(legendExpand, "bottom-left");

    view.watch("widthBreakpoint", function(newValue) {
      titleExpand.expanded = newValue !== "xsmall";
      legendExpand.expanded = newValue !== "xsmall";
    });

    const searchWidget = new Search({
      view: view
    });
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    const sampleInstructions = document.createElement("div");
    sampleInstructions.style.padding = "10px";
    sampleInstructions.style.backgroundColor = "white";
    sampleInstructions.style.width = "300px";
    sampleInstructions.innerHTML = [
      "This web map is created to help display the delivery volume for south of GTA Area in the winter season"
    ].join(" ");

    const instructionsExpand = new Expand({
      expandIconClass: "esri-icon-question",
      expandTooltip: "Map Info",
      view: view,
      content: sampleInstructions,
      expanded : false
    });
    view.ui.add(instructionsExpand, "top-right");
    // Add the search widget to the top right corner of the view

    // Add UI elements to the view
    const layerList = new Expand({
      view: view,
      content: new LayerList({
      view: view
    }),
      expanded: view.widthBreakpoint !== "xsmall"
    });
    
    // Adds widget below other elements in the top left corner of the view
    view.ui.add(layerList, {
      position: "bottom-right",
      style: "ruler",
      unit: "metric"
    });

    let basemapGallery = new Expand({
      view: view,
      content: new BasemapToggle({
      view: view,  // The view that provides access to the map's "streets-vector" basemap
      nextBasemap: "streets-vector"  // Allows for toggling to the "hybrid" basemap
    }),
      expanded: view.widthBreakpoint !== "xsmall"
    });
    // Add widget to the top right corner of the view
    view.ui.add(basemapGallery, {
      position: "top-left"
    });

    
    view.when().then(function() {
    });
  });
