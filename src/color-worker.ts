"use strict";
import MMCQ from '@lokesh.dhakar/quantize'

addEventListener('message', function(e) {
    var requestId = e.data.requestId,
        imageData = e.data.imageData,
        dominantColor = getColor(imageData);

    postMessage({
        requestId: requestId,
        dominantColor: dominantColor        
    });
});



function getColor(imageData, quality) {
    var palette = getPalette(imageData, 5, quality);
    return palette[0];
}

function getPalette(imageData, colorCount, quality) {
    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    }
    if (typeof quality === 'undefined') {
        quality = 10;
    }

    // Create custom CanvasImage object
    var pixels = imageData.data;
    var pixelCount = pixels.length;

    // Store the RGB values in an array format suitable for quantize function
    var pixelArray = [];
    for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        // If pixel is mostly opaque and not white
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }

    // Send array to quantize function which clusters values
    // using median cut algorithm
    var cmap = MMCQ.quantize(pixelArray, colorCount);
    var palette = cmap.palette();

    return palette;
}
