/* MiraSoft - branding & link overrides (runs after reseller-branding.js) */
(function () {
  'use strict';

  var BRAND_OLD = /Vibex\s*Academy/gi;
  var BRAND_NEW = "MiraSoft";
  var LINKS = {
    renew: "https://ext.getyourservicebd.store",
    support: "https://wa.me/8801682328830",
    facebook: "https://www.facebook.com/mehanahmed.me"
  };
  var LOGO_URL = typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL ? chrome.runtime.getURL("assets/logo-master-lovable-square.png") : "assets/logo-master-lovable-square.png";
  function openUrl(url) {
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (_) {
      location.href = url;
    }
  }
  function setAnchor(el, url) {
    if (!el) {
      return;
    }
    try {
      if (el.tagName === "A") {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
      el.dataset.gysPatched = "1";
      el.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openUrl(url);
      }, true);
    } catch (_) {}
  }
  function replaceTextNodes(root) {
    try {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var n;
      while (n = w.nextNode()) {
        if (n.nodeValue) {
          if (/Developed by Vibex Academy/i.test(n.nodeValue) || /Developed by MiraSoft/i.test(n.nodeValue)) {
            n.nodeValue = n.nodeValue.replace(/Developed by (Vibex Academy|MiraSoft)/gi, "Developed by Mehan Ahmed");
          }
          if (BRAND_OLD.test(n.nodeValue)) {
            n.nodeValue = n.nodeValue.replace(BRAND_OLD, BRAND_NEW);
          }
        }
      }
    } catch (_) {}
  }
  function patchLogos(root) {
    try {
      (root || document).querySelectorAll("img").forEach(function (img) {
        if (img.dataset.gysLogoPatched === "1") {
          return;
        }
        var src = img.getAttribute("src") || "";
        var cls = img.className && img.className.baseVal || img.className || "";
        cls = String(cls);
        var matchesClass = /(^|\s)(sp-brand-logo|ql-brand-logo|ql-title-logo|vibex-logo|ql-logo|sp-logo|vibex-brand-logo)(\s|$)/.test(cls);
        var matchesSrc = /logo-master-lovable|logo-master|vibex/i.test(src);
        if (matchesClass || matchesSrc) {
          if (img.src !== LOGO_URL) {
            img.src = LOGO_URL;
          }
          img.dataset.gysLogoPatched = "1";
        }
      });
      // Background-image logos
      (root || document).querySelectorAll("[class*=\"logo\"],[class*=\"brand\"]").forEach(function (el) {
        if (el.dataset.gysBgPatched === "1") {
          return;
        }
        var bg = getComputedStyle(el).backgroundImage || "";
        if (/logo-master|vibex/i.test(bg)) {
          el.style.backgroundImage = "url(\"" + LOGO_URL + "\")";
          el.style.backgroundSize = "contain";
          el.style.backgroundRepeat = "no-repeat";
          el.style.backgroundPosition = "center";
          el.dataset.gysBgPatched = "1";
        }
      });
    } catch (_) {}
  }
  function patchButtonGrids(root) {
    try {
      var doc = root || document;
      // Floating Panel
      var qlBtns = doc.querySelectorAll(".ql-watermark-btn, .ql-shield-btn, .ql-native-chat-btn");
      if (qlBtns.length >= 2) {
        var first = qlBtns[0];
        var parent = first.parentElement;
        if (parent && !parent.classList.contains("ql-button-grid")) {
          var grid = parent.querySelector(".ql-button-grid");
          if (!grid) {
            grid = document.createElement("div");
            grid.className = "ql-button-grid";
            parent.insertBefore(grid, first);
          }
          qlBtns.forEach(function (btn) {
            grid.appendChild(btn);
          });
        }
      }

      // Side Panel
      var spBtns = doc.querySelectorAll(".sp-watermark-btn, .sp-shield-btn, .sp-native-chat-btn, .sp-download-source-btn");
      if (spBtns.length >= 2) {
        var firstSp = spBtns[0];
        var parentSp = firstSp.parentElement;
        if (parentSp && !parentSp.classList.contains("sp-button-grid")) {
          var gridSp = parentSp.querySelector(".sp-button-grid");
          if (!gridSp) {
            gridSp = document.createElement("div");
            gridSp.className = "sp-button-grid";
            parentSp.insertBefore(gridSp, firstSp);
          }
          spBtns.forEach(function (btn) {
            gridSp.appendChild(btn);
          });
        }
      }
    } catch (_) {}
  }
  function patchBugIcon(root) {
    try {
      var doc = root || document;
      var BUG_SVG_HTML = "<svg width=\"14\" height=\"14\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M4.385.578a.5.5 0 0 0-.678.368L3.5 2.002a5 5 0 0 0-1.008.55L1.48 1.775a.5.5 0 1 0-.643.765l1.033.869a5 5 0 0 0-.427 1.157L.422 4.417a.5.5 0 0 0-.329.638t.638.33l1.015-.224a5 5 0 0 0 .092 1.258L.78 6.945a.5.5 0 0 0-.256.666l.004.007a.5.5 0 0 0 .662.254l1.056-.475a5 5 0 0 0 .638 1.144L1.78 9.61a.5.5 0 0 0-.256.666l.004.007a.5.5 0 0 0 .662.254l1.056-.475c.344.473.764.88 1.238 1.206L3.385 12.4a.5.5 0 0 0-.678.368l-.207 1.056a.5.5 0 0 0 .368.678l.056.007a.5.5 0 0 0 .478-.375l.186-.949A5.006 5.006 0 0 0 8 13c1.693 0 3.208-.838 4.14-2.128l.186.949a.5.5 0 0 0 .478.375l.056-.007a.5.5 0 0 0 .368-.678l-.207-1.056a.5.5 0 0 0-.678-.368l-1.097-1.126c.474-.326.894-.733 1.238-1.206l1.056.475a.5.5 0 0 0 .662-.254l.004-.007a.5.5 0 0 0-.256-.666l-1.058-.476a5 5 0 0 0 .092-1.258l1.015.224a.5.5 0 0 0 .638-.33.5.5 0 0 0-.329-.638l-1.022-.152a5 5 0 0 0-.427-1.157l1.033-.869a.5.5 0 1 0-.643-.765L13.51 2.552a5 5 0 0 0-1.008-.55L12.293.946a.5.5 0 0 0-.678-.368L11.41 1.634A5.006 5.006 0 0 0 8 1C6.273 1 4.724 1.87 3.992 3.197L4.385.578zM6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/></svg>";
      doc.querySelectorAll(".ql-chip svg, .sp-chip svg").forEach(function (svg) {
        var html = svg.innerHTML || "";
        if (html.indexOf("M.102 2.223") >= 0 || html.indexOf("M.102") >= 0) {
          svg.outerHTML = BUG_SVG_HTML;
        }
      });
    } catch (_) {}
  }
  function patch() {
    try {
      var isOnProject = window.location.pathname.indexOf("/projects/") >= 0;
      if (isOnProject) {
        document.documentElement.classList.add("ql-on-project");
      } else {
        document.documentElement.classList.remove("ql-on-project");
      }
    } catch (_) {}
    replaceTextNodes(document.body || document.documentElement);
    patchButtonGrids(document);
    patchBugIcon(document);
    try {
      if (/Vibex/i.test(document.title)) {
        document.title = document.title.replace(BRAND_OLD, BRAND_NEW);
      }
    } catch (_) {}
    document.querySelectorAll(".vibex-renew-btn, .vibex-renew-row a, .vibex-renew-row button, [data-action=\"renew\"], [data-i18n*=\"renew\" i]").forEach(function (el) {
      if (el.dataset.gysPatched) {
        return;
      }
      setAnchor(el, LINKS.renew);
    });
    document.querySelectorAll(".vibex-header-support, .sp-support-link, .ql-support-link, [data-action=\"support\"]").forEach(function (el) {
      if (el.dataset.gysPatched) {
        return;
      }
      setAnchor(el, LINKS.support);
    });
    document.querySelectorAll(".vibex-social-fb, .sp-social-fb, a[href*=\"facebook.com\"]").forEach(function (el) {
      if (el.dataset.gysPatched) {
        return;
      }
      setAnchor(el, LINKS.facebook);
    });
    document.querySelectorAll(".vibex-social-wa, .sp-social-wa, a[href*=\"whatsapp.com\"], a[href*=\"wa.me\"]").forEach(function (el) {
      if (el.dataset.gysPatched) {
        return;
      }
      setAnchor(el, LINKS.support);
    });
    document.querySelectorAll(".vibex-social-tg, .sp-social-tg, a[href*=\"t.me\"], a[href*=\"telegram\"]").forEach(function (el) {
      try {
        el.remove();
      } catch (_) {
        el.style.display = "none";
      }
    });

    // Hide "Upgrade to Pro" when license is activated
    try {
      if (document.documentElement.classList.contains("ql-license-activated")) {
        document.querySelectorAll("span, div, p, h1, h2, h3, h4, h5, h6, button, a").forEach(function (el) {
          if (el.textContent && el.textContent.trim() === "Upgrade to Pro") {
            var card = el.closest('a, button, [role="button"], .border, [class*="card"], [class*="banner"]');
            if (!card) {
              var temp = el;
              for (var i = 0; i < 3; i++) {
                if (temp.parentElement && temp.parentElement.tagName !== "BODY" && temp.parentElement.tagName !== "HTML") {
                  temp = temp.parentElement;
                }
              }
              card = temp;
            }
            if (card) {
              card.style.setProperty("display", "none", "important");
            }
          }
        });
      }
    } catch (_) {}

    patchLogos(document);
    if (typeof updateSyncStatus === "function") {
      try {
        updateSyncStatus();
      } catch (_) {}
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patch);
  } else {
    patch();
  }
  try {
    var mo = new MutationObserver(function () {
      patch();
    });
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["src", "style", "class"]
    });
  } catch (_) {}
  setInterval(patch, 1500);
})();