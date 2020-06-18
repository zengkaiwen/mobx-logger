import { toJS } from 'mobx';

export const repeat = (str, times) => (new Array(times + 1)).join(str);
export const padStart = (num, maxLength, char = ' ') => repeat(char, maxLength - num.toString().length) + num;
export const formatTime = (time) => {
    const h = padStart(time.getHours(), 2, '0');
    const m = padStart(time.getMinutes(), 2, '0');
    const s = padStart(time.getSeconds(), 2, '0');
    const ms = padStart(time.getMilliseconds(), 3, '0');
    return `${h}:${m}:${s}.${ms}`;
};
export const now = () => formatTime(new Date());

export const cloneObj = (object) => {
    function checkedType(target) {
        return Object.prototype.toString.call(target).slice(8, -1);
    }
    function depClone(target) {
        let result, targetType = checkedType(target);

        if (targetType === 'Object') {
            result = {};
        } else if (targetType === 'Array') {
            result = [];
        } else {
            return target;
        }
        for (let i in target) {
            let value = target[i];
            if (checkedType(value) === 'Object' ||
                checkedType(value) === 'Array'
            ) {
                result[i] = depClone(value);
            } else {
                result[i] = value;
            }
        }
        return result;
    }
    return depClone(toJS(object));
}

export const style = (color, bold = true) => {
  return `color:${color};font-weight:${bold ? '600' : '300'};font-size:11px`;
};