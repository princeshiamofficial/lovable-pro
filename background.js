const LOVABLE_ORIGIN = "https://lovable.dev";
const LOVABLE_API = "https://api.lovable.dev";
async function getAllCookiesFor(_0x556ab0) {
  try {
    if (!chrome.cookies || !chrome.cookies.getAll) {
      return [];
    }
    return await chrome.cookies.getAll({
      url: _0x556ab0
    });
  } catch (_0x2e585e) {
    return [];
  }
}
async function getLovableCookieHeader() {
  const _0x2df80f = ["https://lovable.dev/", "https://www.lovable.dev/", "https://api.lovable.dev/"];
  const _0x3f8c5a = new Map();
  for (const _0x1df14b of _0x2df80f) {
    const _0x200e7c = await getAllCookiesFor(_0x1df14b);
    for (const _0xf821c6 of _0x200e7c || []) {
      if (_0xf821c6 && _0xf821c6.name && typeof _0xf821c6.value === "string") {
        _0x3f8c5a.set(_0xf821c6.name, _0xf821c6.value);
      }
    }
  }
  return Array.from(_0x3f8c5a.entries()).map(([_0x40a7f4, _0x19276c]) => _0x40a7f4 + "=" + _0x19276c).join("; ");
}
async function readLovableTokens() {
  const _0x13b116 = ["https://lovable.dev/", "https://api.lovable.dev/"];
  const _0x14cf19 = [];
  const _0x1edb8f = new Set();
  for (const _0x26c7a3 of _0x13b116) {
    const _0x368de6 = await getAllCookiesFor(_0x26c7a3);
    for (const _0x29a238 of _0x368de6 || []) {
      const _0x52e217 = _0x29a238 && typeof _0x29a238.value === "string" ? _0x29a238.value : "";
      if (!_0x52e217) {
        continue;
      }
      const _0x4180f2 = _0x52e217.split(".").length === 3 && _0x52e217.length > 50;
      const _0x3f23b3 = /token|auth|jwt|session|access/i.test(_0x29a238.name || "");
      if ((_0x4180f2 || _0x3f23b3) && !_0x1edb8f.has(_0x29a238.name + "=" + _0x52e217)) {
        _0x1edb8f.add(_0x29a238.name + "=" + _0x52e217);
        _0x14cf19.push({
          token: _0x52e217,
          cookieName: _0x29a238.name,
          httpOnly: !!_0x29a238.httpOnly
        });
      }
    }
  }
  return _0x14cf19;
}
async function proxyFetchMessage(_0x19acec) {
  const _0x3c9ce7 = _0x19acec.method || "POST";
  const _0xc525fa = Object.assign({}, _0x19acec.headers || {});
  let _0x219f75 = _0x19acec.body == null ? undefined : _0x19acec.body;
  const _0x2af4b0 = await fetch(_0x19acec.url, {
    method: _0x3c9ce7,
    headers: _0xc525fa,
    body: _0x219f75,
    credentials: "include"
  });
  const _0x5a1958 = await _0x2af4b0.text();
  let _0x116ff8 = _0x5a1958;
  try {
    _0x116ff8 = _0x5a1958 ? JSON.parse(_0x5a1958) : null;
  } catch (_0x41d73b) {}
  return {
    ok: _0x2af4b0.ok,
    status: _0x2af4b0.status,
    data: _0x116ff8
  };
}
function extractFiles(_0x2bf4ba) {
  if (!_0x2bf4ba) {
    return [];
  }
  if (Array.isArray(_0x2bf4ba)) {
    return _0x2bf4ba;
  }
  const _0x53c2db = _0x2bf4ba.files || _0x2bf4ba.data || _0x2bf4ba.items || _0x2bf4ba.tree || _0x2bf4ba.source_code || _0x2bf4ba.sourceCode || _0x2bf4ba.source;
  if (Array.isArray(_0x53c2db)) {
    return _0x53c2db;
  }
  const _0x397c34 = _0x53c2db && typeof _0x53c2db === "object" ? _0x53c2db : _0x2bf4ba;
  if (_0x397c34 && typeof _0x397c34 === "object") {
    const _0x2b9982 = Object.keys(_0x397c34);
    const _0x50c105 = _0x2b9982.length > 0 && _0x2b9982.every(_0x30d7ed => _0x30d7ed.indexOf("/") > -1 || _0x30d7ed.indexOf(".") > -1);
    if (_0x50c105) {
      return _0x2b9982.map(_0x59dd76 => {
        const _0x3b7f01 = _0x397c34[_0x59dd76];
        if (_0x3b7f01 && typeof _0x3b7f01 === "object") {
          return Object.assign({
            name: _0x59dd76
          }, _0x3b7f01);
        }
        return {
          name: _0x59dd76,
          contents: typeof _0x3b7f01 === "string" ? _0x3b7f01 : JSON.stringify(_0x3b7f01)
        };
      });
    }
  }
  return [];
}
async function downloadProject(_0x1a93c1) {
  const _0x1b4a4a = _0x1a93c1.projectId;
  const _0x391760 = String(_0x1a93c1.token || "").replace(/^Bearer\s+/i, "").trim();
  if (!_0x1b4a4a || !_0x391760) {
    return {
      success: false,
      error: "Missing project or token."
    };
  }
  const _0x27a04e = encodeURIComponent(_0x1b4a4a);
  const _0x55c1ca = [LOVABLE_API + "/projects/" + _0x27a04e + "/source-code", LOVABLE_API + "/projects/" + _0x27a04e + "/source_code", LOVABLE_API + "/projects/" + _0x27a04e + "/files", LOVABLE_API + "/projects/" + _0x27a04e + "/source", LOVABLE_ORIGIN + "/api/projects/" + _0x27a04e + "/source-code"];
  let _0x7914e6 = "";
  let _0x3441bc = "";
  for (const _0x227fa2 of _0x55c1ca) {
    try {
      const _0x483c44 = await fetch(_0x227fa2, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + _0x391760,
          Accept: "application/json"
        },
        credentials: "include"
      });
      const _0x5ad9c1 = (_0x483c44.headers.get("content-type") || "").toLowerCase();
      if (_0x483c44.ok && (_0x5ad9c1.includes("zip") || _0x5ad9c1.includes("octet-stream"))) {
        const _0xbcef06 = await _0x483c44.arrayBuffer();
        let _0x24c45d = "";
        const _0x51f180 = new Uint8Array(_0xbcef06);
        for (let _0x5ed795 = 0; _0x5ed795 < _0x51f180.length; _0x5ed795++) {
          _0x24c45d += String.fromCharCode(_0x51f180[_0x5ed795]);
        }
        return {
          success: true,
          zipBase64: btoa(_0x24c45d)
        };
      }
      const _0x5e774b = await _0x483c44.text();
      let _0x1ce2ab = null;
      try {
        _0x1ce2ab = _0x5e774b ? JSON.parse(_0x5e774b) : null;
      } catch (_0x12df12) {
        _0x1ce2ab = _0x5e774b;
      }
      if (!_0x483c44.ok) {
        const _0x2395ef = _0x1ce2ab && (_0x1ce2ab.message || _0x1ce2ab.error) ? _0x1ce2ab.message || _0x1ce2ab.error : "HTTP " + _0x483c44.status;
        _0x7914e6 = "HTTP " + _0x483c44.status + ": " + _0x2395ef;
        continue;
      }
      const _0x1bb9b1 = extractFiles(_0x1ce2ab);
      if (Array.isArray(_0x1bb9b1) && _0x1bb9b1.length > 0) {
        return {
          success: true,
          files: _0x1bb9b1
        };
      }
      _0x3441bc = _0x1ce2ab && typeof _0x1ce2ab === "object" ? "keys=" + Object.keys(_0x1ce2ab).slice(0, 8).join(",") : String(_0x5e774b).slice(0, 120);
      _0x7914e6 = "No files in response (" + _0x3441bc + ")";
    } catch (_0x4a6cde) {
      _0x7914e6 = _0x4a6cde && _0x4a6cde.message ? _0x4a6cde.message : String(_0x4a6cde);
    }
  }
  return {
    success: false,
    error: _0x7914e6 || "Download failed."
  };
}
chrome.runtime.onInstalled.addListener(() => {
  try {
    if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
      chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: true
      }).catch(() => {});
    }
  } catch (_0x4c8f19) {}
});
try {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true
    }).catch(() => {});
  }
} catch (a0_0x2cde05) {}
chrome.runtime.onMessage.addListener((_0x22eed6, _0x50b0d4, _0x403fa3) => {
  (async () => {
    try {
      if (!_0x22eed6 || !_0x22eed6.action) {
        return {
          ok: false,
          error: "Missing action."
        };
      }
      if (_0x22eed6.action === "openSidePanel") {
        try {
          const _0x2ca6f9 = _0x50b0d4 && _0x50b0d4.tab && _0x50b0d4.tab.id;
          if (chrome.sidePanel && chrome.sidePanel.open && _0x2ca6f9) {
            await chrome.sidePanel.open({
              tabId: _0x2ca6f9
            });
          }
        } catch (_0x561e6c) {}
        return {
          ok: true,
          success: true
        };
      }
      if (_0x22eed6.action === "getLovableCookies") {
        return {
          ok: true,
          cookie: await getLovableCookieHeader()
        };
      }
      if (_0x22eed6.action === "readCookies") {
        return {
          success: true,
          tokens: await readLovableTokens()
        };
      }
      if (_0x22eed6.action === "proxyFetch") {
        return await proxyFetchMessage(_0x22eed6);
      }
      if (_0x22eed6.action === "downloadProject") {
        return await downloadProject(_0x22eed6);
      }
      return {
        ok: false,
        error: "Unknown action."
      };
    } catch (_0x40d2ce) {
      return {
        ok: false,
        success: false,
        error: _0x40d2ce && _0x40d2ce.message ? _0x40d2ce.message : String(_0x40d2ce)
      };
    }
  })().then(_0x403fa3);
  return true;
});