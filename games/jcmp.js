/*
module.exports = require('./protocols/valve').extend({
	init: function() {
		this._super();
		this.options.port = 7777;
		this.pretty = 'Just Cause 2 Multiplayer';
	}
});
*/

// supposedly, gamespy3 is the "official" query protocol for jcmp,
// but it's broken (requires singlePacketSplits), and doesn't include player names
module.exports = require('./protocols/gamespy3').extend({
	init: function() {
		this._super();
		this.options.port = 7777;
		this.pretty = 'Just Cause 2 Multiplayer';
		this._singlePacketSplits = true;
	},
	finalizeState: function(state) {
		this._super(state);
		console.log(state.players.length);
		console.log(state.raw.numplayers);
		if(!state.players.length && parseInt(state.raw.numplayers)) {
			for(var i = 0; i < parseInt(state.raw.numplayers); i++) {
				state.players.push({});
			}
		}
	}
});
