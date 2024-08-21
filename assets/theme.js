"use strict";
const global = {
        announcementBar: "announcement-bar",
        overlay: ".bls__overlay",
        header: "header",
        mobile_stickybar: "shopify-section-mobile-stickybar"
    },
    SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = "animate--zoom-in";

function throttle(e, t) {
    let n = 0;
    return function(...o) {
        const s = (new Date).getTime();
        if (!(s - n < t)) return n = s, e(...o)
    }
}

function initializeScrollZoomAnimationTrigger() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const e = Array.from(document.getElementsByClassName("animate--zoom-in"));
    if (0 === e.length) return;
    e.forEach((e => {
        let t = !1;
        new IntersectionObserver((e => {
            e.forEach((e => {
                t = e.isIntersecting
            }))
        })).observe(e), e.style.setProperty("--zoom-in-ratio", 1 + .002 * percentageSeen(e)), window.addEventListener("scroll", throttle((() => {
            t && e.style.setProperty("--zoom-in-ratio", 1 + .002 * percentageSeen(e))
        })), {
            passive: !0
        })
    }))
}

function percentageSeen(e) {
    const t = window.innerHeight,
        n = window.scrollY,
        o = e.getBoundingClientRect().top + n,
        s = e.offsetHeight;
    if (o > n + t) return 0;
    if (o + s < n) return 100;
    let i = (n + t - o) / ((t + s) / 100);
    return Math.round(i)
}

function HoverIntent(e, t) {
    const n = {
        exitDelay: 180,
        interval: 100,
        sensitivity: 6
    };
    let o, s, i, r, l, c, a, d = {};
    const u = function(e) {
            o = e.pageX, s = e.pageY
        },
        m = function(e) {
            const t = i - o,
                n = r - s;
            if (Math.sqrt(t * t + n * n) < d.sensitivity) {
                clearTimeout(a);
                for (let e of l) e.isActive && (d.onExit(e), e.isActive = !1);
                d.onEnter(e), e.isActive = !0
            } else i = o, r = s, c = setTimeout((function() {
                m(e)
            }), d.interval)
        };
    ! function(e, t) {
        if (!t || !t.onEnter || !t.onExit) throw "onEnter and onExit callbacks must be provided";
        d = function(e, t) {
            for (let n in t) e[n] = t[n];
            return e
        }(n, t), l = e;
        for (let e of l) {
            if (!e) return;
            e.isActive = !1, e.addEventListener("mousemove", u), e.addEventListener("mouseenter", (function(t) {
                i = t.pageX, r = t.pageY, e.isActive ? clearTimeout(a) : c = setTimeout((function() {
                    m(e)
                }), d.interval)
            })), e.addEventListener("mouseleave", (function(t) {
                clearTimeout(c), e.isActive && (a = setTimeout((function() {
                    d.onExit(e), e.isActive = !1
                }), d.exitDelay))
            }))
        }
    }(e, t)
}
window.addEventListener("load", (function() {
    const e = window.innerWidth - document.body.clientWidth;
    e > 0 && document.querySelector("html").setAttribute("style", `--padding-right: ${e}px`)
})), window.addEventListener("DOMContentLoaded", (() => {
    initializeScrollZoomAnimationTrigger()
}));
var menuItems = document.querySelectorAll(".bls__menu-parent"),
    hi = HoverIntent(menuItems, {
        onEnter: function(e) {
            e.classList.add("visible")
        },
        onExit: function(e) {
            e.classList.remove("visible")
        }
    });

function debounce(e, t) {
    let n;
    return (...o) => {
        clearTimeout(n), n = setTimeout((() => e.apply(this, o)), t)
    }
}

function backToTop() {
    var e = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById("bls__back-top") && (document.getElementById("bls__back-top").style.height = e + "%");
    const t = document.querySelector(".back-top");
    t && (document.addEventListener("scroll", (() => {
        window.scrollY > 400 ? t.classList.add("show") : t.classList.remove("show")
    })), t.addEventListener("click", (() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })))
}

function mobileStickyBar() {
    var e = document.querySelector(".bls__mobile-stickybar");
    if (!e) return;
    var t = window.pageYOffset;
    let n = 0;
    document.getElementById("announcement-bar") && (n = document.getElementById("announcement-bar")?.clientHeight);
    let o = 0;
    document.getElementById("shopify-section-top-bar") && (o = document.getElementById("shopify-section-top-bar").clientHeight);
    let s = document.getElementById("page-header")?.clientHeight;
    t > n + o + s + 50 ? e.classList.remove("d-none") : e.classList.add("d-none")
}

function initComparisons() {
    var e, t;
    for (e = document.getElementsByClassName("img-comp-overlay"), t = 0; t < e.length; t++) n(e[t]);

    function n(e) {
        var t, n, o, s = 0;
        n = e.offsetWidth, o = e.offsetHeight;
        const i = e.closest(".img-comp-container");

        function r(e) {
            e.preventDefault(), s = 1, window.addEventListener("mousemove", c), window.addEventListener("touchmove", c)
        }

        function l() {
            s = 0
        }

        function c(i) {
            var r;
            if (0 == s) return !1;
            r = function(t) {
                    var n, o = 0;
                    return t = t.changedTouches ? t.changedTouches[0] : t, n = e.getBoundingClientRect(), o = t.pageX - n.left, o -= window.pageXOffset, o
                }(i), r < 0 && (r = 0), r > n && (r = n),
                function(s) {
                    if (t) {
                        var i = (s + t.offsetWidth / 2 + 10) / n * 100;
                        i >= 100 - (t.offsetWidth / 2 + 10) / n * 100 && (i = 100 - (t.offsetWidth / 2 + 10) / n * 100)
                    }
                    e.closest(".img-comp-container").setAttribute("style", "--percent: " + i.toFixed(4) + "%;--height: " + o + "px ")
                }(r)
        }
        i && (t = i.querySelector(".image-comparison__button")), t && (t.addEventListener("touchstart", r), t.addEventListener("mousedown", r)), window.addEventListener("mouseup", l), window.addEventListener("touchend", l)
    }
}

function showAnime(e) {
    const t = getComputedStyle(e);
    e.style.overflow = "hidden", e.style.display = "block";
    const n = {
        height: e.getBoundingClientRect().height + "px",
        marginTop: t.marginTop,
        marginBottom: t.marginBottom,
        paddingTop: t.paddingTop,
        paddingBottom: t.paddingBottom
    };
    if (Object.keys(n).forEach((e => {
            0 === parseFloat(n[e]) && delete n[e]
        })), 0 === Object.keys(n).length) return !1;
    let o;
    Object.keys(n).forEach((t => {
        e.style[t] = 0
    })), o = e.animate(n, {
        duration: 400,
        easing: "ease"
    }), o.finished.then((() => {
        e.style.overflow = "", Object.keys(n).forEach((t => {
            e.style[t] = ""
        }))
    }))
}

function hideAnime(e) {
    const t = getComputedStyle(e);
    e.style.overflow = "hidden";
    const n = {
        height: e.getBoundingClientRect().height + "px",
        marginTop: t.marginTop,
        marginBottom: t.marginBottom,
        paddingTop: t.paddingTop,
        paddingBottom: t.paddingBottom
    };
    if (Object.keys(n).forEach((e => {
            0 === parseFloat(n[e]) && delete n[e]
        })), 0 === Object.keys(n).length) return !1;
    let o;
    Object.keys(n).forEach((t => {
        e.style[t] = n[t], n[t] = 0
    })), o = e.animate(n, {
        duration: 300,
        easing: "ease"
    }), o.finished.then((() => {
        e.style.overflow = "", Object.keys(n).forEach((t => {
            e.style[t] = "", e.style.display = "none"
        }))
    }))
}
initComparisons();
const slideAnimeHidden = (() => {
        let e = !1;
        return t => {
            const n = Object.assign({}, {
                    target: !1,
                    duration: 400,
                    easing: "ease"
                }, t),
                o = n.target;
            if (!o) return;
            const s = getComputedStyle(o);
            o.style.overflow = "hidden";
            const i = n.duration,
                r = n.easing,
                l = {
                    height: o.getBoundingClientRect().height + "px",
                    marginTop: s.marginTop,
                    marginBottom: s.marginBottom,
                    paddingTop: s.paddingTop,
                    paddingBottom: s.paddingBottom
                };
            if (Object.keys(l).forEach((e => {
                    0 === parseFloat(l[e]) && delete l[e]
                })), 0 === Object.keys(l).length) return e = !1, !1;
            let c;
            Object.keys(l).forEach((e => {
                o.style[e] = l[e], l[e] = 0
            })), c = o.animate(l, {
                duration: i,
                easing: r
            }), c.finished.then((() => {
                o.style.overflow = "", Object.keys(l).forEach((e => {
                    o.style[e] = ""
                })), o.style.display = "none", e = !1
            }))
        }
    })(),
    slideAnime = (() => {
        let e = !1;
        return t => {
            const n = Object.assign({}, {
                    target: !1,
                    animeType: "slideToggle",
                    duration: 400,
                    easing: "ease",
                    isDisplayStyle: "block"
                }, t),
                o = n.target;
            if (!o) return;
            if (e) return;
            e = !0;
            let s = n.animeType;
            const i = getComputedStyle(o);
            if ("slideToggle" === s && (s = "none" === i.display ? "slideDown" : "slideUp"), "slideUp" === s && "none" === i.display || "slideDown" === s && "none" !== i.display || "slideUp" !== s && "slideDown" !== s) return e = !1, !1;
            o.style.overflow = "hidden";
            const r = n.duration,
                l = n.easing,
                c = n.isDisplayStyle;
            "slideDown" === s && (o.style.display = c);
            const a = {
                height: o.getBoundingClientRect().height + "px",
                marginTop: i.marginTop,
                marginBottom: i.marginBottom,
                paddingTop: i.paddingTop,
                paddingBottom: i.paddingBottom
            };
            if (Object.keys(a).forEach((e => {
                    0 === parseFloat(a[e]) && delete a[e]
                })), 0 === Object.keys(a).length) return e = !1, !1;
            let d;
            "slideDown" === s ? (Object.keys(a).forEach((e => {
                o.style[e] = 0
            })), d = o.animate(a, {
                duration: r,
                easing: l
            })) : "slideUp" === s && (Object.keys(a).forEach((e => {
                o.style[e] = a[e], a[e] = 0
            })), d = o.animate(a, {
                duration: r,
                easing: l
            })), d.finished.then((() => {
                o.style.overflow = "", Object.keys(a).forEach((e => {
                    o.style[e] = ""
                })), "slideUp" === s && (o.style.display = "none"), e = !1
            }))
        }
    })();
var BlsEventShopify = {
    init: function() {
        this.setupEventListeners(), Shopify.eventCountDownTimer(), Shopify.eventFlashingBrowseTab()
    },
    setupEventListeners: function() {
        window.addEventListener("scroll", (() => {
            backToTop(), mobileStickyBar()
        })), document.querySelectorAll(".collection-infinite-scroll a").forEach((e => {
            e.addEventListener("click", (t => {
                for (var n of document.querySelectorAll(".collection-list__item.grid__item")) n.classList.remove("d-none");
                e.parentElement.remove()
            }), !1)
        })), document.querySelectorAll(".bls__footer_block-title").forEach((e => {
            e.addEventListener("click", (e => {
                let t;
                const n = e.currentTarget,
                    o = n.parentElement.querySelector(".bls__footer_block-content");
                slideAnime({
                    target: o,
                    animeType: "slideToggle"
                });
                const s = n.closest(".bls__footer_block");
                s.classList.contains("active") ? (clearTimeout(t), t = setTimeout((() => {
                    s.classList.remove("active")
                }), 100)) : (clearTimeout(t), t = setTimeout((() => {
                    s.classList.add("active")
                }), 100))
            }))
        })), window.addEventListener("resize", (function() {
            window.innerWidth >= 768 ? document.querySelectorAll(".bls__footer_block-content").forEach((e => {
                e.style.display = "block"
            })) : document.querySelectorAll(".bls__footer_block-content").forEach((e => {
                e.closest(".bls__footer_block.active") ? e.style.display = "block" : e.style.display = "none"
            }))
        })), window.addEventListener("load", (function() {
            screen.width >= 768 && document.querySelectorAll(".bls__footer_block-content").forEach((e => {
                e.style.display = "block"
            }))
        }));
        const e = document.getElementById(global.mobile_stickybar),
            t = document.querySelector("footer");
        e && t && t.classList.add("enable_menu-bottom");
        const n = document.getElementById("bls_cookie");
        n && (getCookie("cookie_bar") || n.classList.remove("d-none"), document.querySelectorAll("#bls_cookie .cookie-dismiss").forEach((e => {
            e.addEventListener("click", (e => {
                e.preventDefault(), e.currentTarget.closest("#bls_cookie").remove(), setCookie("cookie_bar", "dismiss", 30)
            }), !1)
        })));
        const o = document.getElementById(global.announcementBar);
        if (o) {
            const e = o.querySelector(".swiper-announcementBar");
            e && (e.style.maxHeight = o.offsetHeight + "px", new Swiper(".swiper-announcementBar", {
                loop: !0,
                slidesPerView: 1,
                direction: "vertical",
                autoplay: {
                    delay: 3e3
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            })), o.querySelectorAll(".countdown-announcementBar").forEach((e => {
                const t = e?.dataset.blockDeadline,
                    n = t.split("-"),
                    o = n[2] + "-" + n[0].padStart(2, "0") + "-" + n[1].padStart(2, "0") + "T00:00:00Z";
                if (t && Date.parse(o)) {
                    const t = new Date(o),
                        n = () => {
                            const e = +t - +new Date;
                            let n = {};
                            return e > 0 && (n = {
                                days_announcementBar: Math.floor(e / 864e5),
                                hours_announcementBar: Math.floor(e / 36e5 % 24),
                                minutes_announcementBar: Math.floor(e / 1e3 / 60 % 60),
                                seconds_announcementBar: Math.floor(e / 1e3 % 60)
                            }), n
                        };
                    setInterval((() => {
                        const t = n();
                        Object.entries(t).forEach((([t, n]) => {
                            e.querySelector("." + t).innerHTML = n
                        }))
                    }), 1e3)
                }
            })), document.querySelectorAll("#announcement-bar .announcement-close").forEach((e => {
                e.addEventListener("click", (e => {
                    e.preventDefault(), e.currentTarget.closest("#announcement-bar").remove(), setCookie("announcement_bar", 1, 1)
                }), !1)
            }))
        }
        const s = document.getElementById("product_conditions_form"),
            i = document.querySelector(".bls__payment-button");
        s && (getCookie("term_conditions") ? (s.setAttribute("checked", ""), i && i.classList.remove("disabled")) : s.addEventListener("change", (e => {
            setCookie("term_conditions", 1, 1), i && (e.currentTarget.checked ? i.classList.remove("disabled") : i.classList.add("disabled"))
        }))), document.querySelectorAll(global.overlay).forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget;
                for (var n of (t.classList.add("d-none-overlay"), t.classList.contains("d-block-overlay-collection") && t.classList.remove("d-block-overlay-collection"), document.documentElement.classList.remove("hside_opened"), document.documentElement.classList.remove("vetical-overlay"), document.querySelectorAll(".bls__opend-popup"))) n.classList.remove("bls__opend-popup");
                const o = document.querySelector(".btn-filter");
                for (var n of (o && o.classList.contains("actived") && o.classList.remove("actived"), document.querySelectorAll(".bls__addon"))) n.classList.remove("is-open");
                for (var n of document.querySelectorAll(".bls-minicart-wrapper")) n.classList.remove("addons-open");
                for (var n of document.querySelectorAll(".vertical-menu")) n.classList.remove("open")
            }), !1)
        })), document.querySelectorAll(".bls__terms-conditions a").forEach((e => {
            e.addEventListener("click", (e => {
                e.preventDefault();
                const t = document.getElementById("popup-terms-conditions");
                if (!t) return;
                const n = t.getAttribute("data-text");
                var o = EasyDialogBox.create("popup-terms-conditions", "dlg dlg-disable-footer dlg-disable-drag", n, t.innerHTML);
                o.onClose = o.destroy, o.show(300)
            }), !1)
        }))
    }
};
BlsEventShopify.init();
let newParser = new DOMParser;
var BlsAddMetatagScale = {
    init: function() {
        this.addMeta()
    },
    addMeta: function() {
        const e = document.querySelector("body"),
            t = document.querySelector('meta[name="viewport"]'),
            n = t.getAttribute("content") + ", maximum-scale=1";
        e.addEventListener("touchstart", (function() {
            t.setAttribute("content", n)
        }))
    }
};
BlsAddMetatagScale.init();
const rdc = {
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    }
};
let parser = new DOMParser;
var BlsReloadEvents = {
    init: function() {
        this.setupEventListeners()
    },
    setupEventListeners: function() {
        document.addEventListener("shopify:section:load", (function(e) {
            var t = e.detail.sectionId,
                n = e.target.querySelector('[data-id="' + t + '"]');
            if (null != n) {
                const {
                    type: e
                } = n?.dataset;
                switch (e) {
                    case "instagram":
                        BlsInstagramShopify.init();
                        break;
                    case "product_grid":
                    case "product_carousel":
                        BlsProductGridEvents.init(), BlsProductTabEvents.init(), BlsColorSwatchesShopify.init();
                        break;
                    case "recently_viewed_products":
                        BlsRVProductsShopify.init();
                        break;
                    case "product_recommendations":
                        BlsProductRecommendsEvents.init();
                        break;
                    case "product_single":
                        BlsColorSwatchesShopify.init();
                        break;
                    case "product_deal":
                        BlsColorSwatchesShopify.init(), BlsCountdownTimer.init()
                }
            }
        }))
    }
};
BlsReloadEvents.init();
var BlsColorSwatchesShopify = {
    init: function() {
        this.initSwatches()
    },
    initSwatches: function() {
        const e = this;
        var t;
        document.querySelectorAll(".bls__product-color-swatches").forEach((t => {
            e.checkSwatches(t)
        }));
        const n = document.querySelectorAll(".bls__option-swatch-js,.bls__product-compare,.bls__product-wishlist");
        n.length > 0 && n.forEach((n => {
            const o = n.closest(".bls__product-item");
            o && (n.addEventListener("mouseout", (function() {
                n.closest(".swiper") && (t = setTimeout((() => {
                    n.closest(".swiper").classList.remove("show-tooltip")
                }), 400))
            }), !1), n.addEventListener("mouseover", (() => {
                clearTimeout(t), e.listenerColor(n, o), n.closest(".swiper") && n.closest(".swiper").classList.add("show-tooltip")
            })))
        }))
    },
    listenerColor: function(e, t) {
        const n = this;
        setTimeout((() => {
            !e.classList.contains("active") && e.closest(".bls__product-option") && (e.closest(".bls__product-option").querySelectorAll(".bls__option-swatch-js").forEach((e => {
                e.classList.remove("active")
            })), e.classList.toggle("active"), n.swapProduct(t))
        }), 0)
    },
    updateMasterId: (e, t) => t.find((t => !t.options.map(((t, n) => e[n] === t)).includes(!1))),
    updatePrice(e, t) {
        if (!e) return;
        const n = e.compare_at_price,
            o = e.price,
            s = e.unit_price,
            i = e.unit_price_measurement,
            r = Shopify.formatMoney(e.price, cartStrings?.money_format);
        if (s && i) {
            const e = Shopify.formatMoney(s, cartStrings?.money_format),
                n = 1 != i.reference_value ? i.reference_value : i.reference_unit,
                o = t.querySelector(".unit-price .number"),
                r = t.querySelector(".unit-price .unit");
            o && (o.innerHTML = e), r && (r.innerHTML = n)
        }
        const l = t.querySelector(".price__regular.price");
        l && (l.innerHTML = r);
        const c = t.querySelector(".bls__price");
        if (c.classList.remove("price--sold-out", "price--on-sale"), c.querySelector(".price__regular.price").classList.remove("special-price"), n && n > o) {
            const e = Shopify.formatMoney(n, cartStrings?.money_format);
            if (!c.querySelector(".compare-price")) {
                var a = c.querySelector(".price__sale"),
                    d = document.createElement("s");
                d.classList.add("price-item", "compare-price"), a && a.appendChild(d)
            }
            c.querySelector(".compare-price") && (c.querySelector(".compare-price").innerHTML = e), c.classList.add("price--on-sale"), c.querySelector(".price__regular.price").classList.add("special-price")
        } else e.available || c.classList.add("price--sold-out")
    },
    updateMedia(e, t) {
        e && e.featured_media && setTimeout((() => {
            t.querySelector(".bls__product-main-img img").removeAttribute("srcset"), t.querySelector(".bls__product-main-img img").setAttribute("src", e.featured_media.preview_image.src)
        }), 200)
    },
    renderProductInfo(e, t, n, o) {
        let s = 0,
            i = 0,
            r = !1,
            l = !1,
            c = !1,
            a = !1,
            d = !1;
        const u = e.compare_at_price,
            m = e.price;
        t.reduce(((e, t) => {
            const n = e.find((e => e.option === t.option));
            return n ? (n.qty += t.qty, !0 === t.available && (n.available = !0), "" === t.mamagement && (n.mamagement = "")) : e.push(t), e
        }), []).find((t => {
            t.option === e.option1 && (s = t.qty, a = t.available, d = t.mamagement)
        })), u && u > m && (r = !0, i = (u - m) / u * 100), "" === d ? (l = !1, c = !1) : a && s < 1 ? c = !0 : a || (l = !0);
        const p = n.querySelector(".bls__product-label"),
            h = n.querySelector(".bls__product-text-scrolling");
        if (p && p.remove(), h) {
            const e = h?.dataset.textProductScrolling;
            if (r) {
                let t;
                h.style.display = "flex", t = "price" == window.productLabel.saleType ? e.replace("[percent_sale]", "- " + Shopify.formatMoney(u - m, cartStrings.money_format)) : "percent" == window.productLabel.saleType ? e.replace("[percent_sale]", i.toFixed(0) + "%") : e.replace("[percent_sale]", ""), h.querySelectorAll(".sale-content-product").forEach((e => {
                    e.innerText = t
                }))
            } else h.style.display = "none"
        }
        if (r || c || l) {
            var y = document.createElement("div");
            y.classList.add("bls__product-label", "fs-12", "pointer-events-none", "absolute"), n.querySelector(".bls__product-img").appendChild(y);
            const e = n.querySelector(".bls__product-label");
            if (r)
                if (e.querySelector(".bls__sale-label")) "price" == window.productLabel.saleType ? e.querySelector(".bls__sale-label").innerText = "- " + Shopify.formatMoney(u - m, cartStrings.money_format) : "text" == window.productLabel.saleType ? e.querySelector(".bls__sale-label").innerText = window.productLabel.saleLabel : e.querySelector(".bls__sale-label").innerText = -i.toFixed(0) + "%";
                else {
                    var v = document.createElement("div");
                    v.classList.add("bls__sale-label"), "price" == window.productLabel.saleType ? v.innerText = "- " + Shopify.formatMoney(u - m, cartStrings.money_format) : "text" == window.productLabel.saleType ? v.innerText = window.productLabel.saleLabel : v.innerText = -i.toFixed(0) + "%", e && e.appendChild(v)
                } if (l)
                if (e.querySelector(".bls__sold-out-label")) e.querySelector(".bls__sold-out-label").innerText = window.variantStrings?.soldOut;
                else {
                    var f = document.createElement("div");
                    f.classList.add("bls__sold-out-label"), f.innerText = window.variantStrings?.soldOut, e && e.appendChild(f)
                } if (c) {
                var b = document.createElement("div");
                b.classList.add("bls__pre-order-label"), b.innerText = window.variantStrings?.preOrder, e && e.appendChild(b)
            }
        }
        const g = n.querySelector(".bls__product-addtocart-js");
        if (g) {
            const t = g.dataset.productVariantId;
            Number(t) !== e.id && (g.dataset.productVariantId = e.id)
        }
        this.toggleAddButton(!e.available, window.variantStrings?.soldOut, n, c)
    },
    toggleAddButton(e = !0, t, n, o = !1) {
        if (!n) return;
        const s = n.querySelector(".bls__js-addtocart"),
            i = n.querySelector(".bls__js-addtocart .bls__button-content"),
            r = n.querySelector(".bls__js-addtocart .bls_tooltip-content");
        s && (e ? (s.setAttribute("disabled", "disabled"), t && (i.textContent = t, r && (r.textContent = t))) : (s.removeAttribute("disabled"), o ? (i.textContent = window.variantStrings?.preOrder, r && (r.textContent = window.variantStrings?.preOrder)) : (i.textContent = window.variantStrings?.addToCart, r && (r.textContent = window.variantStrings?.addToCart))))
    },
    setUnavailable(e) {
        const t = e.querySelector(".bls__js-addtocart"),
            n = e.querySelector(".bls__js-addtocart .bls__button-content"),
            o = e.querySelector(".bls__js-addtocart .bls_tooltip-content");
        t && (n.textContent = window.variantStrings?.unavailable, o.textContent = window.variantStrings?.unavailable)
    },
    swapProduct: function(e) {
        const t = e.querySelector(".bls__option-swatch-js.active"),
            n = t.getAttribute("data-position"),
            o = JSON.parse(e.querySelector(".productinfo").textContent),
            s = JSON.parse(e.querySelector(".productVariantsQty").textContent);
        let i = Array.from(e.querySelectorAll(".bls__option-swatch-js.active"), (e => e.getAttribute("data-value")));
        o.find((e => {
            1 == i.length && {
                1: e.option1,
                2: e.option2,
                3: e.option3
            } [n] === i[0] && (i = e.options)
        }));
        const r = this.updateMasterId(i, o);
        this.toggleAddButton(!0, "", e), r ? (this.updatePrice(r, e), this.updateMedia(r, e), this.renderProductInfo(r, s, e, t.dataset.color)) : (this.toggleAddButton(!0, "", e), this.setUnavailable(e))
    },
    checkSwatches: function(e) {
        const {
            color: t,
            image: n
        } = e?.dataset;
        this.checkColor(t) ? e.style.backgroundColor = t : n && (e.classList.add = "bls__" + t.replace(" ", "-"), e.style.backgroundColor = null, e.style.backgroundImage = "url('" + n + "')", e.style.backgroundSize = "cover", e.style.backgroundRepeat = "no-repeat")
    },
    checkColor: function(e) {
        var t = (new Option).style;
        return t.color = e, t.color == e
    }
};
BlsColorSwatchesShopify.init();
var BlsCountdownTimer = {
    init: function() {
        this.handleCountdown(), this.eventCountDownTimer()
    },
    eventCountDownTimer: function() {
        const e = document.querySelectorAll(".bls__countdown-timer");
        0 !== e.length && e.forEach((e => {
            const t = e.getAttribute("data-days"),
                n = e.getAttribute("data-hrs"),
                o = e.getAttribute("data-secs"),
                s = e.getAttribute("data-mins"),
                i = e.getAttribute("data-time");
            var r = new Date(i).getTime(),
                l = setInterval((function() {
                    var i = (new Date).getTime(),
                        c = r - i,
                        a = Math.floor(c / 864e5),
                        d = Math.floor(c % 864e5 / 36e5),
                        u = Math.floor(c % 36e5 / 6e4),
                        m = Math.floor(c % 6e4 / 1e3),
                        p = '<span class="countdown-days"><span class="countdown_ti heading-weight">' + a + '</span> <span class="countdown_tx">' + t + '</span></span> <span class="countdown-hours"><span class="countdown_ti heading-weight">' + d + '</span> <span class="countdown_tx">' + n + '</span></span> <span class="countdown-min"><span class="countdown_ti heading-weight">' + u + '</span> <span class="countdown_tx">' + s + '</span></span> <span class="countdown-sec"><span class="countdown_ti heading-weight">' + m + '</span> <span class="countdown_tx">' + o + "</span></span>";
                    const h = e.querySelector(".bls__product-countdown");
                    h && (h.innerHTML = p), c < 0 && clearInterval(l)
                }), 1e3)
        }))
    },
    handleCountdown: function() {
        var e = 1e3,
            t = 6e4,
            n = 36e5,
            o = 24 * n;
        document.querySelectorAll(".bls__timer").forEach((s => {
            const {
                timer: i
            } = s?.dataset, r = i.split("-"), l = r[2] + "-" + r[0].padStart(2, "0") + "-" + r[1].padStart(2, "0") + "T00:00:00Z";
            if (Date.parse(l)) {
                var c = new Date(l).getTime();
                c && setInterval((function() {
                    var i = (new Date).getTime(),
                        r = c - i;
                    c >= i && (s.querySelector(".js-timer-days").innerText = Math.floor(r / o) < 10 ? ("0" + Math.floor(r / o)).slice(-2) : Math.floor(r / o), s.querySelector(".js-timer-hours").innerText = ("0" + Math.floor(r % o / n)).slice(-2), s.querySelector(".js-timer-minutes").innerText = ("0" + Math.floor(r % n / t)).slice(-2), s.querySelector(".js-timer-seconds").innerText = ("0" + Math.floor(r % t / e)).slice(-2))
                }), e)
            }
        }))
    }
};
BlsCountdownTimer.init();
var BlsWishlistHeader = {
        init: function() {
            this.handleCount()
        },
        handleCount: function() {
            const e = document.querySelectorAll(".bls-header-wishlist"),
                t = JSON.parse(localStorage.getItem("bls__wishlist-items"));
            e.forEach((e => {
                const n = e.querySelector(".wishlist-count");
                n && (n.innerText = null !== t && 0 != t.length ? t.length : 0)
            }))
        }
    },
    BlsWishlistLoad = {
        init: function(e, t) {
            const n = document.querySelector(".bls__wishlist-page-section");
            if (e) {
                const o = [];
                if (null === t) o.push(e), localStorage.setItem("bls__wishlist-items", JSON.stringify(o));
                else {
                    let s = t.indexOf(e);
                    if (o.push(...t), -1 === s) o.push(e), localStorage.setItem("bls__wishlist-items", JSON.stringify(o));
                    else if (s > -1 && (o.splice(s, 1), localStorage.setItem("bls__wishlist-items", JSON.stringify(o)), n)) {
                        const o = n.querySelector(".bls__wishlist-no-product-js"),
                            s = document.querySelector('.bls__wishlist-list[data-product-handle="' + e + '"]');
                        s && s.remove();
                        const i = n.querySelectorAll(".bls__product-item");
                        (t.length <= 1 || i.length < 1) && o.classList.remove("d-none")
                    }
                }
                BlsSubActionProduct.handleInitWishlist()
            }
        }
    },
    BlsCompareLoad = {
        init: function(e, t) {
            const n = document.querySelector(".bls__compare-page-section");
            if (e) {
                const o = e.dataset.productHandle,
                    s = [];
                if (null === t) s.push(o), localStorage.setItem("bls__compare-items", JSON.stringify(s));
                else {
                    let e = t.indexOf(o);
                    if (s.push(...t), -1 === e) s.push(o), localStorage.setItem("bls__compare-items", JSON.stringify(s));
                    else if (e > -1 && (s.splice(e, 1), localStorage.setItem("bls__compare-items", JSON.stringify(s)), n)) {
                        const e = n.querySelector(".bls__compare-no-product-js"),
                            s = document.querySelectorAll('.bls__compare-value[data-product-handle="' + o + '"]');
                        0 !== s.length && s.forEach((e => {
                            e.remove()
                        }));
                        const i = n.querySelectorAll(".bls__product-item");
                        if (t.length <= 1 || i.length < 1) {
                            e.classList.remove("d-none");
                            const t = document.querySelector(".bls__compare-table");
                            t && t.classList.add("d-none")
                        }
                    }
                }
                BlsSubActionProduct.handleInitCompare()
            }
        }
    },
    BlsSubActionProduct = {
        init: function() {
            this.handleInitQuickviewAction(), this.handleActionWishlist(), this.handleInitWishlist(), this.handleActionCompare(), this.handleInitCompare()
        },
        handleInitQuickviewAction: function() {
            const e = this,
                t = document.querySelectorAll(".bls__product-quickview");
            t.length > 0 && t.forEach((t => {
                t.addEventListener("click", (() => {
                    if (t.classList.add("btn-loading"), 0 === t.querySelectorAll("span.loader-icon").length && 0 === t.querySelectorAll("div.loader-icon").length) {
                        const e = document.createElement("div");
                        e.classList.add("loader-icon"), t.appendChild(e)
                    }
                    const n = t.closest(".bls__product-item");
                    e.handleFetchDataQuickView(t, n.dataset.productHandle)
                }))
            }))
        },
        handleFetchDataQuickView: function(e, t) {
            const n = this;
            t && fetch(`${window.Shopify.routes.root}products/${t}/?section_id=product-quickview`).then((e => e.text())).then((e => {
                parser.parseFromString(e, "text/html").querySelectorAll("#shopify-section-product-quickview").forEach((e => {
                    var t = EasyDialogBox.create("qvdialog", "dlg dlg-disable-heading dlg-multi dlg-disable-footer dlg-disable-drag", "", e.innerHTML);
                    t.onClose = t.destroy, t.show(), BlsColorSwatchesShopify.init(), BlsReloadSpr.init(), Shopify.eventFlashSold("dlg"), Shopify.eventCountDownTimer("dlg"), Shopify.swiperSlideQickview(), BlsLazyloadImg.init(), Shopify.PaymentButton.init()
                }))
            })).catch((e => {
                console.error(e)
            })).finally((() => {
                n.handleActionWishlist(), n.handleInitWishlist(), n.handleActionCompare(), n.handleInitCompare(), n.showPopupStockNotify(), Shopify.termsConditionsAction(), e.classList.remove("btn-loading"), e.querySelectorAll(".loader-icon").forEach((e => {
                    e.remove()
                }))
            }))
        },
        handleInitWishlist: function() {
            const e = JSON.parse(localStorage.getItem("bls__wishlist-items"));
            document.querySelectorAll(".bls__product-wishlist").forEach((t => {
                const {
                    proAddWishlist: n,
                    proRemoveWishlist: o,
                    removeWishlist: s,
                    action: i
                } = t?.dataset, r = document.querySelector(".bls__wishlist-page-section"), l = t.querySelector(".bls_tooltip-content"), c = t.dataset.productHandle;
                null !== e && (-1 !== e.indexOf(c) ? (t.querySelector(".bls__product-icon").classList.add("active"), l.innerText = r ? window.stringsTemplate?.messageRemoveWishlist : "remove" === i ? s : o) : (t.querySelector(".bls__product-icon").classList.remove("active"), l.innerText = n)), BlsWishlistHeader.init()
            }))
        },
        handleActionWishlist: function() {
            const e = document.querySelectorAll(".bls__product-wishlist-js");
            e.length > 0 && e.forEach((e => {
                e.addEventListener("click", this.handleWishlistFunctionClick)
            }))
        },
        handleWishlistFunctionClick: function(e) {
            e.preventDefault();
            const t = e.currentTarget,
                n = JSON.parse(localStorage.getItem("bls__wishlist-items")),
                o = t.dataset.productHandle,
                s = t.dataset.action,
                i = document.querySelector(".bls__wishlist-page-section");
            document.querySelector(".bls-minicart-wrapper"), i && BlsWishlistLoad.init(o, n);
            const r = [];
            if (null === n) r.push(o), localStorage.setItem("bls__wishlist-items", JSON.stringify(r)), BlsSubActionProduct.handleInitWishlist();
            else {
                let e = n.indexOf(o);
                r.push(...n), -1 === e ? (r.push(o), localStorage.setItem("bls__wishlist-items", JSON.stringify(r)), BlsSubActionProduct.handleInitWishlist()) : e > -1 && (i ? (r.splice(e, 1), localStorage.setItem("bls__wishlist-items", JSON.stringify(r))) : "remove" === s ? BlsWishlistLoad.init(o, n) : window.location.href = `${window.shopUrl}${window.Shopify.routes.root}pages/wishlist`)
            }
        },
        handleCompareFunctionClick: function(e) {
            const t = e.currentTarget,
                n = JSON.parse(localStorage.getItem("bls__compare-items")),
                o = t.dataset.productHandle,
                s = [];
            if (null === n) s.push(o), localStorage.setItem("bls__compare-items", JSON.stringify(s)), BlsSubActionProduct.handleInitCompare();
            else {
                let e = n.indexOf(o);
                s.push(...n), -1 === e ? (s.push(o), localStorage.setItem("bls__compare-items", JSON.stringify(s)), BlsSubActionProduct.handleInitCompare()) : e > -1 && (window.location.href = `${window.shopUrl}${window.Shopify.routes.root}pages/compare`)
            }
        },
        handleInitCompare: function() {
            const e = JSON.parse(localStorage.getItem("bls__compare-items")),
                t = document.querySelectorAll(".bls__product-compare"),
                n = document.querySelector(".bls__compare-page-section");
            t.forEach((t => {
                const {
                    proAddCompare: o,
                    proRemoveCompare: s
                } = t?.dataset, i = t.querySelector(".bls_tooltip-content"), r = t.dataset.productHandle;
                null !== e && (-1 !== e.indexOf(r) ? (t.querySelector(".bls__product-icon").classList.add("active"), i.innerText = n ? window.stringsTemplate?.messageRemoveCompare : s) : (t.querySelector(".bls__product-icon").classList.remove("active"), i.innerText = o))
            }))
        },
        handleActionCompare: function() {
            const e = document.querySelectorAll(".bls__product-compare-js");
            e.length > 0 && e.forEach((e => {
                e.addEventListener("click", this.handleCompareFunctionClick)
            }))
        },
        showPopupStockNotify: function() {
            const e = document.querySelectorAll(".product-notify-stock"),
                t = this;
            e.forEach((e => {
                e.addEventListener("click", (e => {
                    const n = e.currentTarget.getAttribute("data-product-variant");
                    e.preventDefault(), t.fetchDataStockNotifySection(n)
                }))
            }))
        },
        fetchDataStockNotifySection: function(e) {
            fetch("/variants/" + e + "/?section_id=stock-notify").then((e => e.text())).then((e => {
                const t = newParser.parseFromString(e, "text/html").querySelector("#bls-stock-notify"),
                    n = t.getAttribute("data-stock-title");
                if (t) {
                    var o = EasyDialogBox.create("stockNotify", "dlg dlg-multi dlg-disable-footer dlg-disable-drag", n, t.innerHTML);
                    o.center(), o.onClose = o.destroy, o.show()
                }
            })).catch((e => {
                throw e
            }))
        }
    };
BlsSubActionProduct.init();
var BlsSubActionProductPreLoad = {
        handleActionPg: function() {
            const e = document.querySelectorAll(".bls__compare-remove-js");
            e.length > 0 && e.forEach((e => {
                e.addEventListener("click", (function() {
                    const t = JSON.parse(localStorage.getItem("bls__compare-items")),
                        n = e.closest(".bls__product-item");
                    n && BlsCompareLoad.init(n, t)
                }))
            }))
        }
    },
    BlsReloadSpr = {
        init: function() {
            window.SPR && (window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges())
        }
    },
    BlsMainMenuShopify = {
        init: function() {
            this.initMainMenu(), this.initVerticalMenu()
        },
        initMainMenu: function() {
            var e = this;
            const t = document.querySelector(global.header),
                n = t?.getAttribute("data-sticky"),
                o = t?.getAttribute("data-sticky-mobile"),
                s = document.querySelector(".verticalmenu-list"),
                i = document.querySelector(".bls_main_menu");
            if (document.querySelectorAll(".nav-toggle").forEach((e => {
                    e.addEventListener("click", (e => {
                        document.documentElement.classList.contains("nav-open") ? (document.documentElement.classList.remove("nav-open"), i || document.documentElement.classList.remove("nav-verticalmenu")) : (document.documentElement.classList.add("nav-open"), i || document.documentElement.classList.add("nav-verticalmenu"))
                    }))
                })), document.querySelectorAll(".close-menu").forEach((e => {
                    e.addEventListener("click", (e => {
                        e.preventDefault(), document.documentElement.classList.remove("nav-open"), document.querySelectorAll(".submenu,.subchildmenu").forEach((e => {
                            e.classList.remove("is--open"), e.classList.contains("is--open-lv2") && e.classList.remove("is--open-lv2"), e.classList.contains("is--open-lv3") && e.classList.remove("is--open-lv3")
                        }))
                    }), !1)
                })), s && i) {
                const e = document.querySelector(".verticalmenu-html").dataset.limitshowitem,
                    t = '<a data-menu="verticalmenu-list" href="#">' + window.menuStrings?.verticalTitle + "</a>",
                    n = document.querySelector(".verticalmenu-list").innerHTML,
                    o = document.createElement("ul");
                o.classList.add("verticalmenu-list"), o.classList.add("verticalmenu-mobile"), o.style.display = "none", o.setAttribute("data-limitshowitem", e), o.innerHTML = n, document.querySelector(".bls_main_menu .mobile-menu-content").appendChild(o), document.querySelector(".bls_main_menu .menu-mobile-title").insertAdjacentHTML("beforeend", t)
            }
            document.querySelectorAll(".bls_main_menu .menu-mobile-title a").forEach((e => {
                e.addEventListener("click", (e => {
                    e.preventDefault();
                    const t = e.currentTarget,
                        n = t.getAttribute("data-menu");
                    for (var o of document.querySelectorAll(".bls_main_menu .menu-mobile-title a")) o.classList.remove("active");
                    for (var s of (t.classList.add("active"), document.querySelectorAll(".bls_main_menu .mobile-menu-content > ul"))) s.style.display = "none";
                    document.querySelector(".bls_main_menu ." + n).style.display = "block"
                }), !1)
            }));
            let r = screen.width;
            document.querySelectorAll("li.bls__menu-parent .submenu").forEach(((e, t) => {
                r > 1024 && (e.addEventListener("mouseenter", (e => {
                    e.currentTarget.closest(".bls__menu-parent").classList.add("bls-item-active-submenu")
                })), e.addEventListener("mouseleave", (e => {
                    e.currentTarget.closest(".bls__menu-parent").classList.remove("bls-item-active-submenu")
                })))
            })), document.querySelectorAll(".bls-menu-item.type_banner").forEach(((e, t) => {
                e.classList.contains("space-banner") && e.closest(".submenu").classList.add("submenu-space-banner")
            }));
            let l = window.innerWidth;

            function c(e) {
                e <= 1024 && (document.querySelector(".show-localization") ? document.querySelector(".lang-curentcy") && document.querySelector(".lang-curentcy")?.remove() : document.querySelectorAll(".disclosure-mobile").forEach((e => {
                    e && e.remove()
                })))
            }

            function a(e) {
                const t = document.querySelector(".categories-list-menu-mobile"),
                    n = document.querySelector('[data-menu="categories-list"]'),
                    o = document.querySelector('[data-menu="verticalmenu-list"]'),
                    s = document.querySelector(".verticalmenu-mobile"),
                    i = document.querySelector(".horizontal-list");
                if (document.querySelectorAll("li.advanced-content > .sub").length)
                    if (e <= 1024)
                        for (var r of document.querySelectorAll("li.advanced-content > .sub")) r.classList.remove("active");
                    else
                        for (var r of document.querySelectorAll("li.advanced-content > .sub")) {
                            r.classList.add("active");
                            break
                        }
                e <= 1024 ? (document.querySelector(".show-localization") ? document.querySelector(".lang-curentcy") && document.querySelector(".lang-curentcy")?.remove() : document.querySelectorAll(".disclosure-mobile").forEach((e => {
                    e && e.remove()
                })), document.querySelector(".verticalmenu-mobile") && (document.querySelector(".categories-list-menu-mobile")?.remove(), document.querySelector('[data-menu="categories-list"]')?.remove()), (i && n?.classList.contains("active") || o?.classList.contains("active")) && (i.style.display = "none"), t && n.classList.contains("active") && (t.style.display = "block"), s && o.classList.contains("active") && (s.style.display = "block")) : (t && n.classList.contains("active") && (t.style.display = "none"), s && o.classList.contains("active") && (s.style.display = "none"), (i && n?.classList.contains("active") || o?.classList.contains("active")) && (i.style.display = "block"))
            }
            window.addEventListener("resize", (function() {
                l = window.innerWidth, a(l)
            })), window.addEventListener("load", (function() {
                l = screen.width, c(l)
            })), a(l), c(l), document.querySelectorAll("li.advanced-main a").forEach((e => {
                e.addEventListener("mouseenter", (e => {
                    const t = e.currentTarget,
                        n = t.getAttribute("data-link");
                    if (n) {
                        for (var o of document.querySelectorAll("li.advanced-content > .sub")) o.classList.remove("active");
                        for (var s of document.querySelectorAll("li.advanced-main a")) s.classList.remove("active");
                        t.classList.add("active"), document.getElementById(n) && document.getElementById(n).classList.add("active")
                    }
                }), !1)
            }));
            let d = 0;
            document.getElementById("announcement-bar") && (d = document.getElementById("announcement-bar")?.clientHeight);
            let u = 0;
            document.getElementById("bls__sticky-addcart") && (u = document.getElementById("bls__sticky-addcart")?.clientHeight);
            let m = 0;
            document.getElementById("top-bar") && (m = document.getElementById("top-bar").clientHeight);
            let p = document.getElementById("page-header")?.clientHeight;
            if (document.querySelector("body").setAttribute("style", "--height-bar: " + d + "px;--height-header: " + p + "px;--height-top-bar: " + m + "px;--height-sticky: " + u + "px "), "true" == n) {
                if ("false" == o && window.innerWidth < 1025) return;
                let e = document.getElementById("sticky-header").offsetHeight,
                    n = document.createElement("div"),
                    s = d + m + e;
                n.style.height = e + "px", n.classList.add("headerSpace", "unvisible"), document.querySelector("#sticky-header").after(n), window.addEventListener("scroll", (() => {
                    window.pageYOffset <= t.querySelector(".header-middle").offsetTop ? t.classList.contains("transparent") && t.classList.add("transparent") : t.classList.contains("transparent") && t.classList.remove("transparent")
                })), window.addEventListener("scroll", (() => {
                    window.pageYOffset > s ? (t.classList.add("header_scroll_down"), t.classList.add("header_scroll_up"), t.querySelector(".headerSpace").classList.remove("unvisible"), document.querySelector(".extent-button-right-bar") && document.querySelector(".extent-button-right-bar").classList.add("d-xxl-block")) : (t.classList.remove("header_scroll_down"), t.querySelector(".headerSpace").classList.add("unvisible"), document.querySelector(".extent-button-right-bar") && document.querySelector(".extent-button-right-bar").classList.remove("d-xxl-block"), document.querySelector(".bls__overlay") && (document.documentElement.classList.remove("vetical-overlay"), document.querySelector(".bls__overlay").classList.add("d-none-overlay")), document.querySelector(".vertical-menu") && document.querySelector(".vertical-menu").classList.contains("open") && document.querySelector(".vertical-menu").classList.remove("open"))
                }))
            }
            i && (e.loadImageMenu(), window.innerWidth > 1024 && e.addCssSubMenu(), window.addEventListener("resize", (function(t) {
                window.innerWidth > 1024 ? e.addCssSubMenu() : document.querySelectorAll(".horizontal-list .menu-width-custom").forEach((e => {
                    e.style.left = 0
                }))
            }), !1))
        },
        initVerticalMenu: function() {
            document.querySelectorAll(".close-menu").forEach((e => {
                e.addEventListener("click", (e => {
                    e.preventDefault(), document.documentElement.classList.remove("nav-open"), document.querySelectorAll(".submenu,.subchildmenu").forEach((e => {
                        e.classList.remove("is--open"), e.classList.contains("is--open-lv2") && e.classList.remove("is--open-lv2"), e.classList.contains("is--open-lv3") && e.classList.remove("is--open-lv3")
                    }))
                }), !1)
            }));
            let e = screen.width;
            const t = document.querySelector(".verticalmenu-html");
            if (null === t) return;
            const n = t.dataset.limitshowitem,
                o = document.querySelectorAll(".verticalmenu-html .level0").length;
            if (e > 1024)
                if (o > n) {
                    var s = Array.from(document.querySelectorAll(".verticalmenu-html .level0"));
                    s.forEach(((e, t) => {
                        if (t > n - 1) {
                            const e = s[t];
                            if (e.classList.contains("expand-menu-link")) return;
                            e.classList.add("orther-link"), e.style.display = "none"
                        }
                    })), document.querySelector(".verticalmenu-html .expand-menu-link").style.display = "block", document.querySelector(".verticalmenu-html .expand-menu-link a").addEventListener("click", (e => {
                        e.preventDefault();
                        const t = e.currentTarget.parentElement;
                        if (t.classList.contains("expanding"))
                            for (var n of (t.classList.remove("expanding"), t.querySelector("a").innerHTML = window.menuStrings?.moreMenus, document.querySelectorAll(".verticalmenu-html .level0.orther-link"))) hideAnime(n);
                        else
                            for (var n of (t.classList.add("expanding"), t.querySelector("a").innerHTML = window.menuStrings?.hideMenus, document.querySelectorAll(".verticalmenu-html .level0.orther-link"))) showAnime(n)
                    }), !1)
                } else document.querySelector(".expand-menu-link").style.display = "none";
            document.querySelector(".bls_vertical_menu .title-menu-dropdown") && document.querySelector(".bls_vertical_menu .title-menu-dropdown").addEventListener("click", (e => {
                e.preventDefault();
                const t = e.currentTarget.closest(".vertical-menu");
                t.classList.contains("open") ? (t.classList.remove("open"), document.querySelector(".bls__overlay") && (document.documentElement.classList.remove("vetical-overlay"), document.querySelector(".bls__overlay").classList.add("d-none-overlay"))) : (t.classList.add("open"), document.querySelector(".bls__overlay") && (document.documentElement.classList.add("vetical-overlay"), document.querySelector(".bls__overlay").classList.remove("d-none-overlay")))
            }))
        },
        onMenuItemEnter: function(e, t) {
            e.classList.add("bls-item-active")
        },
        onMenuItemLeave: function(e, t) {
            e.classList.remove("bls-item-active")
        },
        onMenuMobileItem: function(e) {
            var t = "li.bls__menu-parent > .open-children-toggle",
                n = "li.bls__menu-parent .submenu .open-children-toggle";
            e && (t = ".verticalmenu-list li.bls__menu-parent > .open-children-toggle", n = ".verticalmenu-list li.bls__menu-parent .submenu .open-children-toggle"), document.querySelectorAll(t).forEach((e => {
                e.addEventListener("click", (e => {
                    e.preventDefault();
                    const t = e.currentTarget.parentElement,
                        n = t.querySelector(".submenu");
                    slideAnime({
                        target: n,
                        animeType: "slideToggle"
                    }), t.querySelector("a").classList.contains("active") ? t.querySelector("a").classList.remove("active") : t.querySelector("a").classList.add("active")
                }), !1)
            })), document.querySelectorAll(n).forEach((e => {
                e.addEventListener("click", (e => {
                    const t = e.currentTarget.parentElement,
                        n = t.querySelector(".subchildmenu");
                    slideAnime({
                        target: n,
                        animeType: "slideToggle"
                    }), t.querySelector("a").classList.contains("active") ? t.querySelector("a").classList.remove("active") : t.querySelector("a").classList.add("active")
                }))
            }))
        },
        addCssSubMenu: function() {
            const e = document.documentElement.clientWidth || document.body.clientWidth,
                t = document.querySelector("header"),
                n = document.querySelector(".bls_submenu-center");
            if (t && !(window.innerWidth < 1024)) {
                var o = 30;
                e < 1200 && (o = 15), document.querySelectorAll(".horizontal-list .menu-width-custom").forEach((t => {
                    if (n) {
                        var s = t.getBoundingClientRect(),
                            i = s.width,
                            r = s.left,
                            l = s.right;
                        if (800 <= i) {
                            var c = (r - (l - e)) / 2;
                            t.style.left = c + "px"
                        }
                    } else {
                        const n = t.clientWidth,
                            s = t.offsetLeft;
                        e - (n + s) < 0 && (r = (r = e - (n + s)) + s - o, s < 0 && (r = 0), t.style.left = r + "px")
                    }
                }))
            }
        },
        loadImageMenu: function() {
            const e = document.querySelectorAll(".bls__menu-parent");
            window.innerWidth, e.forEach((e => {
                e.addEventListener("mouseover", (e => {
                    e.currentTarget.querySelectorAll(".menu-banner-loaded").forEach((e => {
                        var t = e?.dataset.imageBanner,
                            n = e?.dataset.width,
                            o = e?.dataset.height;
                        null == e.querySelector(".image-banner-loaded") && null != t && (e.innerHTML = `<img \n              src=${t} \n              alt="Menu banner" \n              srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n              sizes="100vw",\n              class="image-banner-loaded"\n              loading="lazy"\n              width="${n}"\n              height="${o}"\n            >`)
                    }))
                }))
            }))
        },
        loadMoreMenu: function() {
            let e = document.querySelector(".horizontal-list")?.firstChild,
                t = e?.querySelector(".submenu"),
                n = t?.querySelector(".extent-loadmore-button");
            if (null == document.querySelector(".loadmore-menu")) {
                let e = '<div class="loadmore-menu text-center">\n          <a  class="demo whitespace-nowrap btn-primary" role="link" aria-label="View All Demos">\n            View All Demos\n          </a>\n        </div>';
                n?.insertAdjacentHTML("beforeend", e), n?.init()
            }
        }
    };
BlsMainMenuShopify.init();
var BlsMenuActionMobile = {
    init: function() {
        this.menuTabActions()
    },
    menuTabActions: function() {
        var e = ".subchildmenu";
        window.innerWidth <= 1024 && document.querySelectorAll("li.bls__menu-parent > a").forEach((e => {
            const t = e.closest(".main-nav")?.getAttribute("data-action-mobile");
            "false" === t && (e.removeAttribute("href"), e.classList.add("not-links"), e.setAttribute("role", "link"))
        })), document.querySelectorAll("li.bls__menu-parent > .open-children-toggle").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget.parentElement;
                var n = t.querySelectorAll(".submenu [data-menu-level2]");
                if (n) {
                    var o = n[n.length - 1];
                    o && o.classList.add("last-child")
                }
                t.querySelector(".submenu") && (t.querySelector(".submenu").classList.contains("is--open") ? t.querySelector(".submenu").classList.remove("is--open") : t.querySelector(".submenu").classList.add("is--open"))
            }))
        })), document.querySelectorAll(".back-main-menu").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget;
                e.preventDefault(), t.closest(".submenu").classList.remove("is--open")
            }))
        })), document.querySelectorAll("[data-menu-level2]").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget.parentElement;
                t.querySelector(".subchildmenu")?.classList.contains("is--open") ? t.querySelector(".subchildmenu").classList.remove("is--open") : t.querySelector(".subchildmenu").classList.add("is--open")
            }))
        })), document.querySelectorAll(".back-main-menu-lv1").forEach((t => {
            t.addEventListener("click", (t => {
                for (var n of (t.preventDefault(), document.querySelectorAll(e))) n.classList.remove("is--open")
            }))
        })), document.querySelectorAll(".back-main-menu-lv2").forEach((t => {
            t.addEventListener("click", (t => {
                t.preventDefault(), t.currentTarget.closest(e).classList.remove("is--open-lv2")
            }))
        })), document.querySelectorAll(".back-main-menu-lv3").forEach((t => {
            t.addEventListener("click", (t => {
                t.preventDefault(), t.currentTarget.closest(e).classList.remove("is--open-lv3")
            }))
        })), document.querySelectorAll(".submenu .dropdown li.level-1 > .open-children-toggle").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget.parentElement;
                t.querySelector("li .subchildmenu")?.classList.contains("is--open-lv2") ? t.querySelector("li .subchildmenu").classList.remove("is--open-lv2") : t.querySelector("li .subchildmenu").classList.add("is--open-lv2")
            }))
        })), document.querySelectorAll(".submenu .dropdown li.level-2 > .open-children-toggle").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget.parentElement;
                t.querySelector("li .subchildmenu")?.classList.contains("is--open-lv3") ? t.querySelector("li .subchildmenu").classList.remove("is--open-lv3") : t.querySelector("li .subchildmenu").classList.add("is--open-lv3")
            }))
        }))
    }
};
BlsMenuActionMobile.init();
var BlsSearchShopify = {
    init: function() {
        document.querySelector("#predictive-search") && this.setupEventListeners();
        const e = document.querySelector("#search-form");
        document.querySelectorAll(".top-search-toggle").forEach((t => {
            t.addEventListener("click", (() => {
                e.classList.contains("bls__opend-popup-header") ? (e.classList.remove("bls__opend-popup-header"), document.documentElement.classList.remove("hside_opened"), document.documentElement.classList.remove("open-search")) : (e.classList.add("bls__opend-popup-header"), document.documentElement.classList.add("hside_opened"), document.documentElement.classList.add("open-search"), setTimeout((function() {
                    e.querySelector('input[type="search"]').focus()
                }), 100))
            }))
        })), document.querySelectorAll(".mini_search_header .button-close").forEach((t => {
            t.addEventListener("click", (() => {
                e.classList.remove("bls__opend-popup-header"), document.documentElement.classList.remove("hside_opened"), document.documentElement.classList.remove("open-search")
            }))
        }));
        const t = document.querySelector(".search-full");
        if (t) {
            const e = t.closest(".header_search");
            document.addEventListener("click", (t => {
                const n = t.target.closest(".header_search");
                if (n) {
                    const e = n.querySelector(".popup-search");
                    t.target.closest(".button-close") || (e.classList.add("popup-search-show"), document.querySelector(".top-search") && (document.querySelector(".bls__overlay").classList.remove("d-none-overlay"), document.querySelector(".bls__overlay").classList.add("popup-top-search"))), (t.target && t.target.classList.contains("popup-search-show") || t.target.closest(".button-close")) && (e.classList.remove("popup-search-show"), document.querySelector(".top-search") && (document.querySelector(".bls__overlay").classList.add("d-none-overlay"), document.querySelector(".bls__overlay").classList.remove("popup-top-search")))
                } else e && (e.querySelector(".popup-search").classList.remove("popup-search-show"), document.querySelector(".top-search") && (document.querySelector(".bls__overlay").classList.add("d-none-overlay"), document.querySelector(".bls__overlay").classList.remove("popup-top-search")))
            })), document.querySelector(".bls__overlay").addEventListener("click", (() => {
                document.querySelector(".bls__overlay").classList.contains("popup-top-search") && document.querySelector(".bls__overlay").classList.remove("popup-top-search")
            }))
        }
    },
    setupEventListeners: function() {
        const e = document.querySelector('input[type="search"]');
        document.querySelector("form.search").addEventListener("submit", this.onFormSubmit.bind(this)), e.addEventListener("input", this.debounce((e => {
            this.onChange(e)
        }), 300).bind(this)), e.addEventListener("focus", this.onFocus.bind(this)), document.addEventListener("focusout", this.onFocusOut.bind(this)), document.addEventListener("keyup", this.onKeyup.bind(this)), document.querySelectorAll('.select_cat [data-name="product_type"] li').forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget;
                if (!t.classList.contains("active")) {
                    for (var n of document.querySelectorAll('.select_cat [data-name="product_type"] li')) n.classList.remove("active");
                    t.classList.add("active"), document.querySelector("#search_mini_form").querySelector('[name="category"]').value = t.getAttribute("data-value"), this.onChange()
                }
            }))
        }))
    },
    debounce: function(e, t) {
        let n;
        return (...o) => {
            clearTimeout(n), n = setTimeout((() => e.apply(this, o)), t)
        }
    },
    getQuery: function() {
        return document.querySelector('input[type="search"]').value.trim()
    },
    onChange: function() {
        const e = this.getQuery();
        e.length ? this.getSearchResults(e) : this.close(!0)
    },
    onFormSubmit: function(e) {
        this.getQuery().length && !this.querySelector('[aria-selected="true"] a') || e.preventDefault()
    },
    onFocus: function() {
        const e = this.getQuery();
        e.length && (document.querySelector("#predictive-search").classList.contains("results") ? this.open() : this.getSearchResults(e))
    },
    onFocusOut: function() {
        setTimeout((() => {
            document.contains(document.activeElement) || this.close()
        }))
    },
    onKeyup: function(e) {
        switch (this.getQuery().length || this.close(!0), e.preventDefault(), e.code) {
            case "ArrowUp":
                this.switchOption("up");
                break;
            case "ArrowDown":
                this.switchOption("down");
                break;
            case "Enter":
                this.selectOption()
        }
    },
    switchOption: function(e) {
        if (!this.getAttribute("open")) return;
        const t = "up" === e,
            n = document.querySelector('[aria-selected="true"]'),
            o = document.querySelectorAll("li");
        let s = document.querySelector("li");
        t && !n || (this.statusElement.textContent = "", !t && n ? s = n.nextElementSibling || o[0] : t && (s = n.previousElementSibling || o[o.length - 1]), s !== n && (s.setAttribute("aria-selected", !0), n && n.setAttribute("aria-selected", !1), document.querySelector('input[type="search"]').setAttribute("aria-activedescendant", s.id)))
    },
    selectOption: function() {
        const e = document.querySelector('[aria-selected="true"] a, [aria-selected="true"] button');
        e && e.click()
    },
    getSearchResults: function(e) {
        const t = {},
            n = e.replace(" ", "-").toLowerCase();
        if (this.setLiveRegionLoadingState(), t[n]) this.renderSearchResults(t[n]);
        else {
            if (document.querySelector(".search_type_popup")) var o = "search-predictive-grid";
            else o = "search-predictive-list";
            if (document.querySelector(".predictive_search_suggest")) var s = `${routes?.predictive_search_url}?q=${encodeURIComponent(e)}&resources[type]=product,page,article,query,collection&section_id=${o}`;
            else s = `${routes.search_url}?q=${encodeURIComponent(e)}&resources[type]=product,page,article,query,collection&section_id=${o}`;
            fetch(`${s}`).then((e => {
                if (!e.ok) {
                    var t = new Error(e.status);
                    throw this.close(), t
                }
                return e.text()
            })).then((e => {
                const s = (new DOMParser).parseFromString(e, "text/html").querySelector("#shopify-section-" + o).innerHTML;
                t[n] = s, this.renderSearchResults(s), BlsColorSwatchesShopify.init(), BlsLazyloadImg.init()
            })).catch((e => {
                throw this.close(), e
            }))
        }
    },
    setLiveRegionLoadingState: function() {
        document.querySelector("#search_mini_form").classList.add("loading"), document.querySelector("#predictive-search").classList.add("loading")
    },
    setLiveRegionResults: function() {
        document.querySelector("#search_mini_form").classList.remove("loading"), document.querySelector("#predictive-search").classList.remove("loading")
    },
    renderSearchResults: function(e) {
        document.querySelector("[data-predictive-search]").innerHTML = e, document.querySelector("#predictive-search").classList.add("results");
        const t = document.querySelector("#quick-search");
        t && t.classList.add("d-none"), this.setLiveRegionResults(), this.open()
    },
    open: function() {
        document.querySelector('input[type="search"]').setAttribute("aria-expanded", !0), this.isOpen = !0
    },
    close: function(e = !1) {
        if (e) {
            document.querySelector('input[type="search"]').value = "", document.querySelector("#predictive-search").classList.remove("results");
            const e = document.querySelector("#quick-search");
            e && e.classList.remove("d-none")
        }
        const t = document.querySelector('[aria-selected="true"]');
        t && t.setAttribute("aria-selected", !1), document.querySelector('input[type="search"]').setAttribute("aria-activedescendant", ""), document.querySelector('input[type="search"]').setAttribute("aria-expanded", !1), this.resultsMaxHeight = !1, document.querySelector("[data-predictive-search]").removeAttribute("style"), this.isOpen = !1
    }
};
BlsSearchShopify.init();

class SkeletonPage extends HTMLElement {
    constructor() {
        super();
        fetch(`${window.Shopify.routes.root}?section_id=skeleton-page`).then((e => e.text())).then((e => {
            const t = newParser.parseFromString(e, "text/html").querySelector("#bls__skeleton");
            t && (this.innerHTML = t.innerHTML)
        })).catch((e => {
            throw e
        }))
    }
}
customElements.define("skeleton-page", SkeletonPage);
class VideoYoutube extends HTMLElement {
    constructor() {
        super();
        const e = this.closest(".bls__video-thumb");
        e && e.querySelector(".bls__thmbnail-video").classList.add("d-none")
    }
}
customElements.define("video-youtube", VideoYoutube);
class HeaderTotalPrice extends HTMLElement {
    constructor() {
        super()
    }
    updateTotal(e) {
        if (this.minicart_total = this.querySelector("[data-cart-subtotal-price]"), !this.minicart_total) return;
        if (null == e.total_price) return;
        const t = Shopify.formatMoney(e.total_price, cartStrings?.money_format);
        this.minicart_total.innerHTML = t
    }
}
customElements.define("header-total-price", HeaderTotalPrice);
class ProgressBar extends HTMLElement {
    constructor() {
        super();
        const e = this.dataset.order;
        this.init(e)
    }
    init(e) {
        const t = this.dataset.feUnavaiable,
            n = this.dataset.feAvaiable,
            o = Number(Shopify.currency.rate),
            s = Number(this.dataset.feAmount);
        if (!s || !o) return;
        const i = Number(e) / 100,
            r = s * o;
        null != i && (i / r * 100 > 100 ? this.setProgressBar(100) : this.setProgressBar(i / r * 100), this.setProgressBarTitle(i, r, t, n))
    }
    setProgressBarTitle(e, t, n, o) {
        const s = this.querySelector(".free-shipping-message");
        if (s)
            if (s.classList.remove("opacity-0"), e >= t) s.innerHTML = o;
            else {
                const o = "{{ amount }}";
                s.innerHTML = n.replace(o.trim(), Shopify.formatMoney(100 * (t - e), cartStrings.money_format))
            }
    }
    setProgressBar(e) {
        this.querySelector(".progress").style.width = e + "%", 100 === e ? this.classList.add("cart_shipping_free") : this.classList.remove("cart_shipping_free")
    }
}
customElements.define("free-ship-progress-bar", ProgressBar);
class SlideImageShopable extends HTMLElement {
    constructor() {
        super(), this.init()
    }
    init() {
        this.BlsCarousel()
    }
    BlsCarousel() {
        var e = this.querySelector(".bls__swiper-shopable"),
            t = "true" === e.dataset.autoplay,
            n = "true" === e.dataset.loop,
            o = e.dataset.arrowCenterimage ? e.dataset.arrowCenterimage : 0,
            s = e.dataset.desktop ? e.dataset.desktop : 1,
            i = e.dataset.tablet ? e.dataset.tablet : 1,
            r = e.dataset.mobile ? e.dataset.mobile : 1,
            l = e.dataset.spacing ? e.dataset.spacing : 0;
        l = Number(l), new Swiper(e, {
            slidesPerView: r,
            spaceBetween: l >= 15 ? 15 : l,
            autoplay: t,
            loop: n,
            watchSlidesProgress: !0,
            watchSlidesVisibility: !0,
            navigation: {
                nextEl: e.querySelector(".swiper-button-next-item"),
                prevEl: e.querySelector(".swiper-button-prev-item")
            },
            pagination: {
                clickable: !0,
                el: e.querySelector(".swiper-pagination-item"),
                type: "progressbar"
            },
            breakpoints: {
                768: {
                    slidesPerView: i,
                    spaceBetween: l >= 30 ? 30 : l
                },
                1200: {
                    slidesPerView: s,
                    spaceBetween: l
                }
            },
            on: {
                init: function() {
                    if (o) {
                        var t = e.querySelectorAll(".bls__responsive-image");
                        if (0 != t.length) {
                            var n = [];
                            t.forEach((e => {
                                n.push(e.offsetHeight / 2)
                            }));
                            var s = "--arrows-offset-top: " + Math.max(...n) + "px";
                            e.querySelectorAll(".swiper-arrow") && e.querySelectorAll(".swiper-arrow").forEach((e => {
                                e.setAttribute("style", s)
                            }))
                        }
                    }
                }
            }
        })
    }
}
customElements.define("slide-image-shopable", SlideImageShopable), document.addEventListener("shopify:section:load", (function(e) {
    var t = e.detail.sectionId,
        n = e.target.querySelector('[data-id="' + t + '"]');
    if (n) {
        var o = n.querySelector(".bls__swiper"),
            s = n.querySelector(".bls__testimonial"),
            i = n.querySelector(".bls__counter");
        o && BlsSettingsSwiper.BlsCarousel(o), s && BlsSettingsSwiperTestimonial.init(), i && BlsCounterEvent.init()
    }
    t && BlsLazyloadImg.init()
}));