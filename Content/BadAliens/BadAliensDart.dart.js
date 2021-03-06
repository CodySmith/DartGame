function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
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
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
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
  if ($.index(this._lib0_keys, index) == null || $.index(this._lib0_keys, index) === $.CTC5) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._lib0_keys, index, key);
  $.indexSet(this._values, index, value);
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
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
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

$$.DateImplementation = {"":
 ["isUtc?", "millisecondsSinceEpoch?"],
 super: "Object",
 _asJs$0: function() {
  return $.Primitives_lazyAsJsDate(this);
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
  if (!((typeof other === 'object' && other !== null) && !!other.is$DateImplementation)) return false;
  return $.eq(this.millisecondsSinceEpoch, other.millisecondsSinceEpoch);
 },
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000)) throw $.captureStackTrace($.IllegalArgumentException$(t1));
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
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
 noSuchMethod$2: function(name$, args) {
  throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
 },
 toString$0: function() {
  return $.Primitives_objectToString(this);
 },
 _lib1_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib2_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib3_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib4_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib5_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib6_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib7_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib5_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib8_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib9_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 _lib1_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib2_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib3_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib4_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib5_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib6_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib0_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib5_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib0_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib8_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib9_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 getContext$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getContext', [arg0])
},
 $dom_addEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_addEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_addEventListener', [arg0, arg1, arg2])
},
 init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'init', [])
},
 $dom_hasAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_hasAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_hasAttribute', [arg0])
},
 save$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('save', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'save', [])
},
 removeFromGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFromGame', [])
},
 removeFromGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFromGame', [])
},
 removeFromGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFromGame', [])
},
 removeFromGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFromGame', [])
},
 floor$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('floor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'floor', [])
},
 truncate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('truncate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'truncate', [])
},
 $dom_getElementById$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getElementById', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getElementById', [arg0])
},
 operator$le$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$le', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$le', [arg0])
},
 charCodeAt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('charCodeAt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'charCodeAt', [arg0])
},
 $dom_getItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getItem', [arg0])
},
 isNaN$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isNaN', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isNaN', [])
},
 updateBox$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateBox', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateBox', [])
},
 getValues$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getValues', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getValues', [])
},
 preventDefault$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('preventDefault', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'preventDefault', [])
},
 visitList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitList', [arg0])
},
 fillRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fillRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fillRect', [arg0, arg1, arg2, arg3])
},
 explode$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('explode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'explode', [])
},
 lastEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lastEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lastEntry', [])
},
 _lib1_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib2_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib3_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib4_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib5_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib6_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib7_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib5_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib8_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib9_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 process$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('process', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'process', [])
},
 translate$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('translate', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'translate', [arg0, arg1])
},
 operator$tdiv$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$tdiv', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$tdiv', [arg0])
},
 $dom_setItem$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setItem', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setItem', [arg0, arg1])
},
 toStringAsFixed$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toStringAsFixed', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toStringAsFixed', [arg0])
},
 operator$div$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$div', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$div', [arg0])
},
 containsKey$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('containsKey', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'containsKey', [arg0])
},
 containsKey$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('containsKey', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'containsKey', [arg0])
},
 drawFrame$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawFrame', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawFrame', [arg0, arg1, arg2, arg3])
},
 drawFrame$5: function (arg0, arg1, arg2, arg3, arg4) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawFrame', [arg0, arg1, arg2, arg3, arg4])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawFrame', [arg0, arg1, arg2, arg3, arg4])
},
 complete$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('complete', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'complete', [arg0])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 draw$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('draw', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'draw', [])
},
 draw$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('draw', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'draw', [arg0])
},
 beginPath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('beginPath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'beginPath', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 rotateAndCache$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('rotateAndCache', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'rotateAndCache', [arg0, arg1])
},
 _lib1_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib2_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib3_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib4_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib5_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib6_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib7_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib5_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib8_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 _lib9_setValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setValue', [arg0])
},
 $dom_appendChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_appendChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_appendChild', [arg0])
},
 firstMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('firstMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'firstMatch', [arg0])
},
 next$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'next', [])
},
 remove$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [])
},
 remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [arg0])
},
 hasNext$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasNext', [])
},
 operator$ge$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$ge', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$ge', [arg0])
},
 requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'requestAnimationFrame', [arg0])
},
 $dom_removeChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeChild', [arg0])
},
 previousEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('previousEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'previousEntry', [])
},
 allMatches$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('allMatches', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'allMatches', [arg0])
},
 _lib1_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib2_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib3_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib4_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib5_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib6_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib7_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib0_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib5_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib0_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib8_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib9_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib1_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib2_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib3_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib4_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib5_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib6_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib7_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib5_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib8_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 _lib9_complete$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_complete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_complete', [])
},
 maybeCloseWorker$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('maybeCloseWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'maybeCloseWorker', [])
},
 isCaughtInExplosion$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isCaughtInExplosion', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isCaughtInExplosion', [arg0])
},
 arc$6: function (arg0, arg1, arg2, arg3, arg4, arg5) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('arc', [arg0, arg1, arg2, arg3, arg4, arg5])
      : $.Object.prototype.noSuchMethod$2.call(this, 'arc', [arg0, arg1, arg2, arg3, arg4, arg5])
},
 filter$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('filter', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'filter', [arg0])
},
 startInput$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startInput', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startInput', [])
},
 _lib1_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib2_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib3_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib4_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib5_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib6_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib0_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib5_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib0_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib8_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib9_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib1_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib2_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib3_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib4_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib5_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib6_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib0_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib5_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib0_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib8_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib9_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib1_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib2_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib3_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib4_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib5_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib6_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib0_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib5_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib0_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib8_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib9_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 prepend$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepend', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepend', [arg0])
},
 restore$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('restore', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'restore', [])
},
 currentFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('currentFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'currentFrame', [])
},
 currentFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('currentFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'currentFrame', [])
},
 operator$mul$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mul', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mul', [arg0])
},
 $dom_setAttribute$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setAttribute', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setAttribute', [arg0, arg1])
},
 add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'add', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 computeValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('computeValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'computeValue', [])
},
 drawScore$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawScore', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawScore', [])
},
 contains$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0])
},
 contains$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0, arg1])
},
 operator$negate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$negate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$negate', [])
},
 run$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('run', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'run', [])
},
 $dom_getClientRects$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getClientRects', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getClientRects', [])
},
 _lib1_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib2_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib3_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib4_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib5_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib6_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib7_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib5_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib8_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 _lib9_setException$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setException', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setException', [arg0, arg1])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 completeException$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('completeException', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'completeException', [arg0])
},
 stroke$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('stroke', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'stroke', [])
},
 updateFrom$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateFrom', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateFrom', [arg0])
},
 drawBeforeCtxRestore$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawBeforeCtxRestore', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawBeforeCtxRestore', [])
},
 endsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('endsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'endsWith', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib6_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib9_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib6_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib9_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib6_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib9_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 query$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('query', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'query', [arg0])
},
 visitPrimitive$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitPrimitive', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitPrimitive', [arg0])
},
 clearRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clearRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clearRect', [arg0, arg1, arg2, arg3])
},
 update$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('update', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'update', [])
},
 update$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('update', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'update', [])
},
 update$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('update', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'update', [arg0])
},
 _lib1_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib2_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib3_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib4_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib5_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib6_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib7_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib5_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib8_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib9_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 postMessage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('postMessage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'postMessage', [arg0])
},
 postMessage$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('postMessage', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'postMessage', [arg0, arg1])
},
 operator$shl$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shl', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shl', [arg0])
},
 addLast$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addLast', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addLast', [arg0])
},
 $dom_getBoundingClientRect$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getBoundingClientRect', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getBoundingClientRect', [])
},
 isDone$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isDone', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isDone', [])
},
 isDone$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isDone', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isDone', [])
},
 outsideScreen$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('outsideScreen', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'outsideScreen', [])
},
 _lib1_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib2_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib3_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib4_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib5_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib6_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib0_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib5_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib0_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib8_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib9_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 operator$xor$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$xor', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$xor', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 drawLives$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawLives', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawLives', [])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 indexOf$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0, arg1])
},
 operator$sub$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$sub', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$sub', [arg0])
},
 $dom_replaceChild$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_replaceChild', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_replaceChild', [arg0, arg1])
},
 abs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('abs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'abs', [])
},
 operator$lt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$lt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$lt', [arg0])
},
 clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clear', [])
},
 getPropertyValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getPropertyValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getPropertyValue', [arg0])
},
 $dom_key$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_key', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_key', [arg0])
},
 dequeue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('dequeue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'dequeue', [])
},
 $dom_clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_clear', [])
},
 $call$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [])
},
 $call$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0])
},
 $call$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1])
},
 $call$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1, arg2])
},
 forEach$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('forEach', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'forEach', [arg0])
},
 operator$indexSet$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$indexSet', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$indexSet', [arg0, arg1])
},
 start$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('start', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'start', [])
},
 operator$and$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$and', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$and', [arg0])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib6_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib9_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib6_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib9_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib2_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib3_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib4_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib5_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib6_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib7_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib5_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib8_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib9_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 isImage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isImage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isImage', [arg0])
},
 isNegative$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isNegative', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isNegative', [])
},
 hasMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasMatch', [arg0])
},
 removeLast$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeLast', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeLast', [])
},
 operator$add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$add', [arg0])
},
 _lib1_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib2_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib3_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib4_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib5_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib6_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib7_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib5_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib8_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib9_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib1_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib2_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib3_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib4_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib5_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib6_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib0_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib5_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib0_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib8_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib9_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 shoot$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('shoot', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'shoot', [])
},
 _lib1_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib2_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib4_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib5_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib6_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib7_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib0_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib5_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib0_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib8_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib9_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib1_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib2_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib3_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib4_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib5_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib6_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib7_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib5_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib8_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib9_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 then$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('then', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'then', [arg0])
},
 hitPlanet$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hitPlanet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hitPlanet', [])
},
 operator$gt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$gt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$gt', [arg0])
},
 initGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('initGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'initGlobals', [])
},
 removeRange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeRange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeRange', [arg0, arg1])
},
 _lib1_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib2_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib3_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib4_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib5_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib6_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib0_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib5_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib0_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib8_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib9_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 fillText$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fillText', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fillText', [arg0, arg1, arg2])
},
 scaleFactor$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('scaleFactor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'scaleFactor', [])
},
 $dom_getAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getAttribute', [arg0])
},
 _lib1_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib2_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib3_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib4_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib5_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib6_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib7_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib5_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib8_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib9_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 setProperty$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1, arg2])
},
 _lib1_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib2_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib3_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib4_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib5_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib6_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib7_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib0_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib5_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib0_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib8_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib9_ensureRequestAnimationFrame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureRequestAnimationFrame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureRequestAnimationFrame', [])
},
 _lib1_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib2_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib3_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib4_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib5_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib6_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib7_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib0_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib5_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib0_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib8_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 _lib9_requestAnimationFrame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_requestAnimationFrame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_requestAnimationFrame', [arg0])
},
 drawSpriteCentered$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawSpriteCentered', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawSpriteCentered', [arg0])
},
 rotate$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('rotate', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'rotate', [arg0])
},
 split$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('split', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'split', [arg0])
},
 setCoords$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setCoords', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setCoords', [])
},
 _lib1_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib2_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib3_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib4_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib5_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib6_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib7_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib5_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib8_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib9_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 drawImage$9: function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawImage', [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawImage', [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8])
},
 drawImage$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawImage', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawImage', [arg0, arg1, arg2])
},
 isEmpty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isEmpty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isEmpty', [])
},
 addEntity$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addEntity', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addEntity', [arg0])
},
 addEntity$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addEntity', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addEntity', [arg0])
},
 ceil$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ceil', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ceil', [])
},
 tick$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('tick', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'tick', [])
},
 drawDebugInfo$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('drawDebugInfo', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'drawDebugInfo', [])
},
 hashCode$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hashCode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hashCode', [])
},
 strokeRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('strokeRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'strokeRect', [arg0, arg1, arg2, arg3])
},
 getAsset$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getAsset', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getAsset', [arg0])
},
 setTimeout$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setTimeout', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setTimeout', [arg0, arg1])
},
 $dom_removeAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeAttribute', [arg0])
},
 reset$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('reset', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'reset', [])
},
 operator$shr$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shr', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shr', [arg0])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 eval$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('eval', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'eval', [arg0])
},
 visitSendPortSync$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPortSync', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPortSync', [arg0])
},
 substring$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0])
},
 substring$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0, arg1])
},
 iterator$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('iterator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'iterator', [])
},
 visitMap$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitMap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitMap', [arg0])
},
 cleanup$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('cleanup', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'cleanup', [])
},
 getKeys$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getKeys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getKeys', [])
},
 removeFirst$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFirst', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFirst', [])
},
 startsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startsWith', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 closePath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('closePath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'closePath', [])
},
 get$gameTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get gameTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get gameTime', [])
},
 get$_lib1_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib2_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib3_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib4_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib5_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib6_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib0_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib5_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib0_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib8_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib9_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib1_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib2_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib3_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib4_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib5_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib6_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib7_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib0_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib5_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib0_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib8_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib9_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$isWorker: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isWorker', [])
},
 get$key: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get key', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get key', [])
},
 get$y: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get y', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get y', [])
},
 get$loop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get loop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get loop', [])
},
 get$$$dom_scrollWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollWidth', [])
},
 get$load: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get load', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get load', [])
},
 get$$$dom_scrollLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollLeft', [])
},
 get$name: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get name', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get name', [])
},
 get$touches: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touches', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touches', [])
},
 get$_lib1_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib2_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib3_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib4_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib5_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib6_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib7_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib0_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib5_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib0_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib9_errorCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _errorCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _errorCount', [])
},
 get$_lib1_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib2_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib3_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib4_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib5_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib6_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib0_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib5_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib0_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib8_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib9_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$width: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get width', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get width', [])
},
 get$rootContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get rootContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get rootContext', [])
},
 get$fromCommandLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get fromCommandLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get fromCommandLine', [])
},
 get$length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get length', [])
},
 get$month: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get month', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get month', [])
},
 get$currentManagerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentManagerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentManagerId', [])
},
 get$$$dom_attributes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_attributes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_attributes', [])
},
 get$halfSurfaceWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get halfSurfaceWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get halfSurfaceWidth', [])
},
 get$$$dom_offsetWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetWidth', [])
},
 get$_lib1_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib2_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib3_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib4_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib5_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib6_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib7_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib5_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib8_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib9_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$minute: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get minute', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get minute', [])
},
 get$right: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get right', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get right', [])
},
 get$mouseMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseMove', [])
},
 get$value: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get value', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get value', [])
},
 get$isUtc: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isUtc', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isUtc', [])
},
 get$left: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get left', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get left', [])
},
 get$navigator: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get navigator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get navigator', [])
},
 get$exceptionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exceptionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exceptionName', [])
},
 get$attributes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attributes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attributes', [])
},
 get$clientY: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get clientY', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get clientY', [])
},
 get$yVel: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get yVel', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get yVel', [])
},
 get$bottom: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get bottom', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get bottom', [])
},
 get$useWorkers: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get useWorkers', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get useWorkers', [])
},
 get$$$dom_scrollTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollTop', [])
},
 get$mouse: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouse', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouse', [])
},
 get$_lib1_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib2_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib4_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib5_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib6_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib7_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib0_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib5_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib0_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib8_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib9_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$tag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tag', [])
},
 get$id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get id', [])
},
 get$needSerialization: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get needSerialization', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get needSerialization', [])
},
 get$millisecondsSinceEpoch: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get millisecondsSinceEpoch', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get millisecondsSinceEpoch', [])
},
 get$topEventLoop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get topEventLoop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get topEventLoop', [])
},
 get$touchStart: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touchStart', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touchStart', [])
},
 get$click: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get click', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get click', [])
},
 get$_lib1_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib2_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib3_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib4_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib5_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib6_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib7_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib5_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib8_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib9_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib1_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib2_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib3_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib4_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib5_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib6_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib7_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib0_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib5_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib0_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$_lib9_successCount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _successCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _successCount', [])
},
 get$height: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get height', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get height', [])
},
 get$bounding: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get bounding', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get bounding', [])
},
 get$message: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get message', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get message', [])
},
 get$fps: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get fps', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get fps', [])
},
 get$xVel: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get xVel', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get xVel', [])
},
 get$hour: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hour', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hour', [])
},
 get$_lib1_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib2_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib3_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib4_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib5_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib6_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib0_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib5_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib0_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib8_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib9_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib1_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib2_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib3_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib4_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib5_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib6_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib7_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib0_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib5_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib0_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib8_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$_lib9_top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _top', [])
},
 get$$$dom_offsetHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetHeight', [])
},
 get$on: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get on', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get on', [])
},
 get$_lib1_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib2_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib3_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib4_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib5_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib6_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib0_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib5_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib0_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib8_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib9_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$ignoreCase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ignoreCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ignoreCase', [])
},
 get$day: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get day', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get day', [])
},
 get$$$dom_length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_length', [])
},
 get$_lib1_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib2_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib3_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib4_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib5_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib6_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib0_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib5_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib0_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib8_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib9_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$inMilliseconds: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get inMilliseconds', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get inMilliseconds', [])
},
 get$top: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get top', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get top', [])
},
 get$clientX: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get clientX', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get clientX', [])
},
 get$canvas: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get canvas', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get canvas', [])
},
 get$clockTick: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get clockTick', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get clockTick', [])
},
 get$isolates: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isolates', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isolates', [])
},
 get$ports: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ports', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ports', [])
},
 get$mainManager: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mainManager', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mainManager', [])
},
 get$error: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get error', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get error', [])
},
 get$second: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get second', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get second', [])
},
 get$element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get element', [])
},
 get$set: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get set', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get set', [])
},
 get$millisecond: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get millisecond', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get millisecond', [])
},
 get$$$dom_clientHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientHeight', [])
},
 get$nextIsolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get nextIsolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get nextIsolateId', [])
},
 get$_lib1_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib2_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib3_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib4_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib5_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib6_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib7_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib0_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib5_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib0_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$_lib9_removeFromGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _removeFromGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _removeFromGame', [])
},
 get$year: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get year', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get year', [])
},
 get$hasValue: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hasValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hasValue', [])
},
 get$$$dom_offsetLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetLeft', [])
},
 get$touchMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get touchMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get touchMove', [])
},
 get$clientPoint: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get clientPoint', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get clientPoint', [])
},
 get$exception: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exception', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exception', [])
},
 get$ctx: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ctx', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ctx', [])
},
 get$src: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get src', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get src', [])
},
 get$pattern: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pattern', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pattern', [])
},
 get$completer: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get completer', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get completer', [])
},
 get$assetManager: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get assetManager', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get assetManager', [])
},
 get$currentContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentContext', [])
},
 get$showOutlines: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get showOutlines', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get showOutlines', [])
},
 get$future: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get future', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get future', [])
},
 get$halfSurfaceHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get halfSurfaceHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get halfSurfaceHeight', [])
},
 get$userAgent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get userAgent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get userAgent', [])
},
 get$x: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get x', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get x', [])
},
 get$_lib1_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib2_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib3_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib4_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib5_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib6_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib7_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib5_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib8_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib9_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$$$dom_clientWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientWidth', [])
},
 get$multiLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get multiLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get multiLine', [])
},
 get$entities: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get entities', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get entities', [])
},
 get$rect: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get rect', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get rect', [])
},
 get$$$dom_offsetTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_offsetTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_offsetTop', [])
},
 get$radius: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get radius', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get radius', [])
},
 get$$$dom_clientLeft: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientLeft', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientLeft', [])
},
 get$parent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get parent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get parent', [])
},
 get$lives: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get lives', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get lives', [])
},
 get$$$dom_clientTop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_clientTop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_clientTop', [])
},
 get$isComplete: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isComplete', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isComplete', [])
},
 get$_lib1_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib2_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib3_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib4_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib5_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib6_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib0_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib5_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib0_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib8_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib9_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$p: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get p', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get p', [])
},
 get$$$dom_scrollHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_scrollHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_scrollHeight', [])
},
 get$score: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get score', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get score', [])
},
 get$frameWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get frameWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get frameWidth', [])
},
 set$left: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set left', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set left', [arg0])
},
 set$font: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set font', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set font', [arg0])
},
 set$bottom: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set bottom', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set bottom', [arg0])
},
 set$y: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set y', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set y', [arg0])
},
 set$mouse: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set mouse', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set mouse', [arg0])
},
 set$clientPoint: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set clientPoint', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set clientPoint', [arg0])
},
 set$exception: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set exception', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set exception', [arg0])
},
 set$src: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set src', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set src', [arg0])
},
 set$_lib1_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib2_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib3_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib4_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib5_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib6_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib7_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib0_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib5_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib0_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$_lib9_errorCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _errorCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _errorCount', [arg0])
},
 set$strokeStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set strokeStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set strokeStyle', [arg0])
},
 set$width: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set width', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set width', [arg0])
},
 set$top: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set top', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set top', [arg0])
},
 set$rootContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set rootContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set rootContext', [arg0])
},
 set$currentContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentContext', [arg0])
},
 set$length: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set length', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set length', [arg0])
},
 set$click: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set click', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set click', [arg0])
},
 set$_lib1_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib2_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib3_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib4_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib5_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib6_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib7_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib5_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib8_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib9_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$x: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set x', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set x', [arg0])
},
 set$_lib1_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib2_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib3_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib4_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib5_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib6_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib7_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib0_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib5_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib0_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$_lib9_successCount: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _successCount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _successCount', [arg0])
},
 set$text: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set text', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set text', [arg0])
},
 set$height: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set height', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set height', [arg0])
},
 set$_lib1_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib2_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib3_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib4_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib5_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib6_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib7_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib5_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib8_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib9_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$nextIsolateId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set nextIsolateId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set nextIsolateId', [arg0])
},
 set$lives: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lives', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lives', [arg0])
},
 set$right: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set right', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set right', [arg0])
},
 set$value: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set value', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set value', [arg0])
},
 set$score: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set score', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set score', [arg0])
},
 set$fillStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fillStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fillStyle', [arg0])
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

$$.Alien = {"":
 ["speed", "angle", "radialDistance", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 explode$0: function() {
  this.removeFromGame$0();
  var t1 = this.game;
  t1.addEntity$1($.AlienExplosion$(t1, this.get$x(), this.get$y()));
 },
 hitPlanet$0: function() {
  return $.lt($.add($.mul(this.get$x(), this.get$x()), $.mul(this.get$y(), this.get$y())), $.mul($.add(this.radius, 67), $.add(this.radius, 67)));
 },
 draw$1: function(ctx) {
  this.drawSpriteCentered$1(ctx);
  $.GameEntity.prototype.draw$1.call(this, ctx);
 },
 update$0: function() {
  this.setCoords$0();
  var t1 = this.radialDistance;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0, 0, 0);
  var t3 = this.speed;
  var t4 = this.game;
  var t5 = t4.get$clockTick();
  if (typeof t5 !== 'number') return this.update$0$bailout(2, t1, t3, t4, t5);
  this.radialDistance = t1 - t3 * t5;
  if (this.hitPlanet$0() === true) {
    this.removeFromGame$0();
    t1 = t4.get$lives();
    if (typeof t1 !== 'number') return this.update$0$bailout(3, t1, t4, 0, 0);
    t4.set$lives(t1 - 1);
  }
 },
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      t4 = env2;
      t5 = env3;
      break;
    case 3:
      t1 = env0;
      t4 = env1;
      break;
  }
  switch (state) {
    case 0:
      this.setCoords$0();
      var t1 = this.radialDistance;
    case 1:
      state = 0;
      var t3 = this.speed;
      var t4 = this.game;
      var t5 = t4.get$clockTick();
    case 2:
      state = 0;
      if (typeof t5 !== 'number') throw $.iae(t5);
      this.radialDistance = $.sub(t1, t3 * t5);
    case 3:
      if (state == 3 || (state == 0 && this.hitPlanet$0() === true)) {
        switch (state) {
          case 0:
            this.removeFromGame$0();
            t1 = t4.get$lives();
          case 3:
            state = 0;
            t4.set$lives($.sub(t1, 1));
        }
      }
  }
 },
 setCoords$0: function() {
  var t1 = this.radialDistance;
  var t2 = this.angle;
  this.set$x($.mul(t1, $.Math_cos(t2)));
  this.set$y($.mul(this.radialDistance, $.Math_sin(t2)));
 },
 Alien$3: function(game, radialDistance, angle) {
  this.sprite = this.rotateAndCache$2(game.get$assetManager().getAsset$1('img/alien.png'), this.angle);
  this.radius = $.div(this.sprite.get$height(), 2);
  this.setCoords$0();
 },
 is$Alien: true
};

$$.AlienExplosion = {"":
 ["animation", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 draw$1: function(ctx) {
  $.GameEntity.prototype.draw$1.call(this, ctx);
  this.animation.drawFrame$4(this.game.get$clockTick(), ctx, this.get$x(), this.get$y());
 },
 update$0: function() {
  this.animation.isDone$0() === true && this.removeFromGame$0();
 },
 AlienExplosion$3: function(game, x, y) {
  this.animation = $.SpriteAnimation$(game.get$assetManager().getAsset$1('img/alien-explosion.png'), 69, 0.05, false);
  this.radius = $.div(this.animation.get$frameWidth(), 2);
 }
};

$$.Sentry = {"":
 ["angle", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 shoot$0: function() {
  var t1 = this.game;
  t1.addEntity$1($.Bullet$(t1, this.get$x(), this.get$y(), this.angle, t1.get$click()));
 },
 draw$1: function(ctx) {
  ctx.save$0();
  ctx.translate$2(this.get$x(), this.get$y());
  var t1 = this.angle;
  if (typeof t1 !== 'number') return this.draw$1$bailout(1, ctx, t1, 0, 0);
  ctx.rotate$1(t1 + 1.5707963267948966);
  var t3 = this.sprite;
  var t4 = t3.get$width();
  if (typeof t4 !== 'number') return this.draw$1$bailout(2, ctx, t4, t3, 0);
  var t6 = -t4 / 2;
  var t7 = t3.get$height();
  if (typeof t7 !== 'number') return this.draw$1$bailout(3, ctx, t3, t6, t7);
  ctx.drawImage$3(t3, t6, -t7 / 2);
  ctx.restore$0();
  $.GameEntity.prototype.draw$1.call(this, ctx);
 },
 draw$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var ctx = env0;
      t1 = env1;
      break;
    case 2:
      ctx = env0;
      t4 = env1;
      t3 = env2;
      break;
    case 3:
      ctx = env0;
      t3 = env1;
      t6 = env2;
      t7 = env3;
      break;
  }
  switch (state) {
    case 0:
      ctx.save$0();
      ctx.translate$2(this.get$x(), this.get$y());
      var t1 = this.angle;
    case 1:
      state = 0;
      ctx.rotate$1($.add(t1, 1.5707963267948966));
      var t3 = this.sprite;
      var t4 = t3.get$width();
    case 2:
      state = 0;
      var t6 = $.div($.neg(t4), 2);
      var t7 = t3.get$height();
    case 3:
      state = 0;
      ctx.drawImage$3(t3, t6, $.div($.neg(t7), 2));
      ctx.restore$0();
      $.GameEntity.prototype.draw$1.call(this, ctx);
  }
 },
 update$0: function() {
  var t1 = this.game;
  if (!(t1.get$mouse() == null)) {
    this.angle = $.Math_atan2(t1.get$mouse().get$y(), t1.get$mouse().get$x());
    var t2 = this.angle;
    if (typeof t2 !== 'number') return this.update$0$bailout(1, t1, t2);
    if (t2 < 0) {
      if (typeof t2 !== 'number') return this.update$0$bailout(2, t2, t1);
      this.angle = t2 + 6.283185307179586;
    }
    t2 = $.Math_cos(this.angle);
    if (typeof t2 !== 'number') return this.update$0$bailout(3, t2, t1);
    this.set$x(t2 * 85);
    var t4 = $.Math_sin(this.angle);
    if (typeof t4 !== 'number') return this.update$0$bailout(4, t1, t4);
    this.set$y(t4 * 85);
  }
  !(t1.get$click() == null) && !(t1.get$click().get$x() == null) && this.shoot$0();
 },
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
    case 3:
      t2 = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      t4 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.game;
    default:
      if (state == 1 || state == 2 || state == 3 || state == 4 || (state == 0 && !(t1.get$mouse() == null))) {
        switch (state) {
          case 0:
            this.angle = $.Math_atan2(t1.get$mouse().get$y(), t1.get$mouse().get$x());
            var t2 = this.angle;
          case 1:
            state = 0;
          case 2:
            if (state == 2 || (state == 0 && $.ltB(t2, 0))) {
              switch (state) {
                case 0:
                  t2 = this.angle;
                case 2:
                  state = 0;
                  this.angle = $.add(t2, 6.283185307179586);
              }
            }
            t2 = $.Math_cos(this.angle);
          case 3:
            state = 0;
            this.set$x($.mul(t2, 85));
            var t4 = $.Math_sin(this.angle);
          case 4:
            state = 0;
            this.set$y($.mul(t4, 85));
        }
      }
      !(t1.get$click() == null) && !(t1.get$click().get$x() == null) && this.shoot$0();
  }
 },
 Sentry$1: function(game) {
  this.sprite = game.get$assetManager().getAsset$1('img/sentry.png');
  this.radius = $.div(this.sprite.get$width(), 2);
 }
};

$$.Bullet = {"":
 ["animation", "radialDistance", "explodesAt", "angle", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 draw$1: function(ctx) {
  ctx.save$0();
  ctx.translate$2(this.get$x(), this.get$y());
  var t1 = this.angle;
  if (typeof t1 !== 'number') return this.draw$1$bailout(1, ctx, t1, 0);
  ctx.rotate$1(t1 + 1.5707963267948966);
  var t3 = this.get$x();
  if (typeof t3 !== 'number') return this.draw$1$bailout(2, ctx, t3, 0);
  t3 = -t3;
  var t5 = this.get$y();
  if (typeof t5 !== 'number') return this.draw$1$bailout(3, ctx, t3, t5);
  ctx.translate$2(t3, -t5);
  this.animation.drawFrame$4(this.game.get$clockTick(), ctx, this.get$x(), this.get$y());
  ctx.restore$0();
  $.GameEntity.prototype.draw$1.call(this, ctx);
 },
 draw$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var ctx = env0;
      t1 = env1;
      break;
    case 2:
      ctx = env0;
      t3 = env1;
      break;
    case 3:
      ctx = env0;
      t3 = env1;
      t5 = env2;
      break;
  }
  switch (state) {
    case 0:
      ctx.save$0();
      ctx.translate$2(this.get$x(), this.get$y());
      var t1 = this.angle;
    case 1:
      state = 0;
      ctx.rotate$1($.add(t1, 1.5707963267948966));
      var t3 = this.get$x();
    case 2:
      state = 0;
      t3 = $.neg(t3);
      var t5 = this.get$y();
    case 3:
      state = 0;
      ctx.translate$2(t3, $.neg(t5));
      this.animation.drawFrame$4(this.game.get$clockTick(), ctx, this.get$x(), this.get$y());
      ctx.restore$0();
      $.GameEntity.prototype.draw$1.call(this, ctx);
  }
 },
 update$0: function() {
  if (this.outsideScreen$0() === true) this.removeFromGame$0();
  else {
    var t1 = $.abs(this.get$x());
    if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0, 0, 0);
    var t3 = this.explodesAt;
    var t4 = $.abs(t3.get$x());
    if (typeof t4 !== 'number') return this.update$0$bailout(2, t3, t4, t1, 0);
    if (!(t1 >= t4)) {
      t1 = $.abs(this.get$y());
      if (typeof t1 !== 'number') return this.update$0$bailout(3, t3, t1, 0, 0);
      t4 = $.abs(t3.get$y());
      if (typeof t4 !== 'number') return this.update$0$bailout(4, t3, t1, t4, 0);
      t4 = t1 >= t4;
      t1 = t4;
    } else t1 = true;
    var t2 = this.game;
    if (t1) {
      t2.addEntity$1($.BulletExplosion$(t2, t3.get$x(), t3.get$y()));
      this.removeFromGame$0();
    } else {
      t1 = this.radialDistance;
      if (typeof t1 !== 'number') return this.update$0$bailout(5, t2, t1, 0, 0);
      t4 = this.angle;
      var t5 = $.Math_cos(t4);
      if (typeof t5 !== 'number') return this.update$0$bailout(6, t2, t5, t1, t4);
      this.set$x(t1 * t5);
      var t7 = this.radialDistance;
      if (typeof t7 !== 'number') return this.update$0$bailout(7, t7, t2, t4, 0);
      t4 = $.Math_sin(t4);
      if (typeof t4 !== 'number') return this.update$0$bailout(8, t7, t2, t4, 0);
      this.set$y(t7 * t4);
      var t10 = this.radialDistance;
      if (typeof t10 !== 'number') return this.update$0$bailout(9, t10, t2, 0, 0);
      t2 = t2.get$clockTick();
      if (typeof t2 !== 'number') throw $.iae(t2);
      this.radialDistance = t10 + 250 * t2;
    }
  }
 },
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t4 = env1;
      t1 = env2;
      break;
    case 3:
      t3 = env0;
      t1 = env1;
      break;
    case 4:
      t3 = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 5:
      t2 = env0;
      t1 = env1;
      break;
    case 6:
      t2 = env0;
      t5 = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 7:
      t7 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 8:
      t7 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 9:
      t10 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
    default:
      if ((state == 0 && this.outsideScreen$0() === true)) {
        this.removeFromGame$0();
      } else {
        switch (state) {
          case 0:
            var t1 = $.abs(this.get$x());
          case 1:
            state = 0;
            var t3 = this.explodesAt;
            var t4 = $.abs(t3.get$x());
          case 2:
            state = 0;
          default:
            if (state == 3 || state == 4 || (state == 0 && !$.geB(t1, t4))) {
              switch (state) {
                case 0:
                  t1 = $.abs(this.get$y());
                case 3:
                  state = 0;
                  t4 = $.abs(t3.get$y());
                case 4:
                  state = 0;
                  t4 = $.geB(t1, t4);
                  t1 = t4;
              }
            } else {
              t1 = true;
            }
            var t2 = this.game;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            if ((state == 0 && t1)) {
              t2.addEntity$1($.BulletExplosion$(t2, t3.get$x(), t3.get$y()));
              this.removeFromGame$0();
            } else {
              switch (state) {
                case 0:
                  t1 = this.radialDistance;
                case 5:
                  state = 0;
                  t4 = this.angle;
                  var t5 = $.Math_cos(t4);
                case 6:
                  state = 0;
                  this.set$x($.mul(t1, t5));
                  var t7 = this.radialDistance;
                case 7:
                  state = 0;
                  t4 = $.Math_sin(t4);
                case 8:
                  state = 0;
                  this.set$y($.mul(t7, t4));
                  var t10 = this.radialDistance;
                case 9:
                  state = 0;
                  t2 = t2.get$clockTick();
                  if (typeof t2 !== 'number') throw $.iae(t2);
                  this.radialDistance = $.add(t10, 250 * t2);
              }
            }
        }
      }
  }
 },
 Bullet$5: function(game, x, y, angle, explodesAt) {
  this.sprite = game.get$assetManager().getAsset$1('img/bullet.png');
  this.animation = $.SpriteAnimation$(this.sprite, 7, 0.05, true);
 }
};

$$.BulletExplosion = {"":
 ["animation", "fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 draw$1: function(ctx) {
  this.animation.drawFrame$5(this.game.get$clockTick(), ctx, this.get$x(), this.get$y(), this.scaleFactor$0());
  $.GameEntity.prototype.draw$1.call(this, ctx);
 },
 scaleFactor$0: function() {
  var t1 = $.div(this.animation.currentFrame$0(), 3);
  if (typeof t1 !== 'number') throw $.iae(t1);
  return 1 + t1;
 },
 isCaughtInExplosion$1: function(alien) {
  var t1 = this.get$x();
  if (typeof t1 !== 'number') return this.isCaughtInExplosion$1$bailout(1, alien, t1, 0, 0, 0);
  var t3 = alien.get$x();
  if (typeof t3 !== 'number') return this.isCaughtInExplosion$1$bailout(2, alien, t1, t3, 0, 0);
  t3 = t1 - t3;
  t1 = this.get$x();
  if (typeof t1 !== 'number') return this.isCaughtInExplosion$1$bailout(3, alien, t3, t1, 0, 0);
  var t6 = alien.get$x();
  if (typeof t6 !== 'number') return this.isCaughtInExplosion$1$bailout(4, alien, t6, t3, t1, 0);
  t3 *= t1 - t6;
  var t8 = this.get$y();
  if (typeof t8 !== 'number') return this.isCaughtInExplosion$1$bailout(5, alien, t3, t8, 0, 0);
  var t10 = alien.get$y();
  if (typeof t10 !== 'number') return this.isCaughtInExplosion$1$bailout(6, alien, t3, t8, t10, 0);
  t10 = t8 - t10;
  t8 = this.get$y();
  if (typeof t8 !== 'number') return this.isCaughtInExplosion$1$bailout(7, alien, t10, t8, t3, 0);
  var t13 = alien.get$y();
  if (typeof t13 !== 'number') return this.isCaughtInExplosion$1$bailout(8, alien, t10, t8, t13, t3);
  var distance_squared = t3 + t10 * (t8 - t13);
  t3 = this.radius;
  if (typeof t3 !== 'number') return this.isCaughtInExplosion$1$bailout(9, distance_squared, alien, t3, 0, 0);
  var t16 = alien.get$radius();
  if (typeof t16 !== 'number') return this.isCaughtInExplosion$1$bailout(10, distance_squared, alien, t16, t3, 0);
  t16 += t3;
  t3 = this.radius;
  if (typeof t3 !== 'number') return this.isCaughtInExplosion$1$bailout(11, distance_squared, t3, alien, t16, 0);
  var t19 = alien.get$radius();
  if (typeof t19 !== 'number') return this.isCaughtInExplosion$1$bailout(12, distance_squared, t3, t16, t19, 0);
  return distance_squared < t16 * (t3 + t19);
 },
 isCaughtInExplosion$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var alien = env0;
      t1 = env1;
      break;
    case 2:
      alien = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      alien = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 4:
      alien = env0;
      t6 = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 5:
      alien = env0;
      t3 = env1;
      t8 = env2;
      break;
    case 6:
      alien = env0;
      t3 = env1;
      t8 = env2;
      t10 = env3;
      break;
    case 7:
      alien = env0;
      t10 = env1;
      t8 = env2;
      t3 = env3;
      break;
    case 8:
      alien = env0;
      t10 = env1;
      t8 = env2;
      t13 = env3;
      t3 = env4;
      break;
    case 9:
      distance_squared = env0;
      alien = env1;
      t3 = env2;
      break;
    case 10:
      distance_squared = env0;
      alien = env1;
      t16 = env2;
      t3 = env3;
      break;
    case 11:
      distance_squared = env0;
      t3 = env1;
      alien = env2;
      t16 = env3;
      break;
    case 12:
      distance_squared = env0;
      t3 = env1;
      t16 = env2;
      t19 = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.get$x();
    case 1:
      state = 0;
      var t3 = alien.get$x();
    case 2:
      state = 0;
      t3 = $.sub(t1, t3);
      t1 = this.get$x();
    case 3:
      state = 0;
      var t6 = alien.get$x();
    case 4:
      state = 0;
      t3 = $.mul(t3, $.sub(t1, t6));
      var t8 = this.get$y();
    case 5:
      state = 0;
      var t10 = alien.get$y();
    case 6:
      state = 0;
      t10 = $.sub(t8, t10);
      t8 = this.get$y();
    case 7:
      state = 0;
      var t13 = alien.get$y();
    case 8:
      state = 0;
      var distance_squared = $.add(t3, $.mul(t10, $.sub(t8, t13)));
      t3 = this.radius;
    case 9:
      state = 0;
      var t16 = alien.get$radius();
    case 10:
      state = 0;
      t16 = $.add(t3, t16);
      t3 = this.radius;
    case 11:
      state = 0;
      var t19 = alien.get$radius();
    case 12:
      state = 0;
      return $.lt(distance_squared, $.mul(t16, $.add(t3, t19)));
  }
 },
 update$0: function() {
  var t1 = this.animation;
  if (t1.isDone$0() === true) {
    this.removeFromGame$0();
    return;
  }
  t1 = t1.frameWidth;
  if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0, 0, 0);
  t1 /= 2;
  var t3 = this.scaleFactor$0();
  if (typeof t3 !== 'number') return this.update$0$bailout(2, t3, t1, 0, 0);
  this.radius = t1 * t3;
  t1 = this.game;
  var i = 0;
  while (true) {
    var t2 = $.get$length(t1.get$entities());
    if (typeof t2 !== 'number') return this.update$0$bailout(3, t2, t1, i, 0);
    if (!(i < t2)) break;
    t2 = t1.get$entities();
    if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.update$0$bailout(4, t1, t2, i, 0);
    var t4 = t2.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    var alien = t2[i];
    if (typeof alien === 'object' && alien !== null && !!alien.is$Alien && this.isCaughtInExplosion$1(alien) === true) {
      t2 = t1.get$score();
      if (typeof t2 !== 'number') return this.update$0$bailout(5, t2, i, t1, alien);
      t1.set$score(t2 + 10);
      alien.explode$0();
    }
    ++i;
  }
 },
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
    case 3:
      t2 = env0;
      t1 = env1;
      i = env2;
      break;
    case 4:
      t1 = env0;
      t2 = env1;
      i = env2;
      break;
    case 5:
      t2 = env0;
      i = env1;
      t1 = env2;
      alien = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.animation;
      if (t1.isDone$0() === true) {
        this.removeFromGame$0();
        return;
      }
      t1 = t1.get$frameWidth();
    case 1:
      state = 0;
      t1 = $.div(t1, 2);
      var t3 = this.scaleFactor$0();
    case 2:
      state = 0;
      this.radius = $.mul(t1, t3);
      t1 = this.game;
      var i = 0;
    default:
      L0: while (true) {
        switch (state) {
          case 0:
            var t2 = $.get$length(t1.get$entities());
          case 3:
            state = 0;
            if (!$.ltB(i, t2)) break L0;
            t2 = t1.get$entities();
          case 4:
            state = 0;
            var alien = $.index(t2, i);
          case 5:
            if (state == 5 || (state == 0 && (typeof alien === 'object' && alien !== null && !!alien.is$Alien && this.isCaughtInExplosion$1(alien) === true))) {
              switch (state) {
                case 0:
                  t2 = t1.get$score();
                case 5:
                  state = 0;
                  t1.set$score($.add(t2, 10));
                  alien.explode$0();
              }
            }
            ++i;
        }
      }
  }
 },
 BulletExplosion$3: function(game, x, y) {
  this.sprite = game.get$assetManager().getAsset$1('img/explosion.png');
  this.animation = $.SpriteAnimation$(this.sprite, 34, 0.05, false);
  this.radius = $.div(this.animation.get$frameWidth(), 2);
 }
};

$$.Earth = {"":
 ["fill", "color", "opacity", "momentum", "radius", "sprite", "_removeFromGame", "previousBox", "box", "_height", "_width", "_y", "_x", "game"],
 super: "GameEntity",
 draw$1: function(ctx) {
  var t1 = this.sprite;
  var t2 = this.get$x();
  if (typeof t2 !== 'number') return this.draw$1$bailout(1, ctx, t2, t1, 0, 0);
  var t4 = t1.get$width();
  if (typeof t4 !== 'number') return this.draw$1$bailout(2, ctx, t2, t1, t4, 0);
  t2 -= t4 / 2;
  var t6 = this.get$y();
  if (typeof t6 !== 'number') return this.draw$1$bailout(3, ctx, t2, t6, t1, 0);
  var t8 = t1.get$height();
  if (typeof t8 !== 'number') return this.draw$1$bailout(4, ctx, t2, t6, t1, t8);
  ctx.drawImage$3(t1, t2, t6 - t8 / 2);
 },
 draw$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var ctx = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 2:
      ctx = env0;
      t2 = env1;
      t1 = env2;
      t4 = env3;
      break;
    case 3:
      ctx = env0;
      t2 = env1;
      t6 = env2;
      t1 = env3;
      break;
    case 4:
      ctx = env0;
      t2 = env1;
      t6 = env2;
      t1 = env3;
      t8 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.sprite;
      var t2 = this.get$x();
    case 1:
      state = 0;
      var t4 = t1.get$width();
    case 2:
      state = 0;
      t2 = $.sub(t2, $.div(t4, 2));
      var t6 = this.get$y();
    case 3:
      state = 0;
      var t8 = t1.get$height();
    case 4:
      state = 0;
      ctx.drawImage$3(t1, t2, $.sub(t6, $.div(t8, 2)));
  }
 },
 Earth$1: function(game) {
  this.sprite = game.get$assetManager().getAsset$1('img/earth.png');
 }
};

$$.EvilAliens = {"":
 ["lastAlienAddedAt", "earth", "sentry", "score=", "lives=", "includeUI", "showOutlines", "_supportsMp3", "bgStyle", "enableSound", "debugMode", "assetManager", "clientPoint", "surfaceHeight", "surfaceWidth", "clockTick", "timer", "mouse", "click", "ctx", "entities"],
 super: "Game",
 drawScore$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('red');
  t1.set$font('bold 2em Arial');
  t1.fillText$3('Score: ' + $.S(this.score), $.add($.div($.neg(t1.get$canvas().get$width()), 2), 50), $.sub($.div(t1.get$canvas().get$height(), 2), 50));
 },
 drawLives$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('red');
  t1.set$font('bold 2em Arial');
  t1.fillText$3('Lives: ' + $.S(this.lives), $.add($.div($.neg(t1.get$canvas().get$width()), 2), 50), $.sub($.div(t1.get$canvas().get$height(), 2), 80));
 },
 drawBeforeCtxRestore$0: function() {
  this.drawScore$0();
  this.drawLives$0();
 },
 update$0: function() {
  if (!(this.lastAlienAddedAt == null)) {
    var t1 = this.timer.get$gameTime();
    if (typeof t1 !== 'number') return this.update$0$bailout(1, t1, 0);
    var t3 = this.lastAlienAddedAt;
    if (typeof t3 !== 'number') return this.update$0$bailout(2, t3, t1);
    var t5 = t1 - t3 > 1;
    t1 = t5;
  } else t1 = true;
  if (t1) {
    t1 = this.ctx.get$canvas().get$width();
    var t2 = $.Math_random();
    if (typeof t2 !== 'number') return this.update$0$bailout(3, t2, t1);
    this.addEntity$1($.Alien$(this, t1, t2 * 3.141592653589793 * 180));
    this.lastAlienAddedAt = this.timer.get$gameTime();
  }
  t1 = this.score;
  if (typeof t1 !== 'number') return this.update$0$bailout(4, t1, 0);
  t1 <= 0;
  $.Game.prototype.update$0.call(this);
 },
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
    case 3:
      t2 = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state == 1 || state == 2 || (state == 0 && !(this.lastAlienAddedAt == null))) {
        switch (state) {
          case 0:
            var t1 = this.timer.get$gameTime();
          case 1:
            state = 0;
            var t3 = this.lastAlienAddedAt;
          case 2:
            state = 0;
            var t5 = $.gtB($.sub(t1, t3), 1);
            t1 = t5;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.ctx.get$canvas().get$width();
            var t2 = $.Math_random();
          case 3:
            state = 0;
            this.addEntity$1($.Alien$(this, t1, $.mul($.mul(t2, 3.141592653589793), 180)));
            this.lastAlienAddedAt = this.timer.get$gameTime();
        }
      }
      t1 = this.score;
    case 4:
      state = 0;
      $.leB(t1, 0);
      $.Game.prototype.update$0.call(this);
  }
 },
 start$0: function() {
  this.sentry = $.Sentry$(this);
  this.earth = $.Earth$(this);
  this.addEntity$1(this.earth);
  this.addEntity$1(this.sentry);
  $.Game.prototype.start$0.call(this);
 }
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

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
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
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
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
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$error: function() {
  return this.operator$index$1('error');
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
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$load: function() {
  return this.operator$index$1('load');
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

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
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
 is$_WorkerSendPort: true,
 is$SendPort: true
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
 ["showOutlines?", "assetManager?", "clientPoint=", "clockTick?", "mouse=", "click=", "ctx?", "entities?"],
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
  this.timer = $.Timer$();
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

$$.SpriteAnimation = {"":
 ["elapsedTime", "loop", "totalTime", "frameDuration", "frameHeight", "frameWidth?", "spriteSheet"],
 super: "Object",
 currentFrame$0: function() {
  return $.floor($.div(this.elapsedTime, this.frameDuration));
 },
 isDone$0: function() {
  return $.ge(this.elapsedTime, this.totalTime);
 },
 drawFrame$5: function(tick, ctx, x, y, scaleBy) {
  this.elapsedTime = $.add(this.elapsedTime, tick);
  if (this.loop === true) {
    if (this.isDone$0() === true) this.elapsedTime = 0;
  } else {
    if (this.isDone$0() === true) return;
  }
  var index = this.currentFrame$0();
  var t1 = this.frameWidth;
  var locX = $.sub(x, $.mul($.div(t1, 2), scaleBy));
  var t2 = this.frameHeight;
  var locY = $.sub(y, $.mul($.div(t2, 2), scaleBy));
  ctx.drawImage$9(this.spriteSheet, $.mul(index, t1), 0, t1, t2, locX, locY, $.mul(t1, scaleBy), $.mul(t2, scaleBy));
 },
 drawFrame$4: function(tick,ctx,x,y) {
  return this.drawFrame$5(tick,ctx,x,y,1)
},
 SpriteAnimation$4: function(spriteSheet, frameWidth, frameDuration, loop) {
  var t1 = this.spriteSheet;
  this.frameHeight = t1.get$height();
  this.totalTime = $.mul($.div(t1.get$width(), this.frameWidth), this.frameDuration);
 }
};

$$.Timer = {"":
 ["fpsSampleRate", "fps?", "wallLastTimestamp", "gameTime?"],
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
 ["radius?", "_removeFromGame?"],
 super: "Object",
 rotateAndCache$2: function(image, angle) {
  var offscreenCanvas = $._ElementFactoryProvider_Element$tag('canvas');
  var size = $.Math_max(image.get$width(), image.get$height());
  offscreenCanvas.set$width(size);
  offscreenCanvas.set$height(size);
  var offscreenCtx = offscreenCanvas.getContext$1('2d');
  offscreenCtx.save$0();
  offscreenCtx.translate$2($.div(size, 2), $.div(size, 2));
  offscreenCtx.rotate$1($.add(angle, 1.5707963267948966));
  offscreenCtx.translate$2(0, 0);
  offscreenCtx.drawImage$3(image, $.neg($.div(image.get$width(), 2)), $.neg($.div(image.get$height(), 2)));
  offscreenCtx.restore$0();
  return offscreenCanvas;
 },
 outsideScreen$0: function() {
  var t1 = this.get$x();
  var t2 = this.game;
  return $.gtB(t1, t2.get$halfSurfaceWidth()) || ($.ltB(this.get$x(), $.neg(t2.get$halfSurfaceWidth())) || ($.gtB(this.get$y(), t2.get$halfSurfaceHeight()) || $.ltB(this.get$y(), $.neg(t2.get$halfSurfaceHeight()))));
 },
 removeFromGame$0: function() {
  this._removeFromGame = true;
 },
 drawSpriteCentered$1: function(ctx) {
  var t1 = this.get$x();
  var t2 = this.sprite;
  ctx.drawImage$3(t2, $.sub(t1, $.div(t2.get$width(), 2)), $.sub(this.get$y(), $.div(t2.get$height(), 2)));
 },
 draw$1: function(ctx) {
  var t1 = this.color;
  if (!(t1 === null)) {
    var t2 = this.fill === true;
    var t3 = this.opacity;
    if (t2) {
      ctx.set$fillStyle('rgba(' + t1 + ', ' + $.S(t3) + ')');
      ctx.fillRect$4(this.box.get$left(), this.box.get$top(), this.box.get$width(), this.box.get$height());
    } else {
      ctx.set$strokeStyle('rgba(' + t1 + ', ' + $.S(t3) + ')');
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
 GameEntity$1: function(game) {
  this.momentum = $.Momentum$(0, 0, null, null, null, null);
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
 updateFrom$1: function(rect) {
  this.top = rect.get$top();
  this.left = rect.get$left();
  this.right = rect.get$right();
  this.bottom = rect.get$bottom();
 }
};

$$.Momentum = {"":
 ["yMax", "xMax", "yAccel", "xAccel", "yVel?", "xVel?"],
 super: "Object",
 update$1: function(clockTick) {
  var t1 = this.xAccel;
  if (!(t1 == null) && (!$.eqB(t1, 0) && $.ltB($.abs(this.xVel), this.xMax))) {
    var t2 = $.gtB(this.xVel, 0);
    var t3 = this.xVel;
    if (t2) this.xVel = $.add(t3, $.mul(t1, clockTick));
    else this.xVel = $.sub(t3, $.mul(t1, clockTick));
  }
  t1 = this.yAccel;
  if (!(t1 == null) && (!$.eqB(t1, 0) && $.ltB($.abs(this.yVel), this.yMax))) {
    t2 = $.gtB(this.yVel, 0);
    t3 = this.yVel;
    if (t2) this.yVel = $.add(t3, $.mul(t1, clockTick));
    else this.yVel = $.sub(t3, $.mul(t1, clockTick));
  }
  t1 = this.xVel;
  if (!(t1 == null)) {
    t2 = this.xMax;
    t1 = !(t2 == null) && $.gtB($.abs(t1), t2);
  } else t1 = false;
  if (t1) {
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
 ["y?", "x?"],
 super: "Object",
 updateFrom$1: function(vect) {
  this.x = vect.get$x();
  this.y = vect.get$y();
 }
};

$$.main_anon = {"":
 ["game_0"],
 super: "Closure",
 $call$0: function() {
  this.game_0.init$0();
  this.game_0.start$0();
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
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
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
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
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

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
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

$.Alien$ = function(game, radialDistance, angle) {
  var t1 = new $.Alien(100, angle, radialDistance, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$1(game);
  t1.Alien$3(game, radialDistance, angle);
  return t1;
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

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver') return 'MutationObserver';
  return name$;
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

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
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

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
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

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
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

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
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

$.EvilAliens$ = function(assetManager, ctx) {
  var t1 = new $.EvilAliens(null, null, null, 0, 10, true, false, null, 'rgba(0, 0, 0, 0.85)', true, false, assetManager, null, null, null, null, null, null, null, ctx, null);
  t1.Game$2(assetManager, ctx);
  return t1;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMinutes()) : ($.Primitives_lazyAsJsDate(receiver).getMinutes());
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

$.Sentry$ = function(game) {
  var t1 = new $.Sentry(0, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, 0, 85, 1, 1);
  t1.Sentry$1(game);
  return t1;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
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

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
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

$.BulletExplosion$ = function(game, x, y) {
  var t1 = new $.BulletExplosion(null, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 1, 1);
  t1.BulletExplosion$3(game, x, y);
  return t1;
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

$.Timer$ = function() {
  return new $.Timer(60, 0, 0, 0);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Primitives_getYear = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCFullYear()) : ($.Primitives_lazyAsJsDate(receiver).getFullYear());
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
  var ctx = $.document().query$1('#surface').getContext$1('2d');
  var assetManager = $.AssetManager$();
  assetManager.queueDownload$1('img/alien-explosion.png');
  assetManager.queueDownload$1('img/alien.png');
  assetManager.queueDownload$1('img/bullet.png');
  assetManager.queueDownload$1('img/earth.png');
  assetManager.queueDownload$1('img/sentry.png');
  assetManager.queueDownload$1('img/explosion.png');
  assetManager.downloadAll$1(new $.main_anon($.EvilAliens$(assetManager, ctx)));
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

$.Earth$ = function(game) {
  var t1 = new $.Earth(true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, 0, 0, 1, 1);
  t1.Earth$1(game);
  return t1;
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

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
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

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
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

$.Math_random = function() {
  return $.MathNatives_random();
};

$.MathNatives_random = function() {
  return Math.random();
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

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.AlienExplosion$ = function(game, x, y) {
  var t1 = new $.AlienExplosion(null, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 1, 1);
  t1.AlienExplosion$3(game, x, y);
  return t1;
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

$.SpriteAnimation$ = function(spriteSheet, frameWidth, frameDuration, loop) {
  var t1 = new $.SpriteAnimation(0, loop, null, frameDuration, null, frameWidth, spriteSheet);
  t1.SpriteAnimation$4(spriteSheet, frameWidth, frameDuration, loop);
  return t1;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
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
  var t1 = new $.DateImplementation($.checkNull(isUtc), millisecondsSinceEpoch);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
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

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.Math_sin = function(x) {
  return $.MathNatives_sin(x);
};

$.MathNatives_sin = function(value) {
  return Math.sin($.checkNum(value));
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

$.Bullet$ = function(game, x, y, angle, explodesAt) {
  var t1 = new $.Bullet(null, 95, explodesAt, angle, true, '255, 255, 255', 1, null, null, null, false, null, null, 1, 1, 0, 0, game);
  t1.GameEntity$withPosition$5(game, x, y, 1, 1);
  t1.Bullet$5(game, x, y, angle, explodesAt);
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

$.Math_cos = function(x) {
  return $.MathNatives_cos(x);
};

$.MathNatives_cos = function(value) {
  return Math.cos($.checkNum(value));
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
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC8 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7, Isolate.$isolateProperties.CTC7);
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC10 = new Isolate.$isolateProperties.Object();
$.CTC3 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC4 = new Isolate.$isolateProperties.EmptyQueueException();
$._pendingRequests = null;
$.dynamicUnknownElementDispatcher = null;
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
$.defineProperty(Object.prototype, 'is$TouchEvent', function() { return false; });
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
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

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "name?", "height="], {
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
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
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

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext', ["canvas?"], {
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "font!", "fillStyle!"], {
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
 rotate$1: function(angle) {
  return this.rotate(angle);
 },
 restore$0: function() {
  return this.restore();
 },
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
 },
 get$rect: function() { return new $.BoundClosure(this, 'rect$4'); },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
 },
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
 },
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
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

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "top?", "right?", "left?", "height?", "bottom?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
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

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
 }
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

$.$defineNativeClass('DocumentType', ["name?", "entities?"], {
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

$.$defineNativeClass('HTMLEmbedElement', ["width=", "src=", "name?", "height="], {
});

$.$defineNativeClass('Entry', ["name?"], {
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
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

$.$defineNativeClass('HTMLHRElement', ["width="], {
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

$.$defineNativeClass('HTMLIFrameElement', ["width=", "src=", "name?", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "src=", "name?", "height="], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); },
 is$ImageElement: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "src=", "pattern?", "name?", "height="], {
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

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
 start$0: function() {
  return this.start();
 }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["src=", "error?"], {
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.BoundClosure1(this, 'load$0'); },
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

$.$defineNativeClass('MessageEvent', ["ports?"], {
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

$.$defineNativeClass('HTMLObjectElement', ["width=", "name?", "height="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "name?"], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('WebKitPoint', ["y?", "x?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
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

$.$defineNativeClass('SVGGlyphRefElement', ["y?", "x?"], {
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
 },
 rotate$1: function(angle) {
  return this.rotate(angle);
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGPoint', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["y?", "x?", "width=", "height="], {
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
 rotate$1: function(arg0) { return this.rotate.$call$1(arg0); }
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

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "name?"], {
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

$.$defineNativeClass('HTMLUnknownElement', [], {
 noSuchMethod$2: function(name$, args) {
  if ($.dynamicUnknownElementDispatcher == null) throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
  return $.dynamicUnknownElementDispatcher.$call$3(this, name$, args);
 }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
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

// 248 dynamic classes.
// 379 classes
// 32 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v2/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v3/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v4/*class(_ElementImpl)*/ = [v1/*class(_SVGElementImpl)*/,v2/*class(_MediaElementImpl)*/,v1/*class(_SVGElementImpl)*/,v2/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v5/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v6/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v7/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v8/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v9/*class(_NodeImpl)*/ = [v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v10/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v11/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v12/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['AbstractWorker', v12/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v8/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CanvasRenderingContext', 'CanvasRenderingContext|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D'],
    ['CharacterData', v7/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v6/*class(_DocumentImpl)*/],
    ['DocumentFragment', v5/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v1/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v2/*class(_MediaElementImpl)*/],
    ['Element', v4/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['MouseEvent', v3/*class(_MouseEventImpl)*/],
    ['Event', [v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,v3/*class(_MouseEventImpl)*/,'Event|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v9/*class(_NodeImpl)*/],
    ['MediaStream', v10/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v11/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v8/*class(_WorkerContextImpl)*/,v9/*class(_NodeImpl)*/,v10/*class(_MediaStreamImpl)*/,v11/*class(_IDBRequestImpl)*/,v12/*class(_AbstractWorkerImpl)*/,v8/*class(_WorkerContextImpl)*/,v9/*class(_NodeImpl)*/,v10/*class(_MediaStreamImpl)*/,v11/*class(_IDBRequestImpl)*/,v12/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
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
