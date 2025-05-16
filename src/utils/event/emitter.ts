type TypeKey = string;
type CallBack = Function;


class EventEmitter {
  cached: object;
  handlers: object;

  constructor() {
    this.cached = {};
    this.handlers = {};
  }

  /**
   * listen
   * @param type
   * @param handler
   */
  listen(type: TypeKey, handler: CallBack) {
    if (typeof handler !== "function") return;

    if (typeof this.handlers[type] == "undefined") {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);

    if (this.cached[type] instanceof Array) {
      //说明有缓存的 可以执行
      handler(this.cached[type]);
    }
  }

  /**
   * remove
   * @param type
   * @param handler
   */
  remove(type: TypeKey, handler: CallBack) {
    let events = this.handlers[type];
    for (let i = 0, len = events.length; i < len; i++) {
      if (events[i] == handler) {
        events.splice(i, 1);
        break;
      }
    }
  }

  /**
   * trigger
   * @param type
   * @param args
   */
  trigger(type: TypeKey, args?: any) {
    //如果有订阅的事件，这个时候就触发了
    if (this.handlers[type] instanceof Array) {
      let handlers = this.handlers[type];
      for (let i = 0, len = handlers.length; i < len; i++) {
        handlers[i].apply(null, [args]);
      }
    }
    //默认缓存
    this.cached[type] = Array.prototype.slice.call(arguments, 1);
  }

  /**
   * 不论执行多少次，只监听一次
   * @param type
   * @param handler
   */
  onlyListen(type: TypeKey, handler: Function) {
    if (typeof handler !== "function") return;

    if (typeof this.handlers[type] === "undefined") {
      this.handlers[type] = [];
    }
    this.handlers[type] = [handler];

    if (this.cached[type] instanceof Array) {
      //说明有缓存的 可以执行
      handler.apply(null, this.cached[type]);
    }
  }
}


const eventEmitter = new EventEmitter();

export default eventEmitter;
