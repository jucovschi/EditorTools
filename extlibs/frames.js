var _info_kwarc_sally_comm_frames_factory = function () {
  var info_kwarc_sally_comm_frames = {
    name: 'info_kwarc_sally_comm_frames',
    defaultElementNamespaceURI: 'http:\/\/kwarc.info\/sally\/comm\/frames',
    typeInfos: [{
        type: 'classInfo',
        localName: 'RemoveDocLevelService',
        propertyInfos: [{
            type: 'element',
            name: 'id',
            elementName: 'id',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'ExecDocLevelService',
        propertyInfos: [{
            type: 'element',
            name: 'id',
            elementName: 'id',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'NewDocLevelService',
        propertyInfos: [{
            type: 'element',
            name: 'id',
            elementName: 'id',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'type',
            elementName: 'type',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'name',
            elementName: 'name',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'icon',
            elementName: 'icon',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'ListenDocLevelServices',
        propertyInfos: []
      }, {
        type: 'classInfo',
        localName: 'ShowSallyFrameMenu',
        propertyInfos: [{
            type: 'element',
            name: 'posx',
            elementName: 'posx',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'posy',
            elementName: 'posy',
            typeInfo: 'Int'
          }]
      }],
    elementInfos: [{
        elementName: 'RemoveDocLevelService',
        typeInfo: 'info_kwarc_sally_comm_frames.RemoveDocLevelService'
      }, {
        elementName: 'ExecDocLevelService',
        typeInfo: 'info_kwarc_sally_comm_frames.ExecDocLevelService'
      }, {
        elementName: 'NewDocLevelService',
        typeInfo: 'info_kwarc_sally_comm_frames.NewDocLevelService'
      }, {
        elementName: 'ListenDocLevelServices',
        typeInfo: 'info_kwarc_sally_comm_frames.ListenDocLevelServices'
      }, {
        elementName: 'ShowSallyFrameMenu',
        typeInfo: 'info_kwarc_sally_comm_frames.ShowSallyFrameMenu'
      }]
  };
  return {
    info_kwarc_sally_comm_frames: info_kwarc_sally_comm_frames
  };
};
if (typeof define === 'function' && define.amd) {
  define('info_kwarc_sally_comm_frames',[], _info_kwarc_sally_comm_frames_factory);
}
else {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.info_kwarc_sally_comm_frames = _info_kwarc_sally_comm_frames_factory().info_kwarc_sally_comm_frames;
  }
  else {
    var info_kwarc_sally_comm_frames = _info_kwarc_sally_comm_frames_factory().info_kwarc_sally_comm_frames;
  }
};
// Generated by CoffeeScript 1.7.1
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define('frames',['require','sally_client','info_kwarc_sally_comm_frames','EventEmitter','jsonix'],function(require) {
  var EventEmitter, Frames, Jsonix, context, createShowSallyFrameMenu, executeDocLevelService, frames, listenDocLevelServices, marshaller, unmarshaller;
  require("sally_client");
  frames = require("info_kwarc_sally_comm_frames");
  EventEmitter = require("EventEmitter");
  Jsonix = (require("jsonix")).Jsonix;
  context = new Jsonix.Context([frames.info_kwarc_sally_comm_frames]);
  marshaller = context.createMarshaller();
  unmarshaller = context.createUnmarshaller();
  createShowSallyFrameMenu = function(x, y) {
    return {
      name: {
        localPart: "ShowSallyFrameMenu",
        namespaceURI: "http://kwarc.info/sally/comm/frames"
      },
      value: {
        "posx": x,
        "posy": y
      }
    };
  };
  listenDocLevelServices = function() {
    return {
      name: {
        localPart: "ListenDocLevelServices",
        namespaceURI: "http://kwarc.info/sally/comm/frames"
      },
      value: {}
    };
  };
  executeDocLevelService = function(id) {
    return {
      name: {
        localPart: "ExecDocLevelService",
        namespaceURI: "http://kwarc.info/sally/comm/frames"
      },
      value: {
        "id": id
      }
    };
  };
  return Frames = (function(_super) {
    __extends(Frames, _super);

    function Frames() {
      this.services = {};
    }

    Frames.prototype.getName = function() {
      return "frames";
    };

    Frames.prototype.marshal = function(obj) {
      return marshaller.marshalString(obj);
    };

    Frames.prototype.unmarshal = function(str) {
      return unmarshaller.unmarshalString(str);
    };

    Frames.prototype.listenDocLevelServices = function() {
      return this.send(listenDocLevelServices());
    };

    Frames.prototype.executeDocLevelService = function(id) {
      return this.send(executeDocLevelService(id));
    };

    Frames.prototype.requestOnShowSallyFrames = function(x, y) {
      return this.send(createShowSallyFrameMenu(x, y));
    };

    Frames.prototype.handleMessage = function(msg, sendBack) {
      if (msg.name.localPart === "NewDocLevelService") {
        this.services[msg.value.id] = msg.value;
        this.emit("NewDocLevelService", msg.value);
      }
      if (msg.name.localPart === "RemoveDocLevelService") {
        delete this.services[msg.value.id];
        return this.emit("RemoveDocLevelService", msg.value);
      }
    };

    return Frames;

  })(EventEmitter);
});

