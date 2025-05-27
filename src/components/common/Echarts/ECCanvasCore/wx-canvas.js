export default class WxCanvas {
  constructor(ctx, canvasId, canvasNode) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;
    this.canvasNode = canvasNode;
    this._initEvent();
  }

  getContext(contextType) {
    if (contextType === "2d") {
      return this.ctx;
    }
  }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }
  //处理wx-canvas不存在addEventListener方法抛错问题
  addEventListener(){

  }

  _initEvent() {
    this.event = {};
    const eventNames = [
      {
        wxName: "touchStart",
        ecName: "mousedown",
      },
      {
        wxName: "touchMove",
        ecName: "mousemove",
      },
      {
        wxName: "touchEnd",
        ecName: "mouseup",
      },
      {
        wxName: "touchEnd",
        ecName: "click",
      },
    ];

    eventNames.forEach((name) => {
      this.event[name.wxName] = (e) => {
        const touch = e.touches[0];
        this.chart.getZr().handler.dispatch(name.ecName, {
          zrX: name.wxName === "tap" ? touch.clientX : touch.x,
          zrY: name.wxName === "tap" ? touch.clientY : touch.y,
        });
      };
    });
  }

  set width(w) {
    if (this.canvasNode) this.canvasNode.width = w;
  }
  set height(h) {
    if (this.canvasNode) this.canvasNode.height = h;
  }

  get width() {
    if (this.canvasNode) return this.canvasNode.width;
    return 0;
  }
  get height() {
    if (this.canvasNode) return this.canvasNode.height;
    return 0;
  }
}
