function getScript(url, callback) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src = url;

    var done = false;
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState ||
            this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            if (callback)
                callback();

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
        }
    };

    body.appendChild(script);

    // We handle everything using the script element injection
    return undefined;
}

function getStylesheet(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    head.appendChild(link);
    if (callback)
        callback();
    return undefined;
}

function eachSeries(arr, iterator, callback) {
    callback = callback || function () {
    };
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    var iterate = function () {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err);
                callback = function () {
                };
            }
            else {
                completed += 1;
                if (completed >= arr.length) {
                    callback(null);
                }
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
}