console.log("[ContentScript] Vibex Academy started");
const _SB_URL = "https://tvttbagljqbkcobruwnl.supabase.co";
const _SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dHRiYWdsanFia2NvYnJ1d25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODM1OTksImV4cCI6MjA5NjI1OTU5OX0.7NgHbsoI3cAQ0fLo5gz4V4sm8iKK-MIitrbEWzmfO2s";
const VALIDATE_URL = _SB_URL + "/functions/v1/validate-license";
const OPTIMIZE_URL = _SB_URL + "/functions/v1/optimize-prompt";
const NOTIFICATIONS_URL = _SB_URL + "/rest/v1/notifications?select=*&order=created_at.desc&limit=20";
const PROXY_COMMAND_URL = _SB_URL + "/functions/v1/proxy-command";
const REMOVE_WATERMARK_URL = _SB_URL + "/functions/v1/remove-watermark";
const SUPABASE_ANON_KEY = _SB_ANON;
const TRANSCRIBE_URL = _SB_URL + "/functions/v1/transcribe-audio";
const UPLOAD_FILE_URL = _SB_URL + "/functions/v1/upload-file";
function activateBypass() {
  try {
    localStorage.setItem("__ql_bypass_active", "1");
  } catch (_0x332ea6) {}
  try {
    document.documentElement.classList.add("ql-license-activated");
  } catch (e) {}
  window.postMessage({
    type: "qlBypassState",
    active: true
  }, "*");
}
function deactivateBypass() {
  try {
    localStorage.removeItem("__ql_bypass_active");
  } catch (_0x183657) {}
  try {
    document.documentElement.classList.remove("ql-license-activated");
  } catch (e) {}
  window.postMessage({
    type: "qlBypassState",
    active: false
  }, "*");
}
function buildSessionHeaders(_0x5fd15a) {
  return new Promise(function (_0xaed48e) {
    var _0xdffda6 = navigator.userAgent || "";
    var _0x5c3de3 = navigator.userAgentData && navigator.userAgentData.brands ? navigator.userAgentData.brands : [];
    var _0x112823 = "";
    for (var _0x7594c1 = 0; _0x7594c1 < _0x5c3de3.length; _0x7594c1++) {
      if (_0x7594c1 > 0) {
        _0x112823 += ", ";
      }
      _0x112823 += "\"" + _0x5c3de3[_0x7594c1].brand + "\";v=\"" + _0x5c3de3[_0x7594c1].version + "\"";
    }
    var _0x1a931b = navigator.userAgentData && navigator.userAgentData.platform ? navigator.userAgentData.platform : "Windows";
    var _0x2c789e = navigator.userAgentData && navigator.userAgentData.mobile ? "?1" : "?0";
    var _0x21569e = navigator.languages && navigator.languages.length ? navigator.languages.slice(0, 3).join(",") : navigator.language || "en-US";
    var _0x33dae3 = {
      "user-agent": _0xdffda6,
      "sec-ch-ua": _0x112823,
      "sec-ch-ua-mobile": _0x2c789e,
      "sec-ch-ua-platform": "\"" + _0x1a931b + "\"",
      "accept-language": _0x21569e,
      "accept-encoding": "gzip, deflate, br, zstd",
      origin: "https://lovable.dev",
      referer: "https://lovable.dev/projects/" + (_0x5fd15a || ""),
      priority: "u=1, i",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    };
    try {
      chrome.runtime.sendMessage({
        action: "getLovableCookies"
      }, function (_0x2823fb) {
        if (_0x2823fb && _0x2823fb.cookie) {
          _0x33dae3.cookie = _0x2823fb.cookie;
        }
        _0xaed48e(_0x33dae3);
      });
    } catch (_0x12268d) {
      _0xaed48e(_0x33dae3);
    }
  });
}
function escapeHtml(_0x4bc166) {
  if (!_0x4bc166) {
    return "";
  }
  const _0x1574b4 = document.createElement("div");
  _0x1574b4.textContent = String(_0x4bc166);
  return _0x1574b4.innerHTML;
}
function sanitizeUrl(_0x2d1d2e) {
  if (!_0x2d1d2e) {
    return "";
  }
  try {
    const _0x12d266 = new URL(_0x2d1d2e);
    if (_0x12d266.protocol === "http:" || _0x12d266.protocol === "https:") {
      return _0x2d1d2e;
    }
    return "";
  } catch (_0x363f6f) {
    return "";
  }
}
function decodeJwtPayload(_0x3804b0) {
  try {
    const _0x8b777c = String(_0x3804b0 || "").replace(/^Bearer\s+/i, "").trim();
    const _0x40c880 = _0x8b777c.split(".");
    if (_0x40c880.length < 2) {
      return null;
    }
    const _0x2c928e = _0x40c880[1].replace(/-/g, "+").replace(/_/g, "/");
    const _0xe8c852 = _0x2c928e + "=".repeat((4 - _0x2c928e.length % 4) % 4);
    return JSON.parse(atob(_0xe8c852));
  } catch (_0x494ed8) {
    return null;
  }
}
function bgFetch(_0xc536c1, _0x3997d4 = {}) {
  return new Promise((_0x554045, _0x33f6a9) => {
    chrome.runtime.sendMessage({
      action: "proxyFetch",
      url: _0xc536c1,
      method: _0x3997d4.method || "POST",
      headers: _0x3997d4.headers || {},
      body: _0x3997d4.body || null
    }, _0x136a86 => {
      if (chrome.runtime.lastError) {
        console.error("[bgFetch] runtime error:", chrome.runtime.lastError.message);
        return _0x33f6a9(new Error(chrome.runtime.lastError.message));
      }
      if (!_0x136a86) {
        return _0x33f6a9(new Error("No response from background"));
      }
      if (_0x136a86.data && typeof _0x136a86.data === "object") {
        if (!_0x136a86.ok) {
          const _0xaec913 = _0x136a86.data.error || _0x136a86.data.message || _0x136a86.data.detail || JSON.stringify(_0x136a86.data);
          console.error("[bgFetch] HTTP " + _0x136a86.status + " →", _0x136a86.data);
          return _0x33f6a9(new Error("HTTP " + _0x136a86.status + ": " + _0xaec913));
        }
        _0x554045(_0x136a86.data);
      } else if (!_0x136a86.ok) {
        _0x33f6a9(new Error("Fetch failed via background (status " + _0x136a86.status + ")"));
      } else {
        _0x554045(_0x136a86.data);
      }
    });
  });
}
let qlSessionId = null;
let qlHeartbeatInterval = null;
let qlUserName = null;
let qlExpiresAt = null;
let qlActivatedAt = null;
let qlLicenseStatus = null;
let qlOnlineCount = 0;
let qlMinimized = false;
let qlHeight = 520;
let qlSpeechRecognition = null;
let qlIsRecording = false;
let qlDeviceId = null;
let qlShieldActive = false;
let qlSidebarActivateTimer = null;
let qlActiveTab = "prompt";
let qlChatHistory = [];
const QL_HISTORY_KEY = "ql_chat_history";
const QL_MAX_HISTORY = 200;
function getDeviceId() {
  return getHardwareFingerprint();
}
function createUI() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  chrome.storage.local.get(["ql_sidebar_mode", "ql_native_chat"], _0x5ab1d2 => {
    if (_0x5ab1d2.ql_sidebar_mode === true) {
      console.log("[ContentScript] Sidebar mode active, skipping floating UI");
      return;
    }
    if (_0x5ab1d2.ql_native_chat === true) {
      console.log("[ContentScript] Native chat mode active, skipping floating UI");
      return;
    }
    _buildFloatingUI();
  });
}
function _qlOpenSidePanel() {
  chrome.runtime.sendMessage({
    action: "openSidePanel"
  });
  var _0x414bf3 = document.createElement("div");
  _0x414bf3.textContent = "Click the extension icon ↗ to open the panel";
  _0x414bf3.style.cssText = "position:fixed;top:16px;right:16px;z-index:2147483647;background:#0f172a;color:#fff;padding:10px 16px;border-radius:8px;font-size:14px;font-family:sans-serif;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,.4);";
  document.body.appendChild(_0x414bf3);
  setTimeout(function () {
    if (_0x414bf3.parentNode) {
      _0x414bf3.parentNode.removeChild(_0x414bf3);
    }
  }, 4000);
}
function _buildFloatingUI() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  const _0x2fb720 = document.createElement("div");
  _0x2fb720.id = "ql-floating";
  const _0x32362e = Math.max(10, window.innerWidth - 400);
  _0x2fb720.style.left = _0x32362e + "px";
  _0x2fb720.style.top = "80px";
  document.body.appendChild(_0x2fb720);
  _0x2fb720.addEventListener("click", function (_0x53ebf1) {
    var _0xd7ee5c = _0x53ebf1.target;
    while (_0xd7ee5c && _0xd7ee5c !== _0x2fb720) {
      if (_0xd7ee5c.id === "ql-validate-btn") {
        validateLicense();
        return;
      }
      if (_0xd7ee5c.id === "ql-sidepanel-btn") {
        _qlOpenSidePanel();
        return;
      }
      _0xd7ee5c = _0xd7ee5c.parentElement;
    }
  });
  deactivateBypass();
  chrome.storage.local.get(["ql_license_valid", "ql_license_key", "ql_minimized", "ql_height", "ql_dark_mode", "ql_user_name", "ql_expires_at", "ql_activated_at", "ql_license_status", "ql_session_id"], async _0x3e1551 => {
    qlMinimized = _0x3e1551.ql_minimized || false;
    qlHeight = _0x3e1551.ql_height || 520;
    if (_0x3e1551.ql_dark_mode === false) {
      _0x2fb720.classList.add("ql-light");
    }
    if (qlMinimized) {
      _0x2fb720.classList.add("ql-minimized");
    }
    qlDeviceId = await getDeviceId();
    if (_0x3e1551.ql_license_valid) {
      qlUserName = _0x3e1551.ql_user_name || null;
      qlExpiresAt = _0x3e1551.ql_expires_at || null;
      qlActivatedAt = _0x3e1551.ql_activated_at || null;
      qlLicenseStatus = _0x3e1551.ql_license_status || null;
      qlSessionId = _0x3e1551.ql_session_id || null;
      showMainUI(_0x2fb720);
      activateBypass();
      if (_0x3e1551.ql_license_key) {
        const _0x149b6e = _0x51766b => {
          bgFetch(VALIDATE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + _SB_ANON
            },
            body: JSON.stringify({
              license_key: _0x3e1551.ql_license_key,
              session_id: _0x3e1551.ql_session_id,
              heartbeat: true,
              device_id: qlDeviceId
            })
          }).then(_0x281921 => {
            console.log("[QL] Startup heartbeat (attempt " + _0x51766b + "):", JSON.stringify(_0x281921));
            if (_0x281921.valid) {
              qlUserName = _0x281921.user_name || qlUserName;
              qlExpiresAt = _0x281921.expires_at || qlExpiresAt;
              qlActivatedAt = _0x281921.activated_at || qlActivatedAt;
              qlLicenseStatus = _0x281921.status || qlLicenseStatus;
              qlSessionId = _0x281921.session_id || qlSessionId;
              chrome.storage.local.set({
                ql_user_name: qlUserName,
                ql_expires_at: qlExpiresAt,
                ql_activated_at: qlActivatedAt,
                ql_license_status: qlLicenseStatus,
                ql_session_id: qlSessionId
              });
              activateBypass();
              const _0x2dd7f6 = document.querySelector(".ql-profile-name");
              if (_0x2dd7f6) {
                _0x2dd7f6.textContent = qlUserName || "User";
              }
              updateTrialCountdown();
            } else if (_0x281921.reason === "device_conflict") {
              if (_0x51766b < 2) {
                setTimeout(() => _0x149b6e(_0x51766b + 1), 5000);
                return;
              }
              chrome.storage.local.remove(["ql_license_valid", "ql_license_key", "ql_session_id", "ql_user_name", "ql_expires_at", "ql_activated_at", "ql_license_status"]);
              deactivateBypass();
              const _0x1b035c = document.getElementById("ql-floating");
              if (_0x1b035c) {
                showLicenseGate(_0x1b035c);
              }
              setTimeout(() => showCustomAlert("Acesso Negado", _0x281921.message), 500);
            } else if (_0x281921.reason === "rate_limited") {
              if (_0x51766b < 2) {
                setTimeout(() => _0x149b6e(_0x51766b + 1), 30000);
                return;
              }
            } else {
              chrome.storage.local.remove(["ql_license_valid", "ql_license_key", "ql_session_id", "ql_user_name", "ql_expires_at", "ql_activated_at", "ql_license_status"]);
              deactivateBypass();
              const _0x422714 = document.getElementById("ql-floating");
              if (_0x422714) {
                showLicenseGate(_0x422714);
              }
            }
          }).catch(() => {
            if (_0x51766b < 2) {
              setTimeout(() => _0x149b6e(_0x51766b + 1), 10000);
            } else {
              deactivateBypass();
            }
          });
        };
        _0x149b6e(1);
      }
    } else {
      showLicenseGate(_0x2fb720);
    }
    setupDrag();
    setupResize();
  });
}
function showLicenseGate(_0x3f52a1) {
  _0x3f52a1.innerHTML = templateLicenseGate(qlMinimized);
  setTimeout(() => {
    const _0x41d6fc = document.getElementById("ql-buy-license-btn");
    if (_0x41d6fc) {
      _0x41d6fc.addEventListener("click", () => window.open("https://wa.me/8801860036852", "_blank", "noopener,noreferrer"));
    }
    setupMinimize();
  }, 50);
}
async function validateLicense() {
  const _0x2f3b7e = document.getElementById("ql-license-input");
  const _0x4faa19 = document.getElementById("ql-license-log");
  const _0x34ff1e = _0x2f3b7e ? _0x2f3b7e.value.trim().toUpperCase() : "";
  if (!_0x34ff1e) {
    if (_0x4faa19) {
      _0x4faa19.className = "ql-log-error";
      _0x4faa19.innerText = "⚠ Insira uma chave";
    }
    return;
  }
  if (_0x4faa19) {
    _0x4faa19.className = "ql-log-info";
    _0x4faa19.innerHTML = SVG_ICONS.clock + " Validando...";
  }
  try {
    if (!qlDeviceId) {
      qlDeviceId = await getDeviceId();
    }
    const _0x514dff = await bgFetch(VALIDATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + _SB_ANON
      },
      body: JSON.stringify({
        license_key: _0x34ff1e,
        device_id: qlDeviceId
      })
    });
    if (_0x514dff.valid) {
      qlExpiredHandled = false;
      qlSessionId = _0x514dff.session_id;
      qlUserName = _0x514dff.user_name;
      qlExpiresAt = _0x514dff.expires_at;
      qlActivatedAt = _0x514dff.activated_at;
      qlLicenseStatus = _0x514dff.status;
      qlOnlineCount = _0x514dff.online_count || 0;
      chrome.storage.local.set({
        ql_license_valid: true,
        ql_license_key: _0x34ff1e,
        ql_license_id: _0x514dff.license_id || null,
        ql_session_id: _0x514dff.session_id,
        ql_user_name: _0x514dff.user_name || null,
        ql_expires_at: _0x514dff.expires_at || null,
        ql_activated_at: _0x514dff.activated_at || null,
        ql_license_status: _0x514dff.status || null
      }, () => {
        activateBypass();
        if (_0x4faa19) {
          _0x4faa19.className = "ql-log-success";
          _0x4faa19.innerText = "✓ " + _0x514dff.message;
        }
        try {
          if (typeof QLSounds !== "undefined") {
            QLSounds.activation();
          }
        } catch (_0x2179a7) {}
        setTimeout(() => {
          const _0x21d232 = document.getElementById("ql-floating");
          if (_0x21d232) {
            showMainUI(_0x21d232);
          }
          startHeartbeat(_0x34ff1e);
        }, 800);
      });
    } else if (_0x4faa19) {
      _0x4faa19.className = "ql-log-error";
      _0x4faa19.innerText = "✗ " + _0x514dff.message;
    }
  } catch (_0x516de1) {
    if (_0x4faa19) {
      _0x4faa19.className = "ql-log-error";
      _0x4faa19.innerText = "✗ Connection Error";
    }
  }
}
function showMainUI(_0x302e61) {
  const _0x4c6ed0 = qlUserName || "User";
  const _0x196cda = qlLicenseStatus === "trial" ? "<span class=\"ql-status-badge ql-badge-test\">TEST</span>" : "<span class=\"ql-status-badge ql-badge-pro\">ACTIVE</span>";
  _0x302e61.innerHTML = templateMainUI(_0x4c6ed0, _0x196cda, qlMinimized);
  _0x302e61.style.height = qlHeight + "px";
  setTimeout(() => {
    updateSyncStatus();
    setupSend();
    setupStorageWatch();
    setupMinimize();
    setupSuggestionChips();
    setupWatermarkButton();
    updateTrialCountdown();
    setupDrag();
    setupResize();
    setupDarkMode();
    setupOptimize();
    setupSpeech();
    setupNotifications();
    setupModoPlano();
    setupFileAttachment();
    setupShield();
    setupTabs();
    loadChatHistory();
    setupNativeChatButton();
    setupClipboardPaste();
    setupDownloadProject();
    checkForUpdatePopup();
    checkResellerRolePopup();
    chrome.storage.local.get(["ql_license_key", "ql_session_id"], _0x5038ff => {
      if (_0x5038ff.ql_license_key) {
        qlSessionId = _0x5038ff.ql_session_id || qlSessionId;
        startHeartbeat(_0x5038ff.ql_license_key);
      }
    });
    var _0x8c766a = document.getElementById("ql-sidepanel-btn");
    if (_0x8c766a) {
      _0x8c766a.addEventListener("click", function (_0x13be26) {
        _0x13be26.stopPropagation();
        _qlOpenSidePanel();
      });
    }
    const _0x4df465 = document.getElementById("ql-logout-btn");
    if (_0x4df465) {
      _0x4df465.addEventListener("click", () => {
        if (qlHeartbeatInterval) {
          clearInterval(qlHeartbeatInterval);
        }
        chrome.storage.local.remove(["ql_license_valid", "ql_license_key", "ql_session_id", "ql_user_name", "ql_expires_at", "ql_activated_at", "ql_license_status"], () => {
          deactivateBypass();
          qlUserName = null;
          qlExpiresAt = null;
          qlActivatedAt = null;
          qlLicenseStatus = null;
          qlSessionId = null;
          showLicenseGate(_0x302e61);
        });
      });
    }
  }, 30);
}
function showCustomAlert(_0x464bb8, _0xe9fc5c) {
  try {
    if (typeof QLSounds !== "undefined" && QLSounds.errorFromMessage) {
      var _0x5a8c5d = (_0x464bb8 || "") + " " + (_0xe9fc5c || "");
      if (/erro|falha|negad|inv[áa]lid|expir|limite|payment|rate|token|cr[eé]dito|sess/i.test(_0x5a8c5d)) {
        QLSounds.errorFromMessage(_0x5a8c5d);
      }
    }
  } catch (_0x1c0cc1) {}
  const _0xbf812 = document.getElementById("ql-custom-alert");
  if (!_0xbf812) {
    return;
  }
  const _0x1c150c = _0xbf812.querySelector(".ql-alert-title");
  const _0x3d6367 = _0xbf812.querySelector(".ql-alert-message");
  const _0x55714e = _0xbf812.querySelector(".ql-alert-ok-btn");
  if (_0x1c150c) {
    _0x1c150c.textContent = _0x464bb8;
  }
  if (_0x3d6367) {
    _0x3d6367.textContent = _0xe9fc5c;
  }
  _0xbf812.style.display = "flex";
  if (_0x55714e) {
    _0x55714e.onclick = () => {
      _0xbf812.style.display = "none";
    };
  }
  setTimeout(() => {
    _0xbf812.style.display = "none";
  }, 4000);
}
function setupOptimize() {
  const _0x9eb47a = document.getElementById("ql-optimize-btn");
  if (!_0x9eb47a) {
    return;
  }
  _0x9eb47a.addEventListener("click", async () => {
    const _0x1389f6 = document.getElementById("ql-msg");
    if (!_0x1389f6 || !_0x1389f6.value.trim()) {
      showCustomAlert("Attention", "Type a prompt before optimizing.");
      return;
    }
    const _0x3cc41c = _0x1389f6.value.trim();
    _0x9eb47a.classList.add("ql-tool-loading");
    _0x9eb47a.disabled = true;
    const _0x14dc69 = await new Promise(_0x18517e => chrome.storage.local.get(["ql_license_key"], _0x18517e));
    const _0x42ccc8 = _0x14dc69.ql_license_key || "";
    try {
      const _0x5717ec = await bgFetch(OPTIMIZE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "x-license-key": _0x42ccc8
        },
        body: JSON.stringify({
          prompt: _0x3cc41c
        })
      });
      if (_0x5717ec.optimized_prompt) {
        _0x1389f6.value = _0x5717ec.optimized_prompt;
        showCustomAlert("Prompt Optimized! ✨", "Your prompt was enhanced with AI and is ready to send.");
      } else if (_0x5717ec.error) {
        showCustomAlert("Error", _0x5717ec.error);
      }
    } catch (_0x29ab2b) {
      console.error("[Optimize] error:", _0x29ab2b);
      showCustomAlert("Error", "Failed to connect to the optimizer: " + (_0x29ab2b.message || ""));
    } finally {
      _0x9eb47a.classList.remove("ql-tool-loading");
      _0x9eb47a.disabled = false;
    }
  });
}
function setupSpeech() {
  var _0x2291b1 = document.getElementById("ql-speech-btn");
  if (!_0x2291b1) {
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
    _0x2291b1.title = "Voice not supported in this browser";
    _0x2291b1.style.opacity = "0.4";
    _0x2291b1.style.cursor = "not-allowed";
    return;
  }
  var _0x1a2ea5 = null;
  var _0x10d2ab = null;
  var _0x55a246 = [];
  function _0x50a548() {
    var _0x1998e2 = ["audio/webm", "audio/mp4", "audio/ogg"];
    for (var _0x551381 = 0; _0x551381 < _0x1998e2.length; _0x551381++) {
      if (MediaRecorder.isTypeSupported(_0x1998e2[_0x551381])) {
        return _0x1998e2[_0x551381];
      }
    }
    return "";
  }
  async function _0x32ca10() {
    try {
      _0x10d2ab = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
    } catch (_0x310fdf) {
      showCustomAlert("Permission Denied", "Allow microphone access in your browser settings.");
      return;
    }
    var _0x3471c5 = _0x50a548();
    try {
      _0x1a2ea5 = _0x3471c5 ? new MediaRecorder(_0x10d2ab, {
        mimeType: _0x3471c5
      }) : new MediaRecorder(_0x10d2ab);
    } catch (_0x564aab) {
      try {
        _0x1a2ea5 = new MediaRecorder(_0x10d2ab);
      } catch (_0x4dce16) {
        showCustomAlert("Error", "Could not start voice recording.");
        return;
      }
    }
    _0x55a246 = [];
    _0x1a2ea5.ondataavailable = function (_0x2b7b9b) {
      if (_0x2b7b9b.data && _0x2b7b9b.data.size > 0) {
        _0x55a246.push(_0x2b7b9b.data);
      }
    };
    _0x1a2ea5.onstop = async function () {
      try {
        _0x10d2ab.getTracks().forEach(function (_0x30aa51) {
          _0x30aa51.stop();
        });
      } catch (_0x2d27f5) {}
      qlIsRecording = false;
      _0x2291b1.classList.remove("ql-recording");
      var _0x492d8e = _0x1a2ea5 && _0x1a2ea5.mimeType || "audio/webm";
      var _0x281f39 = new Blob(_0x55a246, {
        type: _0x492d8e
      });
      if (_0x281f39.size < 1024) {
        showCustomAlert("No Audio", "No speech detected. Try again.");
        return;
      }
      var _0x377995 = document.getElementById("ql-msg");
      _0x2291b1.classList.add("ql-tool-loading");
      try {
        var _0x20b666 = await new Promise(function (_0x53d19b) {
          chrome.storage.local.get(["ql_license_key", "ql_session_id"], _0x53d19b);
        });
        if (!qlDeviceId) {
          qlDeviceId = await getDeviceId();
        }
        var _0x434418 = _0x492d8e.indexOf("mp4") >= 0 ? "m4a" : _0x492d8e.indexOf("ogg") >= 0 ? "ogg" : "webm";
        var _0x32d6fa = new FormData();
        _0x32d6fa.append("audio", _0x281f39, "voice." + _0x434418);
        _0x32d6fa.append("license_key", _0x20b666.ql_license_key || "");
        _0x32d6fa.append("device_id", qlDeviceId || "");
        _0x32d6fa.append("session_id", _0x20b666.ql_session_id || qlSessionId || "");
        var _0x1c4d76 = await fetch(TRANSCRIBE_URL, {
          method: "POST",
          headers: {
            "x-license-key": _0x20b666.ql_license_key || "",
            "x-device-id": qlDeviceId || "",
            "x-session-id": _0x20b666.ql_session_id || qlSessionId || "",
            Authorization: "Bearer " + SUPABASE_ANON_KEY,
            apikey: SUPABASE_ANON_KEY
          },
          body: _0x32d6fa
        });
        var _0x3164e6 = await _0x1c4d76.json();
        if (_0x1c4d76.ok && _0x3164e6 && _0x3164e6.success && _0x3164e6.transcript) {
          if (_0x377995) {
            var _0x398efb = _0x377995.value && _0x377995.value.slice(-1) !== " " ? " " : "";
            _0x377995.value = (_0x377995.value || "") + _0x398efb + _0x3164e6.transcript;
            try {
              _0x377995.dispatchEvent(new Event("input", {
                bubbles: true
              }));
            } catch (_0x5afd44) {}
            _0x377995.focus();
          }
        } else {
          showCustomAlert("Voice Error", _0x3164e6 && (_0x3164e6.error || _0x3164e6.error_display) || "Could not transcribe the audio.");
        }
      } catch (_0x1f7f7a) {
        console.error("[QL Speech] transcribe error", _0x1f7f7a);
        showCustomAlert("Voice Error", _0x1f7f7a.message || "Transcription failed.");
      } finally {
        _0x2291b1.classList.remove("ql-tool-loading");
      }
    };
    _0x1a2ea5.start();
    qlIsRecording = true;
    _0x2291b1.classList.add("ql-recording");
  }
  _0x2291b1.addEventListener("click", function (_0xa0c381) {
    _0xa0c381.preventDefault();
    _0xa0c381.stopPropagation();
    if (qlIsRecording && _0x1a2ea5) {
      try {
        _0x1a2ea5.stop();
      } catch (_0x4b07e8) {}
      return;
    }
    _0x32ca10();
  });
}
(function () {
  if (window.__vibexVoiceBridge) {
    return;
  }
  window.__vibexVoiceBridge = true;
  var _0x2a8c5d = null;
  var _0x35d1fe = null;
  var _0x14f94d = [];
  function _0x224b30() {
    var _0x648ec = ["audio/webm", "audio/mp4", "audio/ogg"];
    for (var _0x2b01d7 = 0; _0x2b01d7 < _0x648ec.length; _0x2b01d7++) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(_0x648ec[_0x2b01d7])) {
        return _0x648ec[_0x2b01d7];
      }
    }
    return "";
  }
  async function _0x38d645(_0x31b159, _0x38f642) {
    var _0x4b9cc5 = await new Promise(function (_0x35fb6d) {
      chrome.storage.local.get(["ql_license_key", "ql_session_id"], _0x35fb6d);
    });
    if (!qlDeviceId) {
      qlDeviceId = await getDeviceId();
    }
    var _0x262fc3 = _0x38f642.indexOf("mp4") >= 0 ? "m4a" : _0x38f642.indexOf("ogg") >= 0 ? "ogg" : "webm";
    var _0x52202b = new FormData();
    _0x52202b.append("audio", _0x31b159, "voice." + _0x262fc3);
    _0x52202b.append("license_key", _0x4b9cc5.ql_license_key || "");
    _0x52202b.append("device_id", qlDeviceId || "");
    _0x52202b.append("session_id", _0x4b9cc5.ql_session_id || qlSessionId || "");
    var _0x4d3610 = await fetch(TRANSCRIBE_URL, {
      method: "POST",
      headers: {
        "x-license-key": _0x4b9cc5.ql_license_key || "",
        "x-device-id": qlDeviceId || "",
        "x-session-id": _0x4b9cc5.ql_session_id || qlSessionId || "",
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
        apikey: SUPABASE_ANON_KEY
      },
      body: _0x52202b
    });
    var _0x5dc892 = await _0x4d3610.json();
    if (_0x4d3610.ok && _0x5dc892 && _0x5dc892.success && _0x5dc892.transcript) {
      return {
        ok: true,
        transcript: _0x5dc892.transcript
      };
    }
    return {
      ok: false,
      error: _0x5dc892 && (_0x5dc892.error || _0x5dc892.error_display) || "Could not transcribe the audio."
    };
  }
  chrome.runtime.onMessage.addListener(function (_0x4121ab, _0x571fc8, _0x525e77) {
    if (!_0x4121ab || _0x4121ab.type !== "VIBEX_SP_VOICE") {
      return;
    }
    if (_0x4121ab.action === "start") {
      (async function () {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
          _0x525e77({
            ok: false,
            error: "unsupported"
          });
          return;
        }
        try {
          _0x35d1fe = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
        } catch (_0x19dc86) {
          _0x525e77({
            ok: false,
            error: "permission"
          });
          return;
        }
        var _0x3144a3 = _0x224b30();
        try {
          _0x2a8c5d = _0x3144a3 ? new MediaRecorder(_0x35d1fe, {
            mimeType: _0x3144a3
          }) : new MediaRecorder(_0x35d1fe);
        } catch (_0x5604b4) {
          try {
            _0x2a8c5d = new MediaRecorder(_0x35d1fe);
          } catch (_0x4e4dcb) {
            _0x525e77({
              ok: false,
              error: "recorder"
            });
            return;
          }
        }
        _0x14f94d = [];
        _0x2a8c5d.ondataavailable = function (_0x3c8b28) {
          if (_0x3c8b28.data && _0x3c8b28.data.size > 0) {
            _0x14f94d.push(_0x3c8b28.data);
          }
        };
        try {
          _0x2a8c5d.start();
        } catch (_0x5ea24e) {
          _0x525e77({
            ok: false,
            error: "start"
          });
          return;
        }
        _0x525e77({
          ok: true
        });
      })();
      return true;
    }
    if (_0x4121ab.action === "stop") {
      if (!_0x2a8c5d) {
        _0x525e77({
          ok: false,
          error: "notrec"
        });
        return;
      }
      _0x2a8c5d.onstop = async function () {
        try {
          _0x35d1fe.getTracks().forEach(function (_0x26eb49) {
            _0x26eb49.stop();
          });
        } catch (_0x3d267d) {}
        var _0x83c023 = _0x2a8c5d && _0x2a8c5d.mimeType || "audio/webm";
        var _0x498de0 = new Blob(_0x14f94d, {
          type: _0x83c023
        });
        _0x2a8c5d = null;
        if (_0x498de0.size < 1024) {
          _0x525e77({
            ok: false,
            error: "noaudio"
          });
          return;
        }
        try {
          var _0x476887 = await _0x38d645(_0x498de0, _0x83c023);
          _0x525e77(_0x476887);
        } catch (_0x55c39a) {
          _0x525e77({
            ok: false,
            error: _0x55c39a.message || "fail"
          });
        }
      };
      try {
        _0x2a8c5d.stop();
      } catch (_0x553aab) {
        _0x525e77({
          ok: false,
          error: "stop"
        });
      }
      return true;
    }
  });
})();
function setupNotifications() {
  const _0x8c8553 = document.querySelector(".ql-notif-btn");
  const _0x4774b1 = document.getElementById("ql-notif-panel");
  const _0xa1106a = document.getElementById("ql-notif-close");
  if (!_0x8c8553 || !_0x4774b1) {
    return;
  }
  _0x8c8553.addEventListener("click", _0x258771 => {
    _0x258771.stopPropagation();
    const _0x4e2f2e = _0x4774b1.style.display !== "none";
    _0x4774b1.style.display = _0x4e2f2e ? "none" : "block";
    if (!_0x4e2f2e) {
      loadNotifications();
    }
  });
  if (_0xa1106a) {
    _0xa1106a.addEventListener("click", _0x5a5da0 => {
      _0x5a5da0.stopPropagation();
      _0x4774b1.style.display = "none";
    });
  }
  checkUnreadNotifications();
}
async function loadNotifications() {
  const _0x5c092f = document.getElementById("ql-notif-list");
  if (!_0x5c092f) {
    return;
  }
  _0x5c092f.innerHTML = "<p class=\"ql-notif-empty\">Loading...</p>";
  try {
    const _0x2f2c9d = await bgFetch(NOTIFICATIONS_URL, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY
      }
    });
    if (!_0x2f2c9d || _0x2f2c9d.length === 0) {
      _0x5c092f.innerHTML = "<p class=\"ql-notif-empty\">No notifications.</p>";
      return;
    }
    const _0x2d1712 = _0x2f2c9d.map(_0x4b464f => _0x4b464f.id);
    chrome.storage.local.set({
      ql_read_notifs: _0x2d1712
    });
    const _0x39339a = document.querySelector(".ql-notif-badge");
    if (_0x39339a) {
      _0x39339a.style.display = "none";
    }
    _0x5c092f.innerHTML = _0x2f2c9d.map(_0x2f24dc => {
      const _0x325597 = new Date(_0x2f24dc.created_at).toLocaleDateString("en-US");
      const _0x7f7cce = sanitizeUrl(_0x2f24dc.link);
      const _0x405d99 = _0x7f7cce ? "<a href=\"" + escapeHtml(_0x7f7cce) + "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"ql-notif-link\">Abrir link →</a>" : "";
      return "<div class=\"ql-notif-item\"><div class=\"ql-notif-item-title\">" + escapeHtml(_0x2f24dc.title) + "</div><div class=\"ql-notif-item-msg\">" + escapeHtml(_0x2f24dc.message) + "</div>" + _0x405d99 + "<div class=\"ql-notif-item-date\">" + _0x325597 + "</div></div>";
    }).join("");
  } catch (_0x9ac546) {
    _0x5c092f.innerHTML = "<p class=\"ql-notif-empty\">Error loading.</p>";
  }
}
async function checkUnreadNotifications() {
  try {
    const _0x3cbd3a = await bgFetch(NOTIFICATIONS_URL, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY
      }
    });
    if (!_0x3cbd3a || _0x3cbd3a.length === 0) {
      return;
    }
    chrome.storage.local.get(["ql_read_notifs"], _0x58c77c => {
      const _0x278d77 = _0x58c77c.ql_read_notifs || [];
      const _0x2eaaa0 = _0x3cbd3a.filter(_0x55bdd6 => !_0x278d77.includes(_0x55bdd6.id)).length;
      const _0x4cbd79 = document.querySelector(".ql-notif-badge");
      if (_0x4cbd79) {
        if (_0x2eaaa0 > 0) {
          _0x4cbd79.textContent = _0x2eaaa0;
          _0x4cbd79.style.display = "flex";
        } else {
          _0x4cbd79.style.display = "none";
        }
      }
    });
  } catch (_0x3ab807) {}
}
function setupSuggestionChips() {
  const _0x30578f = document.getElementById("ql-chips");
  if (!_0x30578f) {
    return;
  }
  PROMPT_TEMPLATES.forEach(_0xcda63c => {
    const _0x15d476 = document.createElement("button");
    _0x15d476.className = "ql-chip";
    _0x15d476.innerHTML = _0xcda63c.icon + " " + _0xcda63c.label;
    _0x15d476.title = _0xcda63c.prompt;
    _0x15d476.addEventListener("click", () => {
      const _0x19d298 = document.getElementById("ql-msg");
      if (_0x19d298) {
        _0x19d298.value = _0xcda63c.prompt;
      }
    });
    _0x30578f.appendChild(_0x15d476);
  });
}
var WATERMARK_PROMPT = "use css to completely hide the lovable badge (Made with Lovable)";
function setupWatermarkButton() {
  var _0x10161b = document.getElementById("ql-remove-watermark");
  if (!_0x10161b) {
    return;
  }
  _0x10161b.addEventListener("click", async function () {
    var _0x3e2931 = document.getElementById("ql-log");
    _0x10161b.disabled = true;
    _0x10161b.textContent = "⏳ Sending...";
    try {
      await sendNativeToLovable(WATERMARK_PROMPT);
      if (_0x3e2931) {
        _0x3e2931.className = "ql-log-success";
        _0x3e2931.innerText = "✓ Prompt sent! Wait for Lovable to apply the CSS.";
      }
    } catch (_0x172e17) {
      if (_0x3e2931) {
        _0x3e2931.className = "ql-log-error";
        _0x3e2931.innerText = "✗ " + (_0x172e17.message || _0x172e17);
      }
    } finally {
      _0x10161b.disabled = false;
      _0x10161b.textContent = "Remove Watermark";
    }
  });
}
function updateTrialCountdown() {
  if (!qlExpiresAt) {
    return;
  }
  const _0x24e2b0 = document.getElementById("ql-trial-countdown");
  if (!_0x24e2b0) {
    return;
  }
  _0x24e2b0.style.display = "block";
  const _0x38b45b = Date.now();
  function _0x3e699e() {
    const _0x2a439f = new Date(qlExpiresAt).getTime();
    const _0x5b42ab = Math.max(_0x2a439f - _0x38b45b, 3600000);
    const _0x26f3a7 = _0x2a439f - Date.now();
    if (_0x26f3a7 <= 0) {
      _0x24e2b0.innerHTML = "<span class=\"ql-countdown-expired\">" + t("countdown.expired") + "</span><div class=\"ql-trial-bar\"><div class=\"ql-trial-bar-fill ql-bar-expired\" style=\"width:0%\"></div></div>";
      handleLicenseExpired();
      return;
    }
    const _0x29e4e7 = Math.floor(_0x26f3a7 / 86400000);
    const _0x35d3eb = Math.floor(_0x26f3a7 % 86400000 / 3600000);
    const _0x2e9369 = Math.floor(_0x26f3a7 % 3600000 / 60000);
    const _0xe71176 = Math.floor(_0x26f3a7 % 60000 / 1000);
    const _0xc851be = Math.max(0, Math.min(100, _0x26f3a7 / _0x5b42ab * 100));
    let _0x7ef376 = "";
    if (_0x29e4e7 > 0) {
      _0x7ef376 = _0x29e4e7 + "d " + _0x35d3eb + "h " + _0x2e9369 + "m";
    } else if (_0x35d3eb > 0) {
      _0x7ef376 = _0x35d3eb + "h " + _0x2e9369 + "m " + String(_0xe71176).padStart(2, "0") + "s";
    } else {
      _0x7ef376 = _0x2e9369 + ":" + String(_0xe71176).padStart(2, "0");
    }
    const _0x5295e7 = _0xc851be < 20 ? " ql-bar-urgent" : "";
    const _0x23b606 = qlLicenseStatus === "trial" ? t("countdown.trial") : t("countdown.license");
    _0x24e2b0.innerHTML = "<div class=\"ql-countdown-row\"><span class=\"ql-countdown-icon\">" + SVG_ICONS.clock + "</span><span class=\"ql-countdown-label\">" + _0x23b606 + "</span><span class=\"ql-countdown-time\">" + _0x7ef376 + "</span></div><div class=\"ql-trial-bar\"><div class=\"ql-trial-bar-fill" + _0x5295e7 + "\" style=\"width:" + _0xc851be + "%\"></div></div>";
  }
  _0x3e699e();
  if (window.qlCountdownInterval) {
    clearInterval(window.qlCountdownInterval);
  }
  window.qlCountdownInterval = setInterval(_0x3e699e, 1000);
}
function setupMinimize() {
  const _0x52fda6 = document.getElementById("ql-minimize");
  if (!_0x52fda6) {
    return;
  }
  _0x52fda6.addEventListener("click", _0x17f824 => {
    _0x17f824.stopPropagation();
    const _0x2d0240 = document.getElementById("ql-floating");
    if (!_0x2d0240) {
      return;
    }
    qlMinimized = !qlMinimized;
    _0x2d0240.classList.toggle("ql-minimized", qlMinimized);
    _0x52fda6.textContent = qlMinimized ? "□" : "−";
    chrome.storage.local.set({
      ql_minimized: qlMinimized
    });
  });
}
function setupDarkMode() {
  const _0x4b8956 = document.querySelector(".ql-icon-btn[data-i18n-title=\"header.theme\"]");
  if (!_0x4b8956) {
    return;
  }
  _0x4b8956.addEventListener("click", _0x2cbd5f => {
    _0x2cbd5f.stopPropagation();
    const _0x3c67f4 = document.getElementById("ql-floating");
    if (!_0x3c67f4) {
      return;
    }
    const _0x547a81 = _0x3c67f4.classList.toggle("ql-light");
    chrome.storage.local.set({
      ql_dark_mode: !_0x547a81
    });
  });
}
function setupModoPlano() {
  const _0x41e9ec = document.getElementById("ql-modo-plano");
  if (!_0x41e9ec) {
    return;
  }
  chrome.storage.local.get(["ql_modo_plano"], _0x3302b2 => {
    if (_0x3302b2.ql_modo_plano === true) {
      _0x41e9ec.checked = true;
    }
  });
  _0x41e9ec.addEventListener("change", () => {
    chrome.storage.local.set({
      ql_modo_plano: _0x41e9ec.checked
    });
    if (_0x41e9ec.checked) {
      showModoPlanoAlert();
    }
  });
}
function showModoPlanoAlert() {
  const _0x1e5c00 = document.querySelector(".ql-modo-plano-overlay");
  if (_0x1e5c00) {
    _0x1e5c00.remove();
  }
  const _0x326da2 = document.createElement("div");
  _0x326da2.className = "ql-modo-plano-overlay";
  _0x326da2.innerHTML = "<div class=\"ql-modo-plano-modal\"><div class=\"ql-modo-plano-icon\">⚠️</div><div class=\"ql-modo-plano-title\">Attention — Plan Mode</div><div class=\"ql-modo-plano-body\"><strong>Plan/Think Mode</strong> may consume credits, but offers great help. Use in moderation!</div><div class=\"ql-modo-plano-steps\"><div class=\"ql-modo-plano-step\"><span class=\"ql-modo-plano-step-num\">1</span><span class=\"ql-modo-plano-step-text\">Ative o <strong>Modo Plano</strong> para gerar um plano.</span></div><div class=\"ql-modo-plano-step\"><span class=\"ql-modo-plano-step-num\">2</span><span class=\"ql-modo-plano-step-text\">In Lovable, <strong>do not click the Approve button</strong>; just copy the new plan.</span></div><div class=\"ql-modo-plano-step\"><span class=\"ql-modo-plano-step-num\">3</span><span class=\"ql-modo-plano-step-text\">Paste the copied plan into the extension prompt.</span></div><div class=\"ql-modo-plano-step\"><span class=\"ql-modo-plano-step-num\">4</span><span class=\"ql-modo-plano-step-text\"><strong>Turn off Plan Mode</strong> and send via the extension; this way no extra credits are consumed.</span></div></div><div class=\"ql-modo-plano-check\"><input type=\"checkbox\" id=\"ql-modo-plano-dismiss\" /><label for=\"ql-modo-plano-dismiss\">Do not show again</label></div><button class=\"ql-modo-plano-btn\" id=\"ql-modo-plano-ok\">Entendi!</button></div>";
  const _0x5135ee = document.getElementById("ql-floating");
  if (_0x5135ee) {
    _0x5135ee.appendChild(_0x326da2);
  } else {
    document.body.appendChild(_0x326da2);
  }
  requestAnimationFrame(() => _0x326da2.classList.add("ql-modo-plano-visible"));
  const _0x22ae19 = () => {
    _0x326da2.classList.remove("ql-modo-plano-visible");
    setTimeout(() => _0x326da2.remove(), 180);
  };
  const _0x145ad3 = _0x326da2.querySelector("#ql-modo-plano-ok");
  if (_0x145ad3) {
    _0x145ad3.addEventListener("click", () => {
      const _0x1a34c6 = _0x326da2.querySelector("#ql-modo-plano-dismiss");
      if (_0x1a34c6 && _0x1a34c6.checked) {
        chrome.storage.local.set({
          ql_modo_plano_alert_dismissed: true
        });
      }
      _0x22ae19();
    });
  }
  _0x326da2.addEventListener("click", _0x211101 => {
    if (_0x211101.target === _0x326da2) {
      _0x22ae19();
    }
  });
}
function setupShield() {
  const _0x41c6dc = document.getElementById("ql-shield-btn");
  if (!_0x41c6dc) {
    return;
  }
  chrome.storage.local.get(["ql_shield_active"], _0x5115e9 => {
    if (_0x5115e9.ql_shield_active === true) {
      qlShieldActive = true;
      _0x41c6dc.classList.add("ql-shield-active");
      const _0x471682 = document.getElementById("ql-shield-label");
      if (_0x471682) {
        _0x471682.textContent = "Disable Shield";
      }
      injectShieldOverlay();
    }
  });
  _0x41c6dc.addEventListener("click", () => {
    qlShieldActive = !qlShieldActive;
    chrome.storage.local.set({
      ql_shield_active: qlShieldActive
    });
    const _0xf58d42 = document.getElementById("ql-shield-label");
    if (qlShieldActive) {
      _0x41c6dc.classList.add("ql-shield-active");
      if (_0xf58d42) {
        _0xf58d42.textContent = "Disable Shield";
      }
      injectShieldOverlay();
      showCustomAlert("Shield Activated 🛡️", "The Lovable input is locked. Use the extension to send prompts.");
    } else {
      _0x41c6dc.classList.remove("ql-shield-active");
      if (_0xf58d42) {
        _0xf58d42.textContent = "Enable Shield";
      }
      removeShieldOverlay();
      showCustomAlert("Shield Disabled", "The Lovable input is unlocked again.");
    }
  });
}
function injectShieldOverlay() {
  if (document.getElementById("ql-shield-overlay")) {
    return;
  }
  const _0xd1de3b = document.querySelector("form#chat-input");
  if (!_0xd1de3b) {
    setTimeout(injectShieldOverlay, 1000);
    return;
  }
  const _0x1744b4 = getComputedStyle(_0xd1de3b).position;
  if (_0x1744b4 === "static") {
    _0xd1de3b.style.position = "relative";
  }
  const _0x1c2130 = document.createElement("div");
  _0x1c2130.id = "ql-shield-overlay";
  _0x1c2130.className = "ql-shield-overlay";
  _0x1c2130.innerHTML = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg><span class=\"ql-shield-overlay-text\">🛡️ Protected by Vibex Academy</span><span class=\"ql-shield-overlay-sub\">Use the extension to send prompts</span>";
  _0x1c2130.addEventListener("click", _0x34ecf1 => {
    _0x34ecf1.preventDefault();
    _0x34ecf1.stopPropagation();
    _0x34ecf1.stopImmediatePropagation();
  }, true);
  _0x1c2130.addEventListener("mousedown", _0x344113 => {
    _0x344113.preventDefault();
    _0x344113.stopPropagation();
    _0x344113.stopImmediatePropagation();
  }, true);
  _0x1c2130.addEventListener("keydown", _0x4c11d2 => {
    _0x4c11d2.preventDefault();
    _0x4c11d2.stopPropagation();
  }, true);
  _0xd1de3b.appendChild(_0x1c2130);
  const _0x31273c = _0xd1de3b.querySelectorAll("input, button, textarea, [contenteditable]");
  _0x31273c.forEach(_0x22a34d => {
    if (_0x22a34d.id !== "ql-shield-overlay") {
      _0x22a34d.dataset.qlShieldDisabled = _0x22a34d.disabled || "";
      _0x22a34d.dataset.qlShieldTabindex = _0x22a34d.getAttribute("tabindex") || "";
      _0x22a34d.setAttribute("tabindex", "-1");
      if (_0x22a34d.tagName !== "DIV") {
        _0x22a34d.disabled = true;
      }
      if (_0x22a34d.contentEditable === "true") {
        _0x22a34d.contentEditable = "false";
        _0x22a34d.dataset.qlShieldEditable = "true";
      }
    }
  });
}
function removeShieldOverlay() {
  const _0x226fbd = document.getElementById("ql-shield-overlay");
  if (_0x226fbd) {
    _0x226fbd.remove();
  }
  const _0x46fad1 = document.querySelector("form#chat-input");
  if (!_0x46fad1) {
    return;
  }
  const _0x529b88 = _0x46fad1.querySelectorAll("[data-ql-shield-disabled]");
  _0x529b88.forEach(_0x1f7299 => {
    const _0x641234 = _0x1f7299.dataset.qlShieldDisabled;
    if (_0x641234 === "true") {
      _0x1f7299.disabled = true;
    } else if (_0x641234 === "" || _0x641234 === "false") {
      _0x1f7299.disabled = false;
    }
    delete _0x1f7299.dataset.qlShieldDisabled;
    const _0xe03321 = _0x1f7299.dataset.qlShieldTabindex;
    if (_0xe03321) {
      _0x1f7299.setAttribute("tabindex", _0xe03321);
    } else {
      _0x1f7299.removeAttribute("tabindex");
    }
    delete _0x1f7299.dataset.qlShieldTabindex;
    if (_0x1f7299.dataset.qlShieldEditable === "true") {
      _0x1f7299.contentEditable = "true";
      delete _0x1f7299.dataset.qlShieldEditable;
    }
  });
}
let qlHbConflictCount = 0;
let qlHbNetworkFailCount = 0;
function startHeartbeat(_0x305de8) {
  if (qlHeartbeatInterval) {
    clearInterval(qlHeartbeatInterval);
  }
  qlHbConflictCount = 0;
  qlHbNetworkFailCount = 0;
  qlHeartbeatInterval = setInterval(async () => {
    try {
      const _0xc95dc2 = await bgFetch(VALIDATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          license_key: _0x305de8,
          session_id: qlSessionId,
          heartbeat: true,
          device_id: qlDeviceId
        })
      });
      if (!_0xc95dc2.valid) {
        const _0x256e22 = _0xc95dc2.reason === "device_conflict";
        const _0x5f007d = _0xc95dc2.reason === "expired" || _0xc95dc2.reason === "suspended" || _0xc95dc2.message && (_0xc95dc2.message.includes("expired") || _0xc95dc2.message.includes("suspensa"));
        if (_0x256e22) {
          qlHbConflictCount++;
          if (qlHbConflictCount < 2) {
            return;
          }
        }
        if (_0x256e22 || _0x5f007d) {
          clearInterval(qlHeartbeatInterval);
          deactivateBypass();
          chrome.storage.local.remove(["ql_license_valid", "ql_license_key", "ql_session_id", "ql_user_name", "ql_expires_at", "ql_activated_at", "ql_license_status"], () => {
            const _0x1c71cb = document.getElementById("ql-floating");
            if (_0x1c71cb) {
              showLicenseGate(_0x1c71cb);
            }
            if (_0x256e22) {
              setTimeout(() => showCustomAlert("Acesso Negado", _0xc95dc2.message), 500);
            }
          });
        }
        return;
      }
      qlHbConflictCount = 0;
      qlHbNetworkFailCount = 0;
      qlOnlineCount = _0xc95dc2.online_count || 0;
      const _0x35a844 = document.getElementById("ql-online-count");
      if (_0x35a844) {
        _0x35a844.textContent = qlOnlineCount;
      }
      if (_0xc95dc2.expires_at) {
        qlExpiresAt = _0xc95dc2.expires_at;
      }
      if (_0xc95dc2.status) {
        qlLicenseStatus = _0xc95dc2.status;
      }
      if (_0xc95dc2.activated_at) {
        qlActivatedAt = _0xc95dc2.activated_at;
      }
      chrome.storage.local.set({
        ql_license_status: qlLicenseStatus,
        ql_expires_at: qlExpiresAt,
        ql_activated_at: qlActivatedAt
      });
      if (_0xc95dc2.user_name) {
        qlUserName = _0xc95dc2.user_name;
        chrome.storage.local.set({
          ql_user_name: qlUserName
        });
        const _0x20454b = document.querySelector(".ql-profile-name");
        if (_0x20454b) {
          _0x20454b.textContent = _0xc95dc2.user_name;
        }
      }
    } catch (_0x546aeb) {
      console.warn("[QL] Heartbeat error", _0x546aeb);
      qlHbNetworkFailCount++;
      if (qlHbNetworkFailCount >= 5) {
        deactivateBypass();
        qlHbNetworkFailCount = 0;
      }
    }
  }, 60000);
}
let qlExpiredHandled = false;
function handleLicenseExpired() {
  if (qlExpiredHandled) {
    return;
  }
  qlExpiredHandled = true;
  if (qlHeartbeatInterval) {
    clearInterval(qlHeartbeatInterval);
  }
  if (window.qlCountdownInterval) {
    clearInterval(window.qlCountdownInterval);
  }
  const _0x386853 = document.createElement("div");
  _0x386853.className = "ql-sweetalert-overlay";
  _0x386853.innerHTML = templateExpiredOverlay();
  const _0x16cfb7 = document.getElementById("ql-floating");
  if (_0x16cfb7) {
    _0x16cfb7.appendChild(_0x386853);
  }
  requestAnimationFrame(() => _0x386853.classList.add("ql-sweetalert-visible"));
  const _0x36e147 = _0x386853.querySelector("#ql-sweetalert-close");
  if (_0x36e147) {
    _0x36e147.addEventListener("click", () => {
      _0x386853.classList.remove("ql-sweetalert-visible");
      setTimeout(() => {
        _0x386853.remove();
        chrome.storage.local.remove(["ql_license_valid", "ql_license_key", "ql_session_id", "ql_user_name", "ql_expires_at", "ql_license_status"], () => {
          if (_0x16cfb7) {
            showLicenseGate(_0x16cfb7);
          }
        });
      }, 300);
    });
  }
}
function qlBootstrap() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  if (!document.body) {
    var _0xbc1c60 = new MutationObserver(function () {
      if (document.body) {
        _0xbc1c60.disconnect();
        qlBootstrap();
      }
    });
    _0xbc1c60.observe(document.documentElement, {
      childList: true
    });
    return;
  }
  createUI();
}
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(qlBootstrap, 50);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(qlBootstrap, 50);
  });
}
var qlRetryCount = 0;
var qlRetryDelays = [300, 600, 1000, 1500, 2000, 3000, 4000, 5000];
function qlRetryInit() {
  if (document.getElementById("ql-floating") || qlRetryCount >= qlRetryDelays.length) {
    return;
  }
  var _0x265295 = qlRetryDelays[qlRetryCount];
  qlRetryCount++;
  setTimeout(function () {
    if (!document.getElementById("ql-floating") && document.body) {
      createUI();
    }
    qlRetryInit();
  }, _0x265295);
}
qlRetryInit();
chrome.storage.onChanged.addListener((_0x2b49de, _0x458b09) => {
  if (_0x458b09 !== "local") {
    return;
  }
  if (_0x2b49de.ql_sidebar_mode) {
    if (_0x2b49de.ql_sidebar_mode.newValue === true) {
      if (qlSidebarActivateTimer) {
        clearTimeout(qlSidebarActivateTimer);
        qlSidebarActivateTimer = null;
      }
      const _0x4513be = document.getElementById("ql-floating");
      if (_0x4513be) {
        _0x4513be.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        _0x4513be.style.opacity = "0";
        _0x4513be.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (qlHeartbeatInterval) {
            clearInterval(qlHeartbeatInterval);
          }
          if (window.qlCountdownInterval) {
            clearInterval(window.qlCountdownInterval);
          }
          _0x4513be.remove();
        }, 350);
      }
    } else if (_0x2b49de.ql_sidebar_mode.newValue === false) {
      setTimeout(() => {
        _buildFloatingUI();
        setTimeout(() => {
          const _0x18a998 = document.getElementById("ql-floating");
          if (_0x18a998) {
            _0x18a998.style.opacity = "0";
            _0x18a998.style.transform = "scale(0.95) translateX(20px)";
            requestAnimationFrame(() => {
              _0x18a998.style.transition = "opacity 0.4s ease, transform 0.4s ease";
              _0x18a998.style.opacity = "1";
              _0x18a998.style.transform = "scale(1) translateX(0)";
            });
          }
        }, 50);
      }, 100);
    }
  }
});
function updateSyncStatus() {
  chrome.storage.local.get(["lovable_projectId", "lovable_token"], _0x236b88 => {
    const _0x4f6efa = document.getElementById("ql-sync-status");
    if (!_0x4f6efa) {
      return;
    }
    if (_0x236b88.lovable_projectId && _0x236b88.lovable_token) {
      _0x4f6efa.className = "ql-sync-status ql-sync-ok";
      const _0x32e618 = _0x236b88.lovable_projectId.substring(0, 6);
      _0x4f6efa.innerHTML = "<span class=\"ql-sync-text\">" + t("sync.ok") + " " + t("sync.project") + " " + _0x32e618 + "...</span>";
    } else {
      _0x4f6efa.className = "ql-sync-status ql-sync-waiting";
      _0x4f6efa.innerHTML = "<span class=\"ql-sync-text\">" + SVG_ICONS.clock + t("sync.waiting") + "</span>";
    }
  });
}
function setupStorageWatch() {
  chrome.storage.onChanged.addListener(_0x22d7ae => {
    if (_0x22d7ae.lovable_projectId || _0x22d7ae.lovable_token) {
      updateSyncStatus();
    }
  });
}
function requestLatestTokenFromHook(_0x414a3c = 1200) {
  return new Promise(_0x679a56 => {
    let _0x2172c1 = false;
    function _0x32eb86(_0x1ccf78) {
      if (_0x2172c1) {
        return;
      }
      _0x2172c1 = true;
      clearTimeout(_0x547de8);
      chrome.storage.onChanged.removeListener(_0x55d991);
      _0x679a56(_0x1ccf78);
    }
    function _0x55d991(_0x25611c, _0xd1feeb) {
      if (_0xd1feeb !== "local") {
        return;
      }
      if (_0x25611c.lovable_token && _0x25611c.lovable_token.newValue) {
        _0x32eb86(true);
      }
    }
    const _0x547de8 = setTimeout(() => _0x32eb86(false), Math.max(300, _0x414a3c));
    chrome.storage.onChanged.addListener(_0x55d991);
    try {
      window.postMessage({
        type: "lovableRequestToken"
      }, "*");
      setTimeout(() => window.postMessage({
        type: "lovableRequestToken"
      }, "*"), 120);
    } catch (_0x113b0a) {
      _0x32eb86(false);
    }
  });
}
function loadChatHistory(_0x1abf4c) {
  chrome.storage.local.get([QL_HISTORY_KEY], _0xadfe97 => {
    qlChatHistory = _0xadfe97[QL_HISTORY_KEY] || [];
    updateHistoryBadge();
    if (_0x1abf4c) {
      _0x1abf4c();
    }
  });
}
function saveChatHistory() {
  if (qlChatHistory.length > QL_MAX_HISTORY) {
    qlChatHistory = qlChatHistory.slice(-QL_MAX_HISTORY);
  }
  chrome.storage.local.set({
    [QL_HISTORY_KEY]: qlChatHistory
  });
}
function addToChatHistory(_0x5a6f75, _0x257029) {
  qlChatHistory.push({
    text: _0x5a6f75,
    timestamp: new Date().toISOString(),
    status: _0x257029 || "ok"
  });
  saveChatHistory();
  updateHistoryBadge();
}
function updateHistoryBadge() {
  const _0x2f4177 = document.getElementById("ql-history-badge");
  if (!_0x2f4177) {
    return;
  }
  if (qlChatHistory.length > 0) {
    _0x2f4177.textContent = qlChatHistory.length;
    _0x2f4177.style.display = "inline-flex";
  } else {
    _0x2f4177.style.display = "none";
  }
}
function formatChatDate(_0x5c6dcf) {
  var _0x369b19 = new Date(_0x5c6dcf);
  var _0x1a6772 = new Date();
  var _0x1f8382 = new Date(_0x1a6772.getFullYear(), _0x1a6772.getMonth(), _0x1a6772.getDate());
  var _0xe459b5 = new Date(_0x369b19.getFullYear(), _0x369b19.getMonth(), _0x369b19.getDate());
  var _0x257f87 = (_0x1f8382 - _0xe459b5) / 86400000;
  if (_0x257f87 === 0) {
    return "Today";
  }
  if (_0x257f87 === 1) {
    return "Yesterday";
  }
  if (_0x257f87 < 7) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][_0x369b19.getDay()];
  }
  return _0x369b19.toLocaleDateString("en-US");
}
function formatChatTime(_0x8e83a9) {
  var _0x59dc02 = new Date(_0x8e83a9);
  return String(_0x59dc02.getHours()).padStart(2, "0") + ":" + String(_0x59dc02.getMinutes()).padStart(2, "0");
}
function renderHistoryView() {
  const _0x40465c = document.getElementById("ql-tab-content");
  if (!_0x40465c) {
    return;
  }
  if (!qlChatHistory.length) {
    _0x40465c.innerHTML = "<div class=\"ql-chat-empty\"><div style=\"font-size:28px;margin-bottom:8px\">💬</div><div style=\"font-size:13px;font-weight:600;color:var(--ql-text-primary,#f4f4f5)\">Nenhuma mensagem</div><div style=\"font-size:11px;color:var(--ql-text-muted,#71717a);margin-top:4px\">Your sent prompts will appear here.</div></div>";
    return;
  }
  let _0x53156b = "<div class=\"ql-chat-messages\">";
  let _0x426082 = "";
  for (let _0x3ef358 = 0; _0x3ef358 < qlChatHistory.length; _0x3ef358++) {
    const _0x36c3a2 = qlChatHistory[_0x3ef358];
    const _0x2d113d = formatChatDate(_0x36c3a2.timestamp);
    if (_0x2d113d !== _0x426082) {
      _0x53156b += "<div class=\"ql-chat-date-divider\"><span class=\"ql-chat-date-label\">" + _0x2d113d + "</span></div>";
      _0x426082 = _0x2d113d;
    }
    const _0x528004 = _0x36c3a2.status === "error" ? "ql-chat-status-err" : "ql-chat-status-ok";
    const _0x37c4f2 = _0x36c3a2.status === "error" ? "✗ Error" : "✓ Sent";
    const _0x52db32 = _0x36c3a2.text.length > 300 ? escapeHtml(_0x36c3a2.text.substring(0, 300)) + "…" : escapeHtml(_0x36c3a2.text);
    _0x53156b += "<div class=\"ql-chat-bubble\" title=\"" + escapeHtml(_0x36c3a2.text) + "\">" + _0x52db32 + "<div class=\"ql-chat-meta\"><span class=\"" + _0x528004 + "\">" + _0x37c4f2 + "</span><span class=\"ql-chat-time\">" + formatChatTime(_0x36c3a2.timestamp) + "</span></div></div>";
  }
  _0x53156b += "</div>";
  _0x53156b += "<div class=\"ql-chat-actions\"><span class=\"ql-chat-count\">" + qlChatHistory.length + " message" + (qlChatHistory.length === 1 ? "" : "s") + "</span><button class=\"ql-chat-clear\" id=\"ql-chat-clear\">🗑 Clear</button></div>";
  _0x40465c.innerHTML = _0x53156b;
  const _0x4e4b39 = _0x40465c.querySelector(".ql-chat-messages");
  if (_0x4e4b39) {
    _0x4e4b39.scrollTop = _0x4e4b39.scrollHeight;
  }
  const _0x38d9ad = document.getElementById("ql-chat-clear");
  if (_0x38d9ad) {
    _0x38d9ad.addEventListener("click", () => {
      qlChatHistory = [];
      saveChatHistory();
      updateHistoryBadge();
      renderHistoryView();
    });
  }
}
function renderPromptView() {
  const _0x5a69b5 = document.getElementById("ql-tab-content");
  if (!_0x5a69b5) {
    return;
  }
  _0x5a69b5.innerHTML = "<textarea id=\"ql-msg\" rows=\"3\" placeholder=\"Enter your command...\" spellcheck=\"false\"></textarea><div id=\"ql-attach-preview\" class=\"ql-attach-preview\" style=\"display:none\"></div><div class=\"ql-action-bar\"><div class=\"ql-action-left\"><label class=\"ql-toggle\"><input type=\"checkbox\" id=\"ql-modo-plano\"><span class=\"ql-toggle-slider\"></span></label><span class=\"ql-toggle-label-inline\">Modo Plano</span></div><div class=\"ql-action-center\"><button id=\"ql-attach-btn\" class=\"ql-attach-btn\" title=\"Attach file (max 10)\">📎</button><button id=\"ql-optimize-btn\" class=\"ql-tool-btn\" title=\"Optimize with AI\">" + SVG_ICONS.openai + "</button><button id=\"ql-speech-btn\" class=\"ql-tool-btn\" title=\"Voice to text\">" + SVG_ICONS.mic + "</button></div><div class=\"ql-action-right-send\"><button id=\"ql-send\" class=\"ql-send-btn\">Send</button></div></div><input type=\"file\" id=\"ql-file-input\" multiple style=\"display:none\" accept=\"*/*\"><div id=\"ql-log\"></div><div class=\"ql-shortcuts-section\"><span class=\"ql-shortcuts-title\">QUICK SHORTCUTS</span><div class=\"ql-shortcuts-grid\" id=\"ql-chips\"></div></div><button id=\"ql-remove-watermark\" class=\"ql-watermark-btn\">Remove Watermark</button><button id=\"ql-shield-btn\" class=\"ql-shield-btn\"><span id=\"ql-shield-label\">Enable Shield</span></button><button id=\"ql-native-chat-btn\" class=\"ql-native-chat-btn\">Use Default Chat</button><button id=\"ql-download-project\" class=\"ql-watermark-btn\" style=\"background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(37,99,235,0.08));border-color:rgba(59,130,246,0.3);color:#60a5fa;margin-top:6px\">Download Source Code</button><div id=\"ql-download-status\" style=\"display:none\"></div>";
  setupSend();
  setupSuggestionChips();
  setupWatermarkButton();
  setupOptimize();
  setupSpeech();
  setupModoPlano();
  setupFileAttachment();
  setupShield();
  setupNativeChatButton();
  setupClipboardPaste();
  setupDownloadProject();
}
function setupTabs() {
  const _0x4d9c50 = document.querySelectorAll(".ql-tab");
  _0x4d9c50.forEach(_0x3a949e => {
    _0x3a949e.addEventListener("click", () => {
      const _0x57210e = _0x3a949e.getAttribute("data-tab");
      qlActiveTab = _0x57210e;
      document.querySelectorAll(".ql-tab").forEach(_0x52e4e0 => _0x52e4e0.classList.toggle("ql-tab-active", _0x52e4e0.getAttribute("data-tab") === _0x57210e));
      if (_0x57210e === "history") {
        loadChatHistory(() => renderHistoryView());
      } else {
        renderPromptView();
      }
    });
  });
}
function _qlUlid() {
  const _0x50e8d2 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let _0x334d27 = Date.now();
  let _0x5438b0 = "";
  for (let _0x2afa3b = 9; _0x2afa3b >= 0; _0x2afa3b--) {
    _0x5438b0 = _0x50e8d2[_0x334d27 % 32] + _0x5438b0;
    _0x334d27 = Math.floor(_0x334d27 / 32);
  }
  for (let _0x47ae3c = 0; _0x47ae3c < 16; _0x47ae3c++) {
    _0x5438b0 += _0x50e8d2[Math.floor(Math.random() * 32)];
  }
  return _0x5438b0;
}
function sendViaWs(_0x367474, _0x37f854) {
  return new Promise(function (_0x3dedc3, _0x5a0c25) {
    const _0x1acf63 = {
      id: "umsg_" + _qlUlid(),
      message: _0x367474,
      files: [],
      selected_elements: [],
      chat_only: false,
      view: "editor",
      view_description: "",
      optimisticImageUrls: [],
      ai_message_id: "aimsg_" + _qlUlid(),
      thread_id: "main",
      current_page: window.location.pathname || "/",
      current_viewport_width: window.innerWidth || 1280,
      current_viewport_height: window.innerHeight || 800,
      current_viewport_dpr: window.devicePixelRatio || 1,
      model: null
    };
    var _0x27a8c0 = setTimeout(function () {
      window.removeEventListener("message", _0x2a106d);
      _0x5a0c25(new Error("Timeout: WS did not respond"));
    }, 6000);
    function _0x2a106d(_0x4f8591) {
      if (_0x4f8591.source !== window || !_0x4f8591.data) {
        return;
      }
      if (_0x4f8591.data.type !== "lovableWsSendResult") {
        return;
      }
      clearTimeout(_0x27a8c0);
      window.removeEventListener("message", _0x2a106d);
      if (_0x4f8591.data.success) {
        _0x3dedc3();
      } else {
        _0x5a0c25(new Error(_0x4f8591.data.error || "WS send falhou"));
      }
    }
    window.addEventListener("message", _0x2a106d);
    window.postMessage({
      type: "lovableSendViaWs",
      payload: _0x1acf63
    }, "*");
  });
}
chrome.runtime.onMessage.addListener(function (_0x43b41a, _0x8cc68b, _0x30b97c) {
  if (_0x8cc68b.id !== chrome.runtime.id) {
    return;
  }
  if (_0x43b41a.action === "qlSendViaWs") {
    sendNativeToLovable(_0x43b41a.message).then(function () {
      _0x30b97c({
        ok: true
      });
    }).catch(function (_0x53df73) {
      _0x30b97c({
        ok: false,
        error: _0x53df73.message
      });
    });
    return true;
  }
  if (_0x43b41a.action === "qlActivateNativeChat") {
    activateNativeChat();
    _0x30b97c({
      ok: true
    });
    return true;
  }
  if (_0x43b41a.action === "qlDeactivateNativeChat") {
    deactivateNativeChat();
    _0x30b97c({
      ok: true
    });
    return true;
  }
  if (_0x43b41a.action === "qlActivateBypass") {
    activateBypass();
    _0x30b97c({
      ok: true
    });
    return true;
  }
  if (_0x43b41a.action === "qlDeactivateBypass") {
    deactivateBypass();
    _0x30b97c({
      ok: true
    });
    return true;
  }
  if (_0x43b41a.action === "qlQuickProjectInit") {
    quickProjectInit().then(function () {
      _0x30b97c({
        ok: true
      });
    }).catch(function (_0x564dbb) {
      _0x30b97c({
        ok: false,
        error: _0x564dbb.message
      });
    });
    return true;
  }
  if (_0x43b41a.action === "qlRequestToken") {
    requestLatestTokenFromHook().then(function () {
      _0x30b97c({
        ok: true
      });
    }).catch(function () {
      _0x30b97c({
        ok: false
      });
    });
    return true;
  }
});
async function quickProjectInit() {
  if (window.location.pathname.match(/\/projects\/[a-f0-9-]{36}/i)) {
    throw new Error("Use this button on the Lovable home screen, with no project open.");
  }
  const _0x398c9b = document.querySelector("form#chat-input");
  if (!_0x398c9b) {
    throw new Error("Form not found. Make sure you are on the Lovable home screen.");
  }
  const _0x2f54d7 = _0x398c9b.querySelector("[contenteditable=\"true\"]");
  if (!_0x2f54d7) {
    throw new Error("Text field not found.");
  }
  const _0x1ad4c7 = document.getElementById("chatinput-send-message-button");
  if (!_0x1ad4c7) {
    throw new Error("Creation button not found.");
  }
  _0x2f54d7.focus();
  document.execCommand("selectAll", false, null);
  document.execCommand("insertText", false, ".");
  await new Promise(_0x227ae3 => setTimeout(_0x227ae3, 300));
  if (_0x1ad4c7.disabled) {
    _0x1ad4c7.removeAttribute("disabled");
  }
  _0x1ad4c7.click();
  const _0x59e013 = await new Promise(function (_0x23a24d) {
    const _0x51e2ae = 25000;
    const _0x2b8e84 = Date.now();
    const _0x48eb37 = setInterval(function () {
      if (Date.now() - _0x2b8e84 > _0x51e2ae) {
        clearInterval(_0x48eb37);
        _0x23a24d(false);
        return;
      }
      const _0x5d89fa = document.querySelector("button[aria-label=\"Stop generating\"]");
      if (_0x5d89fa && !_0x5d89fa.disabled) {
        clearInterval(_0x48eb37);
        _0x5d89fa.click();
        _0x23a24d(true);
      }
    }, 200);
  });
  if (!_0x59e013) {
    throw new Error("Timeout waiting for Stop. Check whether a project was created in your list.");
  }
}
const MAX_FILES = 10;
const MAX_FILE_SIZE = 20971520;
let qlAttachedFiles = [];
function formatFileSize(_0xa06011) {
  if (_0xa06011 < 1024) {
    return _0xa06011 + " B";
  }
  if (_0xa06011 < 1048576) {
    return (_0xa06011 / 1024).toFixed(1) + " KB";
  }
  return (_0xa06011 / 1048576).toFixed(1) + " MB";
}
function isImageType(_0x28bf8d) {
  return ["image/png", "image/jpeg", "image/webp"].includes(_0x28bf8d);
}
async function compressImage(_0x442c2c) {
  return new Promise(_0x2845fe => {
    const _0x2ac059 = new Image();
    const _0xa0cb3e = URL.createObjectURL(_0x442c2c);
    _0x2ac059.onload = () => {
      URL.revokeObjectURL(_0xa0cb3e);
      const _0x1da5ed = 1280;
      let _0x8013f7 = _0x2ac059.width;
      let _0x10e18c = _0x2ac059.height;
      if (_0x8013f7 > _0x1da5ed || _0x10e18c > _0x1da5ed) {
        const _0x13e330 = Math.min(_0x1da5ed / _0x8013f7, _0x1da5ed / _0x10e18c);
        _0x8013f7 = Math.round(_0x8013f7 * _0x13e330);
        _0x10e18c = Math.round(_0x10e18c * _0x13e330);
      }
      const _0x46fe97 = document.createElement("canvas");
      _0x46fe97.width = _0x8013f7;
      _0x46fe97.height = _0x10e18c;
      const _0x2bf080 = _0x46fe97.getContext("2d");
      _0x2bf080.drawImage(_0x2ac059, 0, 0, _0x8013f7, _0x10e18c);
      const _0x4d49ff = _0x442c2c.type === "image/png" ? "image/png" : "image/jpeg";
      const _0x3a30db = _0x442c2c.type === "image/png" ? undefined : 0.8;
      _0x46fe97.toBlob(_0x569951 => {
        if (!_0x569951) {
          return _0x2845fe({
            file: _0x442c2c,
            previewUrl: null
          });
        }
        const _0x372bdb = new File([_0x569951], _0x442c2c.name, {
          type: _0x4d49ff
        });
        const _0x137cd1 = URL.createObjectURL(_0x569951);
        _0x2845fe({
          file: _0x372bdb,
          previewUrl: _0x137cd1
        });
      }, _0x4d49ff, _0x3a30db);
    };
    _0x2ac059.onerror = () => {
      URL.revokeObjectURL(_0xa0cb3e);
      _0x2845fe({
        file: _0x442c2c,
        previewUrl: null
      });
    };
    _0x2ac059.src = _0xa0cb3e;
  });
}
function decodeJwtUserId(_0x1fc20e) {
  const _0x226de3 = decodeJwtPayload(_0x1fc20e);
  if (!_0x226de3 || typeof _0x226de3 !== "object") {
    return null;
  }
  return _0x226de3.sub || _0x226de3.user_id || null;
}
async function uploadFileDirect(_0x5f5737, _0x85586d) {
  var _0xf85de1 = await new Promise(function (_0x1c1b3f) {
    chrome.storage.local.get(["ql_license_key", "ql_session_id"], _0x1c1b3f);
  });
  if (!qlDeviceId) {
    qlDeviceId = await getDeviceId();
  }
  var _0x312061 = new FormData();
  _0x312061.append("file", _0x5f5737, _0x5f5737 && _0x5f5737.name || "upload.png");
  _0x312061.append("license_key", _0xf85de1.ql_license_key || "");
  _0x312061.append("device_id", qlDeviceId || "");
  _0x312061.append("session_id", _0xf85de1.ql_session_id || qlSessionId || "");
  var _0x3964e7 = await fetch(UPLOAD_FILE_URL, {
    method: "POST",
    headers: {
      "x-license-key": _0xf85de1.ql_license_key || "",
      "x-device-id": qlDeviceId || "",
      "x-session-id": _0xf85de1.ql_session_id || qlSessionId || "",
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
      apikey: SUPABASE_ANON_KEY
    },
    body: _0x312061
  });
  var _0x562ce4 = null;
  try {
    _0x562ce4 = await _0x3964e7.json();
  } catch (_0x3dbe1f) {}
  if (!_0x3964e7.ok || !_0x562ce4 || !_0x562ce4.success) {
    throw new Error(_0x562ce4 && (_0x562ce4.error_display || _0x562ce4.error) || "Upload failed: " + _0x3964e7.status);
  }
  return {
    file_id: _0x562ce4.file_id,
    file_name: _0x5f5737 && _0x5f5737.name || "file",
    public_url: _0x562ce4.public_url
  };
}
function renderAttachPreview() {
  const _0x7ab5f7 = document.getElementById("ql-attach-preview");
  if (!_0x7ab5f7) {
    return;
  }
  if (qlAttachedFiles.length === 0) {
    _0x7ab5f7.style.display = "none";
    _0x7ab5f7.innerHTML = "";
    return;
  }
  _0x7ab5f7.style.display = "flex";
  _0x7ab5f7.innerHTML = qlAttachedFiles.map((_0xbd6605, _0x416a35) => {
    const _0x714cd8 = _0xbd6605.previewUrl ? "<img class=\"ql-attach-thumb\" src=\"" + _0xbd6605.previewUrl + "\" alt=\"\">" : "<div class=\"ql-attach-icon\">📄</div>";
    const _0x5740e0 = _0xbd6605.uploading ? " ql-attach-uploading" : "";
    return "<div class=\"ql-attach-item" + _0x5740e0 + "\" data-idx=\"" + _0x416a35 + "\">" + _0x714cd8 + "<div class=\"ql-attach-info\"><span class=\"ql-attach-name\" title=\"" + escapeHtml(_0xbd6605.file_name) + "\">" + escapeHtml(_0xbd6605.file_name) + "</span><span class=\"ql-attach-size\">" + escapeHtml(_0xbd6605.sizeLabel) + "</span></div><button class=\"ql-attach-remove\" data-idx=\"" + _0x416a35 + "\">✕</button></div>";
  }).join("");
  _0x7ab5f7.querySelectorAll(".ql-attach-remove").forEach(_0x1bd9e9 => {
    _0x1bd9e9.addEventListener("click", _0x5b27bc => {
      _0x5b27bc.stopPropagation();
      const _0x3a7822 = parseInt(_0x1bd9e9.getAttribute("data-idx"));
      if (qlAttachedFiles[_0x3a7822] && qlAttachedFiles[_0x3a7822].previewUrl) {
        URL.revokeObjectURL(qlAttachedFiles[_0x3a7822].previewUrl);
      }
      qlAttachedFiles.splice(_0x3a7822, 1);
      renderAttachPreview();
    });
  });
}
function setupFileAttachment() {
  const _0x2adcd9 = document.getElementById("ql-attach-btn");
  const _0x57747a = document.getElementById("ql-file-input");
  if (!_0x2adcd9 || !_0x57747a) {
    return;
  }
  _0x2adcd9.addEventListener("click", () => {
    if (qlAttachedFiles.length >= MAX_FILES) {
      showCustomAlert("Limit", "Maximum of " + MAX_FILES + " files.");
      return;
    }
    _0x57747a.click();
  });
  _0x57747a.addEventListener("change", async () => {
    const _0x17a44b = Array.from(_0x57747a.files || []);
    _0x57747a.value = "";
    if (!_0x17a44b.length) {
      return;
    }
    const _0x4508db = await new Promise(_0x3f03d1 => chrome.storage.local.get(["lovable_token"], _0x3f03d1));
    let _0x46c3a6 = _0x4508db.lovable_token || "";
    if (_0x46c3a6.startsWith("Bearer ")) {
      _0x46c3a6 = _0x46c3a6.slice(7);
    }
    for (const _0x53d1cd of _0x17a44b) {
      if (qlAttachedFiles.length >= MAX_FILES) {
        showCustomAlert("Limit", "Maximum of " + MAX_FILES + " files reached.");
        break;
      }
      if (_0x53d1cd.size > MAX_FILE_SIZE) {
        showCustomAlert("Large file", _0x53d1cd.name + " excede 20MB.");
        continue;
      }
      let _0x191a47 = _0x53d1cd;
      let _0x569ec1 = null;
      if (isImageType(_0x53d1cd.type)) {
        const _0x41a672 = await compressImage(_0x53d1cd);
        _0x191a47 = _0x41a672.file;
        _0x569ec1 = _0x41a672.previewUrl;
      }
      const _0x262540 = isImageType(_0x191a47.type);
      const _0x4abf1a = qlAttachedFiles.length;
      qlAttachedFiles.push({
        file_id: null,
        file_name: _0x53d1cd.name,
        previewUrl: _0x569ec1,
        file_type: _0x191a47.type,
        sizeLabel: formatFileSize(_0x191a47.size),
        uploading: true,
        rawFile: _0x191a47
      });
      renderAttachPreview();
      try {
        const _0x5569a7 = await uploadFileDirect(_0x191a47, _0x46c3a6);
        qlAttachedFiles[_0x4abf1a].file_id = _0x5569a7.file_id;
        qlAttachedFiles[_0x4abf1a].public_url = _0x5569a7.public_url;
        qlAttachedFiles[_0x4abf1a].uploading = false;
        renderAttachPreview();
      } catch (_0x56fabb) {
        console.warn("[QL Upload] Failed to upload to Supabase Storage:", _0x56fabb.message);
        qlAttachedFiles[_0x4abf1a].uploading = false;
        qlAttachedFiles[_0x4abf1a].uploadFailed = true;
        renderAttachPreview();
        showCustomAlert("Upload Error", "Could not send the image: " + (_0x56fabb.message || "unknown error"));
      }
    }
  });
}
async function sendNativeToLovable(_0x18a2cd) {
  const _0x65326e = document.querySelector("form#chat-input");
  if (!_0x65326e) {
    throw new Error("Lovable chat not found. Open a project.");
  }
  const _0x27f957 = _0x65326e.querySelector("[contenteditable=\"true\"]");
  if (!_0x27f957) {
    throw new Error("Chat editor not found on the page.");
  }
  const _0x4c44d2 = document.getElementById("chatinput-send-message-button");
  if (!_0x4c44d2) {
    throw new Error("Send button not found.");
  }
  _0x27f957.focus();
  document.execCommand("selectAll", false, null);
  document.execCommand("insertText", false, _0x18a2cd);
  await new Promise(_0x4ee166 => setTimeout(_0x4ee166, 200));
  const _0x4e79ce = _0x4c44d2.disabled;
  if (_0x4e79ce) {
    _0x4c44d2.removeAttribute("disabled");
  }
  _0x4c44d2.click();
  if (_0x4e79ce) {
    _0x4c44d2.setAttribute("disabled", "");
  }
}
function setupSend() {
  const _0x2cd458 = document.getElementById("ql-send");
  if (!_0x2cd458) {
    return;
  }
  _0x2cd458.addEventListener("click", async () => {
    var _0x3d0f95 = document.getElementById("ql-msg");
    const _0xe9a837 = _0x3d0f95 ? (_0x3d0f95.value || "").trim() : "";
    const _0x52526c = document.getElementById("ql-log");
    if (!_0xe9a837) {
      if (_0x52526c) {
        _0x52526c.className = "ql-log-error";
        _0x52526c.innerText = "⚠ Prompt vazio";
      }
      return;
    }
    const _0x22a1e5 = qlAttachedFiles.filter(function (_0x138675) {
      return _0x138675.public_url && !_0x138675.uploading && !_0x138675.uploadFailed;
    });
    const _0x299b7e = _0x22a1e5.length > 0;
    var _0x4cd9c4 = _0xe9a837;
    if (_0x299b7e) {
      var _0x2ef60d = _0x22a1e5.map(function (_0xedf1d) {
        return _0xedf1d.public_url;
      }).join("\n");
      var _0x28efc6 = _0x22a1e5.length > 1 ? "Analise os arquivos nos links:\n" : "Analyze the file at the link: ";
      _0x4cd9c4 = _0xe9a837 + "\n\n" + _0x28efc6 + _0x2ef60d;
    }
    try {
      if (_0x52526c) {
        _0x52526c.className = "ql-log-info";
        _0x52526c.innerHTML = _0x299b7e ? "📎 Enviando com imagem..." : SVG_ICONS.clock + " Enviando prompt...";
      }
      _0x2cd458.classList.add("ql-sending");
      _0x2cd458.disabled = true;
      await sendNativeToLovable(_0x4cd9c4);
      if (_0x52526c) {
        _0x52526c.className = "ql-log-success";
        _0x52526c.innerText = _0x299b7e ? "✓ Prompt sent! valid image 😁" : "✓ Prompt sent!";
      }
      try {
        if (typeof QLSounds !== "undefined") {
          QLSounds.promptSent();
        }
      } catch (_0x2ae4b1) {}
      addToChatHistory(_0xe9a837, "ok");
      var _0x7743ac = document.getElementById("ql-msg");
      if (_0x7743ac) {
        _0x7743ac.value = "";
      }
      qlAttachedFiles.forEach(_0x248e3f => {
        if (_0x248e3f.previewUrl) {
          URL.revokeObjectURL(_0x248e3f.previewUrl);
        }
      });
      qlAttachedFiles = [];
      renderAttachPreview();
    } catch (_0x3b9a85) {
      if (_0x52526c) {
        _0x52526c.className = "ql-log-error";
        _0x52526c.innerText = "✗ " + (_0x3b9a85.message || _0x3b9a85);
      }
      addToChatHistory(_0xe9a837, "error");
    } finally {
      _0x2cd458.classList.remove("ql-sending");
      _0x2cd458.disabled = false;
    }
  });
}
let _dragCleanup = null;
let _resizeCleanup = null;
function setupDrag() {
  if (_dragCleanup) {
    _dragCleanup();
    _dragCleanup = null;
  }
  const _0x4070cb = document.getElementById("ql-floating");
  const _0x346a00 = document.getElementById("ql-header");
  if (!_0x4070cb || !_0x346a00) {
    return;
  }
  let _0x471d69 = false;
  let _0x4c0ecd = 0;
  let _0x5ea92b = 0;
  let _0x2f326b = 0;
  let _0x5cbcf2 = 0;
  function _0x5346d9(_0x5c242) {
    var _0x328bdb = _0x5c242.target;
    while (_0x328bdb && _0x328bdb !== _0x346a00) {
      var _0x2c385e = _0x328bdb.nodeName;
      if (_0x2c385e === "BUTTON" || _0x2c385e === "INPUT" || _0x2c385e === "SELECT" || _0x2c385e === "TEXTAREA" || _0x2c385e === "A") {
        return;
      }
      _0x328bdb = _0x328bdb.parentElement;
    }
    if (_0x5c242.pointerType === "mouse" && _0x5c242.button !== 0) {
      return;
    }
    const _0x433ac3 = _0x4070cb.getBoundingClientRect();
    _0x4c0ecd = _0x5c242.clientX;
    _0x5ea92b = _0x5c242.clientY;
    _0x2f326b = _0x433ac3.left;
    _0x5cbcf2 = _0x433ac3.top;
    _0x471d69 = true;
    try {
      _0x346a00.setPointerCapture(_0x5c242.pointerId);
    } catch (_0x377adf) {}
    document.addEventListener("pointermove", _0x227b98);
    document.addEventListener("pointerup", _0x44bb61);
  }
  function _0x227b98(_0x4836e7) {
    if (!_0x471d69) {
      return;
    }
    document.body.style.userSelect = "none";
    let _0x52b235 = _0x2f326b + (_0x4836e7.clientX - _0x4c0ecd);
    let _0x1d78d2 = _0x5cbcf2 + (_0x4836e7.clientY - _0x5ea92b);
    _0x52b235 = Math.max(0, Math.min(_0x52b235, window.innerWidth - _0x4070cb.offsetWidth));
    _0x1d78d2 = Math.max(0, Math.min(_0x1d78d2, window.innerHeight - _0x4070cb.offsetHeight));
    _0x4070cb.style.left = _0x52b235 + "px";
    _0x4070cb.style.top = _0x1d78d2 + "px";
  }
  function _0x44bb61(_0x4b0a52) {
    if (!_0x471d69) {
      return;
    }
    _0x471d69 = false;
    document.body.style.userSelect = "";
    try {
      _0x346a00.releasePointerCapture(_0x4b0a52.pointerId);
    } catch (_0x3db88e) {}
    document.removeEventListener("pointermove", _0x227b98);
    document.removeEventListener("pointerup", _0x44bb61);
    document.body.style.userSelect = "";
  }
  _0x346a00.addEventListener("pointerdown", _0x5346d9, {
    passive: false
  });
  _dragCleanup = function () {
    _0x346a00.removeEventListener("pointerdown", _0x5346d9);
    document.removeEventListener("pointermove", _0x227b98);
    document.removeEventListener("pointerup", _0x44bb61);
  };
}
function setupResize() {
  if (_resizeCleanup) {
    _resizeCleanup();
    _resizeCleanup = null;
  }
  const _0x4acef2 = document.getElementById("ql-floating");
  const _0x4fb64c = document.getElementById("ql-resize-handle");
  if (!_0x4acef2 || !_0x4fb64c) {
    return;
  }
  let _0x4ad1e3 = false;
  let _0x1c9a07 = 0;
  let _0x797b9b = 0;
  function _0x54eecb(_0x643c7c) {
    _0x643c7c.preventDefault();
    _0x643c7c.stopPropagation();
    _0x4ad1e3 = true;
    _0x1c9a07 = _0x643c7c.clientY;
    _0x797b9b = _0x4acef2.offsetHeight;
    try {
      _0x4fb64c.setPointerCapture(_0x643c7c.pointerId);
    } catch (_0x3fba18) {}
    document.addEventListener("pointermove", _0x5405d6);
    document.addEventListener("pointerup", _0x483c70);
    document.body.style.userSelect = "none";
  }
  function _0x5405d6(_0x2f81e2) {
    if (!_0x4ad1e3) {
      return;
    }
    let _0x3c0474 = _0x797b9b + (_0x2f81e2.clientY - _0x1c9a07);
    _0x3c0474 = Math.max(200, Math.min(_0x3c0474, window.innerHeight * 0.8));
    _0x4acef2.style.height = _0x3c0474 + "px";
  }
  function _0x483c70(_0x43f688) {
    if (!_0x4ad1e3) {
      return;
    }
    _0x4ad1e3 = false;
    qlHeight = _0x4acef2.offsetHeight;
    chrome.storage.local.set({
      ql_height: qlHeight
    });
    try {
      _0x4fb64c.releasePointerCapture(_0x43f688.pointerId);
    } catch (_0x30dce7) {}
    document.removeEventListener("pointermove", _0x5405d6);
    document.removeEventListener("pointerup", _0x483c70);
    document.body.style.userSelect = "";
  }
  _0x4fb64c.addEventListener("pointerdown", _0x54eecb, {
    passive: false
  });
  _resizeCleanup = function () {
    _0x4fb64c.removeEventListener("pointerdown", _0x54eecb);
    document.removeEventListener("pointermove", _0x5405d6);
    document.removeEventListener("pointerup", _0x483c70);
  };
}
function setupClipboardPaste() {
  var _0x25060b = document.getElementById("ql-msg");
  if (!_0x25060b) {
    return;
  }
  var _0x58335e = document.getElementById("ql-floating") || _0x25060b;
  var _0xce1c5e = null;
  function _0x5ea592() {
    if (_0xce1c5e) {
      return;
    }
    _0xce1c5e = document.createElement("div");
    _0xce1c5e.className = "ql-drag-overlay";
    _0xce1c5e.innerHTML = "<div class=\"ql-drag-overlay-inner\">📂 Solte os arquivos aqui</div>";
    var _0x398aef = document.getElementById("ql-floating");
    if (_0x398aef) {
      _0x398aef.appendChild(_0xce1c5e);
    }
  }
  function _0x7db7c2() {
    if (_0xce1c5e) {
      _0xce1c5e.remove();
      _0xce1c5e = null;
    }
  }
  _0x58335e.addEventListener("dragover", function (_0x4ba8a9) {
    _0x4ba8a9.preventDefault();
    _0x4ba8a9.stopPropagation();
    _0x5ea592();
  });
  _0x58335e.addEventListener("dragleave", function (_0x4cd22c) {
    _0x4cd22c.preventDefault();
    _0x4cd22c.stopPropagation();
    if (!_0x58335e.contains(_0x4cd22c.relatedTarget)) {
      _0x7db7c2();
    }
  });
  _0x58335e.addEventListener("drop", async function (_0x41cb8b) {
    _0x41cb8b.preventDefault();
    _0x41cb8b.stopPropagation();
    _0x7db7c2();
    var _0xf9889f = Array.from(_0x41cb8b.dataTransfer.files || []);
    if (!_0xf9889f.length) {
      return;
    }
    await handleFilesAttach(_0xf9889f);
  });
  _0x25060b.addEventListener("paste", async function (_0x56bcca) {
    var _0x968d16 = _0x56bcca.clipboardData && _0x56bcca.clipboardData.items;
    if (!_0x968d16) {
      return;
    }
    var _0x23521a = [];
    for (var _0x3d9eb0 = 0; _0x3d9eb0 < _0x968d16.length; _0x3d9eb0++) {
      var _0x4afb18 = _0x968d16[_0x3d9eb0];
      if (_0x4afb18.kind === "file") {
        _0x56bcca.preventDefault();
        var _0x57804b = _0x4afb18.getAsFile();
        if (_0x57804b) {
          _0x23521a.push(_0x57804b);
        }
      }
    }
    if (_0x23521a.length > 0) {
      await handleFilesAttach(_0x23521a);
    }
  });
}
async function handleFilesAttach(_0xc82077) {
  if (qlAttachedFiles.length >= MAX_FILES) {
    showCustomAlert("Limit", "Maximo " + MAX_FILES + " files.");
    return;
  }
  var _0x53baf9 = await new Promise(function (_0x559428) {
    chrome.storage.local.get(["lovable_token"], _0x559428);
  });
  var _0x11e7c8 = _0x53baf9.lovable_token || "";
  if (_0x11e7c8.indexOf("Bearer ") === 0) {
    _0x11e7c8 = _0x11e7c8.slice(7);
  }
  for (var _0x3e479a = 0; _0x3e479a < _0xc82077.length; _0x3e479a++) {
    var _0x3b3db4 = _0xc82077[_0x3e479a];
    if (qlAttachedFiles.length >= MAX_FILES) {
      break;
    }
    if (_0x3b3db4.size > MAX_FILE_SIZE) {
      showCustomAlert("Grande", _0x3b3db4.name + " excede 20MB.");
      continue;
    }
    var _0x185757 = _0x3b3db4;
    var _0x27501e = null;
    if (isImageType(_0x3b3db4.type)) {
      var _0x1cb823 = await compressImage(_0x3b3db4);
      _0x185757 = _0x1cb823.file;
      _0x27501e = _0x1cb823.previewUrl;
    }
    var _0x392145 = qlAttachedFiles.length;
    qlAttachedFiles.push({
      file_id: null,
      file_name: _0x3b3db4.name || "file_" + Date.now(),
      previewUrl: _0x27501e,
      file_type: _0x185757.type,
      sizeLabel: formatFileSize(_0x185757.size),
      uploading: true,
      rawFile: _0x185757
    });
    renderAttachPreview();
    try {
      var _0x110c14 = await uploadFileDirect(_0x185757, _0x11e7c8);
      qlAttachedFiles[_0x392145].file_id = _0x110c14.file_id;
      qlAttachedFiles[_0x392145].uploading = false;
      renderAttachPreview();
    } catch (_0x99d26) {
      qlAttachedFiles[_0x392145].uploading = false;
      qlAttachedFiles[_0x392145].file_id = "local_direct_" + crypto.randomUUID();
      qlAttachedFiles[_0x392145].uploadFailed = true;
      renderAttachPreview();
    }
  }
  showCustomAlert("Anexado 📎", _0xc82077.length + " file(s) added!");
}
var VERSIONS_URL_POPUP = _SB_URL + "/rest/v1/extension_versions?select=version,changelog,file_path,is_alert_active&order=created_at.desc&limit=1&is_alert_active=eq.true";
var USER_ROLES_URL_POPUP = _SB_URL + "/rest/v1/user_roles?select=role";
var CURRENT_EXT_VERSION_POPUP = "3.8.6";
function setupDownloadProject() {
  var _0x1dea9d = document.getElementById("ql-download-project");
  if (!_0x1dea9d) {
    return;
  }
  _0x1dea9d.addEventListener("click", async function () {
    var _0x586ae4 = document.getElementById("ql-download-status");
    _0x1dea9d.disabled = true;
    _0x1dea9d.textContent = "Preparando...";
    if (_0x586ae4) {
      _0x586ae4.style.display = "block";
      _0x586ae4.className = "ql-log-info";
      _0x586ae4.textContent = "Verifying token and project...";
    }
    try {
      try {
        var _0x440851 = _SB_URL + "/rest/v1/feature_flags?select=enabled&flag_key=eq.download_files";
        var _0xb0efe2 = await bgFetch(_0x440851, {
          method: "GET",
          headers: {
            apikey: SUPABASE_ANON_KEY
          }
        });
        if (_0xb0efe2 && _0xb0efe2.length > 0 && _0xb0efe2[0].enabled === false) {
          throw new Error("Error using the extension features.");
        }
      } catch (_0x1c6b38) {
        if (_0x1c6b38 && _0x1c6b38.message === "Error using the extension features.") {
          throw _0x1c6b38;
        }
      }
      var _0x12f0ce = await new Promise(function (_0x19b40f) {
        chrome.storage.local.get(["lovable_token", "lovable_projectId"], _0x19b40f);
      });
      var _0x52760d = _0x12f0ce.lovable_token || "";
      var _0x2241fa = _0x12f0ce.lovable_projectId || "";
      if (_0x52760d.indexOf("Bearer ") === 0) {
        _0x52760d = _0x52760d.slice(7);
      }
      var _0x566d2b = _0x2241fa;
      if (!_0x566d2b) {
        throw new Error("Open a Lovable project page first.");
      }
      if (!_0x52760d) {
        var _0x583f2f = await new Promise(function (_0x3f1f41) {
          chrome.runtime.sendMessage({
            action: "readCookies"
          }, function (_0x58c0c6) {
            _0x3f1f41(_0x58c0c6);
          });
        });
        if (_0x583f2f && _0x583f2f.success && _0x583f2f.tokens && _0x583f2f.tokens.length > 0) {
          _0x52760d = _0x583f2f.tokens[0].token;
        }
      }
      if (!_0x52760d) {
        throw new Error("Token not found. Open a project in Lovable and wait for sync.");
      }
      _0x1dea9d.textContent = "Baixando...";
      if (_0x586ae4) {
        _0x586ae4.textContent = "Downloading project files...";
      }
      var _0x1a9f40 = await new Promise(function (_0x2ef7d6) {
        chrome.runtime.sendMessage({
          action: "downloadProject",
          projectId: _0x566d2b,
          token: _0x52760d
        }, function (_0x44ac50) {
          _0x2ef7d6(_0x44ac50);
        });
      });
      if (!_0x1a9f40 || !_0x1a9f40.success) {
        throw new Error(_0x1a9f40 && _0x1a9f40.error ? _0x1a9f40.error : "Download falhou");
      }
      var _0x4bb8e5 = _0x1a9f40.files;
      if (!_0x4bb8e5 || _0x4bb8e5.length === 0) {
        throw new Error("No files found in the project.");
      }
      if (_0x586ae4) {
        _0x586ae4.textContent = "Criando ZIP com " + _0x4bb8e5.length + " files...";
      }
      _0x1dea9d.textContent = "Empacotando...";
      if (typeof JSZip === "undefined") {
        throw new Error("JSZip not loaded. Use the Side Panel.");
      }
      var _0x58a8b2 = new JSZip();
      var _0x38c694 = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".bmp", ".tiff"];
      var _0x5c13f9 = 0;
      for (var _0x24c019 = 0; _0x24c019 < _0x4bb8e5.length; _0x24c019++) {
        var _0x480d96 = _0x4bb8e5[_0x24c019];
        if (!_0x480d96.name || _0x480d96.sizeExceeded) {
          continue;
        }
        if (_0x480d96.contents && _0x480d96.binary) {
          _0x58a8b2.file(_0x480d96.name, _0x480d96.contents, {
            base64: true,
            binary: true
          });
          _0x5c13f9++;
        } else if (!_0x480d96.contents && _0x38c694.some(function (_0x13e4bb) {
          return _0x480d96.name.toLowerCase().endsWith(_0x13e4bb);
        })) {
          try {
            var _0x1183db = await fetch("https://api.lovable.dev/projects/" + _0x566d2b + "/files/raw?path=" + encodeURIComponent(_0x480d96.name), {
              method: "GET",
              headers: {
                Authorization: "Bearer " + _0x52760d
              },
              credentials: "omit",
              mode: "cors"
            });
            if (_0x1183db.ok) {
              _0x58a8b2.file(_0x480d96.name, await _0x1183db.arrayBuffer(), {
                binary: true
              });
              _0x5c13f9++;
            } else if (_0x480d96.contents) {
              _0x58a8b2.file(_0x480d96.name, _0x480d96.contents);
              _0x5c13f9++;
            }
          } catch (_0x43c24c) {
            if (_0x480d96.contents) {
              _0x58a8b2.file(_0x480d96.name, _0x480d96.contents);
              _0x5c13f9++;
            }
          }
        } else if (_0x480d96.contents) {
          _0x58a8b2.file(_0x480d96.name, _0x480d96.contents);
          _0x5c13f9++;
        }
      }
      var _0x1c55b4 = await _0x58a8b2.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      });
      var _0x1e1c7d = document.createElement("a");
      _0x1e1c7d.href = URL.createObjectURL(_0x1c55b4);
      _0x1e1c7d.download = "lovable-" + _0x566d2b.substring(0, 8) + "-" + new Date().toISOString().split("T")[0] + ".zip";
      document.body.appendChild(_0x1e1c7d);
      _0x1e1c7d.click();
      document.body.removeChild(_0x1e1c7d);
      URL.revokeObjectURL(_0x1e1c7d.href);
      if (_0x586ae4) {
        _0x586ae4.className = "ql-log-success";
        _0x586ae4.textContent = _0x5c13f9 + " arquivos baixados!";
      }
      _0x1dea9d.textContent = "Download Completo!";
      setTimeout(function () {
        _0x1dea9d.textContent = "Download Source Code";
        _0x1dea9d.disabled = false;
        if (_0x586ae4) {
          _0x586ae4.style.display = "none";
        }
      }, 4000);
    } catch (_0x4d481a) {
      if (_0x586ae4) {
        _0x586ae4.className = "ql-log-error";
        _0x586ae4.textContent = _0x4d481a.message || _0x4d481a;
        _0x586ae4.style.display = "block";
      }
      _0x1dea9d.textContent = "Falhou";
      setTimeout(function () {
        _0x1dea9d.textContent = "Download Source Code";
        _0x1dea9d.disabled = false;
      }, 3000);
    }
  });
}
async function checkForUpdatePopup() {
  try {
    var _0x53dffb = await bgFetch(VERSIONS_URL_POPUP, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY
      }
    });
    if (!_0x53dffb || !_0x53dffb.length) {
      return;
    }
    var _0x2dd65f = _0x53dffb[0];
    if (_0x2dd65f.version !== CURRENT_EXT_VERSION_POPUP && _0x2dd65f.is_alert_active) {
      var _0x30fb04 = document.getElementById("ql-update-banner");
      if (_0x30fb04) {
        var _0x7c0588 = _0x2dd65f.file_path ? _SB_URL + "/storage/v1/object/public/extension-releases/" + _0x2dd65f.file_path : null;
        _0x30fb04.innerHTML = "<div style=\"padding:10px 12px;background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.08));border:1px solid rgba(251,191,36,0.3);border-radius:10px;margin:8px 0\"><div style=\"display:flex;align-items:center;gap:6px;margin-bottom:4px\"><span style=\"font-size:14px\">&#128276;</span><strong style=\"font-size:11px;color:#f59e0b\">Nova atualizacao v" + escapeHtml(_0x2dd65f.version) + "!</strong></div><p style=\"font-size:10px;color:#a1a1aa;margin:0 0 6px;white-space:pre-line\">" + escapeHtml(_0x2dd65f.changelog || "") + "</p>" + (_0x7c0588 ? "<a href=\"" + escapeHtml(_0x7c0588) + "\" target=\"_blank\" style=\"display:inline-block;padding:4px 12px;background:#f59e0b;color:#000;border-radius:6px;text-decoration:none;font-size:10px;font-weight:700\">Download v" + escapeHtml(_0x2dd65f.version) + "</a>" : "") + "</div>";
        _0x30fb04.style.display = "block";
      }
    }
  } catch (_0x3891f1) {}
}
async function checkResellerRolePopup() {
  try {
    var _0x294304 = await new Promise(function (_0x205554) {
      chrome.storage.local.get(["ql_license_id"], _0x205554);
    });
    if (!_0x294304.ql_license_id) {
      return;
    }
    var _0x1b3c22 = await bgFetch(_SB_URL + "/rest/v1/user_roles?select=role&license_id=eq." + encodeURIComponent(_0x294304.ql_license_id), {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY
      }
    });
    if (_0x1b3c22 && Array.isArray(_0x1b3c22) && _0x1b3c22.some(function (_0x4e8ac5) {
      return _0x4e8ac5.role === "reseller" || _0x4e8ac5.role === "admin";
    })) {
      var _0x423550 = document.getElementById("ql-reseller-btn");
      if (_0x423550) {
        _0x423550.style.display = "block";
      }
    }
  } catch (_0x532c2b) {}
}
let qlNativeChatActive = false;
let qlNativeChatCleanup = null;
function activateNativeChat() {
  qlNativeChatActive = true;
  chrome.storage.local.set({
    ql_native_chat: true
  });
  const _0x93cff2 = document.getElementById("ql-floating");
  if (_0x93cff2) {
    _0x93cff2.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    _0x93cff2.style.opacity = "0";
    _0x93cff2.style.transform = "scale(0.95) translateX(20px)";
    setTimeout(() => {
      _0x93cff2.style.display = "none";
    }, 350);
  }
  injectNativeChatOverlay();
}
function deactivateNativeChat() {
  qlNativeChatActive = false;
  chrome.storage.local.set({
    ql_native_chat: false
  });
  if (qlNativeChatCleanup) {
    qlNativeChatCleanup();
    qlNativeChatCleanup = null;
  }
  const _0x3ab77e = document.getElementById("ql-native-badge");
  if (_0x3ab77e) {
    _0x3ab77e.remove();
  }
  const _0x4c8dde = document.getElementById("ql-native-return-btn");
  if (_0x4c8dde) {
    _0x4c8dde.remove();
  }
  const _0x66f796 = document.getElementById("chatinput-send-message-button");
  if (_0x66f796) {
    _0x66f796.classList.remove("ql-native-send-active");
    _0x66f796.style.animation = "";
  }
  const _0x5849c9 = document.getElementById("ql-floating");
  if (_0x5849c9) {
    _0x5849c9.style.display = "";
    _0x5849c9.style.opacity = "0";
    _0x5849c9.style.transform = "scale(0.95)";
    requestAnimationFrame(() => {
      _0x5849c9.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      _0x5849c9.style.opacity = "1";
      _0x5849c9.style.transform = "scale(1) translateX(0)";
    });
  } else {
    _buildFloatingUI();
  }
}
function injectNativeChatOverlay() {
  const _0x4eec1e = document.querySelector("form#chat-input");
  if (!_0x4eec1e) {
    setTimeout(injectNativeChatOverlay, 500);
    return;
  }
  if (!document.getElementById("ql-native-badge")) {
    const _0x1758a6 = getComputedStyle(_0x4eec1e).position;
    if (_0x1758a6 === "static") {
      _0x4eec1e.style.position = "relative";
    }
    const _0x40a03a = document.createElement("div");
    _0x40a03a.id = "ql-native-badge";
    _0x40a03a.className = "ql-native-badge";
    _0x40a03a.innerHTML = "⚡ <span>Vibex Academy</span>";
    _0x4eec1e.appendChild(_0x40a03a);
  }
  if (!document.getElementById("ql-native-return-btn")) {
    const _0x336acb = document.createElement("button");
    _0x336acb.id = "ql-native-return-btn";
    _0x336acb.className = "ql-native-return-btn";
    _0x336acb.innerHTML = "← Back to Extension";
    _0x336acb.addEventListener("click", _0x5ccbac => {
      _0x5ccbac.preventDefault();
      _0x5ccbac.stopPropagation();
      deactivateNativeChat();
    });
    _0x4eec1e.parentElement.insertBefore(_0x336acb, _0x4eec1e.nextSibling);
  }
  const _0xc7b51 = document.getElementById("chatinput-send-message-button");
  if (_0xc7b51) {
    _0xc7b51.classList.add("ql-native-send-active");
  }
  function _0x5cd9c1(_0x2ce487) {
    if (!qlNativeChatActive) {
      return;
    }
    const _0xf78187 = _0x4eec1e.querySelector("[contenteditable=\"true\"]");
    const _0x1c6b36 = _0xf78187 ? (_0xf78187.innerText || _0xf78187.textContent || "").trim() : "";
    if (_0x1c6b36) {
      addToChatHistory(_0x1c6b36, "ok");
    }
  }
  function _0x34f9d8(_0x1ff1bc) {
    if (!qlNativeChatActive) {
      return;
    }
    const _0x183004 = _0x4eec1e.querySelector("[contenteditable=\"true\"]");
    const _0x3f11d2 = _0x183004 ? (_0x183004.innerText || _0x183004.textContent || "").trim() : "";
    if (_0x3f11d2) {
      addToChatHistory(_0x3f11d2, "ok");
    }
  }
  function _0x76ab70(_0x214ab0) {
    if (!qlNativeChatActive) {
      return;
    }
    if (_0x214ab0.key === "Enter" && !_0x214ab0.shiftKey) {
      const _0x5c78f8 = _0x4eec1e.querySelector("[contenteditable=\"true\"]");
      const _0x1d3aa1 = _0x5c78f8 ? (_0x5c78f8.innerText || _0x5c78f8.textContent || "").trim() : "";
      if (_0x1d3aa1) {
        addToChatHistory(_0x1d3aa1, "ok");
      }
    }
  }
  if (_0xc7b51) {
    _0xc7b51.addEventListener("click", _0x5cd9c1, true);
  }
  _0x4eec1e.addEventListener("submit", _0x34f9d8, true);
  _0x4eec1e.addEventListener("keydown", _0x76ab70, true);
  qlNativeChatCleanup = function () {
    if (_0xc7b51) {
      _0xc7b51.removeEventListener("click", _0x5cd9c1, true);
    }
    _0x4eec1e.removeEventListener("submit", _0x34f9d8, true);
    _0x4eec1e.removeEventListener("keydown", _0x76ab70, true);
  };
}
async function sendViaNativeChat(_0x29d38d, _0x682baf) {
  addToChatHistory(_0x29d38d, "ok");
}
function showNativeSendingOverlay(_0x450972) {
  const _0x86345c = "ql-native-sending-overlay";
  const _0x2e54c7 = document.getElementById(_0x86345c);
  if (!_0x450972) {
    if (_0x2e54c7) {
      _0x2e54c7.remove();
    }
    return;
  }
  if (_0x2e54c7) {
    return;
  }
  const _0x2b647b = document.createElement("div");
  _0x2b647b.id = _0x86345c;
  _0x2b647b.className = "ql-native-sending-overlay";
  _0x2b647b.innerHTML = "<div class=\"ql-spinner\"></div> Enviando prompt...";
  document.body.appendChild(_0x2b647b);
}
function showNativeChatToast(_0xaed988, _0x100e39) {
  const _0x3aec14 = document.getElementById("ql-native-toast");
  if (_0x3aec14) {
    _0x3aec14.remove();
  }
  const _0x3bdf8e = document.createElement("div");
  _0x3bdf8e.id = "ql-native-toast";
  _0x3bdf8e.className = "ql-native-toast ql-native-toast-" + _0x100e39;
  _0x3bdf8e.textContent = _0xaed988;
  document.body.appendChild(_0x3bdf8e);
  requestAnimationFrame(() => _0x3bdf8e.classList.add("ql-native-toast-visible"));
  setTimeout(() => {
    _0x3bdf8e.classList.remove("ql-native-toast-visible");
    setTimeout(() => _0x3bdf8e.remove(), 300);
  }, 3000);
}
function setupNativeChatButton() {
  const _0x105720 = document.getElementById("ql-native-chat-btn");
  if (!_0x105720) {
    return;
  }
  _0x105720.addEventListener("click", () => {
    activateNativeChat();
  });
}
chrome.storage.local.get(["ql_native_chat"], _0x58f521 => {
  if (_0x58f521.ql_native_chat === true) {
    qlNativeChatActive = true;
    setTimeout(() => {
      const _0xe9e3a1 = document.getElementById("ql-floating");
      if (_0xe9e3a1) {
        _0xe9e3a1.style.display = "none";
      }
      injectNativeChatOverlay();
    }, 500);
  }
});
window.addEventListener("message", _0x53bfb7 => {
  if (!_0x53bfb7.data || _0x53bfb7.data.type !== "lovableTokenFound") {
    return;
  }
  if (_0x53bfb7.origin !== "https://lovable.dev") {
    return;
  }
  const _0x40b9a2 = {};
  if (_0x53bfb7.data.token && typeof _0x53bfb7.data.token === "string") {
    _0x40b9a2.lovable_token = _0x53bfb7.data.token.replace(/^Bearer\s+/i, "").trim();
  }
  if (_0x53bfb7.data.projectId && typeof _0x53bfb7.data.projectId === "string") {
    _0x40b9a2.lovable_projectId = _0x53bfb7.data.projectId;
  }
  if (!Object.keys(_0x40b9a2).length) {
    return;
  }
  chrome.storage.local.set(_0x40b9a2, () => {
    updateSyncStatus();
    setTimeout(updateSyncStatus, 200);
    setTimeout(updateSyncStatus, 800);
  });
});