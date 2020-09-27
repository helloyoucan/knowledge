type EventItem = {
  callback(): void;
  that: object | undefined;
};
interface Events {
  [index: string]: Array<EventItem>;
}
interface InterfaceEventBus {
  emit(type: string): void;
  on(type: string, callback: Function, that: object): void;
}
class EventBus implements InterfaceEventBus {
  events: Events = {};
  //首先构造函数需要存储event事件，使用键值对存储
  //然后我们需要发布事件，参数是事件的type和需要传递的参数
  emit(type: string, ...args: any) {
    let params: Array<EventItem> = this.events[type];
    if (!params) {
      return;
    }
    // 查看这个type的event有多少个回调函数，如果有多个需要依次调用。
    if (Array.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        let param: EventItem = params[i];
        param.callback.apply(param.that ? param.that : this, args);
      }
    } else {
      let param: EventItem = params[0];
      param.callback.apply(param.that ? param.that : this, args);
    }
  }
  //然后我们需要写监听函数，参数是事件type和触发时需要执行的回调函数
  on(type: string, callback: any, that?: object) {
    const e = this.events[type];
    const params: EventItem = {
      that,
      callback,
    };
    if (!e) {
      //如果从未注册过监听函数，则将函数放入数组存入对应的键名下
      this.events[type] = [params];
    } else {
      //如果注册过，则直接放入
      e.push(params);
    }
  }
  off(type: string, fun?: any, that?: object) {
    if (!this.events[type]) {
      return;
    }
    if (fun) {
      let callbacks = this.events[type];
      if (that) {
        callbacks = callbacks.filter(
          fn => fn.callback !== fun || fn.that !== that,
        );
        this.events[type] = callbacks;
      } else {
        this.events[type] =
          callbacks && callbacks.filter(fn => fn.callback !== fun);
      }
    } else {
      this.events[type] = [];
    }
  }
  once(type: string, callback: any, that?: object) {
    let onceFunction = (...args: []) => {
      callback.apply(this, args);
      this.off(type, onceFunction, that);
    };
    this.on(type, onceFunction, that);
  }
}

const eventBus = new EventBus();
export default eventBus;
