(function () {
  "use strict";
  var _0x182c89 = "vibex_reseller_branding";
  if (window.__vibexResellerBrandingLoaded) {
    return;
  }
  window.__vibexResellerBrandingLoaded = true;
  var _0x30f668 = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
  var _0x203b84 = null;
  try {
    var _0x25bc00 = window.fetch;
    if (typeof _0x25bc00 === "function" && !_0x25bc00.__vibexBrandingWrapped) {
      var _0x481503 = _0x25bc00.bind(window);
      function _0x3cc79a() {
        var _0x323404 = arguments;
        return _0x481503.apply(window, _0x323404).then(function (_0x359da8) {
          try {
            var _0x154400 = _0x323404[0];
            var _0x522197 = typeof _0x154400 === "string" ? _0x154400 : _0x154400 && _0x154400.url ? _0x154400.url : "";
            if (_0x522197 && _0x522197.indexOf("validate-license") !== -1) {
              _0x359da8.clone().json().then(function (_0xf83bac) {
                if (!_0xf83bac || typeof _0xf83bac !== "object") {
                  return;
                }
                if (_0xf83bac.branding && typeof _0xf83bac.branding === "object") {
                  _0x12f7e8(_0xf83bac.branding);
                } else if (_0xf83bac.valid && _0xf83bac.branding === null) {
                  _0x4df72d();
                }
              }).catch(function () {});
            }
          } catch (_0x4bd86a) {}
          return _0x359da8;
        });
      }
      _0x3cc79a.__vibexBrandingWrapped = true;
      window.fetch = _0x3cc79a;
    }
  } catch (_0x3f614b) {}
  function _0x12f7e8(_0x9dce31) {
    _0x203b84 = _0x9dce31;
    _0x1849cb(_0x9dce31);
    if (_0x30f668) {
      try {
        var _0x36c654 = {
          [_0x182c89]: _0x9dce31
        };
        chrome.storage.local.set(_0x36c654);
      } catch (_0x49e929) {}
    }
  }
  function _0x4df72d() {
    _0x203b84 = null;
    if (_0x30f668) {
      try {
        chrome.storage.local.remove(_0x182c89);
      } catch (_0x52e255) {}
    }
  }
  if (_0x30f668) {
    try {
      chrome.storage.local.get(_0x182c89, function (_0x548880) {
        var _0x46f93e = _0x548880 && _0x548880[_0x182c89];
        if (_0x46f93e && typeof _0x46f93e === "object") {
          _0x203b84 = _0x46f93e;
          _0x1849cb(_0x46f93e);
        }
      });
    } catch (_0x4ab13c) {}
    try {
      chrome.storage.onChanged.addListener(function (_0x4b4b24, _0x2f024c) {
        if (_0x2f024c !== "local" || !_0x4b4b24[_0x182c89]) {
          return;
        }
        var _0x17e934 = _0x4b4b24[_0x182c89].newValue;
        _0x203b84 = _0x17e934 && typeof _0x17e934 === "object" ? _0x17e934 : null;
        if (_0x203b84) {
          _0x1849cb(_0x203b84);
        }
      });
    } catch (_0x9ce134) {}
  }
  function _0xdcdff5(_0x4edbde, _0x4e48dd) {
    if (!_0x4e48dd) {
      return;
    }
    document.querySelectorAll(_0x4edbde).forEach(function (_0x21a16e) {
      if (_0x21a16e.textContent !== _0x4e48dd) {
        _0x21a16e.textContent = _0x4e48dd;
      }
    });
  }
  function _0xa904e7(_0x34dc56, _0x41c382) {
    if (!_0x41c382) {
      return;
    }
    document.querySelectorAll(_0x34dc56).forEach(function (_0x343580) {
      if (_0x343580.getAttribute("src") !== _0x41c382) {
        _0x343580.setAttribute("src", _0x41c382);
      }
    });
  }
  function _0x376fed(_0x9b3700, _0x5758b2) {
    if (!_0x5758b2) {
      return;
    }
    document.querySelectorAll(_0x9b3700).forEach(function (_0x4d8770) {
      if (_0x4d8770.getAttribute("href") !== _0x5758b2) {
        _0x4d8770.setAttribute("href", _0x5758b2);
      }
      _0x4d8770.style.display = "";
    });
  }
  function _0x5b3dfe(_0x2824f6) {
    if (_0x2824f6.whatsapp_group_url) {
      return _0x2824f6.whatsapp_group_url;
    }
    if (_0x2824f6.whatsapp_number) {
      return "https://wa.me/" + String(_0x2824f6.whatsapp_number).replace(/[^\d]/g, "");
    }
    return "";
  }
  function _0x1849cb(_0x476346) {
    if (!_0x476346 || typeof _0x476346 !== "object") {
      return;
    }
    try {
      var _0x56af24 = _0x476346.brand_name || "";
      var _0x5b18f8 = _0x476346.logo_url || "";
      _0xdcdff5(".sp-brand-text", _0x56af24);
      _0xa904e7(".sp-brand-logo", _0x5b18f8);
      if (_0x56af24) {
        document.querySelectorAll(".sp-footer-badge").forEach(function (_0x15a6b6) {
          var _0xe874a7 = _0x15a6b6.textContent || "";
          var _0x3db13e = _0xe874a7.indexOf("•");
          var _0x1d7e1e = _0x3db13e !== -1 ? _0xe874a7.slice(_0x3db13e) : "";
          var _0x16dfec = _0x1d7e1e ? _0x56af24 + " " + _0x1d7e1e : _0x56af24;
          if (_0x15a6b6.textContent !== _0x16dfec) {
            _0x15a6b6.textContent = _0x16dfec;
          }
        });
      }
      _0xdcdff5(".ql-brand", _0x56af24);
      _0xa904e7(".ql-brand-logo", _0x5b18f8);
      _0xa904e7(".ql-title-logo", _0x5b18f8);
      _0x376fed(".sp-social-wa, .vibex-social-wa", _0x5b3dfe(_0x476346));
      _0x376fed(".sp-social-tg, .vibex-social-tg", _0x476346.telegram_url);
      _0x376fed(".sp-social-fb, .vibex-social-fb", _0x476346.facebook_url);
      if (_0x476346.support_email) {
        document.querySelectorAll(".ql-support-link, .vibex-header-support").forEach(function (_0xe1feeb) {
          if (_0xe1feeb.tagName === "A") {
            _0xe1feeb.setAttribute("href", "mailto:" + _0x476346.support_email);
          }
        });
      }
      if (_0x56af24 && document.title && /vibex academy/i.test(document.title)) {
        document.title = document.title.replace(/vibex academy/gi, _0x56af24);
      }
    } catch (_0x197409) {}
  }
  function _0x16d8e5() {
    if (_0x203b84) {
      _0x1849cb(_0x203b84);
    }
  }
  try {
    var _0x1a8b93 = new MutationObserver(function () {
      _0x16d8e5();
    });
    function _0x4eb2a7() {
      if (document.body) {
        _0x1a8b93.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", _0x4eb2a7, {
        once: true
      });
    } else {
      _0x4eb2a7();
    }
  } catch (_0x58cdda) {}
  if (!window.__vibexBrandingTick) {
    window.__vibexBrandingTick = setInterval(_0x16d8e5, 1000);
  }
})();