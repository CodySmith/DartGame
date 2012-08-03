function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["isUtc?", "millisecondsSinceEpoch?"],
 super: "Object",
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
 },
 get$second: function() {
  return $.Primitives_getSeconds(this);
 },
 get$minute: function() {
  return $.Primitives_getMinutes(this);
 },
 get$hour: function() {
  return $.Primitives_getHours(this);
 },
 get$day: function() {
  return $.Primitives_getDay(this);
 },
 get$month: function() {
  return $.Primitives_getMonth(this);
 },
 get$year: function() {
  return $.Primitives_getYear(this);
 },
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
 },
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.$call$1(this.get$year());
  var m = t3.$call$1(this.get$month());
  var d = t3.$call$1(this.get$day());
  var h = t3.$call$1(this.get$hour());
  var min = t3.$call$1(this.get$minute());
  var sec = t3.$call$1(this.get$second());
  var ms = t2.$call$1(this.get$millisecond());
  if (this.isUtc === true) return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
 },
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
 },
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object' && other !== null) && !!other.is$Date)) return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000)) throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null) throw $.captureStackTrace($.IllegalArgumentException$(t1));
 },
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
 },
 is$Date: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib0_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null) throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib0_value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null)) {
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null)) this._exceptionHandled = onException.$call$1(t1);
  } else $.add$1(this._exceptionHandlers, onException);
 },
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true) onSuccess.$call$1(this.get$value());
  else {
    if (this.get$isComplete() !== true) $.add$1(this._successListeners, onSuccess);
    else {
      if (this._exceptionHandled !== true) throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$stackTrace: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
 },
 get$exception: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._exception;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null)) throw $.captureStackTrace(t1);
  return this._lib0_value;
 }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
 },
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_lib0_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._lib0_keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._lib0_keys, i);
    !(key == null) && !(key === $.CTC5) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._lib0_keys, i);
    !(key == null) && !(key === $.CTC5) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._lib0_keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1.length;
    if (index < 0 || index >= t3) throw $.ioore(index);
    var t4 = t1[index] === $.CTC5;
    t1 = t4;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._lib0_keys;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1.length;
  if (index < 0 || index >= t5) throw $.ioore(index);
  t1[index] = value;
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._lib0_keys;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && !($.index(t1, index) == null))) {
        switch (state) {
          case 0:
            t1 = this._lib0_keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC5;
            t1 = t3;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      }
      t1 = this._lib0_keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._lib0_keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._lib0_keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._lib0_keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._lib0_keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._lib0_keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._lib0_keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, ({E: 'V'}));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC5) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._lib0_keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._lib0_keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._lib0_keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._lib0_keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, ({E: 'V'}));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC5) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._lib0_keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._lib0_keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._lib0_keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._lib0_keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib0_keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._lib0_keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib0_keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib0_keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._lib0_keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3) throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if (insertionIndex < 0 && $.CTC5 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib0_keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib0_keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._lib0_keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC5 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib0_keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._lib0_keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 some$1: function(f) {
  return $.some(this._backingMap.getKeys$0(), f);
 },
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC5));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC5));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
  t2[t1] === $.CTC5 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC5 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_lib0_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._lib0_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._lib0_element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib0_element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_lib0_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC4);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC4);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib0_element()) === true && other.addLast$1(entry.get$_lib0_element());
    entry = nextEntry;
  }
  return other;
 },
 some$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_lib0_element()) === true) return true;
    entry = nextEntry;
  }
  return false;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib0_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number') return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_lib0_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 start$0: function() {
  return this._lib0_start;
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.ConstantMap = {"":
 ["_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var result = [];
  $.forEach(this._keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
 },
 getKeys$0: function() {
  return this._keys;
 },
 forEach$1: function(f) {
  $.forEach(this._keys, new $.ConstantMap_forEach_anon(this, f));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) return;
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) return false;
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._start;
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
 }
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 }
};

$$.CastException = {"":
 ["expectedType", "actualType"],
 super: "Object",
 toString$0: function() {
  return 'CastException: Casting value of type ' + $.S(this.actualType) + ' to' + ' incompatible type ' + $.S(this.expectedType);
 }
};

$$.PongGame = {"":
 ["ball?", "player2?", "player1?", "p2Dead!", "p1Dead!", "paused=", "lastPowerUp", "highscore", "score=", "includeUI", "showOutlines", "_supportsMp3", "bgStyle", "enableSound", "debugMode", "assetManager", "clientPoint", "surfaceHeight", "surfaceWidth", "clockTick", "timer", "mouse", "click", "ctx", "entities"],
 super: "Game",
 bgFade$0: function() {
  this.bgStyle = 'rgba(0, 0, 0, 0.8)';
  $.window().setTimeout$2(new $.PongGame_bgFade_function(this), 25);
  $.window().setTimeout$2(new $.PongGame_bgFade_function0(this), 50);
  $.window().setTimeout$2(new $.PongGame_bgFade_function1(this), 75);
  $.window().setTimeout$2(new $.PongGame_bgFade_function2(this), 100);
  $.window().setTimeout$2(new $.PongGame_bgFade_function3(this), 125);
  $.window().setTimeout$2(new $.PongGame_bgFade_function4(this), 150);
  $.window().setTimeout$2(new $.PongGame_bgFade_function5(this), 175);
  $.window().setTimeout$2(new $.PongGame_bgFade_function6(this), 200);
  $.window().setTimeout$2(new $.PongGame_bgFade_function7(this), 225);
  $.window().setTimeout$2(new $.PongGame_bgFade_function8(this), 250);
  $.window().setTimeout$2(new $.PongGame_bgFade_function9(this), 275);
 },
 subtleBgFade$0: function() {
  this.bgStyle = 'rgba(0, 0, 0, 0.84)';
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function(this), 25);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function0(this), 50);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function1(this), 75);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function2(this), 100);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function3(this), 125);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function4(this), 150);
  $.window().setTimeout$2(new $.PongGame_subtleBgFade_function5(this), 175);
 },
 gameOver$0: function() {
  this.playSound$1('Sounds/sweep');
  this.bgFade$0();
  this.newGame$0();
 },
 newGame$0: function() {
  this.ball.set$y(0);
  this.score = 0;
  var t1 = this.entities;
  $.forEach($.filter(t1, new $.PongGame_newGame_anon()), new $.PongGame_newGame_anon0());
  $.forEach($.filter(t1, new $.PongGame_newGame_anon1()), new $.PongGame_newGame_anon2());
  if ($.gtB($.Math_random(), 0.5)) {
    t1 = $.Utils_random(0, 200, false);
    this.ball.get$momentum().set$yVel(t1);
  } else {
    t1 = $.Utils_random(-200, 0, false);
    this.ball.get$momentum().set$yVel(t1);
  }
  if ($.eqB(this.p1Dead, true) || this.player1 == null) {
    this.player1 = $.Paddle$(this, $.neg($.sub(this.get$halfSurfaceWidth(), 10)), 10);
    this.addEntity$1(this.player1);
    this.p1Dead = false;
  }
  if ($.eqB(this.p2Dead, true) || this.player2 == null) {
    this.player2 = $.ComputerPaddle$(this, $.sub(this.get$halfSurfaceWidth(), 10), 10, 3);
    this.addEntity$1(this.player2);
    this.p2Dead = false;
  }
  this.player1.set$height(120);
  this.player2.set$height(120);
  this.timer.set$gameTime(0);
  t1 = this.ball.get$startVel();
  this.ball.get$momentum().set$xVel(t1);
 },
 ballHit$0: function() {
  this.score = $.add(this.score, 1);
  this.subtleBgFade$0();
 },
 drawMiddleLine$0: function() {
  var t1 = this.ctx;
  t1.set$strokeStyle('rgba(255, 255, 255, 0.1)');
  t1.set$lineWidth(3);
  t1.beginPath$0();
  $.Utils_drawDashedLine(t1, 0, $.neg(this.get$halfSurfaceHeight()), 0, this.get$halfSurfaceHeight(), null);
  t1.stroke$0();
 },
 drawScore$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 1)');
  t1.set$font('26px cinnamoncake, Verdana');
  t1.fillText$3($.S(this.player1.get$score()) + '              ' + $.S(this.player2.get$score()) + '                               Rally Length: ' + $.S(this.score), -60, $.neg($.sub(this.get$halfSurfaceHeight(), 30)));
 },
 drawDebugInfo$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 0.2)');
  t1.set$font('16px Verdana');
  t1.fillText$3('V: ' + $.S($.toStringAsFixed(this.ball.get$momentum().get$xVel(), 0)), $.neg($.sub(this.get$halfSurfaceWidth(), 20)), $.neg($.sub(this.get$halfSurfaceHeight(), 30)));
  $.Game.prototype.drawDebugInfo$0.call(this);
 },
 run$0: function() {
  var t1 = new $.PongGame_run_onKeyboardEvent(this);
  $.document().get$window().get$on().get$keyDown().add$2(t1, false);
 },
 newBullet$3: function(x, y, p1) {
  if ($.eqB(p1, true)) {
    var t1 = this.player1;
    t1.set$bullet($.sub(t1.get$bullet(), 1));
  } else {
    t1 = this.player2;
    t1.set$bullet($.sub(t1.get$bullet(), 1));
  }
  this.addEntity$1($.Bullet$(this, x, y, p1));
 },
 newPowerUp$0: function() {
  if ($.geB($.Math_random(), 0.1)) return;
  var t1 = this.entities;
  if ($.geB($.get$length($.filter(t1, new $.PongGame_newPowerUp_anon())), 5)) return;
  var t2 = this.timer;
  if ($.ltB(t2.get$gameTime(), 5)) return;
  if ($.geB($.add(this.lastPowerUp, 5), t2.get$gameTime())) return;
  var powerUp = $.PowerUp$(this, 0, 0);
  do {
    powerUp.set$x($.Utils_random($.add($.neg(this.get$halfSurfaceWidth()), 100), $.sub(this.get$halfSurfaceWidth(), 100), false));
    powerUp.set$y($.Utils_random($.add($.neg(this.get$halfSurfaceHeight()), 50), $.sub(this.get$halfSurfaceHeight(), 50), false));
  } while ($.some($.filter(t1, new $.PongGame_newPowerUp_anon0()), new $.PongGame_newPowerUp_anon1(powerUp)) === true);
  this.lastPowerUp = t2.get$gameTime();
  this.addEntity$1(powerUp);
 },
 drawBeforeCtxRestore$0: function() {
  this.drawMiddleLine$0();
  this.drawScore$0();
  $.Game.prototype.drawBeforeCtxRestore$0.call(this);
 },
 update$0: function() {
  this.newPowerUp$0();
  $.Game.prototype.update$0.call(this);
 },
 start$0: function() {
  this.ball = $.Ball$(this, 0, 0);
  this.addEntity$1(this.ball);
  this.newGame$0();
  $.Game.prototype.start$0.call(this);
 }
};

$$.Paddle = {"":
 ["bulletTime=", "bullet=", "score=", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 fade$0: function() {
  this.opacity = 0.5;
  $.window().setTimeout$2(new $.Paddle_fade_anon(this), 50);
  $.window().setTimeout$2(new $.Paddle_fade_anon0(this), 100);
  $.window().setTimeout$2(new $.Paddle_fade_anon1(this), 150);
 },
 move$0: function() {
  var g = this.game;
  !(g.get$mouse() == null) && this.set$y(g.get$mouse().get$y());
  $.add$1($.document().get$on().get$click(), new $.Paddle_move_anon(this, g));
 },
 update$0: function() {
  this.move$0();
  $.GameEntity.prototype.update$0.call(this);
 },
 Paddle$3: function(game, x, y) {
  this.opacity = 0.2;
 }
};

$$.ComputerPaddle = {"":
 ["_skillLevel", "ballComing", "amountToMove", "targetOffset", "targetPaddleSide", "bulletTime", "bullet", "score", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "Paddle",
 getTargetOffset$0: function() {
  switch (this._skillLevel) {
    case 1:
      return $.Utils_random(-20, 20, true);
    case 2:
      return $.Utils_random(-10, 10, true);
    case 3:
      return $.Utils_random(-5, 5, true);
  }
  return 0;
 },
 getAmountToMove$0: function() {
  var n = $.Utils_random(0, 100, false);
  switch (this._skillLevel) {
    case 1:
      if ($.geB(n, 40)) return 3;
      if ($.geB(n, 10)) return 2;
      return 1;
    case 2:
      if ($.geB(n, 40)) return 4;
      if ($.geB(n, 10)) return 3;
      return 2;
    case 3:
      if ($.geB(n, 40)) return 5;
      if ($.geB(n, 10)) return 4;
      return 3;
  }
  return 3;
 },
 move$0: function() {
  var g = this.game;
  if (g.get$ball() == null) return;
  if ($.leB($.add(this.bulletTime, 0.25), g.get$timer().get$gameTime())) {
    if ($.geB(g.get$player2().get$bullet(), 1)) {
      if ($.geB($.add(this.get$y(), 60), g.get$player1().get$y()) && $.leB($.sub(this.get$y(), 60), g.get$player1().get$y())) {
        g.newBullet$3($.sub(this.get$x(), 10), this.get$y(), false);
        this.bulletTime = g.get$timer().get$gameTime();
      }
    }
  }
  if (!($.gtB(this.get$x(), 0) && $.gtB(g.get$ball().get$momentum().get$xVel(), 0))) {
    var newBallComing = $.ltB(this.get$x(), 0) && $.ltB(g.get$ball().get$momentum().get$xVel(), 0);
  } else newBallComing = true;
  var t1 = this.ballComing;
  if (t1 == null || !(newBallComing === t1)) {
    this.targetPaddleSide = $.Utils_random(-1, 1, true);
    this.targetOffset = this.getTargetOffset$0();
    this.amountToMove = this.getAmountToMove$0();
  }
  this.ballComing = newBallComing;
  var targetPosition = this.ballComing === true ? $.add(g.get$ball().get$y(), $.mul(this.targetPaddleSide, $.sub($.div(this.get$height(), 2), 5))) : 0;
  if ($.leB($.abs($.sub(this.get$y(), targetPosition)), 1)) return;
  if ($.gtB(this.get$y(), targetPosition)) this.set$y($.sub(this.get$y(), this.amountToMove));
  else this.set$y($.add(this.get$y(), this.amountToMove));
 },
 ComputerPaddle$4: function(game, x, y, skillLevel) {
  this._skillLevel = $.Math_max($.Math_min(skillLevel, 3), 1);
 }
};

$$.Ball = {"":
 ["startVel?", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 ballHit$1: function(paddle) {
  paddle.fade$0();
  var t1 = $.mul($.neg($.sub(paddle.get$y(), this.get$y())), 5);
  var t2 = this.momentum;
  t2.set$yVel(t1);
  t2.set$xVel($.mul(t2.get$xVel(), -1));
  $.gtB(t2.get$xVel(), 600) && t2.set$xAccel(5);
 },
 update$0: function() {
  $.GameEntity.prototype.update$0.call(this);
  var g = this.game;
  var t1 = this.momentum;
  var t2 = t1.get$xVel();
  if (typeof t2 !== 'number') return this.update$0$bailout(1, t2, g, t1, 0);
  if (t2 > 0) {
    t2 = this.box.get$right();
    if (typeof t2 !== 'number') return this.update$0$bailout(2, t2, g, t1, 0);
    var t4 = g.get$player2().get$box().get$left();
    if (typeof t4 !== 'number') return this.update$0$bailout(3, t2, g, t1, t4);
    if (t2 > t4) {
      t2 = g.get$player2().get$box().get$top();
      if (typeof t2 !== 'number') return this.update$0$bailout(4, g, t1, t2, 0);
      t4 = this.box.get$bottom();
      if (typeof t4 !== 'number') return this.update$0$bailout(5, g, t1, t2, t4);
      if (t2 < t4) {
        t2 = g.get$player2().get$box().get$bottom();
        if (typeof t2 !== 'number') return this.update$0$bailout(6, g, t1, t2, 0);
        t4 = this.box.get$top();
        if (typeof t4 !== 'number') return this.update$0$bailout(7, t4, g, t1, t2);
        t4 = t2 > t4;
        t2 = t4;
      } else t2 = false;
    } else t2 = false;
  } else t2 = false;
  if (t2) {
    t2 = g.get$player2().get$box().get$left();
    if (typeof t2 !== 'number') return this.update$0$bailout(8, g, t1, t2, 0);
    t4 = this.get$width();
    if (typeof t4 !== 'number') return this.update$0$bailout(9, g, t1, t2, t4);
    this.set$x(t2 - t4 / 2);
  }
  t2 = t1.get$xVel();
  if (typeof t2 !== 'number') return this.update$0$bailout(10, t2, g, t1, 0);
  if (t2 < 0) {
    t2 = this.box.get$left();
    if (typeof t2 !== 'number') return this.update$0$bailout(11, t2, g, t1, 0);
    t4 = g.get$player1().get$box().get$right();
    if (typeof t4 !== 'number') return this.update$0$bailout(12, t2, g, t1, t4);
    if (t2 < t4) {
      t2 = g.get$player1().get$box().get$top();
      if (typeof t2 !== 'number') return this.update$0$bailout(13, g, t1, t2, 0);
      t4 = this.box.get$bottom();
      if (typeof t4 !== 'number') return this.update$0$bailout(14, t4, g, t1, t2);
      if (t2 < t4) {
        t2 = g.get$player1().get$box().get$bottom();
        if (typeof t2 !== 'number') return this.update$0$bailout(15, t2, g, t1, 0);
        t4 = this.box.get$top();
        if (typeof t4 !== 'number') return this.update$0$bailout(16, t2, t4, g, t1);
        t4 = t2 > t4;
        t2 = t4;
      } else t2 = false;
    } else t2 = false;
  } else t2 = false;
  if (t2) {
    t2 = g.get$player1().get$box().get$right();
    if (typeof t2 !== 'number') return this.update$0$bailout(17, g, t1, t2, 0);
    t4 = this.get$width();
    if (typeof t4 !== 'number') return this.update$0$bailout(18, g, t1, t2, t4);
    this.set$x(t2 + t4 / 2);
  }
  t2 = t1.get$yVel();
  if (typeof t2 !== 'number') return this.update$0$bailout(19, t2, g, t1, 0);
  if (t2 > 0) {
    t2 = this.box.get$bottom();
    if (typeof t2 !== 'number') return this.update$0$bailout(20, t2, g, t1, 0);
    t4 = g.get$halfSurfaceHeight();
    if (typeof t4 !== 'number') return this.update$0$bailout(21, t2, t4, g, t1);
    t4 = t2 > t4;
    t2 = t4;
  } else t2 = false;
  if (t2) {
    t2 = g.get$halfSurfaceHeight();
    if (typeof t2 !== 'number') return this.update$0$bailout(22, g, t1, t2, 0);
    t4 = this.get$height();
    if (typeof t4 !== 'number') return this.update$0$bailout(23, g, t1, t4, t2);
    this.set$y(t2 - t4 / 2);
  }
  t2 = t1.get$yVel();
  if (typeof t2 !== 'number') return this.update$0$bailout(24, t2, g, t1, 0);
  if (t2 < 0) {
    t2 = this.box.get$top();
    if (typeof t2 !== 'number') return this.update$0$bailout(25, g, t1, t2, 0);
    t4 = g.get$halfSurfaceHeight();
    if (typeof t4 !== 'number') return this.update$0$bailout(26, t4, g, t1, t2);
    t2 = t2 < -t4;
  } else t2 = false;
  if (t2) {
    t2 = g.get$halfSurfaceHeight();
    if (typeof t2 !== 'number') return this.update$0$bailout(27, g, t1, t2, 0);
    t2 = -t2;
    t4 = this.get$height();
    if (typeof t4 !== 'number') return this.update$0$bailout(28, t4, g, t1, t2);
    this.set$y(t2 + t4 / 2);
  }
  t2 = this.box.get$bottom();
  if (typeof t2 !== 'number') return this.update$0$bailout(29, t2, g, t1, 0);
  t4 = g.get$halfSurfaceHeight();
  if (typeof t4 !== 'number') return this.update$0$bailout(30, t2, g, t1, t4);
  if (!(t2 >= t4)) {
    t2 = this.box.get$top();
    if (typeof t2 !== 'number') return this.update$0$bailout(31, g, t1, t2, 0);
    t4 = g.get$halfSurfaceHeight();
    if (typeof t4 !== 'number') return this.update$0$bailout(32, g, t1, t2, t4);
    t2 = t2 <= -t4;
  } else t2 = true;
  if (t2) {
    t2 = t1.get$yVel();
    if (typeof t2 !== 'number') return this.update$0$bailout(33, g, t1, t2, 0);
    t1.set$yVel(t2 * -1);
    t4 = $.Math_atan2($.abs(t1.get$xVel()), $.abs(t1.get$yVel()));
    if (typeof t4 !== 'number') return this.update$0$bailout(34, g, t4, 0, 0);
    g.playSound$2('Sounds/hit3', $.Math_min((90 - t4 / 0.017453292519943295) / 50, 1));
  }
  if (this.collidesWith$1(g.get$player1()) === true) {
    g.ballHit$0();
    this.ballHit$1(g.get$player1());
    g.playSound$1('Sounds/hit1');
  } else {
    if (this.collidesWith$1(g.get$player2()) === true) {
      g.ballHit$0();
      this.ballHit$1(g.get$player2());
      g.playSound$1('Sounds/hit2');
    }
  }
  t1 = this.get$x();
  if (typeof t1 !== 'number') return this.update$0$bailout(35, g, t1, 0, 0);
  var t3 = g.get$halfSurfaceWidth();
  if (typeof t3 !== 'number') return this.update$0$bailout(36, g, t1, t3, 0);
  if (!(t1 > t3)) {
    t1 = this.get$x();
    if (typeof t1 !== 'number') return this.update$0$bailout(37, g, t1, 0, 0);
    t3 = g.get$halfSurfaceWidth();
    if (typeof t3 !== 'number') return this.update$0$bailout(38, t3, g, t1, 0);
    t1 = t1 < -t3;
  } else t1 = true;
  if (t1) {
    t1 = this.get$x();
    if (typeof t1 !== 'number') return this.update$0$bailout(39, g, t1, 0, 0);
    if (t1 > 0) {
      this.set$x(-400);
      this.startVel = 400;
      t1 = g.get$player1();
      t2 = t1.get$score();
      if (typeof t2 !== 'number') return this.update$0$bailout(40, t2, g, t1, 0);
      t1.set$score(t2 + 1);
      g.playSound$1('sounds/sweep');
    } else {
      this.set$x(400);
      this.startVel = -400;
      t1 = g.get$player2();
      t2 = t1.get$score();
      if (typeof t2 !== 'number') return this.update$0$bailout(41, g, t1, t2, 0);
      t1.set$score(t2 + 1);
      g.playSound$1('sounds/sweep');
    }
    g.gameOver$0();
  }
 },
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 2:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 3:
      t2 = env0;
      g = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 4:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 5:
      g = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 6:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 7:
      t4 = env0;
      g = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 8:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 9:
      g = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 10:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 11:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 12:
      t2 = env0;
      g = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 13:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 14:
      t4 = env0;
      g = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 15:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 16:
      t2 = env0;
      t4 = env1;
      g = env2;
      t1 = env3;
      break;
    case 17:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 18:
      g = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 19:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 20:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 21:
      t2 = env0;
      t4 = env1;
      g = env2;
      t1 = env3;
      break;
    case 22:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 23:
      g = env0;
      t1 = env1;
      t4 = env2;
      t2 = env3;
      break;
    case 24:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 25:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 26:
      t4 = env0;
      g = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 27:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 28:
      t4 = env0;
      g = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 29:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 30:
      t2 = env0;
      g = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 31:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 32:
      g = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 33:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 34:
      g = env0;
      t4 = env1;
      break;
    case 35:
      g = env0;
      t1 = env1;
      break;
    case 36:
      g = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 37:
      g = env0;
      t1 = env1;
      break;
    case 38:
      t3 = env0;
      g = env1;
      t1 = env2;
      break;
    case 39:
      g = env0;
      t1 = env1;
      break;
    case 40:
      t2 = env0;
      g = env1;
      t1 = env2;
      break;
    case 41:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.GameEntity.prototype.update$0.call(this);
      var g = this.game;
      var t1 = this.momentum;
      var t2 = t1.get$xVel();
    case 1:
      state = 0;
    default:
      if (state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || (state == 0 && $.gtB(t2, 0))) {
        switch (state) {
          case 0:
            t2 = this.box.get$right();
          case 2:
            state = 0;
            var t4 = g.get$player2().get$box().get$left();
          case 3:
            state = 0;
          default:
            if (state == 4 || state == 5 || state == 6 || state == 7 || (state == 0 && $.gtB(t2, t4))) {
              switch (state) {
                case 0:
                  t2 = g.get$player2().get$box().get$top();
                case 4:
                  state = 0;
                  t4 = this.box.get$bottom();
                case 5:
                  state = 0;
                default:
                  if (state == 6 || state == 7 || (state == 0 && $.ltB(t2, t4))) {
                    switch (state) {
                      case 0:
                        t2 = g.get$player2().get$box().get$bottom();
                      case 6:
                        state = 0;
                        t4 = this.box.get$top();
                      case 7:
                        state = 0;
                        t4 = $.gtB(t2, t4);
                        t2 = t4;
                    }
                  } else {
                    t2 = false;
                  }
              }
            } else {
              t2 = false;
            }
        }
      } else {
        t2 = false;
      }
    case 8:
    case 9:
      if (state == 8 || state == 9 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = g.get$player2().get$box().get$left();
          case 8:
            state = 0;
            t4 = this.get$width();
          case 9:
            state = 0;
            this.set$x($.sub(t2, $.div(t4, 2)));
        }
      }
      t2 = t1.get$xVel();
    case 10:
      state = 0;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      if (state == 11 || state == 12 || state == 13 || state == 14 || state == 15 || state == 16 || (state == 0 && $.ltB(t2, 0))) {
        switch (state) {
          case 0:
            t2 = this.box.get$left();
          case 11:
            state = 0;
            t4 = g.get$player1().get$box().get$right();
          case 12:
            state = 0;
          default:
            if (state == 13 || state == 14 || state == 15 || state == 16 || (state == 0 && $.ltB(t2, t4))) {
              switch (state) {
                case 0:
                  t2 = g.get$player1().get$box().get$top();
                case 13:
                  state = 0;
                  t4 = this.box.get$bottom();
                case 14:
                  state = 0;
                default:
                  if (state == 15 || state == 16 || (state == 0 && $.ltB(t2, t4))) {
                    switch (state) {
                      case 0:
                        t2 = g.get$player1().get$box().get$bottom();
                      case 15:
                        state = 0;
                        t4 = this.box.get$top();
                      case 16:
                        state = 0;
                        t4 = $.gtB(t2, t4);
                        t2 = t4;
                    }
                  } else {
                    t2 = false;
                  }
              }
            } else {
              t2 = false;
            }
        }
      } else {
        t2 = false;
      }
    case 17:
    case 18:
      if (state == 17 || state == 18 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = g.get$player1().get$box().get$right();
          case 17:
            state = 0;
            t4 = this.get$width();
          case 18:
            state = 0;
            this.set$x($.add(t2, $.div(t4, 2)));
        }
      }
      t2 = t1.get$yVel();
    case 19:
      state = 0;
    case 20:
    case 21:
      if (state == 20 || state == 21 || (state == 0 && $.gtB(t2, 0))) {
        switch (state) {
          case 0:
            t2 = this.box.get$bottom();
          case 20:
            state = 0;
            t4 = g.get$halfSurfaceHeight();
          case 21:
            state = 0;
            t4 = $.gtB(t2, t4);
            t2 = t4;
        }
      } else {
        t2 = false;
      }
    case 22:
    case 23:
      if (state == 22 || state == 23 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = g.get$halfSurfaceHeight();
          case 22:
            state = 0;
            t4 = this.get$height();
          case 23:
            state = 0;
            this.set$y($.sub(t2, $.div(t4, 2)));
        }
      }
      t2 = t1.get$yVel();
    case 24:
      state = 0;
    case 25:
    case 26:
      if (state == 25 || state == 26 || (state == 0 && $.ltB(t2, 0))) {
        switch (state) {
          case 0:
            t2 = this.box.get$top();
          case 25:
            state = 0;
            t4 = g.get$halfSurfaceHeight();
          case 26:
            state = 0;
            t2 = $.ltB(t2, $.neg(t4));
        }
      } else {
        t2 = false;
      }
    case 27:
    case 28:
      if (state == 27 || state == 28 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = g.get$halfSurfaceHeight();
          case 27:
            state = 0;
            t2 = $.neg(t2);
            t4 = this.get$height();
          case 28:
            state = 0;
            this.set$y($.add(t2, $.div(t4, 2)));
        }
      }
      t2 = this.box.get$bottom();
    case 29:
      state = 0;
      t4 = g.get$halfSurfaceHeight();
    case 30:
      state = 0;
    case 31:
    case 32:
      if (state == 31 || state == 32 || (state == 0 && !$.geB(t2, t4))) {
        switch (state) {
          case 0:
            t2 = this.box.get$top();
          case 31:
            state = 0;
            t4 = g.get$halfSurfaceHeight();
          case 32:
            state = 0;
            t2 = $.leB(t2, $.neg(t4));
        }
      } else {
        t2 = true;
      }
    case 33:
    case 34:
      if (state == 33 || state == 34 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = t1.get$yVel();
          case 33:
            state = 0;
            t1.set$yVel($.mul(t2, -1));
            t4 = $.Math_atan2($.abs(t1.get$xVel()), $.abs(t1.get$yVel()));
          case 34:
            state = 0;
            var angle = $.div(t4, 0.017453292519943295);
            if (typeof angle !== 'number') throw $.iae(angle);
            g.playSound$2('Sounds/hit3', $.Math_min((90 - angle) / 50, 1));
        }
      }
      if (this.collidesWith$1(g.get$player1()) === true) {
        g.ballHit$0();
        this.ballHit$1(g.get$player1());
        g.playSound$1('Sounds/hit1');
      } else {
        if (this.collidesWith$1(g.get$player2()) === true) {
          g.ballHit$0();
          this.ballHit$1(g.get$player2());
          g.playSound$1('Sounds/hit2');
        }
      }
      t1 = this.get$x();
    case 35:
      state = 0;
      var t3 = g.get$halfSurfaceWidth();
    case 36:
      state = 0;
    case 37:
    case 38:
      if (state == 37 || state == 38 || (state == 0 && !$.gtB(t1, t3))) {
        switch (state) {
          case 0:
            t1 = this.get$x();
          case 37:
            state = 0;
            t3 = g.get$halfSurfaceWidth();
          case 38:
            state = 0;
            t1 = $.ltB(t1, $.neg(t3));
        }
      } else {
        t1 = true;
      }
    case 39:
    case 40:
    case 41:
      if (state == 39 || state == 40 || state == 41 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.get$x();
          case 39:
            state = 0;
          default:
            if (state == 40 || (state == 0 && $.gtB(t1, 0))) {
              switch (state) {
                case 0:
                  this.set$x(-400);
                  this.startVel = 400;
                  t1 = g.get$player1();
                  t2 = t1.get$score();
                case 40:
                  state = 0;
                  t1.set$score($.add(t2, 1));
                  g.playSound$1('sounds/sweep');
              }
            } else {
              switch (state) {
                case 0:
                  this.set$x(400);
                  this.startVel = -400;
                  t1 = g.get$player2();
                  t2 = t1.get$score();
                case 41:
                  state = 0;
                  t1.set$score($.add(t2, 1));
                  g.playSound$1('sounds/sweep');
              }
            }
            g.gameOver$0();
        }
      }
  }
 },
 Ball$3: function(game, x, y) {
  var t1 = this.momentum;
  t1.set$xMax(1400);
  t1.set$xAccel(15);
 }
};

$$.PowerUp = {"":
 ["creationTime", "type", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 shrinkUpdate$0: function() {
  var g = this.game;
  if ($.gtB(g.get$ball().get$momentum().get$xVel(), 0)) {
    var t1 = g.get$player1();
    t1.set$height($.sub(t1.get$height(), 50));
  } else {
    if ($.ltB(g.get$ball().get$momentum().get$xVel(), 0)) {
      t1 = g.get$player2();
      t1.set$height($.sub(t1.get$height(), 50));
    }
  }
 },
 extendUpdate$0: function() {
  var g = this.game;
  if ($.gtB(g.get$ball().get$momentum().get$xVel(), 0)) {
    var t1 = g.get$player1();
    t1.set$height($.add(t1.get$height(), 50));
  } else {
    if ($.ltB(g.get$ball().get$momentum().get$xVel(), 0)) {
      t1 = g.get$player2();
      t1.set$height($.add(t1.get$height(), 50));
    }
  }
 },
 reflectorUpdate$0: function() {
  var g = this.game;
  if ($.gtB($.Math_random(), 0.5)) {
    var t1 = $.Utils_random(200, 600, false);
    g.get$ball().get$momentum().set$yVel(t1);
  } else {
    t1 = $.Utils_random(-200, -600, false);
    g.get$ball().get$momentum().set$yVel(t1);
  }
 },
 draw$1: function(ctx) {
  $.GameEntity.prototype.draw$1.call(this, ctx);
  ctx.set$fillStyle('rgba(0, 0, 0, .5)');
  ctx.set$font('24px Verdana');
  switch (this.type) {
    case 'reflector':
      ctx.fillText$3('R', $.sub(this.get$x(), 8), $.add(this.get$y(), 8));
      break;
    case 'extendor':
      ctx.fillText$3('E', $.sub(this.get$x(), 8), $.add(this.get$y(), 8));
      break;
    case 'shrink':
      ctx.fillText$3('S', $.sub(this.get$x(), 8), $.add(this.get$y(), 8));
      break;
    case 'bullet':
      ctx.fillText$3('B', $.sub(this.get$x(), 8), $.add(this.get$y(), 8));
      break;
  }
 },
 update$0: function() {
  var g = this.game;
  $.leB($.add(this.creationTime, 10), g.get$timer().get$gameTime()) && this.removeFromGame$0();
  if (this.collidesWith$1(g.get$ball()) === true) {
    switch (this.type) {
      case 'reflector':
        this.reflectorUpdate$0();
        break;
      case 'extendor':
        this.extendUpdate$0();
        break;
      case 'shrink':
        this.shrinkUpdate$0();
        break;
      case 'bullet':
        if ($.gtB(g.get$ball().get$momentum().get$xVel(), 0)) {
          var t1 = g.get$player1();
          t1.set$bullet($.add(t1.get$bullet(), 2));
        } else {
          if ($.ltB(g.get$ball().get$momentum().get$xVel(), 0)) {
            t1 = g.get$player2();
            t1.set$bullet($.add(t1.get$bullet(), 2));
          }
        }
        break;
    }
    g.playSound$2('sounds/sweep', 0.1);
    this.removeFromGame$0();
  }
  $.GameEntity.prototype.update$0.call(this);
 },
 PowerUp$3: function(game, x, y) {
  var rType = $.Math_random();
  this.creationTime = game.get$timer().get$gameTime();
  if ($.ltB(rType, 0.2)) {
    this.color = '255, 255, 255';
    this.type = 'reflector';
  } else {
    if ($.ltB(rType, 0.4)) {
      this.color = '255, 255, 0';
      this.type = 'extendor';
    } else {
      if ($.ltB(rType, 0.6)) {
        this.color = '255, 0, 255';
        this.type = 'shrink';
      } else {
        if ($.ltB(rType, 1.0)) {
          this.color = '0, 255, 255';
          this.type = 'bullet';
        }
      }
    }
  }
 },
 is$PowerUp: true
};

$$.Bullet = {"":
 ["isP1", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 move$0: function() {
  if ($.eqB(this.isP1, true)) this.set$x($.add(this.get$x(), 4));
  else this.set$x($.sub(this.get$x(), 4));
 },
 update$0: function() {
  var g = this.game;
  this.move$0();
  if (this.collidesWith$1(g.get$player1()) === true) {
    var t1 = g.get$player1();
    var t2 = t1.get$x();
    if (typeof t2 !== 'number') return this.update$0$bailout(1, t1, g, t2);
    t1.set$x(t2 - 100);
    g.get$player1().removeFromGame$0();
    this.removeFromGame$0();
    g.set$p1Dead(true);
  } else {
    if (this.collidesWith$1(g.get$player2()) === true) {
      t1 = g.get$player2();
      t2 = t1.get$x();
      if (typeof t2 !== 'number') return this.update$0$bailout(2, g, t1, t2);
      t1.set$x(t2 + 100);
      g.get$player2().removeFromGame$0();
      this.removeFromGame$0();
      g.set$p2Dead(true);
    }
  }
  $.GameEntity.prototype.update$0.call(this);
 },
 update$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      g = env1;
      t2 = env2;
      break;
    case 2:
      g = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      var g = this.game;
      this.move$0();
    default:
      if (state == 1 || (state == 0 && this.collidesWith$1(g.get$player1()) === true)) {
        switch (state) {
          case 0:
            var t1 = g.get$player1();
            var t2 = t1.get$x();
          case 1:
            state = 0;
            t1.set$x($.sub(t2, 100));
            g.get$player1().removeFromGame$0();
            this.removeFromGame$0();
            g.set$p1Dead(true);
        }
      } else {
        switch (state) {
          case 0:
          case 2:
            if (state == 2 || (state == 0 && this.collidesWith$1(g.get$player2()) === true)) {
              switch (state) {
                case 0:
                  t1 = g.get$player2();
                  t2 = t1.get$x();
                case 2:
                  state = 0;
                  t1.set$x($.add(t2, 100));
                  g.get$player2().removeFromGame$0();
                  this.removeFromGame$0();
                  g.set$p2Dead(true);
              }
            }
        }
      }
      $.GameEntity.prototype.update$0.call(this);
  }
 },
 Bullet$4: function(game, x, y, p1) {
  this.opacity = 1;
  this.color = '255, 0, 0';
  this.isP1 = p1;
 },
 is$Bullet: true
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$.EmptyElementRect = {"":
 ["clientRects", "bounding?", "scroll", "offset", "client"],
 super: "Object"
};

$$._ElementAttributeMap = {"":
 ["_element?"],
 super: "Object",
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    values[i] = t2;
  }
  return values;
 },
 getValues$0$bailout: function(state, attributes) {
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    values[i] = t1;
  }
  return values;
 },
 getKeys$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
 },
 getKeys$0$bailout: function(state, attributes) {
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
 },
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var item = attributes[i];
    f.$call$2(item.get$name(), item.get$value());
  }
 },
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.$call$2(item.get$name(), item.get$value());
  }
 },
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1)) {
    this.remove$1($.index(attributes, i).get$name());
  }
 },
 remove$1: function(key) {
  var t1 = this._element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, $.S(value));
 },
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
};

$$._SimpleClientRect = {"":
 ["height?", "width?", "top?", "left?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ', ' + $.S(this.width) + ', ' + $.S(this.height) + ')';
 },
 operator$eq$1: function(other) {
  return !(other == null) && ($.eqB(this.left, other.get$left()) && ($.eqB(this.top, other.get$top()) && ($.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height()))));
 },
 get$bottom: function() {
  return $.add(this.top, this.height);
 },
 get$right: function() {
  return $.add(this.left, this.width);
 }
};

$$._ElementRectImpl = {"":
 ["_clientRects", "_boundingClientRect", "scroll", "offset", "client"],
 super: "Object",
 get$bounding: function() {
  return this._boundingClientRect;
 }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._lib_list, start, rangeLength);
 },
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
 },
 clear$0: function() {
  return $.clear(this._lib_list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
 },
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
 },
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
 },
 get$length: function() {
  return $.get$length(this._lib_list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
 },
 some$1: function(f) {
  return $.some(this._lib_list, f);
 },
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib_list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$close: function() {
  return this.operator$index$1('close');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$start: function() {
  return this.operator$index$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$close: function() {
  return this.operator$index$1('close');
 }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$play: function() {
  return this.operator$index$1('play');
 },
 play$0: function() { return this.get$play().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$error: function() {
  return this.operator$index$1('error');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 },
 get$error: function() {
  return this.operator$index$1('error');
 }
};

$$._MeasurementRequest = {"":
 ["exception=", "value=", "completer?", "computeValue"],
 super: "Object",
 computeValue$0: function() { return this.computeValue.$call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 postMessage$3: function(message, targetOrigin, messagePorts) {
  var t1 = messagePorts == null;
  var t2 = this._window;
  if (t1) $._DOMWindowCrossFrameImpl__postMessage2(t2, message, targetOrigin);
  else $._DOMWindowCrossFrameImpl__postMessage3(t2, message, targetOrigin, messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
},
 close$0: function() {
  return $._DOMWindowCrossFrameImpl__close(this._window);
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
 }
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5) throw $.ioore(t3);
  return t1[t3];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || (keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || (values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
 },
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i) {
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      }
      return result;
  }
 },
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || ((dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())) return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
 },
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i) {
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  }
  return dartList;
 },
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
 },
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
 },
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
 }
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
 }
};

$$._IsolateEvent = {"":
 ["message?", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_NativeJsSendPort) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_WorkerSendPort) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_BufferingSendPort)))) throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
 },
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null && $.add$1(this.ports, port.get$_futurePort());
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null)) return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null)) return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
 },
 visitPrimitive$1: function(x) {
 },
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null) return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  }
  return $._WorkerSendPort$(managerId, isolateId, receivePortId);
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.Game = {"":
 ["showOutlines?", "bgStyle!", "clientPoint=", "clockTick?", "timer?", "mouse=", "click=", "ctx?"],
 super: "Object",
 update$0: function() {
  var t1 = this.entities;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(1, t1);
  for (var t2 = $.iterator($.filter(t1, new $.Game_update_anon())); t2.hasNext$0() === true; ) {
    t2.next$0().update$0();
  }
  for (var i = t1.length - 1; i >= 0; --i) {
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].get$_removeFromGame() === true && $.removeRange(t1, i, 1);
  }
 },
 update$0$bailout: function(state, t1) {
  $.get$length(t1);
  for (var t2 = $.iterator($.filter(t1, new $.Game_update_anon())); t2.hasNext$0() === true; ) {
    t2.next$0().update$0();
  }
  for (var i = $.sub($.get$length(t1), 1); $.geB(i, 0); i = $.sub(i, 1)) {
    $.index(t1, i).get$_removeFromGame() === true && $.removeRange(t1, i, 1);
  }
 },
 playSound$2: function(path, volume) {
  if (this.enableSound !== true) return;
  if (this._supportsMp3 == null) this._supportsMp3 = !$.eqB($._ElementFactoryProvider_Element$tag('audio').canPlayType$2('audio/mpeg', ''), '');
  path = $.eqB(this._supportsMp3, true) ? $.concat(path, '.mp3') : $.concat(path, '.ogg');
  var s = this.assetManager.getAsset$1(path);
  if (s == null) return;
  var c = s.clone$1(true);
  c.set$volume($.Utils_round(volume, 3));
  c.play$0();
 },
 playSound$1: function(path) {
  return this.playSound$2(path,1.0)
},
 drawDebugInfo$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 0.2)');
  t1.set$font('16px Verdana');
  t1.fillText$3('FPS: ' + $.S($.toStringAsFixed(this.timer.get$fps(), 1)), $.sub(this.get$halfSurfaceWidth(), 120), $.neg($.sub(this.get$halfSurfaceHeight(), 30)));
 },
 drawBeforeCtxRestore$0: function() {
  this.debugMode === true && this.drawDebugInfo$0();
 },
 draw$0: function() {
  var t1 = this.ctx;
  t1.clearRect$4(0, 0, t1.get$canvas().get$width(), t1.get$canvas().get$height());
  t1.set$fillStyle(this.bgStyle);
  t1.fillRect$4(0, 0, t1.get$canvas().get$width(), t1.get$canvas().get$height());
  t1.save$0();
  t1.translate$2($.div(t1.get$canvas().get$width(), 2), $.div(t1.get$canvas().get$height(), 2));
  for (var t2 = $.iterator(this.entities); t2.hasNext$0() === true; ) {
    t2.next$0().draw$1(t1);
  }
  this.drawBeforeCtxRestore$0();
  t1.restore$0();
 },
 addEntity$1: function(entity) {
  $.add$1(this.entities, entity);
 },
 startInput$0: function() {
  $.print('Starting input');
  var t1 = new $.Game_startInput_getXandY(this);
  $.add$1($.document().get$on().get$click(), new $.Game_startInput_anon(this, t1));
  $.add$1($.document().get$on().get$mouseMove(), new $.Game_startInput_anon0(this, t1));
  $.add$1($.document().get$on().get$touchMove(), new $.Game_startInput_anon1(this, t1));
  $.add$1($.document().get$on().get$touchStart(), new $.Game_startInput_anon2());
  $.print('Input started');
 },
 loop$1: function(time) {
  this.clockTick = this.timer.tick$0();
  this.update$0();
  this.draw$0();
  this.click = null;
  $.window().requestAnimationFrame$1(this.get$loop());
 },
 get$loop: function() { return new $.BoundClosure0(this, 'loop$1'); },
 start$0: function() {
  $.print('starting game');
  $.window().requestAnimationFrame$1(this.get$loop());
 },
 get$halfSurfaceHeight: function() {
  return $.div(this.surfaceHeight, 2);
 },
 get$halfSurfaceWidth: function() {
  return $.div(this.surfaceWidth, 2);
 },
 init$0: function() {
  var t1 = this.ctx;
  this.surfaceWidth = t1.get$canvas().get$width();
  this.surfaceHeight = t1.get$canvas().get$height();
  t1.get$canvas().get$rect().then$1(new $.Game_init_anon(this));
  this.startInput$0();
  $.print('game initialized');
 },
 Game$2: function(assetManager, ctx) {
  this.timer = $.GameTimer$();
  this.entities = [];
 }
};

$$.AssetManager = {"":
 ["_downloadQueue", "_cache", "_errorCount=", "_successCount="],
 super: "Object",
 isImage$1: function(path) {
  if ($.endsWith(path, '.png') === true || ($.endsWith(path, '.jpg') === true || $.endsWith(path, '.gif') === true)) return true;
  return false;
 },
 isDone$0: function() {
  var t1 = this._downloadQueue.length;
  var t2 = this._successCount;
  if (typeof t2 !== 'number') return this.isDone$0$bailout(1, t1, t2, 0);
  var t4 = this._errorCount;
  if (typeof t4 !== 'number') return this.isDone$0$bailout(2, t1, t2, t4);
  return t1 === t2 + t4;
 },
 isDone$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._downloadQueue.length;
      var t2 = this._successCount;
    case 1:
      state = 0;
      var t4 = this._errorCount;
    case 2:
      state = 0;
      return t1 === $.add(t2, t4);
  }
 },
 getAsset$1: function(path) {
  return $.index(this._cache, path);
 },
 downloadAll$1: function(downloadCallback) {
  var t1 = this._downloadQueue;
  t1.length === 0 && downloadCallback.$call$0();
  t1 = $.iterator(t1);
  var t2 = this._cache;
  if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this.downloadAll$1$bailout(1, t2, downloadCallback, t1);
  for (; t1.hasNext$0() === true; ) {
    var t3 = t1.next$0();
    var t4 = this.isImage$1(t3) === true;
    var el = $._ElementFactoryProvider_Element$tag(t4 ? 'img' : 'audio');
    if (t4) {
      $.callTypeCast(el, 'is$ImageElement');
      $.add$1(el.get$on().get$load(), new $.AssetManager_downloadAll_anon(this, el, downloadCallback));
      $.add$1(el.get$on().get$error(), new $.AssetManager_downloadAll_anon0(this, downloadCallback));
      el.set$src(t3);
    } else {
      $.callTypeCast(el, 'is$AudioElement');
      $.print($.S(t3) + ' is loaded');
      $.indexSet(el.get$attributes(), 'preload', 'auto');
      this._successCount = $.add(this._successCount, 1);
      this.isDone$0() === true && downloadCallback.$call$0();
      el.set$src(t3);
    }
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    t4 = t2.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    t2[t3] = el;
  }
 },
 downloadAll$1$bailout: function(state, t2, downloadCallback, t1) {
  for (; t1.hasNext$0() === true; ) {
    var t3 = t1.next$0();
    var t4 = this.isImage$1(t3) === true;
    var el = $._ElementFactoryProvider_Element$tag(t4 ? 'img' : 'audio');
    if (t4) {
      $.callTypeCast(el, 'is$ImageElement');
      $.add$1(el.get$on().get$load(), new $.AssetManager_downloadAll_anon(this, el, downloadCallback));
      $.add$1(el.get$on().get$error(), new $.AssetManager_downloadAll_anon0(this, downloadCallback));
      el.set$src(t3);
    } else {
      $.callTypeCast(el, 'is$AudioElement');
      $.print($.S(t3) + ' is loaded');
      $.indexSet(el.get$attributes(), 'preload', 'auto');
      this._successCount = $.add(this._successCount, 1);
      this.isDone$0() === true && downloadCallback.$call$0();
      el.set$src(t3);
    }
    $.indexSet(t2, t3, el);
  }
 },
 queueDownload$1: function(path) {
  $.add$1(this._downloadQueue, path);
 },
 AssetManager$0: function() {
  this._downloadQueue = [];
  this._cache = $.makeLiteralMap([]);
 }
};

$$.GameTimer = {"":
 ["fpsSampleRate", "fps?", "wallLastTimestamp", "gameTime="],
 super: "Object",
 tick$0: function() {
  var wallCurrent = $.DateImplementation$now().millisecondsSinceEpoch;
  var wallDelta = $.div($.sub(wallCurrent, this.wallLastTimestamp), 1000);
  this.wallLastTimestamp = wallCurrent;
  if (typeof wallDelta !== 'number') throw $.iae(wallDelta);
  var currentFps = 1 / wallDelta;
  var t1 = this.fps;
  if (typeof t1 !== 'number') throw $.iae(t1);
  var t2 = currentFps - t1;
  var t3 = this.fpsSampleRate;
  if (typeof t3 !== 'number') throw $.iae(t3);
  this.fps = t1 + t2 / t3;
  var gameDelta = $.Math_min(wallDelta, 0.05);
  this.gameTime = $.add(this.gameTime, gameDelta);
  return gameDelta;
 }
};

$$.GameEntity = {"":
 ["opacity!", "momentum?", "_removeFromGame?", "box?"],
 super: "Object",
 collidesWith$1: function(entity) {
  return entity.get$box().intersectsWith$1(this.box);
 },
 removeFromGame$0: function() {
  this._removeFromGame = true;
 },
 draw$1: function(ctx) {
  var t1 = this.color;
  if (!(t1 == null)) {
    if (this.fill === true) {
      ctx.set$fillStyle('rgba(' + $.S(t1) + ', ' + $.S(this.opacity) + ')');
      ctx.fillRect$4(this.box.get$left(), this.box.get$top(), this.box.get$width(), this.box.get$height());
    } else {
      ctx.set$strokeStyle('rgba(' + $.S(t1) + ', ' + $.S(this.opacity) + ')');
      ctx.strokeRect$4(this.box.get$left(), this.box.get$top(), this.box.get$width(), this.box.get$height());
    }
  }
  if (this.game.get$showOutlines() === true) {
    ctx.beginPath$0();
    ctx.set$strokeStyle('green');
    ctx.arc$6(this.get$x(), this.get$y(), this.radius, 0, 6.283185307179586, false);
    ctx.stroke$0();
    ctx.closePath$0();
  }
 },
 updateBox$0: function() {
  if (!(this.sprite == null)) return;
  if (this.box == null) this.box = $.Rectangle$(0, 0, 0, 0);
  var t1 = $.sub(this.get$x(), $.div(this.get$width(), 2));
  this.box.set$left(t1);
  t1 = $.sub(this.get$y(), $.div(this.get$height(), 2));
  this.box.set$top(t1);
  t1 = $.add(this.box.get$left(), this.get$width());
  this.box.set$right(t1);
  t1 = $.add(this.box.get$top(), this.get$height());
  this.box.set$bottom(t1);
 },
 set$height: function(value) {
  this._height = value;
  this.updateBox$0();
 },
 get$height: function() {
  return this._height;
 },
 set$width: function(value) {
  this._width = value;
  this.updateBox$0();
 },
 get$width: function() {
  return this._width;
 },
 set$y: function(value) {
  this._y = value;
  this.updateBox$0();
 },
 get$y: function() {
  return this._y;
 },
 set$x: function(value) {
  this._x = value;
  this.updateBox$0();
 },
 get$x: function() {
  return this._x;
 },
 update$0: function() {
  var t1 = this.previousBox;
  var t2 = t1 == null;
  var t3 = this.box;
  if (t2) this.previousBox = $.Rectangle$clone(t3);
  else t1.updateFrom$1(t3);
  t1 = this.momentum;
  t2 = this.game;
  t1.update$1(t2.get$clockTick());
  t3 = this.get$x();
  if (typeof t3 !== 'number') return this.update$0$bailout(1, t1, t2, t3, 0, 0);
  var t5 = t1.get$xVel();
  if (typeof t5 !== 'number') return this.update$0$bailout(2, t5, t1, t2, t3, 0);
  var t7 = t2.get$clockTick();
  if (typeof t7 !== 'number') return this.update$0$bailout(3, t5, t7, t1, t2, t3);
  this.set$x(t3 + t5 * t7);
  var t9 = this.get$y();
  if (typeof t9 !== 'number') return this.update$0$bailout(4, t9, t1, t2, 0, 0);
  t1 = t1.get$yVel();
  if (typeof t1 !== 'number') return this.update$0$bailout(5, t9, t1, t2, 0, 0);
  t2 = t2.get$clockTick();
  if (typeof t2 !== 'number') return this.update$0$bailout(6, t9, t1, t2, 0, 0);
  this.set$y(t9 + t1 * t2);
  this.updateBox$0();
 },
 update$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      t3 = env2;
      break;
    case 2:
      t5 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      break;
    case 3:
      t5 = env0;
      t7 = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
    case 4:
      t9 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 5:
      t9 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 6:
      t9 = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.previousBox;
      var t2 = t1 == null;
      var t3 = this.box;
      if (t2) this.previousBox = $.Rectangle$clone(t3);
      else t1.updateFrom$1(t3);
      t1 = this.momentum;
      t2 = this.game;
      t1.update$1(t2.get$clockTick());
      t3 = this.get$x();
    case 1:
      state = 0;
      var t5 = t1.get$xVel();
    case 2:
      state = 0;
      var t7 = t2.get$clockTick();
    case 3:
      state = 0;
      this.set$x($.add(t3, $.mul(t5, t7)));
      var t9 = this.get$y();
    case 4:
      state = 0;
      t1 = t1.get$yVel();
    case 5:
      state = 0;
      t2 = t2.get$clockTick();
    case 6:
      state = 0;
      this.set$y($.add(t9, $.mul(t1, t2)));
      this.updateBox$0();
  }
 },
 GameEntity$withPosition$5: function(game, x, y, width, height) {
  this.momentum = $.Momentum$(0, 0, null, null, null, null);
  this.set$x(x);
  this.set$y(y);
  this.set$width(width);
  this.set$height(height);
 }
};

$$.Rectangle = {"":
 ["bottom=", "right=", "left=", "top="],
 super: "Object",
 get$height: function() {
  return $.sub(this.bottom, this.top);
 },
 get$width: function() {
  return $.sub(this.right, this.left);
 },
 intersectsWith$1: function(other) {
  return $.Rectangle_intersect(this, other);
 },
 updateFrom$1: function(rect) {
  this.top = rect.get$top();
  this.left = rect.get$left();
  this.right = rect.get$right();
  this.bottom = rect.get$bottom();
 }
};

$$.Momentum = {"":
 ["yMax", "xMax!", "yAccel", "xAccel!", "yVel=", "xVel="],
 super: "Object",
 update$1: function(clockTick) {
  var t1 = this.xAccel;
  if (!(t1 == null) && (!$.eqB(t1, 0) && $.ltB($.abs(this.xVel), this.xMax))) {
    t1 = $.gtB(this.xVel, 0);
    var t2 = this.xVel;
    var t3 = this.xAccel;
    if (t1) this.xVel = $.add(t2, $.mul(t3, clockTick));
    else this.xVel = $.sub(t2, $.mul(t3, clockTick));
  }
  t1 = this.yAccel;
  if (!(t1 == null) && (!$.eqB(t1, 0) && $.ltB($.abs(this.yVel), this.yMax))) {
    t2 = $.gtB(this.yVel, 0);
    t3 = this.yVel;
    if (t2) this.yVel = $.add(t3, $.mul(t1, clockTick));
    else this.yVel = $.sub(t3, $.mul(t1, clockTick));
  }
  t1 = this.xVel;
  if (!(t1 == null) && (!(this.xMax == null) && $.gtB($.abs(t1), this.xMax))) {
    t1 = $.gtB(this.xVel, 0);
    t2 = this.xMax;
    this.xVel = t1 ? t2 : $.neg(t2);
  }
  t1 = this.yVel;
  if (!(t1 == null)) {
    t2 = this.yMax;
    t1 = !(t2 == null) && $.gtB($.abs(t1), t2);
  } else t1 = false;
  if (t1) {
    t1 = $.gtB(this.yVel, 0);
    t2 = this.yMax;
    this.yVel = t1 ? t2 : $.neg(t2);
  }
 }
};

$$.Vector = {"":
 ["y=", "x="],
 super: "Object",
 updateFrom$1: function(vect) {
  this.x = vect.get$x();
  this.y = vect.get$y();
 }
};

$$.main_anon = {"":
 ["ws_2"],
 super: "Closure",
 $call$1: function(e) {
  $.print('sent: ' + $.S(this.ws_2.send$1('Hello')));
 }
};

$$.main_anon0 = {"":
 ["ws_3", "box_0"],
 super: "Closure",
 $call$1: function(e) {
  var msgCount = $.add(this.box_0.msgCount_1, 1);
  this.box_0.msgCount_1 = msgCount;
  $.eqB(e.get$data(), 'ping') && this.ws_3.send$1('pong');
 }
};

$$.main_anon1 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  $.print('Error was : ' + $.S(e));
 }
};

$$.main_anon2 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  $.print('Closed: ' + $.S(e));
 }
};

$$.main_anon3 = {"":
 ["game_4"],
 super: "Closure",
 $call$0: function() {
  this.game_4.init$0();
  this.game_4.start$0();
 }
};

$$.AssetManager_downloadAll_anon = {"":
 ["this_2", "img_1", "downloadCallback_0"],
 super: "Closure",
 $call$1: function(event$) {
  $.print($.S(this.img_1.get$src()) + ' is loaded');
  var t1 = this.this_2;
  t1.set$_successCount($.add(t1.get$_successCount(), 1));
  this.this_2.isDone$0() === true && this.downloadCallback_0.$call$0();
 }
};

$$.AssetManager_downloadAll_anon0 = {"":
 ["this_4", "downloadCallback_3"],
 super: "Closure",
 $call$1: function(event$) {
  var t1 = this.this_4;
  t1.set$_errorCount($.add(t1.get$_errorCount(), 1));
  this.this_4.isDone$0() === true && this.downloadCallback_3.$call$0();
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 $call$1: function(key) {
  return this.f_0.$call$2(key, $.index(this.this_1, key));
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.PongGame_run_onKeyboardEvent = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  switch (e.get$keyCode()) {
    case 27:
      var t1 = $.eqB(this.this_0.get$paused(), true);
      var t2 = this.this_0;
      if (t1) t2.set$paused(false);
      else t2.set$paused(true);
      break;
    default:
      $.print($.S(e.get$keyCode()));
      break;
  }
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.Game_update_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return e.get$_removeFromGame() !== true;
 }
};

$$.PongGame_bgFade_function = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  this.this_0.set$bgStyle('rgba(0, 0, 0, 0.75)');
 }
};

$$.PongGame_bgFade_function0 = {"":
 ["this_1"],
 super: "Closure",
 $call$0: function() {
  this.this_1.set$bgStyle('rgba(0, 0, 0, 0.70)');
 }
};

$$.PongGame_bgFade_function1 = {"":
 ["this_2"],
 super: "Closure",
 $call$0: function() {
  this.this_2.set$bgStyle('rgba(0, 0, 0, 0.65)');
 }
};

$$.PongGame_bgFade_function2 = {"":
 ["this_3"],
 super: "Closure",
 $call$0: function() {
  this.this_3.set$bgStyle('rgba(0, 0, 0, 0.60)');
 }
};

$$.PongGame_bgFade_function3 = {"":
 ["this_4"],
 super: "Closure",
 $call$0: function() {
  this.this_4.set$bgStyle('rgba(0, 0, 0, 0.55)');
 }
};

$$.PongGame_bgFade_function4 = {"":
 ["this_5"],
 super: "Closure",
 $call$0: function() {
  this.this_5.set$bgStyle('rgba(0, 0, 0, 0.60)');
 }
};

$$.PongGame_bgFade_function5 = {"":
 ["this_6"],
 super: "Closure",
 $call$0: function() {
  this.this_6.set$bgStyle('rgba(0, 0, 0, 0.65)');
 }
};

$$.PongGame_bgFade_function6 = {"":
 ["this_7"],
 super: "Closure",
 $call$0: function() {
  this.this_7.set$bgStyle('rgba(0, 0, 0, 0.70)');
 }
};

$$.PongGame_bgFade_function7 = {"":
 ["this_8"],
 super: "Closure",
 $call$0: function() {
  this.this_8.set$bgStyle('rgba(0, 0, 0, 0.75)');
 }
};

$$.PongGame_bgFade_function8 = {"":
 ["this_9"],
 super: "Closure",
 $call$0: function() {
  this.this_9.set$bgStyle('rgba(0, 0, 0, 0.80)');
 }
};

$$.PongGame_bgFade_function9 = {"":
 ["this_10"],
 super: "Closure",
 $call$0: function() {
  this.this_10.set$bgStyle('rgba(0, 0, 0, 0.85)');
 }
};

$$.PongGame_subtleBgFade_function = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  this.this_0.set$bgStyle('rgba(0, 0, 0, 0.83)');
 }
};

$$.PongGame_subtleBgFade_function0 = {"":
 ["this_1"],
 super: "Closure",
 $call$0: function() {
  this.this_1.set$bgStyle('rgba(0, 0, 0, 0.82)');
 }
};

$$.PongGame_subtleBgFade_function1 = {"":
 ["this_2"],
 super: "Closure",
 $call$0: function() {
  this.this_2.set$bgStyle('rgba(0, 0, 0, 0.81)');
 }
};

$$.PongGame_subtleBgFade_function2 = {"":
 ["this_3"],
 super: "Closure",
 $call$0: function() {
  this.this_3.set$bgStyle('rgba(0, 0, 0, 0.82)');
 }
};

$$.PongGame_subtleBgFade_function3 = {"":
 ["this_4"],
 super: "Closure",
 $call$0: function() {
  this.this_4.set$bgStyle('rgba(0, 0, 0, 0.83)');
 }
};

$$.PongGame_subtleBgFade_function4 = {"":
 ["this_5"],
 super: "Closure",
 $call$0: function() {
  this.this_5.set$bgStyle('rgba(0, 0, 0, 0.84)');
 }
};

$$.PongGame_subtleBgFade_function5 = {"":
 ["this_6"],
 super: "Closure",
 $call$0: function() {
  this.this_6.set$bgStyle('rgba(0, 0, 0, 0.85)');
 }
};

$$.PongGame_newPowerUp_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
 }
};

$$.PongGame_newPowerUp_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
 }
};

$$.PongGame_newPowerUp_anon1 = {"":
 ["powerUp_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.powerUp_0.collidesWith$1(e);
 }
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000)) return $.S(n);
  if ($.geB(absN, 100)) return sign + '0' + $.S(absN);
  if ($.geB(absN, 10)) return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
 }
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 100)) return $.S(n);
  if ($.geB(n, 10)) return '0' + $.S(n);
  return '00' + $.S(n);
 }
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 10)) return $.S(n);
  return '0' + $.S(n);
 }
};

$$.PongGame_newGame_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
 }
};

$$.PongGame_newGame_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return e.removeFromGame$0();
 }
};

$$.PongGame_newGame_anon1 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$Bullet;
 }
};

$$.PongGame_newGame_anon2 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return e.removeFromGame$0();
 }
};

$$.Paddle_move_anon = {"":
 ["this_1", "g_0"],
 super: "Closure",
 $call$1: function(e) {
  if ($.leB($.add(this.this_1.get$bulletTime(), 0.1), this.g_0.get$timer().get$gameTime())) {
    if ($.geB(this.g_0.get$player1().get$bullet(), 1)) {
      var t1 = this.g_0.get$timer().get$gameTime();
      this.this_1.set$bulletTime(t1);
      this.g_0.newBullet$3($.add(this.this_1.get$x(), 10), this.this_1.get$y(), true);
    }
  }
 }
};

$$.Paddle_fade_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  this.this_0.set$opacity(0.4);
 }
};

$$.Paddle_fade_anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$0: function() {
  this.this_1.set$opacity(0.3);
 }
};

$$.Paddle_fade_anon1 = {"":
 ["this_2"],
 super: "Closure",
 $call$0: function() {
  this.this_2.set$opacity(0.2);
 }
};

$$.Game_init_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(rect) {
  var t1 = $.Vector$(rect.get$bounding().get$left(), rect.get$bounding().get$top());
  this.this_0.set$clientPoint(t1);
 }
};

$$.Game_startInput_getXandY = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return $.Vector$($.sub($.sub(e.get$clientX(), this.this_0.get$clientPoint().get$x()), $.div(this.this_0.get$ctx().get$canvas().get$width(), 2)), $.sub($.sub(e.get$clientY(), this.this_0.get$clientPoint().get$y()), $.div(this.this_0.get$ctx().get$canvas().get$height(), 2)));
 }
};

$$.Game_startInput_anon = {"":
 ["this_2", "getXandY_1"],
 super: "Closure",
 $call$1: function(e) {
  var t1 = this.getXandY_1.$call$1(e);
  this.this_2.set$click(t1);
 }
};

$$.Game_startInput_anon0 = {"":
 ["this_4", "getXandY_3"],
 super: "Closure",
 $call$1: function(e) {
  var t1 = this.getXandY_3.$call$1(e);
  this.this_4.set$mouse(t1);
 }
};

$$.Game_startInput_anon1 = {"":
 ["this_6", "getXandY_5"],
 super: "Closure",
 $call$1: function(e) {
  e.preventDefault$0();
  $.callTypeCast(e, 'is$TouchEvent');
  var t1 = this.getXandY_5.$call$1($.index(e.get$touches(), 0));
  this.this_6.set$mouse(t1);
  return false;
 }
};

$$.Game_startInput_anon2 = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  e.preventDefault$0();
  return false;
 }
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  return $._ElementRectImpl$(this.this_0);
 }
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return $._completeMeasurementFutures();
 }
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.CTC8;
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key) === true && $.add$1(this.result_1, key);
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, key);
 }
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 $call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1(workerMessage);
  else $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
 }
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(_) {
  return this.callback_0.$call$0();
 }
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 $call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  $.eqB(remaining, 0) && this.result_5.get$isComplete() !== true && this.completer_3.complete$1(this.values_2);
 }
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 $call$1: function(exception) {
  this.result_8.get$isComplete() !== true && this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
 }
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 $call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, value);
 }
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null) return;
  if (this.this_4.get$_receivePort().get$_callback() == null) return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
 }
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 $call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$4: function(p0, p1, p2, p3) { return this.self[this.target](p0, p1, p2, p3); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); },
 $call$0: function() {
  return this.$call$2(null,null)
},
 $call$1: function(code) {
  return this.$call$2(code,null)
}
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); },
 $call$2: function(url,name$) {
  return this.$call$3(url,name$,null)
}
};
$$.BoundClosure4 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$5: function(p0, p1, p2, p3, p4) { return this.self[this.target](p0, p1, p2, p3, p4); },
 $call$2: function(method,url) {
  return this.$call$5(method,url,null,null,null)
}
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false)) return;
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests == null)) {
    for (var t1 = $.iterator($._pendingRequests); t1.hasNext$0() === true; ) {
      var request = t1.next$0();
      try {
        var t2 = request.computeValue$0();
        request.set$value(t2);
      } catch (exception) {
        t2 = $.unwrapException(exception);
        var e = t2;
        t2 = e;
        request.set$value(t2);
        request.set$exception(true);
      }
    }
  }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = null;
  $._pendingMeasurementFrameCallbacks = null;
  if (!(completedRequests == null)) {
    for (t1 = $.iterator(completedRequests); t1.hasNext$0() === true; ) {
      t2 = t1.next$0();
      if (t2.get$exception() === true) t2.get$completer().completeException$1(t2.get$value());
      else t2.get$completer().complete$1(t2.get$value());
    }
  }
  if (!(readyMeasurementFrameCallbacks == null)) {
    for (t1 = $.iterator(readyMeasurementFrameCallbacks); t1.hasNext$0() === true; ) {
      t1.next$0().$call$0();
    }
  }
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation(false, $.Primitives_dateNow());
  t1.DateImplementation$now$0();
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && (!(name$ === 'Object') && !(name$ === 'Function.prototype')))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.Vector$ = function(x, y) {
  return new $.Vector(y, x);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Math_max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b) return a;
      if (a < b) return b;
      if (typeof b === 'number') {
        if (typeof a === 'number') {
          if (a === 0.0) return a + b;
        }
        if ($.isNaN(b) === true) return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true) return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.PongGame$ = function(assetManager, ctx) {
  var t1 = new $.PongGame(null, null, null, null, null, false, 5, 0, 0, true, false, null, 'rgba(0, 0, 0, 0.85)', true, false, assetManager, null, null, null, null, null, null, null, ctx, null);
  t1.Game$2(assetManager, ctx);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver') return 'MutationObserver';
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsDeserializer$().deserialize$1(message);
  return message;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.GameTimer$ = function() {
  return new $.GameTimer(60, 0, 0, 0);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.Rectangle$ = function(top$, left, right, bottom) {
  return new $.Rectangle(bottom, right, left, top$);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests == null) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$(computeValue, completer));
  return completer.get$future();
};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win, message, targetOrigin) {
      win.postMessage(message, targetOrigin);
;
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true) return;
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $._maybeScheduleMeasurementFrame_anon());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.Utils_drawDashedLine = function(ctx, x, y, x2, y2, da) {
  if (typeof x !== 'number') return $.Utils_drawDashedLine$bailout(1, ctx, x, y, x2, y2, da, 0, 0);
  if (typeof y !== 'number') return $.Utils_drawDashedLine$bailout(1, ctx, x, y, x2, y2, da, 0, 0);
  if (da == null) da = [10, 5];
  if (typeof da !== 'object' || da === null || ((da.constructor !== Array || !!da.immutable$list) && !da.is$JavaScriptIndexingBehavior())) return $.Utils_drawDashedLine$bailout(2, ctx, x, da, y, y2, x2, 0, 0);
  var dashCount = da.length;
  ctx.moveTo$2(x, y);
  var dx = $.sub(x2, x);
  var dy = $.sub(y2, y);
  var slope = !$.eqB(dx, 0) ? $.div(dy, dx) : dy;
  if (typeof slope !== 'number') return $.Utils_drawDashedLine$bailout(3, ctx, x, da, y, dashCount, slope, dx, dy);
  var distRemaining = $.Math_sqrt($.add($.mul(dx, dx), $.mul(dy, dy)));
  if (typeof distRemaining !== 'number') return $.Utils_drawDashedLine$bailout(4, ctx, x, da, y, dashCount, slope, distRemaining, 0);
  var t1 = 1 + slope * slope;
  var drawLine = true;
  var dashIndex = 0;
  while (true) {
    if (!(distRemaining >= 0.1 && dashIndex < 10000)) break;
    var dashIndex0 = dashIndex + 1;
    var t2 = $.mod(dashIndex, dashCount);
    var t3 = da.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    var dashLength = da[t2];
    if ($.gtB(dashLength, distRemaining)) dashLength = distRemaining;
    var xStep = $.Math_sqrt($.div($.mul(dashLength, dashLength), t1));
    if (typeof xStep !== 'number') throw $.iae(xStep);
    x += xStep;
    y += slope * xStep;
    if (drawLine) ctx.lineTo$2(x, y);
    else ctx.moveTo$2(x, y);
    if (typeof dashLength !== 'number') throw $.iae(dashLength);
    distRemaining -= dashLength;
    drawLine = !drawLine;
    dashIndex = dashIndex0;
  }
  ctx.moveTo$2(0, 0);
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._DOMWindowCrossFrameImpl__close = function(win) {
  win.close();
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.Rectangle_intersect = function(r1, r2) {
  return !($.gtB(r1.get$left(), r2.get$right()) || ($.ltB(r1.get$right(), r2.get$left()) || ($.gtB(r1.get$top(), r2.get$bottom()) || $.ltB(r1.get$bottom(), r2.get$top()))));
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.CastException$ = function(actualType, expectedType) {
  return new $.CastException(expectedType, actualType);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  return name$;
};

$._WebSocketFactoryProvider_WebSocket = function(url) {
  return new WebSocket(url);;
};

$.Primitives_getDay = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCDate()) : ($.Primitives_lazyAsJsDate(receiver).getDate());
};

$.callTypeCast = function(value, property) {
  if (!(value == null)) {
    var t1 = (typeof value === "object") && (value[property]());
  } else t1 = true;
  if (t1) return value;
  $.propertyTypeCastError(value, property);
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.Momentum$ = function(xVel, yVel, xAccel, yAccel, xMax, yMax) {
  return new $.Momentum(yMax, xMax, yAccel, xAccel, yVel, xVel);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Futures_wait = function(futures) {
  var t1 = ({});
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || (futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))) return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.Rectangle$clone = function(rect) {
  var t1 = rect.get$top();
  var t2 = rect.get$left();
  var t3 = rect.get$right();
  return new $.Rectangle(rect.get$bottom(), t3, t2, t1);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMinutes()) : ($.Primitives_lazyAsJsDate(receiver).getMinutes());
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.Primitives_getMonth = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMonth()) + 1 : ($.Primitives_lazyAsJsDate(receiver).getMonth()) + 1;
};

$.Math_atan2 = function(a, b) {
  return $.MathNatives_atan2(a, b);
};

$.MathNatives_atan2 = function(a, b) {
  return Math.atan2($.checkNum(a), $.checkNum(b));
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.PowerUp$ = function(game, x, y) {
  var t1 = new $.PowerUp(0, null, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 36, 36);
  t1.PowerUp$3(game, x, y);
  return t1;
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  (receiver.date === (void 0)) && (receiver.date = new Date(receiver.get$millisecondsSinceEpoch()));
  return receiver.date;
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$._MeasurementRequest$ = function(computeValue, completer) {
  return new $._MeasurementRequest(false, null, completer, computeValue);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._SimpleClientRect$ = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.concat = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.concat$1(other);
  if (!(typeof other === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(other));
  return receiver + other;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Primitives_getYear = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCFullYear()) : ($.Primitives_lazyAsJsDate(receiver).getFullYear());
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var t1 = ({});
  var ctx = $.document().query$1('#surface').getContext$1('2d');
  t1.msgCount_1 = 0;
  var assetManager = $.AssetManager$();
  assetManager.queueDownload$1('Sounds/hit1.ogg');
  assetManager.queueDownload$1('Sounds/hit2.ogg');
  assetManager.queueDownload$1('Sounds/hit3.ogg');
  assetManager.queueDownload$1('Sounds/sweep.ogg');
  assetManager.queueDownload$1('Sounds/hit1.mp3');
  assetManager.queueDownload$1('Sounds/hit2.mp3');
  assetManager.queueDownload$1('Sounds/hit3.mp3');
  assetManager.queueDownload$1('Sounds/sweep.mp3');
  var ws = $._WebSocketFactoryProvider_WebSocket('ws://localhost:8000/ws');
  $.add$1(ws.get$on().get$open(), new $.main_anon(ws));
  $.add$1(ws.get$on().get$message(), new $.main_anon0(ws, t1));
  $.add$1(ws.get$on().get$error(), new $.main_anon1());
  $.add$1(ws.get$on().get$close(), new $.main_anon2());
  var game = $.PongGame$(assetManager, ctx);
  game.enableSound = false;
  game.debugMode = false;
  assetManager.downloadAll$1(new $.main_anon3(game));
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_lib0_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$.Ball$ = function(game, x, y) {
  var t1 = new $.Ball(400, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 8, 8);
  t1.Ball$3(game, x, y);
  return t1;
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.propertyTypeCastError = function(value, property) {
  throw $.captureStackTrace($.CastException$($.Primitives_objectTypeName(value), $.substring$2(property, 3, $.get$length(property))));
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.Utils_round = function(value, decimals) {
  var o = $.Math_pow(10, decimals);
  return $.div($.round($.mul(value, o)), o);
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.round$0();
  if (receiver < 0) return -Math.round(-receiver);
  return Math.round(receiver);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.toStringAsFixed = function(receiver, fractionDigits) {
  if (!(typeof receiver === 'number')) return receiver.toStringAsFixed$1(fractionDigits);
  $.checkNum(fractionDigits);
  var result = (receiver.toFixed(fractionDigits));
  if (receiver === 0 && $.isNegative(receiver) === true) return '-' + result;
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds()) : ($.Primitives_lazyAsJsDate(receiver).getMilliseconds());
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._DOMWindowCrossFrameImpl__top = function(win) {
  return win.top;;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.AssetManager$ = function() {
  var t1 = new $.AssetManager(null, null, 0, 0);
  t1.AssetManager$0();
  return t1;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.ComputerPaddle$ = function(game, x, y, skillLevel) {
  var t1 = new $.ComputerPaddle(null, null, 3, 0, 0, 0, 0, 0, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 8, 120);
  t1.Paddle$3(game, x, y);
  t1.ComputerPaddle$4(game, x, y, skillLevel);
  return t1;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.Math_pow = function(x, exponent) {
  return $.MathNatives_pow(x, exponent);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.MathNatives_pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.Paddle$ = function(game, x, y) {
  var t1 = new $.Paddle(0, 0, 0, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 8, 120);
  t1.Paddle$3(game, x, y);
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.Primitives_getSeconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCSeconds()) : ($.Primitives_lazyAsJsDate(receiver).getSeconds());
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$.Utils_random = function(min, max, wholeNumbers) {
  var value = $.add(min, $.mul($.Math_random(), $.sub(max, min)));
  return wholeNumbers === true ? $.round(value) : value;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCHours()) : ($.Primitives_lazyAsJsDate(receiver).getHours());
};

$.Math_random = function() {
  return $.MathNatives_random();
};

$.MathNatives_random = function() {
  return Math.random();
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win, message, targetOrigin, messagePorts) {
      win.postMessage(message, targetOrigin, messagePorts);
;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ElementRectImpl$ = function(element) {
  var t1 = $._SimpleClientRect$(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t2 = $._SimpleClientRect$(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t3 = $._SimpleClientRect$(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t4 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t4, t3, t2, t1);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC10)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(isUtc, millisecondsSinceEpoch);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Math_min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b) return b;
      if (a < b) return a;
      if (typeof b === 'number') {
        if (typeof a === 'number') {
          if (a === 0.0) return (a + b) * a * b;
        }
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true) return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC9) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  if ($.contains$1(userAgent, 'Opera') === true) return $.typeNameInOpera;
  return $.constructorNameFallback;
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1) return w;
  return $._DOMWindowCrossFrameImpl$(w);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.some = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.some$1(f);
  return $.Collections_some(receiver, f);
};

$.Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$._Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    if (f.$call$1(t1.next$0()) === true) return true;
  }
  return false;
};

$.Bullet$ = function(game, x, y, p1) {
  var t1 = new $.Bullet(null, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 8, 8);
  t1.Bullet$4(game, x, y, p1);
  return t1;
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.Utils_drawDashedLine$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var ctx = env0;
      var x = env1;
      var y = env2;
      var x2 = env3;
      var y2 = env4;
      var da = env5;
      break;
    case 2:
      ctx = env0;
      x = env1;
      da = env2;
      y = env3;
      y2 = env4;
      x2 = env5;
      break;
    case 3:
      ctx = env0;
      x = env1;
      da = env2;
      y = env3;
      dashCount = env4;
      slope = env5;
      dx = env6;
      dy = env7;
      break;
    case 4:
      ctx = env0;
      x = env1;
      da = env2;
      y = env3;
      dashCount = env4;
      slope = env5;
      distRemaining = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (da == null) da = [10, 5];
    case 2:
      state = 0;
      var dashCount = $.get$length(da);
      ctx.moveTo$2(x, y);
      var dx = $.sub(x2, x);
      var dy = $.sub(y2, y);
      var slope = !$.eqB(dx, 0) ? $.div(dy, dx) : dy;
    case 3:
      state = 0;
      var distRemaining = $.Math_sqrt($.add($.mul(dx, dx), $.mul(dy, dy)));
    case 4:
      state = 0;
      var drawLine = true;
      var dashIndex = 0;
      while (true) {
        if (!($.geB(distRemaining, 0.1) && dashIndex < 10000)) break;
        var dashIndex0 = dashIndex + 1;
        if (typeof dashCount !== 'number') throw $.iae(dashCount);
        var dashLength = $.index(da, $.mod(dashIndex, dashCount));
        if ($.gtB(dashLength, distRemaining)) dashLength = distRemaining;
        var t1 = $.mul(dashLength, dashLength);
        var t2 = $.mul(slope, slope);
        if (typeof t2 !== 'number') throw $.iae(t2);
        var xStep = $.Math_sqrt($.div(t1, 1 + t2));
        x = $.add(x, xStep);
        y = $.add(y, $.mul(slope, xStep));
        if (drawLine) ctx.lineTo$2(x, y);
        else ctx.moveTo$2(x, y);
        distRemaining = $.sub(distRemaining, dashLength);
        drawLine = !drawLine;
        dashIndex = dashIndex0;
      }
      ctx.moveTo$2(0, 0);
  }
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.$call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC2 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC7 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC8 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7);
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC10 = new Isolate.$isolateProperties.Object();
$.CTC3 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC4 = new Isolate.$isolateProperties.EmptyQueueException();
$._pendingRequests = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$._nextMeasurementFrameScheduled = false;
$._firstMeasurementRequest = true;
$._pendingMeasurementFrameCallbacks = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$TouchEvent', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$ImageElement', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$AudioElement', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimation', ["paused?", "name?"], {
 play$0: function() {
  return this.play();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width?", "name?", "height="], {
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$AudioElement: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "name?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$top: function(value) {
  this.setProperty$3('top', value, '');
 },
 get$top: function() {
  return this.getPropertyValue$1('top');
 },
 set$src: function(value) {
  this.setProperty$3('src', value, '');
 },
 get$src: function() {
  return this.getPropertyValue$1('src');
 },
 set$right: function(value) {
  this.setProperty$3('right', value, '');
 },
 get$right: function() {
  return this.getPropertyValue$1('right');
 },
 set$opacity: function(value) {
  this.setProperty$3('opacity', value, '');
 },
 set$left: function(value) {
  this.setProperty$3('left', value, '');
 },
 get$left: function() {
  return this.getPropertyValue$1('left');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 set$font: function(value) {
  this.setProperty$3('font', value, '');
 },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 set$bottom: function(value) {
  this.setProperty$3('bottom', value, '');
 },
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
 },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width?", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext', ["canvas?"], {
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "lineWidth!", "font!", "fillStyle!"], {
 translate$2: function(tx, ty) {
  return this.translate(tx,ty);
 },
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return this.strokeRect(x,y,width,height,lineWidth);
 },
 strokeRect$4: function(x,y,width,height) {
  return this.strokeRect(x,y,width,height);
},
 stroke$0: function() {
  return this.stroke();
 },
 save$0: function() {
  return this.save();
 },
 restore$0: function() {
  return this.restore();
 },
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
 },
 get$rect: function() { return new $.BoundClosure(this, 'rect$4'); },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?", "data?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "top?", "right?", "left?", "height?", "bottom?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.error$1 = function(arg) {
  return this.error(arg);
 };
_ConsoleImpl.get$error = function() { return new $.BoundClosure0(this, 'error$1'); };
$.$defineNativeClass('DOMApplicationCache', [], {
 update$0: function() {
  return this.update();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', ["open?"], {
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC6.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$window: function() {
  return this.defaultView;;
 },
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 click$0: function() {
 },
 get$click: function() { return new $.BoundClosure1(this, 'click$0'); },
 get$attributes: function() {
  return $.CTC2;
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 get$translate: function() {
  return false;
 },
 translate$2: function(arg0, arg1) { return this.get$translate().$call$2(arg0, arg1); },
 get$rect: function() {
  var t1 = new $._DocumentFragmentImpl_rect_anon();
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["id?"], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
 },
 $dom_getClientRects$0: function() {
  return this.getClientRects();
 },
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
 },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
 },
 get$$$dom_scrollWidth: function() {
  return this.scrollWidth;;
 },
 get$$$dom_scrollTop: function() {
  return this.scrollTop;;
 },
 get$$$dom_scrollLeft: function() {
  return this.scrollLeft;;
 },
 get$$$dom_scrollHeight: function() {
  return this.scrollHeight;;
 },
 get$$$dom_offsetWidth: function() {
  return this.offsetWidth;;
 },
 get$$$dom_offsetTop: function() {
  return this.offsetTop;;
 },
 get$$$dom_offsetLeft: function() {
  return this.offsetLeft;;
 },
 get$$$dom_offsetHeight: function() {
  return this.offsetHeight;;
 },
 get$$$dom_clientWidth: function() {
  return this.clientWidth;;
 },
 get$$$dom_clientTop: function() {
  return this.clientTop;;
 },
 get$$$dom_clientLeft: function() {
  return this.clientLeft;;
 },
 get$$$dom_clientHeight: function() {
  return this.clientHeight;;
 },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.BoundClosure1(this, 'click$0'); },
 translate$2: function(arg0, arg1) { return this.translate.$call$2(arg0, arg1); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$rect: function() {
  var t1 = new $._ElementImpl_rect_anon(this);
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["width?", "src=", "name?", "height="], {
});

$.$defineNativeClass('Entry', ["name?"], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', [], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?", "error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "src=", "name?", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width?"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 update$1: function(value) {
  return this.update(value);
 }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBFactory', [], {
 open$1: function(name) {
  return this.open(name);
 },
 get$open: function() { return new $.BoundClosure0(this, 'open$1'); }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', ["error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', ["error?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width?", "src=", "name?", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?", "data?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width?", "src=", "name?", "height="], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); },
 is$ImageElement: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width?", "value=", "src=", "pattern?", "name?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
});

$.$defineNativeClass('HTMLMarqueeElement', ["width?", "height="], {
 start$0: function() {
  return this.start();
 }
});

$.$defineNativeClass('MediaController', ["volume!", "paused?"], {
 play$0: function() {
  return this.play();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["volume!", "src=", "paused?", "error?"], {
 play$0: function() {
  return this.play();
 },
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.BoundClosure1(this, 'load$0'); },
 canPlayType$2: function(type, keySystem) {
  return this.canPlayType(type,keySystem);
 },
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?", "data?"], {
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?", "clientY?", "clientX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 clone$1: function(deep) {
  return this.cloneNode(deep);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_attributes: function() {
  return this.attributes;;
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLOListElement', [], {
 start$0: function() { return this.start.$call$0(); }
});

$.$defineNativeClass('HTMLObjectElement', ["width?", "name?", "height=", "data?"], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "name?"], {
});

$.$defineNativeClass('PeerConnection00', [], {
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width?"], {
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('Rect', ["top?", "right?", "left?", "bottom?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGMatrix', [], {
 translate$2: function(x, y) {
  return this.translate(x,y);
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["y=", "x=", "width?", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["src="], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "name?", "length="], {
 add$2: function(element, before) {
  return this.add(element,before);
 }
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["src="], {
});

$.$defineNativeClass('SpeechGrammar', ["src="], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width?", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width?"], {
});

$.$defineNativeClass('HTMLTableElement', ["width?"], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "name?"], {
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('Touch', ["clientY?", "clientX?"], {
});

$.$defineNativeClass('TouchEvent', ["touches?"], {
 is$TouchEvent: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src="], {
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 some$1: function(f) {
  return $._Collections_some(this, f);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width?", "height="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
 }
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 send$1: function(data) {
  return this.send(data);
 },
 close$2: function(code, reason) {
  return this.close(code,reason);
 },
 get$close: function() { return new $.BoundClosure2(this, 'close$2'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["window?", "navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 },
 open$3: function(url, name$, options) {
  if (options == null) return $._DOMWindowCrossFrameImpl__createSafe(this._open2$2(url, name$));
  return $._DOMWindowCrossFrameImpl__createSafe(this._open3$3(url, name$, options));
 },
 get$open: function() { return new $.BoundClosure3(this, 'open$3'); },
 _open3$3: function(url, name, options) {
  return this.open(url, name, options);;
 },
 _open2$2: function(url, name) {
  return this.open(url, name);;
 },
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
 },
 get$_top: function() {
  return this.top;;
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 close$0: function() {
  return this.close();
 },
 get$close: function() { return new $.BoundClosure1(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 send$1: function(data) {
  return this.send(data);
 },
 open$5: function(method, url, async, user, password) {
  return this.open(method,url,async,user,password);
 },
 get$open: function() { return new $.BoundClosure4(this, 'open$5'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 255 dynamic classes.
// 381 classes
// 32 !leaf
(function(){
  var v0/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v3/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v4/*class(_UIEventImpl)*/ = [v0/*class(_MouseEventImpl)*/,v0/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|');
  var v5/*class(_ElementImpl)*/ = [v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v6/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v7/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v8/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v9/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v10/*class(_NodeImpl)*/ = [v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v11/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v12/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v13/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['AbstractWorker', v13/*class(_AbstractWorkerImpl)*/],
    ['MouseEvent', v0/*class(_MouseEventImpl)*/],
    ['UIEvent', v4/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v9/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CanvasRenderingContext', 'CanvasRenderingContext|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D'],
    ['CharacterData', v8/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v7/*class(_DocumentImpl)*/],
    ['DocumentFragment', v6/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v2/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v3/*class(_MediaElementImpl)*/],
    ['Element', v5/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v4/*class(_UIEventImpl)*/,v4/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v10/*class(_NodeImpl)*/],
    ['MediaStream', v11/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v12/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v9/*class(_WorkerContextImpl)*/,v10/*class(_NodeImpl)*/,v11/*class(_MediaStreamImpl)*/,v12/*class(_IDBRequestImpl)*/,v13/*class(_AbstractWorkerImpl)*/,v9/*class(_WorkerContextImpl)*/,v10/*class(_NodeImpl)*/,v11/*class(_MediaStreamImpl)*/,v12/*class(_IDBRequestImpl)*/,v13/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
