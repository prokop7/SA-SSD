// Converter canvas(hand-signature) to png image.
export function toBlob(png) {
	var toBlob = require('canvas-to-blob');
	toBlob.init()
	var blob = toBlob(png)
	return blob
}
