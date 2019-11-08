var OpenSeadragon = OpenSeadragon || {};
console.log(OpenSeadragon)
OpenSeadragon.Viewer = OpenSeadragon.Viewer || {}, OpenSeadragon.Viewer.prototype = OpenSeadragon.Viewer.prototype || {}, OpenSeadragon.Viewer.prototype.annotations = function(e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var o = n[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
  }
  var n = {};
  return t.m = e, t.c = n, t.i = function(e) {
    return e
  }, t.d = function(e, n, i) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: i
    })
  }, t.n = function(e) {
    var n = e && e.__esModule ? function() {
      return e.default
    } : function() {
      return e
    };
    return t.d(n, "a", n), n
  }, t.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = "", t(t.s = 19)
}([
  /*!**************************************!*\
    !*** ./src/dispatcher/Dispatcher.js ***!
    \**************************************/
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n( /*! flux */ 22),
      o = new i.Dispatcher;
    t.default = o
  },
  /*!****************************!*\
    !*** ./src/store/Store.js ***!
    \****************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      u = n( /*! OpenSeadragon */ 2),
      l = i(u),
      s = n( /*! ../dispatcher/Dispatcher */ 0),
      d = i(s),
      f = {
        mode: "MOVE",
        zoom: 1,
        width: 0,
        height: 0,
        activityInProgress: !1,
        annotations: []
      },
      h = function(e) {
        function t() {
          return o(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e), c(t, [{
          key: "getAll",
          value: function() {
            return f.annotations
          }
        }, {
          key: "getWidth",
          value: function() {
            return f.width * f.zoom
          }
        }, {
          key: "getHeight",
          value: function() {
            return f.height * f.zoom
          }
        }, {
          key: "getLast",
          value: function() {
            return f.annotations[f.annotations.length - 1]
          }
        }, {
          key: "getMode",
          value: function() {
            return f.mode
          }
        }, {
          key: "inMoveMode",
          value: function() {
            return "MOVE" === this.getMode()
          }
        }, {
          key: "notInMoveMode",
          value: function() {
            return !this.inMoveMode()
          }
        }, {
          key: "getZoomLevel",
          value: function() {
            return f.zoom
          }
        }, {
          key: "isActivityInProgress",
          value: function() {
            return f.activityInProgress
          }
        }]), t
      }(l.default.EventSource),
      p = new h;
    d.default.register(function(e) {
      switch (e.type) {
        case "MODE_UPDATE":
          f.mode = e.mode;
          break;
        case "ACTIVITY_UPDATE":
          f.activityInProgress = e.inProgress;
          break;
        case "ANNOTATIONS_CREATE":
          f.annotations.push(e.annotation);
          break;
        case "ANNOTATIONS_UPDATE_LAST":
          (0, u.extend)(p.getLast()[1], e.update);
          break;
        case "ANNOTATIONS_RESET":
          f.annotations = e.annotations;
          break;
        case "ZOOM_UPDATE":
          f.zoom = e.zoom;
          break;
        case "INITIALIZE":
          (0, u.extend)(f, e.options)
      }
      p.raiseEvent("CHANGE_EVENT")
    }), t.default = p
  },
  /*!********************************!*\
    !*** external "OpenSeadragon" ***!
    \********************************/
  function(e, t) {
    e.exports = OpenSeadragon
  },
  /*!***********************************!*\
    !*** ./src/actions/selectMode.js ***!
    \***********************************/
  function(e, t, n) {
    "use strict";

    function i(e, t, n) {
      t.dispatch({
        type: "ACTIVITY_UPDATE",
        inProgress: !1
      }), n.getMode() !== e && t.dispatch({
        type: "MODE_UPDATE",
        mode: e
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!*********************************!*\
    !*** ./~/preact/dist/preact.js ***!
    \*********************************/
  function(e, t, n) {
    ! function(e, n) {
      n(t)
    }(0, function(e) {
      function t(e, t, n) {
        this.nodeName = e, this.attributes = t, this.children = n, this.key = t && t.key
      }

      function n(e, t) {
        if (t)
          for (var n in t) void 0 !== t[n] && (e[n] = t[n]);
        return e
      }

      function i(e) {
        return n({}, e)
      }

      function o(e, t) {
        for (var n = t.split("."), i = 0; i < n.length && e; i++) e = e[n[i]];
        return e
      }

      function r(e, t) {
        return [].slice.call(e, t)
      }

      function a(e) {
        return "function" == typeof e
      }

      function c(e) {
        return "string" == typeof e
      }

      function u(e) {
        return void 0 === e || null === e
      }

      function l(e) {
        return !1 === e || u(e)
      }

      function s(e) {
        var t = "";
        for (var n in e) e[n] && (t && (t += " "), t += n);
        return t
      }

      function d(e, n, i) {
        var o, r, u, f = arguments.length;
        if (f > 2) {
          var h = typeof i;
          if (3 === f && "object" !== h && "function" !== h) l(i) || (o = [String(i)]);
          else {
            o = [];
            for (var p = 2; p < f; p++) {
              var A = arguments[p];
              if (!l(A)) {
                A.join ? r = A : (r = _)[0] = A;
                for (var g = 0; g < r.length; g++) {
                  var m = r[g],
                    M = !(l(m) || a(m) || m instanceof t);
                  M && !c(m) && (m = String(m)), M && u ? o[o.length - 1] += m : l(m) || (o.push(m), u = M)
                }
              }
            }
          }
        } else if (n && n.children) return d(e, n, n.children);
        n && (n.children && delete n.children, a(e) || ("className" in n && (n.class = n.className, delete n.className), (u = n.class) && !c(u) && (n.class = s(u))));
        var b = new t(e, n || void 0, o);
        return q.vnode && q.vnode(b), b
      }

      function f(e, t) {
        return d(e.nodeName, n(i(e.attributes), t), arguments.length > 2 ? r(arguments, 2) : e.children)
      }

      function h(e, t, n) {
        var i = t.split("."),
          r = i[0];
        return function(t) {
          var l, s, d, f = t && t.currentTarget || this,
            h = e.state,
            p = h;
          if (c(n) ? (s = o(t, n), u(s) && (f = f._component) && (s = o(f, n))) : s = f.nodeName ? (f.nodeName + f.type).match(/^input(check|rad)/i) ? f.checked : f.value : t, a(s) && (s = s.call(f)), i.length > 1) {
            for (d = 0; d < i.length - 1; d++) p = p[i[d]] || (p[i[d]] = {});
            p[i[d]] = s, s = h[r]
          }
          e.setState((l = {}, l[r] = s, l))
        }
      }

      function p(e) {
        1 === ne.push(e) && (q.debounceRendering || K)(A)
      }

      function A() {
        if (ne.length) {
          var e, t = ne;
          for (ne = ie, ie = t; e = t.pop();) e._dirty && C(e)
        }
      }

      function g(e) {
        var t = e && e.nodeName;
        return t && a(t) && !(t.prototype && t.prototype.render)
      }

      function m(e, t) {
        return e.nodeName(U(e), t || $)
      }

      function M(e, t) {
        return e[ee] || (e[ee] = t || {})
      }

      function b(e) {
        return e instanceof Text ? 3 : e instanceof Element ? 1 : 0
      }

      function I(e) {
        var t = e.parentNode;
        t && t.removeChild(e)
      }

      function v(e, t, n, i, o) {
        if (M(e)[t] = n, "key" !== t && "children" !== t && "innerHTML" !== t)
          if ("class" !== t || o)
            if ("style" === t) {
              if ((!n || c(n) || c(i)) && (e.style.cssText = n || ""), n && "object" == typeof n) {
                if (!c(i))
                  for (var r in i) r in n || (e.style[r] = "");
                for (var r in n) e.style[r] = "number" != typeof n[r] || te[r] ? n[r] : n[r] + "px"
              }
            } else if ("dangerouslySetInnerHTML" === t) n && (e.innerHTML = n.__html);
        else if (t.match(/^on/i)) {
          var s = e._listeners || (e._listeners = {});
          t = H(t.substring(2)), n ? s[t] || e.addEventListener(t, E) : s[t] && e.removeEventListener(t, E), s[t] = n
        } else if ("type" !== t && !o && t in e) w(e, t, u(n) ? "" : n), l(n) && e.removeAttribute(t);
        else {
          var d = o && t.match(/^xlink\:?(.+)/);
          l(n) ? d ? e.removeAttributeNS("http://www.w3.org/1999/xlink", H(d[1])) : e.removeAttribute(t) : "object" == typeof n || a(n) || (d ? e.setAttributeNS("http://www.w3.org/1999/xlink", H(d[1]), n) : e.setAttribute(t, n))
        } else e.className = n || ""
      }

      function w(e, t, n) {
        try {
          e[t] = n
        } catch (e) {}
      }

      function E(e) {
        return this._listeners[e.type](q.event && q.event(e) || e)
      }

      function y(e) {
        for (var t = {}, n = e.attributes.length; n--;) t[e.attributes[n].name] = e.attributes[n].value;
        return t
      }

      function R(e, t) {
        return c(t) ? 3 === b(e) : c(t.nodeName) ? N(e, t.nodeName) : a(t.nodeName) ? e._componentConstructor === t.nodeName || g(t) : void 0
      }

      function N(e, t) {
        return e.normalizedNodeName === t || H(e.nodeName) === H(t)
      }

      function U(e) {
        var t = e.nodeName.defaultProps,
          o = i(t || e.attributes);
        return t && n(o, e.attributes), e.children && (o.children = e.children), o
      }

      function D(e) {
        O(e);
        var t = H(e.nodeName),
          n = oe[t];
        n ? n.push(e) : oe[t] = [e]
      }

      function G(e, t) {
        var n = H(e),
          i = oe[n] && oe[n].pop() || (t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e));
        return M(i), i.normalizedNodeName = n, i
      }

      function O(e) {
        I(e), 1 === b(e) && (M(e, y(e)), e._component = e._componentConstructor = null)
      }

      function j() {
        for (var e; e = re.pop();) e.componentDidMount && e.componentDidMount()
      }

      function Y(e, t, n, i, o, r, a) {
        ae++;
        var c = B(e, t, n, i, r);
        return o && c.parentNode !== o && o.insertBefore(c, a || null), --ae || j(), c
      }

      function B(e, t, n, i, o) {
        for (var r = t && t.attributes; g(t);) t = m(t, n);
        if (u(t) && (t = "", o)) {
          if (e) {
            if (8 === e.nodeType) return e;
            D(e)
          }
          return document.createComment(t)
        }
        if (c(t)) {
          if (e) {
            if (3 === b(e) && e.parentNode) return e.nodeValue = t, e;
            D(e)
          }
          return document.createTextNode(t)
        }
        var l, s = e,
          d = t.nodeName;
        if (a(d)) return J(e, t, n, i);
        if (c(d) || (d = String(d)), l = "svg" === H(d), l && (ce = !0), e) {
          if (!N(e, d)) {
            for (s = G(d, ce); e.firstChild;) s.appendChild(e.firstChild);
            x(e)
          }
        } else s = G(d, ce);
        return t.children && 1 === t.children.length && "string" == typeof t.children[0] && 1 === s.childNodes.length && s.firstChild instanceof Text ? s.firstChild.nodeValue = t.children[0] : (t.children || s.firstChild) && T(s, t.children, n, i), Z(s, t.attributes), r && r.ref && (s[ee].ref = r.ref)(s), l && (ce = !1), s
      }

      function T(e, t, n, i) {
        var o, r, a, c, l = e.childNodes,
          s = [],
          d = {},
          f = 0,
          h = 0,
          p = l.length,
          A = 0,
          g = t && t.length;
        if (p)
          for (var m = 0; m < p; m++) {
            var M = l[m],
              b = g ? (r = M._component) ? r.__key : (r = M[ee]) ? r.key : null : null;
            b || 0 === b ? (f++, d[b] = M) : s[A++] = M
          }
        if (g)
          for (var m = 0; m < g; m++) {
            if (a = t[m], c = null, f && a.attributes) {
              var b = a.key;
              !u(b) && b in d && (c = d[b], d[b] = void 0, f--)
            }
            if (!c && h < A)
              for (o = h; o < A; o++)
                if ((r = s[o]) && R(r, a)) {
                  c = r, s[o] = void 0, o === A - 1 && A--, o === h && h++;
                  break
                }
            c = B(c, a, n, i), c !== l[m] && e.insertBefore(c, l[m] || null)
          }
        if (f)
          for (var m in d) d[m] && (s[h = A++] = d[m]);
        h < A && k(s)
      }

      function k(e, t) {
        for (var n = e.length; n--;) {
          var i = e[n];
          i && x(i, t)
        }
      }

      function x(e, t) {
        var n = e._component;
        n ? P(n, !t) : (e[ee] && e[ee].ref && e[ee].ref(null), t || D(e), e.childNodes && e.childNodes.length && k(e.childNodes, t))
      }

      function Z(e, t) {
        var n = e[ee] || y(e);
        for (var i in n) t && i in t || v(e, i, null, n[i], ce);
        if (t)
          for (var o in t) o in n && t[o] == n[o] && ("value" !== o && "checked" !== o || t[o] == e[o]) || v(e, o, t[o], n[o], ce)
      }

      function Q(e) {
        var t = e.constructor.name,
          n = ue[t];
        n ? n.push(e) : ue[t] = [e]
      }

      function V(e, t, n) {
        var i = new e(t, n),
          o = ue[e.name];
        if (i.props = t, i.context = n, o)
          for (var r = o.length; r--;)
            if (o[r].constructor === e) {
              i.nextBase = o[r].nextBase, o.splice(r, 1);
              break
            }
        return i
      }

      function S(e) {
        e._dirty || (e._dirty = !0, p(e))
      }

      function W(e, t, n, i, o) {
        var r = e.base;
        e._disableRendering || (e._disableRendering = !0, (e.__ref = t.ref) && delete t.ref, (e.__key = t.key) && delete t.key, u(r) || o ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i), i && i !== e.context && (e.prevContext || (e.prevContext = e.context), e.context = i), e.prevProps || (e.prevProps = e.props), e.props = t, e._disableRendering = !1, 0 !== n && (1 !== n && !1 === q.syncComponentUpdates && r ? S(e) : C(e, 1, o)), e.__ref && e.__ref(e))
      }

      function C(e, t, o) {
        if (!e._disableRendering) {
          var r, c, u = e.props,
            l = e.state,
            s = e.context,
            d = e.prevProps || u,
            f = e.prevState || l,
            h = e.prevContext || s,
            p = e.base,
            A = p || e.nextBase,
            M = A && A.parentNode,
            b = A && A._component,
            I = e._component;
          if (p && (e.props = d, e.state = f, e.context = h, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(u, l, s) ? r = !0 : e.componentWillUpdate && e.componentWillUpdate(u, l, s), e.props = u, e.state = l, e.context = s), e.prevProps = e.prevState = e.prevContext = e.nextBase = null, e._dirty = !1, !r) {
            for (e.render && (c = e.render(u, l, s)), e.getChildContext && (s = n(i(s), e.getChildContext())); g(c);) c = m(c, s);
            var v, w, E = c && c.nodeName;
            if (a(E) && E.prototype.render) {
              var y = I,
                R = U(c);
              y && y.constructor === E ? W(y, R, 1, s) : (v = y, y = V(E, R, s), y._parentComponent = e, e._component = y, W(y, R, 0, s), C(y, 1)), w = y.base
            } else {
              var N = A;
              v = I, v && (N = e._component = null), (A || 1 === t) && (N && (N._component = null), w = Y(N, c, s, o || !p, M, !0, A && A.nextSibling))
            }
            if (A && w !== A && (v || b !== e || I || !A.parentNode || (A._component = null, x(A))), v && P(v, !0), e.base = w, w) {
              for (var D = e, G = e; G = G._parentComponent;) D = G;
              w._component = D, w._componentConstructor = D.constructor
            }
          }!p || o ? (re.unshift(e), ae || j()) : !r && e.componentDidUpdate && e.componentDidUpdate(d, f, h);
          var O, B = e._renderCallbacks;
          if (B)
            for (; O = B.pop();) O.call(e);
          return c
        }
      }

      function J(e, t, n, i) {
        for (var o = e && e._component, r = e, a = o && e._componentConstructor === t.nodeName, c = a, u = U(t); o && !c && (o = o._parentComponent);) c = o.constructor === t.nodeName;
        return !c || i && !o._component ? (o && !a && (P(o, !0), e = r = null), o = V(t.nodeName, u, n), e && !o.nextBase && (o.nextBase = e), W(o, u, 1, n, i), e = o.base, r && e !== r && (r._component = null, x(r))) : (W(o, u, 3, n, i), e = o.base), e
      }

      function P(e, t) {
        var n = e.base;
        e._disableRendering = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
        var i = e._component;
        i ? P(i, t) : n && (n[ee] && n[ee].ref && n[ee].ref(null), e.nextBase = n, t && (I(n), Q(e)), k(n.childNodes, !t)), e.__ref && e.__ref(null), e.componentDidUnmount && e.componentDidUnmount()
      }

      function z(e, t) {
        this._dirty = !0, this._disableRendering = !1, this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null, this.context = t, this.props = e, this.state = this.getInitialState && this.getInitialState() || {}
      }

      function L(e, t, n) {
        return Y(n, e, {}, !1, t)
      }
      var F = {},
        H = function(e) {
          return F[e] || (F[e] = e.toLowerCase())
        },
        X = "undefined" != typeof Promise && Promise.resolve(),
        K = X ? function(e) {
          X.then(e)
        } : setTimeout,
        q = {
          vnode: u
        },
        _ = [],
        $ = {},
        ee = "undefined" != typeof Symbol ? Symbol.for("preactattr") : "__preactattr_",
        te = {
          boxFlex: 1,
          boxFlexGroup: 1,
          columnCount: 1,
          fillOpacity: 1,
          flex: 1,
          flexGrow: 1,
          flexPositive: 1,
          flexShrink: 1,
          flexNegative: 1,
          fontWeight: 1,
          lineClamp: 1,
          lineHeight: 1,
          opacity: 1,
          order: 1,
          orphans: 1,
          strokeOpacity: 1,
          widows: 1,
          zIndex: 1,
          zoom: 1
        },
        ne = [],
        ie = [],
        oe = {},
        re = [],
        ae = 0,
        ce = !1,
        ue = {};
      n(z.prototype, {
        linkState: function(e, t) {
          var n = this._linkedStates || (this._linkedStates = {}),
            i = e + "|" + t;
          return n[i] || (n[i] = h(this, e, t))
        },
        setState: function(e, t) {
          var o = this.state;
          this.prevState || (this.prevState = i(o)), n(o, a(e) ? e(o, this.props) : e), t && (this._renderCallbacks = this._renderCallbacks || []).push(t), S(this)
        },
        forceUpdate: function() {
          C(this, 2)
        },
        render: function() {
          return null
        }
      }), e.h = d, e.cloneElement = f, e.Component = z, e.render = L, e.rerender = A, e.options = q
    })
  },
  /*!*********************************!*\
    !*** ./src/controls/Control.js ***!
    \*********************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      a = n( /*! OpenSeadragon */ 2),
      c = n( /*! ../actions/selectMode */ 3),
      u = i(c),
      l = n( /*! ../store/Store */ 1),
      s = i(l),
      d = n( /*! ../dispatcher/Dispatcher */ 0),
      f = i(d),
      h = function() {
        function e(t) {
          var n = this;
          o(this, e), this.mode = t.Tooltip.toUpperCase(), this.btn = new a.Button((0, a.extend)({
            onClick: this.onClick
          }, t)), s.default.getMode() === this.mode && this.activate(), s.default.addHandler("CHANGE_EVENT", function() {
            s.default.getMode() === n.mode ? n.activate() : n.deactivate()
          })
        }
        return r(e, [{
          key: "activate",
          value: function() {
            this.btn.imgDown.style.visibility = "visible"
          }
        }, {
          key: "deactivate",
          value: function() {
            this.btn.imgDown.style.visibility = "hidden"
          }
        }, {
          key: "onClick",
          value: function(e) {
            e.eventSource.Tooltip && (0, u.default)(e.eventSource.Tooltip.toUpperCase(), f.default, s.default)
          }
        }]), e
      }();
    t.default = h
  },
  /*!******************************!*\
    !*** ./~/process/browser.js ***!
    \******************************/
  function(e, t) {
    function n() {
      throw new Error("setTimeout has not been defined")
    }

    function i() {
      throw new Error("clearTimeout has not been defined")
    }

    function o(e) {
      if (s === setTimeout) return setTimeout(e, 0);
      if ((s === n || !s) && setTimeout) return s = setTimeout, setTimeout(e, 0);
      try {
        return s(e, 0)
      } catch (t) {
        try {
          return s.call(null, e, 0)
        } catch (t) {
          return s.call(this, e, 0)
        }
      }
    }

    function r(e) {
      if (d === clearTimeout) return clearTimeout(e);
      if ((d === i || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
      try {
        return d(e)
      } catch (t) {
        try {
          return d.call(null, e)
        } catch (t) {
          return d.call(this, e)
        }
      }
    }

    function a() {
      A && h && (A = !1, h.length ? p = h.concat(p) : g = -1, p.length && c())
    }

    function c() {
      if (!A) {
        var e = o(a);
        A = !0;
        for (var t = p.length; t;) {
          for (h = p, p = []; ++g < t;) h && h[g].run();
          g = -1, t = p.length
        }
        h = null, A = !1, r(e)
      }
    }

    function u(e, t) {
      this.fun = e, this.array = t
    }

    function l() {}
    var s, d, f = e.exports = {};
    ! function() {
      try {
        s = "function" == typeof setTimeout ? setTimeout : n
      } catch (e) {
        s = n
      }
      try {
        d = "function" == typeof clearTimeout ? clearTimeout : i
      } catch (e) {
        d = i
      }
    }();
    var h, p = [],
      A = !1,
      g = -1;
    f.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      p.push(new u(e, t)), 1 !== p.length || A || o(c)
    }, u.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = l, f.addListener = l, f.once = l, f.off = l, f.removeListener = l, f.removeAllListeners = l, f.emit = l, f.prependListener = l, f.prependOnceListener = l, f.listeners = function(e) {
      return []
    }, f.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, f.cwd = function() {
      return "/"
    }, f.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, f.umask = function() {
      return 0
    }
  },
  /*!************************************!*\
    !*** ./src/actions/cleanCanvas.js ***!
    \************************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      e.dispatch({
        type: "ACTIVITY_UPDATE",
        inProgress: !1
      }), e.dispatch({
        type: "ANNOTATIONS_RESET",
        annotations: []
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!***************************************!*\
    !*** ./src/actions/fillCanvasWith.js ***!
    \***************************************/
  function(e, t, n) {
    "use strict";

    function i(e, t) {
      t.dispatch({
        type: "ACTIVITY_UPDATE",
        inProgress: !1
      }), t.dispatch({
        type: "ANNOTATIONS_RESET",
        annotations: e
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!***********************************!*\
    !*** ./src/actions/initialize.js ***!
    \***********************************/
  function(e, t, n) {
    "use strict";

    function i(e, t) {
      t.dispatch({
        type: "INITIALIZE",
        options: e
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!*****************************!*\
    !*** ./src/actions/zoom.js ***!
    \*****************************/
  function(e, t, n) {
    "use strict";

    function i(e, t) {
      t.dispatch({
        type: "ZOOM_UPDATE",
        zoom: e
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!***************************************!*\
    !*** ./src/components/Annotations.js ***!
    \***************************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function c(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
      }
      return Array.from(e)
    }

    function u() {
      return void 0 !== document.documentElement.style.vectorEffect
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var l = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
      },
      s = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      d = n( /*! preact */ 4),
      f = n( /*! ../store/Store */ 1),
      h = i(f),
      p = n( /*! ../dispatcher/Dispatcher */ 0),
      A = i(p),
      g = n( /*! ../actions/leaveCanvas */ 13),
      m = i(g),
      M = n( /*! ../actions/move */ 14),
      b = i(M),
      I = n( /*! ../actions/press */ 15),
      v = i(I),
      w = n( /*! ../actions/release */ 16),
      E = i(w),
      y = n( /*! ../utils/convert */ 20),
      R = {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        preserveAspectRatio: "none",
        viewBox: "0 0 100 100",
        width: "100%",
        height: "100%"
      },
      N = {
        cursor: "default",
        "background-color": "rgba(0,0,0,0)"
      },
      U = function() {
        var e = function(e) {
          return d.h.apply(void 0, c(e))
        };
        return u() || (e = function(e) {
          var t = e;
          return t[1]["stroke-width"] = y.convertWidth.toPercent(3), d.h.apply(void 0, c(t))
        }), e
      }(),
      D = function(e) {
        function t() {
          return o(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
        }
        return a(t, e), s(t, [{
          key: "getInitialState",
          value: function() {
            return {
              annotations: h.default.getAll()
            }
          }
        }, {
          key: "componentDidMount",
          value: function() {
            var e = this;
            h.default.addHandler("CHANGE_EVENT", function() {
              e.setState({
                annotations: h.default.getAll()
              })
            })
          }
        }, {
          key: "handleMouseLeave",
          value: function(e) {
            h.default.notInMoveMode() && (e.stopPropagation(), (0, m.default)(A.default, h.default))
          }
        }, {
          key: "handleMouseUp",
          value: function(e) {
            h.default.notInMoveMode() && (e.stopPropagation(), (0, E.default)(A.default, h.default))
          }
        }, {
          key: "coords",
          value: function(e) {
            var t = this.base.getBoundingClientRect(),
              n = e.clientX - t.left,
              i = e.clientY - t.top,
              o = 100 * n / t.width,
              r = 100 * i / t.height;
            return [Math.round(100 * o) / 100, Math.round(100 * r) / 100]
          }
        }, {
          key: "handleMouseDown",
          value: function(e) {
            h.default.notInMoveMode() && (e.stopPropagation(), v.default.apply(void 0, c(this.coords(e)).concat([A.default, h.default])))
          }
        }, {
          key: "handleMouseMove",
          value: function(e) {
            h.default.notInMoveMode() && (e.stopPropagation(), b.default.apply(void 0, c(this.coords(e)).concat([A.default, h.default])))
          }
        }, {
          key: "render",
          value: function() {
            return (0, d.h)("svg", l({}, R, {
              style: N,
              onMouseDown: this.handleMouseDown.bind(this),
              onPointerDown: this.handleMouseDown.bind(this),
              onMouseLeave: this.handleMouseLeave.bind(this),
              onMouseMove: this.handleMouseMove.bind(this),
              onMouseUp: this.handleMouseUp.bind(this),
              onPointerUp: this.handleMouseUp.bind(this)
            }), this.state.annotations.map(U))
          }
        }]), t
      }(d.Component);
    t.default = D
  },
  /*!*******************************!*\
    !*** ./src/controls/index.js ***!
    \*******************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n( /*! ./Move */ 18),
      r = i(o),
      a = n( /*! ./Draw */ 17),
      c = i(a);
    t.default = [r.default, c.default]
  },
  /*!************************************!*\
    !*** ./src/actions/leaveCanvas.js ***!
    \************************************/
  function(e, t, n) {
    "use strict";

    function i(e, t) {
      switch (t.getMode()) {
        case "DRAW":
          e.dispatch({
            type: "ACTIVITY_UPDATE",
            inProgress: !1
          })
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!*****************************!*\
    !*** ./src/actions/move.js ***!
    \*****************************/
  function(e, t, n) {
    "use strict";

    function i(e, t, n, i) {
      switch (i.getMode()) {
        case "DRAW":
          if (i.isActivityInProgress()) {
            var o = i.getLast();
            if (o && "path" === o[0]) {
              var r = o[1].d;
              n.dispatch({
                type: "ANNOTATIONS_UPDATE_LAST",
                update: {
                  d: r + " L" + e + " " + t
                }
              })
            }
          }
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!******************************!*\
    !*** ./src/actions/press.js ***!
    \******************************/
  function(e, t, n) {
    "use strict";

    function i(e, t, n, i) {
      switch (i.getMode()) {
        case "DRAW":
          n.dispatch({
            type: "ACTIVITY_UPDATE",
            inProgress: !0
          }), n.dispatch({
            type: "ANNOTATIONS_CREATE",
            annotation: o.getPath(e, t)
          })
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i;
    var o = {
      getPath: function(e, t) {
        return ["path", {
          fill: "none",
          d: "M" + e + " " + t,
          stroke: "red",
          "stroke-width": 3,
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          "vector-effect": "non-scaling-stroke"
        }]
      }
    }
  },
  /*!********************************!*\
    !*** ./src/actions/release.js ***!
    \********************************/
  function(e, t, n) {
    "use strict";

    function i(e, t) {
      switch (t.getMode()) {
        case "DRAW":
          e.dispatch({
            type: "ACTIVITY_UPDATE",
            inProgress: !1
          })
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = i
  },
  /*!******************************!*\
    !*** ./src/controls/Draw.js ***!
    \******************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c = n( /*! ./Control */ 5),
      u = i(c),
      l = n( /*! ../../img/draw_grouphover.png */ 24),
      s = i(l),
      d = n( /*! ../../img/draw_hover.png */ 25),
      f = i(d),
      h = n( /*! ../../img/draw_pressed.png */ 26),
      p = i(h),
      A = n( /*! ../../img/draw_rest.png */ 27),
      g = i(A),
      m = function(e) {
        function t() {
          return o(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, {
            Tooltip: "Draw",
            srcRest: g.default,
            srcGroup: s.default,
            srcHover: f.default,
            srcDown: p.default
          }))
        }
        return a(t, e), t
      }(u.default);
    t.default = m
  },
  /*!******************************!*\
    !*** ./src/controls/Move.js ***!
    \******************************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c = n( /*! ./Control */ 5),
      u = i(c),
      l = n( /*! ../../img/move_grouphover.png */ 28),
      s = i(l),
      d = n( /*! ../../img/move_hover.png */ 29),
      f = i(d),
      h = n( /*! ../../img/move_pressed.png */ 30),
      p = i(h),
      A = n( /*! ../../img/move_rest.png */ 31),
      g = i(A),
      m = function(e) {
        function t() {
          return o(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, {
            Tooltip: "Move",
            srcRest: g.default,
            srcGroup: s.default,
            srcHover: f.default,
            srcDown: p.default
          }))
        }
        return a(t, e), t
      }(u.default);
    t.default = m
  },
  /*!*********************!*\
    !*** ./src/main.js ***!
    \*********************/
  function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e) {
      return function() {
        if (U) {
          for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
          return e.apply(this, n)
        }
        throw new Error("The OpenSeadragon Annotations plugin is not running")
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.clean = t.set = t.get = void 0;
    var r = n( /*! OpenSeadragon */ 2),
      a = i(r),
      c = n( /*! preact */ 4),
      u = n( /*! ./components/Annotations */ 11),
      l = i(u),
      s = n( /*! ./store/Store */ 1),
      d = i(s),
      f = n( /*! ./dispatcher/Dispatcher */ 0),
      h = i(f),
      p = n( /*! ./controls */ 12),
      A = i(p),
      g = n( /*! ./actions/initialize */ 9),
      m = i(g),
      M = n( /*! ./actions/selectMode */ 3),
      b = i(M),
      I = n( /*! ./actions/cleanCanvas */ 7),
      v = i(I),
      w = n( /*! ./actions/fillCanvasWith */ 8),
      E = i(w),
      y = n( /*! ./actions/zoom */ 10),
      R = i(y),
      N = A.default.map(function(e) {
        return new e
      }),
      U = !1,
      D = null,
      G = null,
      O = null;
    a.default.Viewer.prototype.initializeAnnotations = function(e) {
      var t = this,
        n = function(e) {
          return (0, R.default)(e.zoom, h.default)
        },
        i = function() {
          G = n, t.addHandler("zoom", n);
          var i = t.world.getHomeBounds(),
            o = new r.Rect(0, 0, i.width, i.height);
          O = (0, c.render)((0, c.h)(l.default)), t.addOverlay(O, o);
          var a = t.viewport.getZoom(),
            u = O.getBoundingClientRect();
          (0, m.default)({
            zoom: a,
            width: u.width,
            height: u.height
          }, h.default), N.forEach(function(e) {
            t.addControl(e.btn.element, {
              anchor: r.ControlAnchor.BOTTOM_LEFT
            })
          }), D && (t.removeHandler("open", D), D = null), U = !0, e && e()
        };
      if (U) throw new Error("The OpenSeadragon Annotations plugin is already running");
      if (O) throw new Error("An existing overlay has been found");
      this.isOpen() ? i() : (D && this.removeHandler("open", D), D = i, this.addOnceHandler("open", i))
    }, a.default.Viewer.prototype.areAnnotationsActive = function() {
      return U
    }, a.default.Viewer.prototype.startDrawing = o(function() {
      (0, b.default)("DRAW", h.default, d.default)
    }), a.default.Viewer.prototype.stopDrawing = o(function() {
      (0, b.default)("MOVE", h.default, d.default)
    }), a.default.Viewer.prototype.shutdownAnnotations = o(function() {
      if (null !== D) throw new Error("An untriggered handler for the 'open' event has been found");
      if (null === O) throw new Error("Null reference to the SVG overlay");
      this.removeHandler("zoom", G), G = null, this.removeOverlay(O), O = null;
      var e = N;
      this.controls.forEach(function(t) {
        e.forEach(function(e) {
          t.element === e.btn.element && t.destroy()
        })
      }), (0, b.default)("MOVE", h.default, d.default), (0, v.default)(h.default), U = !1
    });
    var j = o(function() {
        return d.default.getAll()
      }),
      Y = o(function(e) {
        (0, E.default)(e, h.default)
      }),
      B = o(function() {
        (0, v.default)(h.default)
      });
    t.get = j, t.set = Y, t.clean = B
  },
  /*!******************************!*\
    !*** ./src/utils/convert.js ***!
    \******************************/
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.convertHeight = t.convertWidth = void 0;
    var i = n( /*! ../store/Store */ 1),
      o = function(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(i),
      r = {
        toPercent: function(e) {
          var t = o.default.getWidth();
          return 0 === t ? 0 : 100 * e / t
        },
        toPixels: function(e) {
          var t = o.default.getWidth();
          return 0 === t ? 0 : e * t / 100
        }
      },
      a = {
        toPercent: function(e) {
          var t = o.default.getHeight();
          return 0 === t ? 0 : 100 * e / t
        },
        toPixels: function(e) {
          var t = o.default.getHeight();
          return 0 === t ? 0 : e * t / 100
        }
      };
    t.convertWidth = r, t.convertHeight = a
  },
  /*!*********************************!*\
    !*** ./~/fbjs/lib/invariant.js ***!
    \*********************************/
  function(e, t, n) {
    "use strict";
    (function(t) {
      var n = function(e, n, i, o, r, a, c, u) {
        if ("production" !== t.env.NODE_ENV && void 0 === n) throw new Error("invariant requires an error message argument");
        if (!e) {
          var l;
          if (void 0 === n) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
          else {
            var s = [i, o, r, a, c, u],
              d = 0;
            l = new Error("Invariant Violation: " + n.replace(/%s/g, function() {
              return s[d++]
            }))
          }
          throw l.framesToPop = 1, l
        }
      };
      e.exports = n
    }).call(t, n( /*! ./../../process/browser.js */ 6))
  },
  /*!*************************!*\
    !*** ./~/flux/index.js ***!
    \*************************/
  function(e, t, n) {
    e.exports.Dispatcher = n( /*! ./lib/Dispatcher */ 23)
  },
  /*!**********************************!*\
    !*** ./~/flux/lib/Dispatcher.js ***!
    \**********************************/
  function(e, t, n) {
    "use strict";
    (function(i) {
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      t.__esModule = !0;
      var r = n( /*! fbjs/lib/invariant */ 21),
        a = function() {
          function e() {
            o(this, e), this._callbacks = {}, this._isDispatching = !1, this._isHandled = {}, this._isPending = {}, this._lastID = 1
          }
          return e.prototype.register = function(e) {
            var t = "ID_" + this._lastID++;
            return this._callbacks[t] = e, t
          }, e.prototype.unregister = function(e) {
            this._callbacks[e] || ("production" !== i.env.NODE_ENV ? r(!1, "Dispatcher.unregister(...): `%s` does not map to a registered callback.", e) : r(!1)), delete this._callbacks[e]
          }, e.prototype.waitFor = function(e) {
            this._isDispatching || ("production" !== i.env.NODE_ENV ? r(!1, "Dispatcher.waitFor(...): Must be invoked while dispatching.") : r(!1));
            for (var t = 0; t < e.length; t++) {
              var n = e[t];
              this._isPending[n] ? this._isHandled[n] || ("production" !== i.env.NODE_ENV ? r(!1, "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", n) : r(!1)) : (this._callbacks[n] || ("production" !== i.env.NODE_ENV ? r(!1, "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", n) : r(!1)), this._invokeCallback(n))
            }
          }, e.prototype.dispatch = function(e) {
            this._isDispatching && ("production" !== i.env.NODE_ENV ? r(!1, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.") : r(!1)), this._startDispatching(e);
            try {
              for (var t in this._callbacks) this._isPending[t] || this._invokeCallback(t)
            } finally {
              this._stopDispatching()
            }
          }, e.prototype.isDispatching = function() {
            return this._isDispatching
          }, e.prototype._invokeCallback = function(e) {
            this._isPending[e] = !0, this._callbacks[e](this._pendingPayload), this._isHandled[e] = !0
          }, e.prototype._startDispatching = function(e) {
            for (var t in this._callbacks) this._isPending[t] = !1, this._isHandled[t] = !1;
            this._pendingPayload = e, this._isDispatching = !0
          }, e.prototype._stopDispatching = function() {
            delete this._pendingPayload, this._isDispatching = !1
          }, e
        }();
      e.exports = a
    }).call(t, n( /*! ./../../process/browser.js */ 6))
  },
  /*!*********************************!*\
    !*** ./img/draw_grouphover.png ***!
    \*********************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzMkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!****************************!*\
    !*** ./img/draw_hover.png ***!
    \****************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyNEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!******************************!*\
    !*** ./img/draw_pressed.png ***!
    \******************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!***************************!*\
    !*** ./img/draw_rest.png ***!
    \***************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGRUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGREVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!*********************************!*\
    !*** ./img/move_grouphover.png ***!
    \*********************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyOEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!****************************!*\
    !*** ./img/move_hover.png ***!
    \****************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyMEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!******************************!*\
    !*** ./img/move_pressed.png ***!
    \******************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzNkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  },
  /*!***************************!*\
    !*** ./img/move_rest.png ***!
    \***************************/
  function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"
  }
]);