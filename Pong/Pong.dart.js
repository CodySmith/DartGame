function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  $throw(new NoSuchMethodException(this, "operator []", [i]));
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $div$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$div(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator /", [y]));
  }
}
function $div$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x / y;
  return $div$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $gt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >", [y]));
  }
}
function $gt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x > y;
  return $gt$complex$(x, y);
}
function $gte$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gte(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >=", [y]));
  }
}
function $gte$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x >= y;
  return $gte$complex$(x, y);
}
function $lt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$lt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator <", [y]));
  }
}
function $lt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x < y;
  return $lt$complex$(x, y);
}
function $mod$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      var result = x % y;
      if (result == 0) {
        return 0;  // Make sure we don't return -0.0.
      } else if (result < 0) {
        if (y < 0) {
          return result - y;
        } else {
          return result + y;
        }
      }
      return result;
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$mod(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator %", [y]));
  }
}
function $mul$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$mul(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator *", [y]));
  }
}
function $mul$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x * y;
  return $mul$complex$(x, y);
}
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $sub$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$sub(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator -", [y]));
  }
}
function $sub$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x - y;
  return $sub$complex$(x, y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    if (name == 'CanvasPixelArray') return 'Uint8ClampedArray';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    if (name == 'WorkerMessageEvent') return 'MessageEvent';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'HTMLTableDataCellElement') return 'HTMLTableCellElement';
    if (name == 'HTMLTableHeaderCellElement') return 'HTMLTableCellElement';
    if (name == 'MSStyleCSSProperties') return 'CSSStyleDeclaration';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;

    var proto = Object.getPrototypeOf(obj);

    if (method == null) {
      // Trampoline to throw NoSuchMethodException (TODO: call noSuchMethod).
      method = function(){
        // Exact type check to prevent this code shadowing the dispatcher from a
        // subclass.
        if (Object.getPrototypeOf(this) === proto) {
          // TODO(sra): 'name' is the jsname, should be the Dart name.
          $throw(new NoSuchMethodException(
              obj, name, Array.prototype.slice.call(arguments)));
        }
        return Object.prototype[name].apply(this, arguments);
      };
    }

    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "start$0", function() {
  return this.noSuchMethod("start", []);
});
$defProp(Object.prototype, "update$0", function() {
  return this.noSuchMethod("update", []);
});
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return (("NoSuchMethodException : method not found: '" + this._functionName + "'\n") + ("Receiver: " + this._receiver + "\n") + ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return ("NoSuchMethodException: incorrect number of arguments passed to " + ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n") + ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n") + ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
function NullPointerException(functionName, arguments) {
  this.functionName = functionName;
  this.arguments = arguments;
}
NullPointerException.prototype.toString = function() {
  if (this.functionName == null) {
    return this.get$exceptionName();
  }
  else {
    return (("" + this.get$exceptionName() + " : method: '" + this.functionName + "'\n") + "Receiver: null\n" + ("Arguments: " + this.arguments));
  }
}
NullPointerException.prototype.get$exceptionName = function() {
  return "NullPointerException";
}
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
function FutureNotCompleteException() {

}
FutureNotCompleteException.prototype.toString = function() {
  return "Exception: future has not been completed";
}
function FutureAlreadyCompleteException() {

}
FutureAlreadyCompleteException.prototype.toString = function() {
  return "Exception: future already completed";
}
Math.min = function(a, b) {
  if (a == b) return a;
    if (a < b) {
      if (isNaN(b)) return b;
      else return a;
    }
    if (isNaN(a)) return a;
    else return b;
}
function print$(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException(null, []));
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException(null, []));
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
var ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "clear$_", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "removeRange", function(start, rangeLength) {
  if (rangeLength == (0)) return;
  if (rangeLength < (0)) $throw(new IllegalArgumentException("length"));
  if (start < (0) || start + rangeLength > this.get$length()) $throw(new IndexOutOfRangeException(start));
  this.splice(start, rangeLength);
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach(f);
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0006);
}
ImmutableMap.prototype.toString = function() {
  return Maps.mapToString(this);
}
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add$(($eq$(multiLine, true) ? "m" : ""), ($eq$(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.hasMatch = function(str) {
  return this.re.test(str);
}
var NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.round = function() {
  'use strict'; return Math.round(this);
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toStringAsFixed = function(fractionDigits) {
  'use strict'; return this.toFixed(fractionDigits);
}
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
function FutureImpl() {
  this._isComplete = false;
  this._exceptionHandled = false;
  this._listeners = [];
  this._exceptionHandlers = [];
}
FutureImpl.prototype.get$value = function() {
  if (!this.get$isComplete()) {
    $throw(new FutureNotCompleteException());
  }
  if (null != this._exception) {
    $throw(this._exception);
  }
  return this._value;
}
FutureImpl.prototype.get$isComplete = function() {
  return this._isComplete;
}
FutureImpl.prototype.get$hasValue = function() {
  return this.get$isComplete() && null == this._exception;
}
FutureImpl.prototype.then = function(onComplete) {
  if (this.get$hasValue()) {
    onComplete(this.get$value());
  }
  else if (!this.get$isComplete()) {
    this._listeners.add(onComplete);
  }
  else if (!this._exceptionHandled) {
    $throw(this._exception);
  }
}
FutureImpl.prototype._complete = function() {
  this._isComplete = true;
  if (null != this._exception) {
    var $$list = this._exceptionHandlers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      if ($eq$(handler.call$1(this._exception), true)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var listener = $$i.next();
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > (0)) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl.prototype._setException = function(exception) {
  if (null == exception) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
function CompleterImpl() {}
CompleterImpl.prototype.get$future = function() {
  return this._futureImpl;
}
CompleterImpl.prototype.complete = function(value) {
  this._futureImpl._setValue(value);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {
  this._futureImpl = new FutureImpl();
}
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
function HashSetImplementation() {}
HashSetImplementation.prototype.is$Collection = function(){return true};
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.toString = function() {
  return Collections.collectionToString(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
function HashSetIterator(set_) {
  this._nextValidIndex = (-1);
  this._entries = set_._backingMap._keys;
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
function _DeletedKeySentinel() {

}
function KeyValuePair(key, value) {
  this.key$_ = key;
  this.value = value;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key$_, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0005);
}
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
function DoubleLinkedQueue() {}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
function StringBufferImpl(content) {
  this.clear$_();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.clear$_ = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear$_();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
var StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.endsWith = function(other) {
    'use strict';
    if (other.length > this.length) return false;
    return other == this.substring(this.length - other.length);
}
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
DateImplementation.now$ctor = function() {
  this.timeZone = new TimeZoneImplementation.local$ctor();
  this.value = DateImplementation._now();
  this._asJs();
}
DateImplementation.now$ctor.prototype = DateImplementation.prototype;
DateImplementation.fromEpoch$ctor = function(value, timeZone) {
  this.value = value;
  this.timeZone = timeZone;
}
DateImplementation.fromEpoch$ctor.prototype = DateImplementation.prototype;
function DateImplementation() {}
DateImplementation.prototype.get$value = function() { return this.value; };
DateImplementation.prototype.get$timeZone = function() { return this.timeZone; };
DateImplementation.prototype.$eq = function(other) {
  if (!((other instanceof DateImplementation))) return false;
  return (this.value == other.get$value()) && ($eq$(this.timeZone, other.get$timeZone()));
}
DateImplementation.prototype.get$year = function() {
  return this.isUtc() ? this._asJs().getUTCFullYear() :
      this._asJs().getFullYear();
}
DateImplementation.prototype.get$month = function() {
  return this.isUtc() ? this._asJs().getUTCMonth() + 1 :
        this._asJs().getMonth() + 1;
}
DateImplementation.prototype.get$day = function() {
  return this.isUtc() ? this._asJs().getUTCDate() :
        this._asJs().getDate();
}
DateImplementation.prototype.get$hours = function() {
  return this.isUtc() ? this._asJs().getUTCHours() :
        this._asJs().getHours();
}
DateImplementation.prototype.get$minutes = function() {
  return this.isUtc() ? this._asJs().getUTCMinutes() :
        this._asJs().getMinutes();
}
DateImplementation.prototype.get$seconds = function() {
  return this.isUtc() ? this._asJs().getUTCSeconds() :
        this._asJs().getSeconds();
}
DateImplementation.prototype.get$milliseconds = function() {
  return this.isUtc() ? this._asJs().getUTCMilliseconds() :
      this._asJs().getMilliseconds();
}
DateImplementation.prototype.isUtc = function() {
  return this.timeZone.isUtc;
}
DateImplementation.prototype.get$isUtc = function() {
  return this.isUtc.bind(this);
}
DateImplementation.prototype.toString = function() {
  function fourDigits(n) {
    var absN = n.abs();
    var sign = n < (0) ? "-" : "";
    if (absN >= (1000)) return ("" + n);
    if (absN >= (100)) return ("" + sign + "0" + absN);
    if (absN >= (10)) return ("" + sign + "00" + absN);
    if (absN >= (1)) return ("" + sign + "000" + absN);
  }
  function threeDigits(n) {
    if (n >= (100)) return ("" + n);
    if (n > (10)) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  var y = fourDigits(this.get$year());
  var m = twoDigits(this.get$month());
  var d = twoDigits(this.get$day());
  var h = twoDigits(this.get$hours());
  var min = twoDigits(this.get$minutes());
  var sec = twoDigits(this.get$seconds());
  var ms = threeDigits(this.get$milliseconds());
  if (this.timeZone.isUtc) {
    return ("" + y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms + "Z");
  }
  else {
    return ("" + y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms);
  }
}
DateImplementation.prototype.add = function(duration) {
  return new DateImplementation.fromEpoch$ctor(this.value + duration.inMilliseconds, this.timeZone);
}
DateImplementation._now = function() {
  return new Date().valueOf();
}
DateImplementation.prototype._asJs = function() {
    if (!this.date) {
      this.date = new Date(this.value);
    }
    return this.date;
}
DateImplementation.prototype.add$1 = DateImplementation.prototype.add;
TimeZoneImplementation.local$ctor = function() {
  this.isUtc = false;
}
TimeZoneImplementation.local$ctor.prototype = TimeZoneImplementation.prototype;
function TimeZoneImplementation() {}
TimeZoneImplementation.prototype.$eq = function(other) {
  if (!((other instanceof TimeZoneImplementation))) return false;
  return $eq$(this.isUtc, other.get$isUtc());
}
TimeZoneImplementation.prototype.toString = function() {
  if (this.isUtc) return "TimeZone (UTC)";
  return "TimeZone (Local)";
}
TimeZoneImplementation.prototype.get$isUtc = function() { return this.isUtc; };
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
var _FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
$dynamic("get$on").EventTarget = function() {
  return new _EventsImpl(this);
}
$dynamic("get$$$dom_attributes").Node = function() {
  return this.attributes;
}
$dynamic("set$text").Node = function(value) {
  this.textContent = value;
}
$dynamic("get$attributes").Element = function() {
  return new _ElementAttributeMap(this);
}
$dynamic("get$rect").Element = function() {
  var $this = this;
  return _createMeasurementFuture((function () {
    return new _ElementRectImpl($this);
  })
  , new CompleterImpl_ElementRect());
}
$dynamic("get$on").Element = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("get$$$dom_clientHeight").Element = function() {
  return this.clientHeight;
}
$dynamic("get$$$dom_clientLeft").Element = function() {
  return this.clientLeft;
}
$dynamic("get$$$dom_clientTop").Element = function() {
  return this.clientTop;
}
$dynamic("get$$$dom_clientWidth").Element = function() {
  return this.clientWidth;
}
$dynamic("get$$$dom_offsetHeight").Element = function() {
  return this.offsetHeight;
}
$dynamic("get$$$dom_offsetLeft").Element = function() {
  return this.offsetLeft;
}
$dynamic("get$$$dom_offsetTop").Element = function() {
  return this.offsetTop;
}
$dynamic("get$$$dom_offsetWidth").Element = function() {
  return this.offsetWidth;
}
$dynamic("get$$$dom_scrollHeight").Element = function() {
  return this.scrollHeight;
}
$dynamic("get$$$dom_scrollLeft").Element = function() {
  return this.scrollLeft;
}
$dynamic("get$$$dom_scrollTop").Element = function() {
  return this.scrollTop;
}
$dynamic("get$$$dom_scrollWidth").Element = function() {
  return this.scrollWidth;
}
$dynamic("get$on").AbstractWorker = function() {
  return new _AbstractWorkerEventsImpl(this);
}
function _EventsImpl(_ptr) {
  this._ptr = _ptr;
}
_EventsImpl.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
_EventsImpl.prototype._get = function(type) {
  return new _EventListenerListImpl(this._ptr, type);
}
$inherits(_AbstractWorkerEventsImpl, _EventsImpl);
function _AbstractWorkerEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_AbstractWorkerEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
$dynamic("get$name").Attr = function() { return this.name; };
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
$dynamic("get$length").AudioBuffer = function() { return this.length; };
$dynamic("get$on").AudioContext = function() {
  return new _AudioContextEventsImpl(this);
}
$inherits(_AudioContextEventsImpl, _EventsImpl);
function _AudioContextEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$on").HTMLMediaElement = function() {
  return new _MediaElementEventsImpl(this);
}
$dynamic("get$error").HTMLMediaElement = function() { return this.error; };
$dynamic("get$src").HTMLMediaElement = function() { return this.src; };
$dynamic("set$src").HTMLMediaElement = function(value) { return this.src = value; };
$dynamic("get$load").HTMLMediaElement = function() {
  return this.load.bind(this);
}
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
$dynamic("get$on").BatteryManager = function() {
  return new _BatteryManagerEventsImpl(this);
}
$inherits(_BatteryManagerEventsImpl, _EventsImpl);
function _BatteryManagerEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$on").HTMLBodyElement = function() {
  return new _BodyElementEventsImpl(this);
}
$inherits(_ElementEventsImpl, _EventsImpl);
function _ElementEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_ElementEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_ElementEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$inherits(_BodyElementEventsImpl, _ElementEventsImpl);
function _BodyElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_BodyElementEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_BodyElementEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
$dynamic("get$data").CharacterData = function() { return this.data; };
$dynamic("get$length").CharacterData = function() { return this.length; };
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
$dynamic("get$length").CSSRuleList = function() { return this.length; };
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("get$left").CSSStyleDeclaration = function() {
  return this.getPropertyValue("left");
}
$dynamic("get$src").CSSStyleDeclaration = function() {
  return this.getPropertyValue("src");
}
$dynamic("set$src").CSSStyleDeclaration = function(value) {
  this.setProperty("src", value, "");
}
$dynamic("get$top").CSSStyleDeclaration = function() {
  return this.getPropertyValue("top");
}
$dynamic("get$length").CSSValueList = function() { return this.length; };
$dynamic("get$left").ClientRect = function() { return this.left; };
$dynamic("get$top").ClientRect = function() { return this.top; };
$dynamic("get$length").ClientRectList = function() { return this.length; };
$dynamic("get$data").CompositionEvent = function() { return this.data; };
$dynamic("get$on").DOMApplicationCache = function() {
  return new _DOMApplicationCacheEventsImpl(this);
}
$dynamic("update$0").DOMApplicationCache = function() {
  return this.update();
};
$inherits(_DOMApplicationCacheEventsImpl, _EventsImpl);
function _DOMApplicationCacheEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_DOMApplicationCacheEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$name").DOMException = function() { return this.name; };
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
$dynamic("is$List").DOMStringList = function(){return true};
$dynamic("is$Collection").DOMStringList = function(){return true};
$dynamic("get$length").DOMStringList = function() { return this.length; };
$dynamic("$index").DOMStringList = function(index) {
  return this[index];
}
$dynamic("$setindex").DOMStringList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").DOMStringList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").DOMStringList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").DOMStringList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").DOMStringList = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").DOMStringList = function($0) {
  return this.add($0);
};
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("get$on").WorkerContext = function() {
  return new _WorkerContextEventsImpl(this);
}
$dynamic("get$on").DedicatedWorkerContext = function() {
  return new _DedicatedWorkerContextEventsImpl(this);
}
$inherits(_WorkerContextEventsImpl, _EventsImpl);
function _WorkerContextEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_WorkerContextEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$inherits(_DedicatedWorkerContextEventsImpl, _WorkerContextEventsImpl);
function _DedicatedWorkerContextEventsImpl(_ptr) {
  _WorkerContextEventsImpl.call(this, _ptr);
}
$dynamic("get$on").DeprecatedPeerConnection = function() {
  return new _DeprecatedPeerConnectionEventsImpl(this);
}
$inherits(_DeprecatedPeerConnectionEventsImpl, _EventsImpl);
function _DeprecatedPeerConnectionEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$name").Entry = function() { return this.name; };
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("get$on").HTMLDocument = function() {
  return new _DocumentEventsImpl(this);
}
$dynamic("query").HTMLDocument = function(selectors) {
  if (const$0002.hasMatch(selectors)) {
    return this.getElementById(selectors.substring((1)));
  }
  return this.$dom_querySelector(selectors);
}
$dynamic("$dom_querySelector").HTMLDocument = function(selectors) {
  return this.querySelector(selectors);
}
$inherits(_DocumentEventsImpl, _ElementEventsImpl);
function _DocumentEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_DocumentEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
_DocumentEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_DocumentEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
_DocumentEventsImpl.prototype.get$mouseMove = function() {
  return this._get("mousemove");
}
$dynamic("get$attributes").DocumentFragment = function() {
  return const$0007;
}
$dynamic("get$on").DocumentFragment = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("get$name").DocumentType = function() { return this.name; };
function _ElementAttributeMap(_element) {
  this._html_element = _element;
}
_ElementAttributeMap.prototype.is$Map = function(){return true};
_ElementAttributeMap.prototype.containsKey = function(key) {
  return this._html_element.hasAttribute(key);
}
_ElementAttributeMap.prototype.$index = function(key) {
  return this._html_element.getAttribute(key);
}
_ElementAttributeMap.prototype.$setindex = function(key, value) {
  this._html_element.setAttribute(key, ("" + value));
}
_ElementAttributeMap.prototype.forEach = function(f) {
  var attributes = this._html_element.get$$$dom_attributes();
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    var item = attributes.$index(i);
    f(item.get$name(), item.get$value());
  }
}
_ElementAttributeMap.prototype.get$length = function() {
  return this._html_element.get$$$dom_attributes().length;
}
function _SimpleClientRect(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}
_SimpleClientRect.prototype.get$left = function() { return this.left; };
_SimpleClientRect.prototype.get$top = function() { return this.top; };
_SimpleClientRect.prototype.$eq = function(other) {
  return null != other && this.left == other.left && this.top == other.top && this.width == other.width && this.height == other.height;
}
_SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
function _ElementRectImpl(element) {
  this.client = new _SimpleClientRect(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  this.offset = new _SimpleClientRect(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  this.scroll = new _SimpleClientRect(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  this._boundingClientRect = element.getBoundingClientRect();
  this._clientRects = element.getClientRects();
}
_ElementRectImpl.prototype.get$bounding = function() {
  return this._boundingClientRect;
}
function _ElementFactoryProvider() {}
_ElementFactoryProvider.Element$tag$factory = function(tag) {
  return document.createElement(tag)
}
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
$dynamic("get$src").HTMLEmbedElement = function() { return this.src; };
$dynamic("set$src").HTMLEmbedElement = function(value) { return this.src = value; };
$dynamic("get$length").EntryArray = function() { return this.length; };
$dynamic("get$length").EntryArraySync = function() { return this.length; };
$dynamic("get$name").EventException = function() { return this.name; };
$dynamic("get$on").EventSource = function() {
  return new _EventSourceEventsImpl(this);
}
$inherits(_EventSourceEventsImpl, _EventsImpl);
function _EventSourceEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_EventSourceEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
function _EventListenerListImpl(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
}
_EventListenerListImpl.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype._add = function(listener, useCapture) {
  this._ptr.addEventListener(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
$dynamic("get$name").HTMLFieldSetElement = function() { return this.name; };
$dynamic("get$name").File = function() { return this.name; };
$dynamic("get$name").FileException = function() { return this.name; };
$dynamic("get$length").FileList = function() { return this.length; };
$dynamic("get$on").FileReader = function() {
  return new _FileReaderEventsImpl(this);
}
$dynamic("get$error").FileReader = function() { return this.error; };
$inherits(_FileReaderEventsImpl, _EventsImpl);
function _FileReaderEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_FileReaderEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_FileReaderEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$on").FileWriter = function() {
  return new _FileWriterEventsImpl(this);
}
$dynamic("get$error").FileWriter = function() { return this.error; };
$dynamic("get$length").FileWriter = function() { return this.length; };
$inherits(_FileWriterEventsImpl, _EventsImpl);
function _FileWriterEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_FileWriterEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$length").FileWriterSync = function() { return this.length; };
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Float32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Float32Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Float64Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Float64Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
$dynamic("get$src").HTMLFrameElement = function() { return this.src; };
$dynamic("set$src").HTMLFrameElement = function(value) { return this.src = value; };
$dynamic("get$on").HTMLFrameSetElement = function() {
  return new _FrameSetElementEventsImpl(this);
}
$inherits(_FrameSetElementEventsImpl, _ElementEventsImpl);
function _FrameSetElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_FrameSetElementEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_FrameSetElementEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").HTMLCollection = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").HTMLCollection = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
$dynamic("get$length").History = function() { return this.length; };
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
$dynamic("get$on").IDBDatabase = function() {
  return new _IDBDatabaseEventsImpl(this);
}
$dynamic("get$name").IDBDatabase = function() { return this.name; };
$inherits(_IDBDatabaseEventsImpl, _EventsImpl);
function _IDBDatabaseEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_IDBDatabaseEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
$dynamic("get$name").IDBIndex = function() { return this.name; };
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("get$on").IDBRequest = function() {
  return new _IDBRequestEventsImpl(this);
}
$inherits(_IDBRequestEventsImpl, _EventsImpl);
function _IDBRequestEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_IDBRequestEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$on").IDBTransaction = function() {
  return new _IDBTransactionEventsImpl(this);
}
$inherits(_IDBTransactionEventsImpl, _EventsImpl);
function _IDBTransactionEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_IDBTransactionEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$on").IDBVersionChangeRequest = function() {
  return new _IDBVersionChangeRequestEventsImpl(this);
}
$inherits(_IDBVersionChangeRequestEventsImpl, _IDBRequestEventsImpl);
function _IDBVersionChangeRequestEventsImpl(_ptr) {
  _IDBRequestEventsImpl.call(this, _ptr);
}
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
$dynamic("get$src").HTMLIFrameElement = function() { return this.src; };
$dynamic("set$src").HTMLIFrameElement = function(value) { return this.src = value; };
$dynamic("get$data").ImageData = function() { return this.data; };
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
$dynamic("get$src").HTMLImageElement = function() { return this.src; };
$dynamic("set$src").HTMLImageElement = function(value) { return this.src = value; };
$dynamic("get$on").HTMLInputElement = function() {
  return new _InputElementEventsImpl(this);
}
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$src").HTMLInputElement = function() { return this.src; };
$dynamic("set$src").HTMLInputElement = function(value) { return this.src = value; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
$inherits(_InputElementEventsImpl, _ElementEventsImpl);
function _InputElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Int16Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Int16Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Int32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Int32Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Int8Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Int8Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("get$on").JavaScriptAudioNode = function() {
  return new _JavaScriptAudioNodeEventsImpl(this);
}
$inherits(_JavaScriptAudioNodeEventsImpl, _EventsImpl);
function _JavaScriptAudioNodeEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
$dynamic("get$on").MediaStream = function() {
  return new _MediaStreamEventsImpl(this);
}
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
$inherits(_MediaElementEventsImpl, _ElementEventsImpl);
function _MediaElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").MediaList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").MediaList = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$inherits(_MediaStreamEventsImpl, _EventsImpl);
function _MediaStreamEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$length").MediaStreamList = function() { return this.length; };
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
$dynamic("get$data").MessageEvent = function() { return this.data; };
$dynamic("get$on").MessagePort = function() {
  return new _MessagePortEventsImpl(this);
}
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
$inherits(_MessagePortEventsImpl, _EventsImpl);
function _MessagePortEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
$dynamic("get$clientX").MouseEvent = function() { return this.clientX; };
$dynamic("get$clientY").MouseEvent = function() { return this.clientY; };
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").NamedNodeMap = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").NamedNodeMap = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.is$Collection = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._html_list.iterator();
}
_ListWrapper.prototype.get$length = function() {
  return this._html_list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._html_list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._html_list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._html_list.add(value);
}
_ListWrapper.prototype.clear$_ = function() {
  return this._html_list.clear$_();
}
_ListWrapper.prototype.removeLast = function() {
  return this._html_list.removeLast();
}
_ListWrapper.prototype.removeRange = function(start, rangeLength) {
  return this._html_list.removeRange(start, rangeLength);
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NodeList = function(value) {
  this._parent.appendChild(value);
}
$dynamic("removeLast").NodeList = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._parent.removeChild(result);
  }
  return result;
}
$dynamic("clear$_").NodeList = function() {
  this._parent.set$text("");
}
$dynamic("$setindex").NodeList = function(index, value) {
  this._parent.replaceChild(value, this.$index(index));
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").NodeList = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("get$on").Notification = function() {
  return new _NotificationEventsImpl(this);
}
$inherits(_NotificationEventsImpl, _EventsImpl);
function _NotificationEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_NotificationEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$data").HTMLObjectElement = function() { return this.data; };
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
$dynamic("get$on").PeerConnection00 = function() {
  return new _PeerConnection00EventsImpl(this);
}
$inherits(_PeerConnection00EventsImpl, _EventsImpl);
function _PeerConnection00EventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$data").ProcessingInstruction = function() { return this.data; };
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
$dynamic("get$name").RangeException = function() { return this.name; };
$dynamic("get$left").Rect = function() { return this.left; };
$dynamic("get$top").Rect = function() { return this.top; };
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
$dynamic("get$on").SVGElementInstance = function() {
  return new _SVGElementInstanceEventsImpl(this);
}
$inherits(_SVGElementInstanceEventsImpl, _EventsImpl);
function _SVGElementInstanceEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_SVGElementInstanceEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_SVGElementInstanceEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
$dynamic("get$name").SVGException = function() { return this.name; };
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
$dynamic("get$src").HTMLScriptElement = function() { return this.src; };
$dynamic("set$src").HTMLScriptElement = function(value) { return this.src = value; };
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
$dynamic("get$on").SharedWorkerContext = function() {
  return new _SharedWorkerContextEventsImpl(this);
}
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
$inherits(_SharedWorkerContextEventsImpl, _WorkerContextEventsImpl);
function _SharedWorkerContextEventsImpl(_ptr) {
  _WorkerContextEventsImpl.call(this, _ptr);
}
$dynamic("get$src").HTMLSourceElement = function() { return this.src; };
$dynamic("set$src").HTMLSourceElement = function(value) { return this.src = value; };
$dynamic("get$src").SpeechGrammar = function() { return this.src; };
$dynamic("set$src").SpeechGrammar = function(value) { return this.src = value; };
$dynamic("get$length").SpeechGrammarList = function() { return this.length; };
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
$dynamic("get$on").SpeechRecognition = function() {
  return new _SpeechRecognitionEventsImpl(this);
}
$dynamic("start$0").SpeechRecognition = function() {
  return this.start();
};
$inherits(_SpeechRecognitionEventsImpl, _EventsImpl);
function _SpeechRecognitionEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_SpeechRecognitionEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
$dynamic("get$error").SpeechRecognitionEvent = function() { return this.error; };
$dynamic("get$length").SpeechRecognitionResult = function() { return this.length; };
$dynamic("get$length").SpeechRecognitionResultList = function() { return this.length; };
$dynamic("is$Map").Storage = function(){return true};
$dynamic("containsKey").Storage = function(key) {
  return this.getItem(key) != null;
}
$dynamic("$index").Storage = function(key) {
  return this.getItem(key);
}
$dynamic("$setindex").Storage = function(key, value) {
  return this.setItem(key, value);
}
$dynamic("forEach").Storage = function(f) {
  for (var i = (0);
   true; i = $add$(i, (1))) {
    var key = this.key(i);
    if ($eq$(key)) return;
    f(key, this.$index(key));
  }
}
$dynamic("get$length").Storage = function() {
  return this.get$$$dom_length();
}
$dynamic("get$$$dom_length").Storage = function() {
  return this.length;
}
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").StyleSheetList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").StyleSheetList = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
$dynamic("get$data").TextEvent = function() { return this.data; };
$dynamic("get$on").TextTrack = function() {
  return new _TextTrackEventsImpl(this);
}
$inherits(_TextTrackEventsImpl, _EventsImpl);
function _TextTrackEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$on").TextTrackCue = function() {
  return new _TextTrackCueEventsImpl(this);
}
$inherits(_TextTrackCueEventsImpl, _EventsImpl);
function _TextTrackCueEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
$dynamic("get$on").TextTrackList = function() {
  return new _TextTrackListEventsImpl(this);
}
$dynamic("get$length").TextTrackList = function() { return this.length; };
$inherits(_TextTrackListEventsImpl, _EventsImpl);
function _TextTrackListEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
$dynamic("get$length").TimeRanges = function() { return this.length; };
$dynamic("get$clientX").Touch = function() { return this.clientX; };
$dynamic("get$clientY").Touch = function() { return this.clientY; };
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").TouchList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").TouchList = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("get$src").HTMLTrackElement = function() { return this.src; };
$dynamic("set$src").HTMLTrackElement = function(value) { return this.src = value; };
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Uint16Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Uint16Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Uint32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Uint32Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("removeLast").Uint8Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("removeRange").Uint8Array = function(start, rangeLength) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
$dynamic("get$on").WebSocket = function() {
  return new _WebSocketEventsImpl(this);
}
$inherits(_WebSocketEventsImpl, _EventsImpl);
function _WebSocketEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_WebSocketEventsImpl.prototype.get$close = function() {
  return this._get("close");
}
_WebSocketEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_WebSocketEventsImpl.prototype.get$message = function() {
  return this._get("message");
}
_WebSocketEventsImpl.prototype.get$open = function() {
  return this._get("open");
}
$dynamic("get$clientX").WheelEvent = function() { return this.clientX; };
$dynamic("get$clientY").WheelEvent = function() { return this.clientY; };
$dynamic("requestAnimationFrame$_").DOMWindow = function(callback) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
            };
      }
      return window.requestAnimationFrame(callback);
}
$dynamic("get$on").DOMWindow = function() {
  return new _WindowEventsImpl(this);
}
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
$dynamic("get$top").DOMWindow = function() { return this.top; };
$inherits(_WindowEventsImpl, _EventsImpl);
function _WindowEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_WindowEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_WindowEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
_WindowEventsImpl.prototype.get$message = function() {
  return this._get("message");
}
$dynamic("get$on").Worker = function() {
  return new _WorkerEventsImpl(this);
}
$inherits(_WorkerEventsImpl, _AbstractWorkerEventsImpl);
function _WorkerEventsImpl(_ptr) {
  _AbstractWorkerEventsImpl.call(this, _ptr);
}
$dynamic("get$on").XMLHttpRequest = function() {
  return new _XMLHttpRequestEventsImpl(this);
}
$inherits(_XMLHttpRequestEventsImpl, _EventsImpl);
function _XMLHttpRequestEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_XMLHttpRequestEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_XMLHttpRequestEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
$dynamic("get$on").XMLHttpRequestUpload = function() {
  return new _XMLHttpRequestUploadEventsImpl(this);
}
$inherits(_XMLHttpRequestUploadEventsImpl, _EventsImpl);
function _XMLHttpRequestUploadEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_XMLHttpRequestUploadEventsImpl.prototype.get$error = function() {
  return this._get("error");
}
_XMLHttpRequestUploadEventsImpl.prototype.get$load = function() {
  return this._get("load");
}
$dynamic("get$name").XPathException = function() { return this.name; };
function _MeasurementRequest(computeValue, completer) {
  this.exception = false;
  this.computeValue = computeValue;
  this.completer = completer;
}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
function _WebSocketFactoryProvider() {}
_WebSocketFactoryProvider.WebSocket$factory = function(url) {
  return new WebSocket(url);
}
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._html_array.get$length() > this._html_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_array.$index(this._html_pos++);
}
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._html_length > this._html_pos;
}
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
$inherits(_VariableSizeListIterator_html_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Node(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Node(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Node.call(this, array);
}
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, array);
}
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Touch.call(this, array);
}
function get$$window() {
  return window;
}
function get$$document() {
  return document;
}
var _cachedBrowserPrefix;
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    get$$window().get$on().get$message().add((function (e) {
      return _completeMeasurementFutures();
    })
    , false);
    $globals._firstMeasurementRequest = false;
  }
  get$$window().postMessage("DART-MEASURE", "*");
}
function _createMeasurementFuture(computeValue, completer) {
  if (null == $globals._pendingRequests) {
    $globals._pendingRequests = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingRequests.add(new _MeasurementRequest(computeValue, completer));
  return completer.get$future();
}
function _completeMeasurementFutures() {
  if ($eq$($globals._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $globals._nextMeasurementFrameScheduled = false;
  if (null != $globals._pendingRequests) {
    var $$list = $globals._pendingRequests;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      try {
        request.value = request.computeValue();
      } catch (e) {
        e = _toDartException(e);
        request.value = e;
        request.exception = true;
      }
    }
  }
  var completedRequests = $globals._pendingRequests;
  var readyMeasurementFrameCallbacks = $globals._pendingMeasurementFrameCallbacks;
  $globals._pendingRequests = null;
  $globals._pendingMeasurementFrameCallbacks = null;
  if (null != completedRequests) {
    for (var $$i = completedRequests.iterator(); $$i.hasNext(); ) {
      var request = $$i.next();
      if (request.exception) {
        request.completer.completeException(request.value);
      }
      else {
        request.completer.complete(request.value);
      }
    }
  }
  if (null != readyMeasurementFrameCallbacks) {
    for (var $$i = readyMeasurementFrameCallbacks.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next();
      handler();
    }
  }
}
function Game(assetManager) {
  this.debugMode = false;
  this.enableSound = true;
  this.bgStyle = "rgba(0, 0, 0, 0.85)";
  this._supportsMp3 = null;
  this.showOutlines = false;
  this.assetManager = assetManager;
  this.timer = new Timer();
  this.entities = [];
}
Game.prototype.set$debugMode = function(value) { return this.debugMode = value; };
Game.prototype.set$enableSound = function(value) { return this.enableSound = value; };
Game.prototype.init = function(context) {
  var $this = this;
  this.ctx = context;
  this.surfaceWidth = this.ctx.canvas.width;
  this.surfaceHeight = this.ctx.canvas.height;
  this.halfSurfaceWidth = this.surfaceWidth / (2);
  this.halfSurfaceHeight = this.surfaceHeight / (2);
  var futureRect = this.ctx.canvas.get$rect();
  futureRect.then((function (rect) {
    $this.clientBoundingRect = new dgame_Point(rect.get$bounding().get$left(), rect.get$bounding().get$top());
  })
  );
  this.startInput();
  print$("game initialized");
}
Game.prototype.start = function() {
  print$("starting game");
  get$$window().requestAnimationFrame$_(this.get$loop());
}
Game.prototype.loop = function(time) {
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();
  this.click = null;
  get$$window().requestAnimationFrame$_(this.get$loop());
}
Game.prototype.get$loop = function() {
  return this.loop.bind(this);
}
Game.prototype.startInput = function() {
  var $this = this;
  print$("Starting input");
  function getXandY(e) {
    var x = e.get$clientX() - $this.clientBoundingRect.x - ($this.ctx.canvas.width / (2));
    var y = e.get$clientY() - $this.clientBoundingRect.y - ($this.ctx.canvas.height / (2));
    return new dgame_Point(x, y);
  }
  get$$document().get$on().get$click().add((function (e) {
    $this.click = getXandY(e);
  })
  , false);
  get$$document().get$on().get$mouseMove().add((function (e) {
    $this.mouse = getXandY(e);
  })
  , false);
  print$("Input started");
}
Game.prototype.addEntity = function(entity) {
  this.entities.add(entity);
}
Game.prototype.draw = function() {
  this.ctx.clearRect((0), (0), this.ctx.canvas.width, this.ctx.canvas.height);
  this.ctx.fillStyle = this.bgStyle;
  this.ctx.fillRect((0), (0), this.ctx.canvas.width, this.ctx.canvas.height);
  this.ctx.save();
  this.ctx.translate(this.ctx.canvas.width / (2), this.ctx.canvas.height / (2));
  var $$list = this.entities;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var entity = $$i.next();
    entity.draw(this.ctx);
  }
  this.drawBeforeCtxRestore();
  this.ctx.restore();
}
Game.prototype.drawBeforeCtxRestore = function() {
  if (this.debugMode) this.drawDebugInfo();
}
Game.prototype.drawDebugInfo = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  this.ctx.font = "16px Verdana";
  this.ctx.fillText(("FPS: " + this.timer.fps.toStringAsFixed((1))), (this.halfSurfaceWidth - (120)), -(this.halfSurfaceHeight - (30)));
}
Game.prototype.playSound = function(path, volume) {
  if (!this.enableSound) return;
  if (this._supportsMp3 == null) {
    var audio = _ElementFactoryProvider.Element$tag$factory("audio");
    this._supportsMp3 = audio.canPlayType("audio/mpeg", "") != "";
  }
  if ($eq$(this._supportsMp3, true)) path = $add$(path, ".mp3");
  else path = $add$(path, ".ogg");
  var s = this.assetManager.getAsset(path);
  if ($eq$(s)) return;
  var c = s.cloneNode(true);
  c.volume = this.round(volume, (3));
  c.play();
}
Game.prototype.round = function(value, decimals) {
  var o = Math.pow((10), decimals);
  return (value * o).round() / o;
}
Game.prototype.update = function() {
  var entitiesCount = this.entities.get$length();
  for (var i = (0);
   $lt$(i, entitiesCount); i = $add$(i, (1))) {
    var entity = this.entities.$index(i);
    if (!entity.get$removeFromWorld()) {
      entity.update$0();
    }
  }
  for (var i = this.entities.get$length() - (1);
   $gte$(i, (0)); (i = $sub$(i, (1)))) {
    if (this.entities.$index(i).get$removeFromWorld()) {
      this.entities.removeRange(i, (1));
    }
  }
}
Game.prototype.start$0 = Game.prototype.start;
Game.prototype.update$0 = Game.prototype.update;
function AssetManager() {
  this._successCount = (0);
  this._errorCount = (0);
  this._downloadQueue = [];
  this._cache = new HashMapImplementation();
}
AssetManager.prototype.queueDownload = function(path) {
  this._downloadQueue.add(path);
}
AssetManager.prototype.downloadAll = function(downloadCallback) {
  var $this = this;
  if (this._downloadQueue.get$length() == (0)) {
    downloadCallback.call$0();
  }
  var $$list = this._downloadQueue;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var path = $$i.next();
    var isImg = this.isImage(path);
    var el = _ElementFactoryProvider.Element$tag$factory(isImg ? "img" : "audio");
    if (isImg) {
      el.get$on().get$load().add$1((function (el, event) {
        print$($add$(el.get$src(), " is loaded"));
        $this._successCount = $this._successCount + (1);
        if ($this.isDone()) {
          downloadCallback.call$0();
        }
      }).bind(null, el)
      );
      el.get$on().get$error().add$1((function (event) {
        $this._errorCount = $this._errorCount + (1);
        if ($this.isDone()) {
          downloadCallback.call$0();
        }
      })
      );
    }
    else {
      print$($add$(path, " is loaded"));
      el.get$attributes().$setindex("preload", "auto");
      el.load();
      this._successCount = this._successCount + (1);
      if (this.isDone()) {
        downloadCallback.call$0();
      }
    }
    el.set$src(path);
    this._cache.$setindex(path, el);
  }
}
AssetManager.prototype.getAsset = function(path) {
  return this._cache.$index(path);
}
AssetManager.prototype.isDone = function() {
  return (this._downloadQueue.get$length() == this._successCount + this._errorCount);
}
AssetManager.prototype.isImage = function(path) {
  if (path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".gif")) return true;
  return false;
}
function Timer() {
  this.gameTime = (0);
  this.wallLastTimestamp = (0);
  this.fps = (0);
}
Timer.prototype.tick = function() {
  var wallCurrent = new DateImplementation.now$ctor().value;
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / (1000);
  this.wallLastTimestamp = wallCurrent;
  this.fps = (1) / wallDelta;
  var gameDelta = Math.min(wallDelta, (0.05));
  this.gameTime = this.gameTime + gameDelta;
  return gameDelta;
}
function GameEntity(game) {
  this.x = (0);
  this.y = (0);
  this.width = (1);
  this.height = (1);
  this.removeFromWorld = false;
  this.opacity = (1);
  this.color = "255, 255, 255";
  this.fill = true;
  this.game = game;
  this.momentum = new Momentum((0), (0));
  this.box = new Rectangle(this.x, this.y, this.width, this.height);
}
GameEntity.withPosition$ctor = function(game, x, y, width, height) {
  this.x = (0);
  this.y = (0);
  this.width = (1);
  this.height = (1);
  this.removeFromWorld = false;
  this.opacity = (1);
  this.color = "255, 255, 255";
  this.fill = true;
  GameEntity.call(this, game);
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.box = new Rectangle(x, y, width, height);
  this.updateBox();
}
GameEntity.withPosition$ctor.prototype = GameEntity.prototype;
GameEntity.prototype.get$removeFromWorld = function() { return this.removeFromWorld; };
GameEntity.prototype.update = function() {
  this.momentum.update(this.game.clockTick);
  this.x = this.x + (this.momentum.xVel * this.game.clockTick);
  this.y = this.y + (this.momentum.yVel * this.game.clockTick);
  this.updateBox();
}
GameEntity.prototype.updateBox = function() {
  if ($ne$(this.sprite)) return;
  this.box.x = this.x - (this.width / (2));
  this.box.y = this.y - (this.height / (2));
  this.box.height = this.height;
  this.box.width = this.width;
}
GameEntity.prototype.draw = function(ctx) {
  if (this.color != null) {
    if (this.fill) {
      ctx.fillStyle = ("rgba(" + this.color + ", " + this.opacity + ")");
      ctx.fillRect(this.box.x, this.box.y, this.box.width, this.box.height);
    }
    else {
      ctx.strokeStyle = ("rgba(" + this.color + ", " + this.opacity + ")");
      ctx.strokeRect(this.box.x, this.box.y, this.box.width, this.box.height);
    }
  }
  if (this.game.showOutlines) {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.arc(this.x, this.y, this.radius, (0), (6.283185307179586), false);
    ctx.stroke();
    ctx.closePath();
  }
}
GameEntity.prototype.collidesWith = function(entity) {
  return !(((this.box.y + this.box.height) < (entity.box.y)) || (this.box.y > (entity.box.y + entity.box.height)) || ((this.box.x + this.box.width) < entity.box.x) || (this.box.x > (entity.box.x + entity.box.width)));
}
GameEntity.prototype.update$0 = GameEntity.prototype.update;
function dgame_Point(x, y) {
  this.x = x;
  this.y = y;
}
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
function Momentum(xVel, yVel, xAccel, yAccel, xMax, yMax) {
  this.xVel = xVel;
  this.yVel = yVel;
  this.xAccel = xAccel;
  this.yAccel = yAccel;
  this.xMax = xMax;
  this.yMax = yMax;
}
Momentum.prototype.update = function(clockTick) {
  if (this.xAccel != null && this.xAccel != (0) && this.xVel.abs() < this.xMax) if (this.xVel > (0)) this.xVel = this.xVel + (this.xAccel * clockTick);
  else this.xVel = this.xVel - (this.xAccel * clockTick);
  if (this.yAccel != null && this.yAccel != (0) && this.yVel.abs() < this.yMax) if (this.yVel > (0)) this.yVel = this.yVel + (this.yAccel * clockTick);
  else this.yVel = this.yVel - (this.yAccel * clockTick);
  if (this.xVel != null && this.xMax != null && this.xVel.abs() > this.xMax) this.xVel = this.xVel > (0) ? this.xMax : -(this.xMax);
  if (this.yVel != null && this.yMax != null && this.yVel.abs() > this.yMax) this.yVel = this.yVel > (0) ? this.yMax : -(this.yMax);
}
$inherits(Paddle, GameEntity);
function Paddle(game, x, y) {
  this.score = (0);
  GameEntity.withPosition$ctor.call(this, game, x, y, (8), (120));
  this.opacity = (0.2);
}
Paddle.prototype.update = function() {
  this.move();
  GameEntity.prototype.update.call(this);
}
Paddle.prototype.move = function() {
  if (this.game.mouse != null) this.y = this.game.mouse.y;
}
Paddle.prototype.fade = function() {
  var $this = this;
  this.opacity = (0.5);
  get$$window().setTimeout((function () {
    $this.opacity = (0.4);
  })
  , (50));
  get$$window().setTimeout((function () {
    $this.opacity = (0.3);
  })
  , (100));
  get$$window().setTimeout((function () {
    $this.opacity = (0.2);
  })
  , (150));
}
Paddle.prototype.update$0 = Paddle.prototype.update;
$inherits(ComputerPaddle, Paddle);
function ComputerPaddle(game, x, y) {
  Paddle.call(this, game, x, y);
}
ComputerPaddle.prototype.move = function() {
  var g = this.game;
  if (g.ball.momentum.xVel < (0)) {
    if (this.y < (5) && this.y > (-5)) this.y = this.y + (0);
    else if (this.y > (0)) this.y = this.y - (3);
    else if (this.y < (0)) this.y = this.y + (3);
  }
  else {
    if (g.ball.y < (this.y + (10)) && g.ball.y > (this.y - (10)) || g.ball.y == this.y) this.y = this.y + (0);
    if (g.ball.y > this.y) this.y = this.y + (3);
    else if (g.ball.y < this.y) this.y = this.y - (3);
  }
}
$inherits(PongGame, Game);
function PongGame(assetManager) {
  this.score = (0);
  this.highscore = (0);
  Game.call(this, assetManager);
}
PongGame.prototype.start = function() {
  this.player1 = new Paddle(this, -(this.halfSurfaceWidth - (10)), (10));
  this.player2 = new ComputerPaddle(this, this.halfSurfaceWidth - (10), (10));
  this.ball = new Ball(this, (0), (0));
  this.addEntity(this.ball);
  this.addEntity(this.player1);
  this.addEntity(this.player2);
  this.newGame();
  Game.prototype.start.call(this);
}
PongGame.prototype.drawBeforeCtxRestore = function() {
  this.drawMiddleLine();
  this.drawScore();
  Game.prototype.drawBeforeCtxRestore.call(this);
}
PongGame.prototype.drawDebugInfo = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  this.ctx.font = "16px Verdana";
  this.ctx.fillText(("V: " + this.ball.momentum.xVel.toStringAsFixed((0))), -(this.halfSurfaceWidth - (20)), -(this.halfSurfaceHeight - (30)));
  Game.prototype.drawDebugInfo.call(this);
}
PongGame.prototype.drawScore = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
  this.ctx.font = "26px cinnamoncake, Verdana";
  this.ctx.fillText(("" + this.player1.score + "              " + this.player2.score), (-60), -(this.halfSurfaceHeight - (30)));
}
PongGame.prototype.drawMiddleLine = function() {
  this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  this.ctx.lineWidth = (3);
  this.ctx.beginPath();
  this.dashedLine((0), -(this.halfSurfaceHeight), (0), this.halfSurfaceHeight);
  this.ctx.stroke();
}
PongGame.prototype.ballHit = function() {
  this.score++;
  this.subtleBgFade();
}
PongGame.prototype.newGame = function() {
  this.ball.x = (0);
  this.ball.y = (0);
  this.ball.momentum.yVel = (20);
  this.ball.momentum.xVel = this.ball.startVel;
}
PongGame.prototype.gameOver = function() {
  this.playSound("sounds/sweep.ogg", (1.0));
  this.bgFade();
  if (this.score > this.highscore) {
    this.highscore = this.player1.score;
    get$$window().localStorage.$setindex("highscore", this.player1.score.toString());
  }
  this.newGame();
}
PongGame.prototype.subtleBgFade = function() {
  var $this = this;
  this.bgStyle = "rgba(0, 0, 0, 0.84)";
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.83)";
  }
  , (25));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.82)";
  }
  , (50));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.81)";
  }
  , (75));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.82)";
  }
  , (100));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.83)";
  }
  , (125));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.84)";
  }
  , (150));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.85)";
  }
  , (175));
}
PongGame.prototype.bgFade = function() {
  var $this = this;
  this.bgStyle = "rgba(0, 0, 0, 0.8)";
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.75)";
  }
  , (25));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.70)";
  }
  , (50));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.65)";
  }
  , (75));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.60)";
  }
  , (100));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.55)";
  }
  , (125));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.60)";
  }
  , (150));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.65)";
  }
  , (175));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.70)";
  }
  , (200));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.75)";
  }
  , (225));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.80)";
  }
  , (250));
  get$$window().setTimeout(function function_() {
    $this.bgStyle = "rgba(0, 0, 0, 0.85)";
  }
  , (275));
}
PongGame.prototype.dashedLine = function(x, y, x2, y2, da) {
  var $0;
  if ($eq$(da)) da = [(10), (5)];
  var dashCount = da.get$length();
  this.ctx.moveTo(x, y);
  var dx = ($sub$(x2, x)), dy = ($sub$(y2, y));
  var slope = dy;
  if ($ne$(dx, (0))) slope = $div$(dy, dx);
  var distRemaining = Math.sqrt($mul$(dx, dx) + $mul$(dy, dy));
  var dashIndex = (0), drawLine = true;
  while ($gte$(distRemaining, (0.1)) && $lt$(dashIndex, (10000))) {
    var dashLength = da.$index($mod$(($0 = dashIndex, dashIndex = $add$(dashIndex, (1)), $0), dashCount));
    if ($gt$(dashLength, distRemaining)) dashLength = distRemaining;
    var xStep = Math.sqrt($mul$(dashLength, dashLength) / ((1) + $mul$(slope, slope)));
    x = $add$(x, xStep);
    y = $add$(y, ($mul$(slope, xStep)));
    if (drawLine) this.ctx.lineTo(x, y);
    else this.ctx.moveTo(x, y);
    distRemaining = $sub$(distRemaining, dashLength);
    drawLine = !drawLine;
  }
  this.ctx.moveTo((0), (0));
}
PongGame.prototype.start$0 = PongGame.prototype.start;
$inherits(Ball, GameEntity);
function Ball(game, x, y) {
  this.startVel = (400);
  this.reflectX = (1);
  GameEntity.withPosition$ctor.call(this, game, x, y, (8), (8));
  this.momentum.xMax = (1400);
  this.momentum.xAccel = (15);
}
Ball.prototype.update = function() {
  var $0, $1, $2;
  var g = this.game;
  var angle = Math.atan2(this.momentum.xVel.abs(), this.momentum.yVel.abs()) / (0.017453292519943295);
  if (this.y > this.game.halfSurfaceHeight - (4) || this.y < -(this.game.halfSurfaceHeight)) {
    ($0 = this.momentum).yVel = $0.yVel * (-1);
    var volume = ((90) - angle) / (50);
    volume = Math.min(volume, (1));
    this.game.playSound("sounds/hit3", volume);
  }
  if (this.collidesWith(g.player1) && this.reflectX < (0)) {
    g.ballHit();
    this.ballHit(g.player1);
    this.reflectX = (1);
    this.game.playSound("sounds/hit1", (1.0));
  }
  else if (this.collidesWith(g.player2) && this.reflectX > (0)) {
    g.ballHit();
    this.ballHit(g.player2);
    this.reflectX = (-1);
    this.game.playSound("sounds/hit2", (1.0));
  }
  if (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth)) {
    if (this.x > (0)) {
      this.x = (-200);
      if (Math.random() > (0.5)) this.momentum.yVel = Math.random() * (200);
      else this.momentum.yVel = Math.random() * (-200);
      this.startVel = (400);
      this.reflectX = (1);
      ($1 = g.player1).score = $1.score + (1);
    }
    else {
      this.x = (200);
      if (Math.random() > (0.5)) this.momentum.yVel = Math.random() * (200);
      else this.momentum.yVel = Math.random() * (-200);
      this.startVel = (-400);
      this.reflectX = (-1);
      ($2 = g.player2).score = $2.score + (1);
    }
    g.gameOver();
  }
  GameEntity.prototype.update.call(this);
}
Ball.prototype.ballHit = function(paddle) {
  var $0;
  paddle.fade();
  var hitPlace = -(paddle.y - this.y);
  this.momentum.yVel = $mul$(hitPlace, (5));
  ($0 = this.momentum).xVel = $0.xVel * (-1);
  if (this.momentum.xVel > (600)) this.momentum.xAccel = (5);
}
Ball.prototype.update$0 = Ball.prototype.update;
function main() {
  var canvas = get$$document().query("#surface");
  var ctx = canvas.getContext("2d");
  var assetManager = new AssetManager();
  assetManager.queueDownload("sounds/hit1.ogg");
  assetManager.queueDownload("sounds/hit2.ogg");
  assetManager.queueDownload("sounds/hit3.ogg");
  assetManager.queueDownload("sounds/sweep.ogg");
  assetManager.queueDownload("sounds/hit1.mp3");
  assetManager.queueDownload("sounds/hit2.mp3");
  assetManager.queueDownload("sounds/hit3.mp3");
  assetManager.queueDownload("sounds/sweep.mp3");
  var ws = _WebSocketFactoryProvider.WebSocket$factory("ws://localhost:8000/ws");
  ws.get$on().get$open().add((function (event) {
    var ret = ws.send("Hello");
    print$(("Sent: " + ret));
  })
  , false);
  ws.get$on().get$message().add((function (event) {
    print$(("Got an event: " + event));
    print$($add$("The data in the event is: ", event.get$data()));
  })
  , false);
  ws.get$on().get$error().add((function (event) {
    print$(("whoa: " + event));
  })
  , false);
  ws.get$on().get$close().add((function (event) {
    print$(("whoa: " + event));
  })
  , false);
  var game = new PongGame(assetManager);
  game.set$enableSound(true);
  game.set$debugMode(true);
  assetManager.downloadAll((function () {
    game.init(ctx);
    game.start$0();
  })
  );
}
(function(){
  var v0/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v1/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v2/*HTMLDocument*/ = 'HTMLDocument|SVGDocument';
  var v3/*DocumentFragment*/ = 'DocumentFragment|ShadowRoot';
  var v4/*Element*/ = [v0/*HTMLMediaElement*/,'Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v5/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v6/*IDBRequest*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v7/*MediaStream*/ = 'MediaStream|LocalMediaStream';
  var v8/*Node*/ = [v1/*CharacterData*/,v2/*HTMLDocument*/,v3/*DocumentFragment*/,v4/*Element*/,'Node|Attr|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v9/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    ['AbstractWorker', v5/*AbstractWorker*/]
    , ['AudioParam', 'AudioParam|AudioGain']
    , ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue|WebKitCSSFilterValue']
    , ['CharacterData', v1/*CharacterData*/]
    , ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLDocument', v2/*HTMLDocument*/]
    , ['DocumentFragment', v3/*DocumentFragment*/]
    , ['HTMLMediaElement', v0/*HTMLMediaElement*/]
    , ['Element', v4/*Element*/]
    , ['Entry', 'Entry|DirectoryEntry|FileEntry']
    , ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync']
    , ['IDBRequest', v6/*IDBRequest*/]
    , ['MediaStream', v7/*MediaStream*/]
    , ['Node', v8/*Node*/]
    , ['WorkerContext', v9/*WorkerContext*/]
    , ['EventTarget', [v5/*AbstractWorker*/,v6/*IDBRequest*/,v7/*MediaStream*/,v8/*Node*/,v9/*WorkerContext*/,'EventTarget|AudioContext|BatteryManager|DOMApplicationCache|DeprecatedPeerConnection|EventSource|FileReader|FileWriter|IDBDatabase|IDBTransaction|MediaController|MessagePort|Notification|PeerConnection00|SpeechRecognition|TextTrack|TextTrackCue|TextTrackList|WebSocket|DOMWindow|XMLHttpRequest|XMLHttpRequestUpload'].join('|')]
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
function $static_init(){
  $globals._firstMeasurementRequest = true;
  $globals._nextMeasurementFrameScheduled = false;
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = new JSSyntaxRegExp("^#[_a-zA-Z]\\w*$");
var const$0005 = Object.create(EmptyQueueException.prototype, {});
var const$0006 = Object.create(IllegalAccessException.prototype, {});
var const$0007 = _constMap([]);
var $globals = {};
$static_init();
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    main();
  });
} else {
  main();
}
