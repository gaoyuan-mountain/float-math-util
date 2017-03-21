var FloatUtil = {
  pointIndexOf: function(val) {
    val = val + '';
    var i = val.indexOf('.');
    if (i > -1) {
      return val.length - i - 1;
    }

    return 0;
  },
  pointNums: function(args) {
    args = [].concat(args);
    var nums = [];
    for (var i = 0; i < args.length; i++) {
      var num = args[i];
      var index = FloatUtil.pointIndexOf(num + '');
      nums.push(index);
    }
    return nums;
  },
  pointMaxNum: function(args) {
    args = [].concat(args);
    return Math.max.apply(null, args);
  },
  pointSum: function(args) {
    var total = 0;
    var i = 0;
    var l = args.length;
    while (i < l) {
      total += args[i++];
    }
    return total;
  }
}

var FloatMath = {
  add: function() {
    var args = arguments;
    args = Array.prototype.slice.call(args);

    var m = FloatUtil.pointMaxNum(FloatUtil.pointNums(args));
    var p = Math.pow(10, m);
    var total = 0,
      i = 0,
      l = args.length;
    while (i < l) {
      var num = args[i++];
      num = num + '';
      total += FloatMath.mul(Number(num), p);
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  sub: function() {
    var args = arguments;
    args = Array.prototype.slice.call(args);

    var m = FloatUtil.pointMaxNum(FloatUtil.pointNums(args));
    var p = Math.pow(10, m);
    var total = FloatMath.mul(args[0], p),
      i = 1,
      l = args.length;
    total = Number((total + '').replace('.', ''));
    while (i < l) {
      var num = args[i++];
      num = num + '';
      total -= FloatMath.mul(Number(num), p);
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  mul: function() {
    var args = arguments;
    args = Array.prototype.slice.call(args);
    var l = args.length;
    if (!l) {
      return 0;
    }
    if (l === 1) {

      return Number(args[0]);
    }

    var m = FloatUtil.pointSum(FloatUtil.pointNums(args));
    var p = Math.pow(10, m);
    var total = 1,
      i = 0;;
    while (i < l) {
      var num = args[i++] + '';
      num = Number(num.replace('.', ''));
      total *= num;
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  div: function() {
    var args = arguments;
    args = Array.prototype.slice.call(args);

    var n1 = args[0] || 0,
      i = 1,
      l = args.length;

    while (i < l) {
      var n2 = args[i++];
      var p1 = FloatUtil.pointNums(n1)[0];
      var p2 = FloatUtil.pointNums(n2)[0];
      //
      n1 = n1 + '';
      n2 = n2 + '';
      n1 = Number(n1.replace('.', ''));
      n2 = Number(n2.replace('.', ''));
      if (!n2) {

        return Number.MAX_SAFE_INTEGER;
      }
      n1 = FloatMath.mul((n1 / n2), Math.pow(10, p2 - p1));
    }

    return n1;
  }
}

module.exports = exports = FloatMath;
