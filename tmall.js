(function(e) {
    e.appjump = {
        timeout: 1500,
        loaded: false,
        init: function() {
            this.loaded = true;
            var t = e.navigator.userAgent;
            this.isChrome = t.match(/Chrome/i) != null && t.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null;
            this.isTaobaoApp = !!t.match(/WindVane/);
            this.isTmallApp = !!t.match(/T-UA=/);
            var i = document.createElement("frame");
            if (!i.parentNode) {
                i.setAttribute("id", "J_tmmjumpFrame");
                i.style.cssText = "display:none";
                e.document.body.appendChild(i)
            }
            this.frame = i
        },
        go: function(e) {
            if (!this.loaded) this.init();
            if (!e || !e.href) return false;
            if (this.isTmallApp && e.href.indexOf("tmall://") > -1) return;
            if (this.isTaobaoApp && (e.href.indexOf("taobao://") > -1 || e.href.indexOf("taobaowebview://") > -1)) return;
            this.options = e;
            if (this.isChrome) {
                var t = e.href.split("://"),
                i = t[0],
                a = e.href.replace(i + "://", "");
                if (!e.bag) {
                    e.bag = {
                        tmall: "com.tmall.wireless",
                        taobao: "com.taobao.taobao",
                        taobaowebview: "com.taobao.taobao"
                    } [i]
                }
                e.href = "intent://" + a + "#Intent;scheme=" + i + ";package=" + e.bag + ";end";
                location.href = e.href
            } else {
                if (/iPhone OS 9_/i.test(window.navigator.userAgent)) {
                    location.href = e.href
                } else {
                    this.frame && this.frame.setAttribute("src", e.href)
                }
            }
            var o = this;
            window.addEventListener("blur",
            function() {
                if (!o.timeload) return;
                clearTimeout(o.timeload);
                o.timeload = null;
                if (e.success) e.success()
            });
            var n = Date.now();
            o.timeload = setTimeout(function() {
                var t = Date.now();
                clearTimeout(o.timeload);
                o.timeload = null;
                if (t - n < o.timeout + 50) {
                    if (e.fail) {
                        e.fail()
                    } else {
                        o.download()
                    }
                } else {
                    if (e.success) e.success()
                }
            },
            1500)
        },
        download: function() {
            self.location.href = "http://m.tmall.com/channel/act/wap/11111111e.php"
        }
    }
})(window);