/**
 * mobx-console-log 让你的控制台输出mobx日志更简洁明了
 * author: kevin
 * 
 * Notice: 不支持Computed属性的log日志输出！！
 */
import { spy, toJS } from 'mobx';
import { now, cloneObj, style } from './utils';

let _all_store = {}; // 最初的store
let _cur_action = ''; // 当前执行的action
let _prev_store_name = ''; // 上一个store的名称
let _prev_state = null; // 执行action前的状态
let _next_state = null; // 执行action之后的状态

export const enableLogging = (store) => {

  // 将store字段key做统一最小化处理，以便后续比较
  Object.keys(store).forEach(key => {
    _all_store[key.toLocaleLowerCase()] = cloneObj(store[key]);
  });

  // console.log('init_state', _all_store);
  return spy(ev => log(ev));
};

/*===========
Logger 控制台输出
=============*/
function log(ev) {
  // console.log('ev', ev);
  switch (ev.type) {
    case 'action':
      logAction(ev);
      return;
    case 'update':
      logUpdate(ev);
      return;
    case 'reaction':
      logReaction(ev);
      return;
    case 'splice':
      logSplice(ev);
      return;
  }
}

// 先触发一次action
function logAction(ev) {
  console.log('action', ev);
  let storeName = ev.object.constructor.name || ev.object;
  _cur_action = ev.name;

  // 更改当前的store
  _prev_store_name = storeName.toLocaleLowerCase();

  // console.log('prev_store_name', _prev_store_name);
  _prev_state = _all_store[_prev_store_name];
  // console.log('prev_state', _prev_state);

  // 格式化输出
  console.group('%c%s %c%s.%s() %c @ %s', style('#999', false), 'action', style('#000'), ev.object.name || ev.object, ev.name, style('#999', false), now());
  console.log('%c%s %c%s', style('#999999'), 'store ', style('#FF6600'), ev.object.name || ev.object);
}

// action之后是update
// 对象，原始值的更新都在update体现
function logUpdate(ev) {
  // console.log('update', ev);
  const key = ev.key,
    newValue = ev.newValue;
  _next_state = cloneObj(_prev_state);
  // console.log('next_state before', _next_state);

  const subscript = ev.name.split('.');

  switch (subscript.length) {
    case 1:
      _next_state[key] = newValue;
      break;
    case 2:
      _next_state[subscript[1]][key] = newValue;
      break;
    case 3:
      _next_state[subscript[1]][subscript[2]][key] = newValue;
      break;
    case 4:
      _next_state[subscript[1]][subscript[2]][subscript[3]][key] = newValue;
      break;
    case 5:
      _next_state[subscript[1]][subscript[2]][subscript[3]][subscript[4]][key] = newValue;
      break;
    default:
      console.error('error: too much nesting for state!');
  }

  // console.log('_next_state after', _next_state);
  console.log('%c%s %o', style('#6699FF'), 'prev state', _prev_state); // prev state
  console.log('%c%s %c%s', style('#999999'), 'action', style('#595959'), _cur_action); // action name
  console.log('%c%s %o', style('#669933'), 'next state', _next_state); // next state
  _all_store[_prev_store_name] = cloneObj(_next_state);
}

// 数组的增删改查在这里体现
function logSplice(ev) {
  // console.log('splice', ev);
  const newValue = toJS(ev.object);
  _next_state = cloneObj(_prev_state);

  const subscript = ev.name.split('.');
  switch (subscript.length) {
    case 2:
      _next_state[subscript[1]] = newValue;
      break;
    case 3:
      _next_state[subscript[1]][subscript[2]] = newValue;
      break;
    case 4:
      _next_state[subscript[1]][subscript[2]][subscript[3]] = newValue;
      break;
    case 5:
      _next_state[subscript[1]][subscript[2]][subscript[3]][subscript[4]] = newValue;
      break;
    case 6:
      _next_state[subscript[1]][subscript[2]][subscript[3]][subscript[4]][subscript[5]] = newValue;
      break;
    default:
      console.error('error: too much nesting for state!');
  }

  console.log('%c%s %o', style('#6699FF'), 'prev state', _prev_state); // prev state
  console.log('%c%s %c%s', style('#999999'), 'action', style('#595959'), _cur_action); // action name
  console.log('%c%s %o', style('#669933'), 'next state', _next_state); // next state
  _all_store[_prev_store_name] = cloneObj(_next_state);
}

// 只要有状态更改，都会触发reaction
function logReaction(ev) {
  console.groupEnd();
}

export default enableLogging;
