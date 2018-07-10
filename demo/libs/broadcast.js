var broadcast = {
  on: function (name, fn, isUniq) {
    this._on(name, fn, isUniq, false)
  },
  once: function (name, fn, isUniq) {
    this._on(name, fn, isUniq, true)
  },
  _on: function (name, fn, isUniq, once) {
    var eventData
    eventData = broadcast.data
    var fnObj = {
      fn: fn,
      once: once
    }
    if (!isUniq && eventData.hasOwnProperty(name)) {
      eventData[name].push(fnObj)
    } else {
      eventData[name] = [fnObj]
    }
    return this
  },
  fire: function (name, data, thisArg) {
    console.log('[broadcast fire]: ' + name, data)
    var fn, fnList, i, len
    thisArg = thisArg || null
    fnList = broadcast.data[name] || []
    if (fnList.length) {
      for (i = 0, len = fnList.length; i < len; i++) {
        fn = fnList[i].fn
        fn.apply(thisArg, [data, name])
        if (fnList[i].once) {
          fnList.splice(i, 1)
          i--
          len--
        }
      }
    }
    return this
  },
  data: {}
}

module.exports = broadcast
