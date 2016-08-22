/*
 * mocked BeagleBone for testing/debugging
 *
 */


var RelayControl = function() {
  var relays = {} // "name" : "value"  value is [0.0, 1.0]

  var self = this
  self._init = _init

  self._dumpRelayState = _dumpRelayState

  self.setRelayValue = setRelayValue
  self.getRelayValue = getRelayValue

  self.turnCircuitOn = turnCircuitOn
  self.turnCircuitOff = turnCircuitOff

  self._init()
}

_init = function() {
  this.relays = {}
}

setRelayValue = function(name, value) {
  this.relays[name] = value
}

getRelayValue = function(name) {
  return this.relays[name]
}

_dumpRelayState = function() {
  for (n in this.relays) {
    console.log("relay " + n + ": " + this.getRelayValue(n))
  }
}

turnCircuitOn = function(name) {
  this.setRelayValue(name, 1.0)
}

turnCircuitOff = function(name) {
  this.setRelayValue(name, 0.0)
}


module.exports = new RelayControl();
