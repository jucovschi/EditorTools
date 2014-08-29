var _info_kwarc_sally_comm_theo_factory = function () {
  var info_kwarc_sally_comm_theo = {
    name: 'info_kwarc_sally_comm_theo',
    defaultElementNamespaceURI: 'http:\/\/kwarc.info\/sally\/comm\/theo',
    typeInfos: [{
        type: 'classInfo',
        localName: 'OpenTheoWindowRequest',
        propertyInfos: [{
            type: 'element',
            name: 'url',
            elementName: 'url',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'title',
            elementName: 'title',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'posx',
            elementName: 'posx',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'posy',
            elementName: 'posy',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'width',
            elementName: 'width',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'height',
            elementName: 'height',
            typeInfo: 'Int'
          }]
      }, {
        type: 'classInfo',
        localName: 'CloseTheoWindow',
        propertyInfos: [{
            type: 'element',
            name: 'id',
            elementName: 'id',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'OpenTheoWindowResponse',
        propertyInfos: [{
            type: 'element',
            name: 'id',
            elementName: 'id',
            typeInfo: 'String'
          }]
      }],
    elementInfos: [{
        elementName: 'OpenTheoWindowRequest',
        typeInfo: 'info_kwarc_sally_comm_theo.OpenTheoWindowRequest'
      }, {
        elementName: 'CloseTheoWindow',
        typeInfo: 'info_kwarc_sally_comm_theo.CloseTheoWindow'
      }, {
        elementName: 'OpenTheoWindowResponse',
        typeInfo: 'info_kwarc_sally_comm_theo.OpenTheoWindowResponse'
      }]
  };
  return {
    info_kwarc_sally_comm_theo: info_kwarc_sally_comm_theo
  };
};
if (typeof define === 'function' && define.amd) {
  define('info_kwarc_sally_comm_theo',[], _info_kwarc_sally_comm_theo_factory);
}
else {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.info_kwarc_sally_comm_theo = _info_kwarc_sally_comm_theo_factory().info_kwarc_sally_comm_theo;
  }
  else {
    var info_kwarc_sally_comm_theo = _info_kwarc_sally_comm_theo_factory().info_kwarc_sally_comm_theo;
  }
};
// Generated by CoffeeScript 1.7.1
define('theo',['require','sally_client','info_kwarc_sally_comm_theo','jsonix'],function(require) {
  var Jsonix, Theo, context, marshaller, openedWindows, theo, uniqueId, unmarshaller;
  require("sally_client");
  theo = require("info_kwarc_sally_comm_theo");
  Jsonix = (require("jsonix")).Jsonix;
  context = new Jsonix.Context([theo.info_kwarc_sally_comm_theo]);
  uniqueId = function(length) {
    var id;
    if (length == null) {
      length = 8;
    }
    id = "";
    while (id.length < length) {
      id += Math.random().toString(36).substr(2);
    }
    return id.substr(0, length);
  };
  openedWindows = {};
  marshaller = context.createMarshaller();
  unmarshaller = context.createUnmarshaller();
  return Theo = (function() {
    function Theo() {}

    Theo.prototype.getName = function() {
      return "theo";
    };

    Theo.prototype.marshal = function(obj) {
      return marshaller.marshalString(obj);
    };

    Theo.prototype.unmarshal = function(str) {
      return unmarshaller.unmarshalString(str);
    };

    Theo.prototype.handleMessage = function(msg, sendBack) {
      var id;
      if (msg.name.localPart === "OpenTheoWindowRequest") {
        id = this.showTheoWindow(msg.value.url, msg.value.title, msg.value.posx, msg.value.posy, msg.value.width, msg.value.height);
        sendBack({
          name: {
            localPart: "OpenTheoWindowResponse",
            namespaceURI: "http://kwarc.info/sally/comm/theo"
          },
          value: {
            "id": id
          }
        });
      }
      if (msg.name.localPart === "CloseTheoWindow") {
        id = msg.value.id;
        if (openedWindows[id] != null) {
          return openedWindows[id];
        }
      }
    };

    Theo.prototype.showTheoWindow = function(url, title, posx, posy, width, height) {
      var dv, frame, id;
      if (width == null) {
        width = "auto";
      }
      if (height == null) {
        height = "auto";
      }
      frame = $("<iframe>").attr("src", url).css("width", "100%").attr("frameborder", 0).attr("marginwidth", 0).attr("marginheight", 0).css("height", height);
      dv = $("<div>").append(frame).css("overflow", "hidden").css("padding-left", "0px").css("padding-right", "0px");
      id = uniqueId();
      $(dv).dialog({
        title: title,
        height: height,
        width: width,
        position: [posx, posy],
        resize: function(e, ui) {
          return frame.css("height", "100%");
        },
        close: function() {
          delete openedWindows[id];
          return $(dv).dialog("destroy");
        }
      });
      openedWindows[id] = dv;
      return id;
    };

    return Theo;

  })();
});

