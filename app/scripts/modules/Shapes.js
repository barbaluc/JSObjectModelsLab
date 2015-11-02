(function(global) {
  'use strict';
  global.Shapes = {
    VERSION:'0.0.1'
  };

  var createShape = function(attributes) {

   attributes._id = attributes._id;
   name = attributes.name;
   attributes.nodes = attributes.nodes;
   var roadAttr;
   var amenityAttr;
   var buildingAttr;
   var naturalAttr;

   if (typeof attributes == roadAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == amenityAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == buildingAttr){
     createRoad(attributes);
   }

   else if (typeof attributes == naturalAttr){
     createRoad(attributes);
   }

  var nodesTrie = attributes.nodes.map(function(obj){
    var rObj = {};
    rObj[obj.y] = String(obj.x) + " " + String(obj.y);
    var result = Object.keys(rObj).map(function (k) { 
      return rObj[k];
    })
      return result;
   });


  var shape = {};

  shape.id = attributes._id;

  shape.toString = function() {
    return "Name :" + getName + "; id : " + attributes._id;
  }

  shape.toSvgPath = function() { // public methods accessing hidden parameters.

    var stringReturn = "";
    for (var i = 0; i < nodesTrie.length; i++) {
      if (i == 0) {
        stringReturn += "M " + String(nodesTrie[i]);
      }
      else {
        stringReturn += " L " + String(nodesTrie[i]);
      }
    }

     return stringReturn;
   };

   shape.getName = function() { // public methods accessing hidden parameters.
     return name;
   };

   return shape; // return the newly created object.
  };



  function createRoad(roadAttr) {
    return Object.create(createShape, {
     building: {
          value: roadAttr.building
      },
      highway: {
          value: roadAttr.highway
      },
      getCategory: {
          value: function() {
              return roadAttr.highway;
          },
      }
    });
  }

  function createBuilding(buildingAttr) {
    return Object.create(createShape, {
      _id: {
          value: buildingAttr._id
      },
      nodes: {
          value: buildingAttr.nodes
      },
      getArea: {
          value: function() {
            var area = 0;
            for (var i = 0; i < buildingAttr.nodes.length; i++) {
              if (i != buildingAttr.nodes.length - 1) {
                area += (buildingAttr.nodes[i].x * buildingAttr.nodes[i+1].y) - (buildingAttr.nodes[i].y * buildingAttr.nodes[i+1].x);
              } else {
                area += (buildingAttr.nodes[i].x * buildingAttr.nodes[0].y) - (buildingAttr.nodes[i].y * buildingAttr.nodes[0].x);
              }
            }
            return Math.abs(area / 2);  
          },
      }
    });
  }

  function createAmenity(amenityAttr) {
    return Object.create(createShape, {
      _id: {
          value: amenityAttr._id
      },
      nodes: {
          value: amenityAttr._nodes
      },
      amenity: {
          value: amenityAttr._amenity
      },
      getType: {
          value: function() {
              return String(amenityAttr.amenity);
          },
      }
    });
  }

  function createNatural(naturalAttr) {
    return Object.create(createShape, {
      _id: {
          value: naturalAttr._id
      },
      nodes: {
          value: naturalAttr.nodes
      },
      name: {
          value: naturalAttr.name
      },
      natural: {
          value: naturalAttr.natural
      },
      getType: {
          value : function() {
              return String(naturalAttr.natural);
          },
      }
    });
  }

  global.Shapes.createShape = createShape;
  global.Shapes.createRoad = createRoad;
  global.Shapes.createBuilding = createBuilding;
  global.Shapes.createAmenity = createAmenity;
  global.Shapes.createNatural = createNatural;

}(this));
