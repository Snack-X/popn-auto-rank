// From http://stackoverflow.com/a/18639999
function crc32(str) {
  if(typeof window.crcTable === "undefined") {
    var c;
    var crcTable = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      crcTable[n] = c;
    }
    window.crcTable = crcTable;
  }

  var crc = 0 ^ (-1);

  for (var i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ window.crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
  }

  return (crc ^ (-1)) >>> 0;
}