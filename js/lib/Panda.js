var P = (function() {
    var Constructor = function(selector) {
        this.elems = (document.querySelectorAll(selector).length > 2) ? document.querySelector(selector) : document.querySelectorAll(selector);
    };


    Constructor.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function') return;
        for (var i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i);
        }
    };

    Constructor.prototype.css = function(style, value) {
        this.each(function(elem) {
            elem.style[style] = value;
        });
    };

    Constructor.prototype.html = function(value) {
        this.each(function(elem) {
            elem.innerHTML = value;
        });
    };

    Constructor.prototype.hide = function() {
        this.each(function(elem) {
            elem.style.visibility = "hidden";
        });
    };

    Constructor.prototype.show = function() {
        this.each(function(elem) {
            elem.style.visibility = "visible";
        });
    };

    Constructor.prototype.click = function(callback) {
        this.each(function(elem) {
            elem.addEventListener("click", callback);
        });
    };

    Constructor.prototype.remove = function() {
        this.each(function(elem) {
            elem.remove();
        });
    };

    Constructor.prototype.allEqual = function(a, t) {
        for (var e of a) {
            if (e === t) {
                return false;
            }
        }
        return true;
    }

    Constructor.prototype.image = function(image, id, x, y, w, h, elem) {
        elem = elem || "body";
        var img = document.createElement("img");
        img.src = image;
        img.id = id;
        img.style.position = "absolute";
        img.style.top = y + "px";
        img.style.left = x + "px";
        img.style.width = w + "px";
        img.style.height = h + "px";
        img.style.zIndex = 10000001;
        document.querySelector(elem).append(img);
    };

    Constructor.prototype.drawText = function(text, id, x, y, s, f, c, w, h, elem) {
        w = w || "auto";
        h = h || "auto";
        c = c || "black";
        f = f || "serif";
        elem = elem || "body";
        var span = document.createElement("span");
        span.innerHTML = text;
        span.id = id;
        span.style.position = "absolute";
        span.style.top = y + "px";
        span.style.left = x + "px";
        span.style.fontSize = s + "px";
        span.style.zIndex = 10000002;
        span.style.fontFamily = f;
        span.style.color = c;
        span.style.overflow = "wrap";
        span.style.width = w + "px";
        span.style.height = h + "px";
        document.querySelector(elem).append(span);
    }

    var instantiate = function(selector) {
        return new Constructor(selector);
    };


    return instantiate;
})();