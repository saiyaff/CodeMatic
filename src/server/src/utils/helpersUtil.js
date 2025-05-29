export default class HelpersUtil {
  constructor(constants, q) {
    this.constants = constants;
    this.q = q;
  }

  stringFormat(format, args) {
    if (!args) return format;

    return format.replace(/{(\d+)}/g, (match, number) =>
      typeof args[number] !== 'undefined' ? args[number] : match
    );
  }

  fromModelVal(val, format) {
    if (typeof val === 'undefined') return null;

    if (val === null) return null;

    const valType = typeof val;

    switch (format) {
      case 'bool': {
        const valStr = val.toString().toLowerCase();
        if (valStr === 'true' || valStr === '1') return true;
        if (valStr === 'false' || valStr === '0') return false;
        return null;
      }

      case 'num':
        return isNaN(val) ? 0 : Number(val);

      default:
        return val;
    }
  }
}
