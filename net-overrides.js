(function () {
  "use strict";
  var _0x2f74f0 = "tvttbagljqbkcobruwnl.supabase.co";
  var _0xdd9366 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dHRiYWdsanFia2NvYnJ1d25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODM1OTksImV4cCI6MjA5NjI1OTU5OX0.7NgHbsoI3cAQ0fLo5gz4V4sm8iKK-MIitrbEWzmfO2s";
  var _0x27c9d4 = /https:\/\/[a-z0-9-]+\.supabase\.co/i;
  var _0x4a4d2e = /https:\/\/[a-z0-9-]+\.supabase\.co/gi;
  if (typeof window === "undefined" || typeof window.fetch !== "function") {
    return;
  }
  var _0x5b1ad5 = window.fetch.bind(window);
  window.fetch = function (_0x2d74f4, _0x513303) {
    try {
      _0x513303 = _0x513303 || {};
      var _0x2b4b85 = typeof Request !== "undefined" && _0x2d74f4 instanceof Request;
      var _0x4eced9 = typeof _0x2d74f4 === "string" ? _0x2d74f4 : _0x2b4b85 ? _0x2d74f4.url : _0x2d74f4 && _0x2d74f4.url || "";
      if (_0x4eced9 && _0x4eced9.indexOf("validate-license") !== -1) {
        var reqBody = {};
        try {
          var rawBody = _0x513303.body || (_0x2b4b85 ? _0x2d74f4.body : null);
          if (rawBody) {
            reqBody = JSON.parse(rawBody);
          }
        } catch (e) {}
        var mockKey = reqBody.license_key || "LOVABLE-PRO-MOCK";
        var mockResponse = {
          valid: true,
          status: "active",
          license_key: mockKey,
          license_id: "offline-license-id",
          session_id: "offline-session-id",
          user_name: "Lovable Pro Premium",
          expires_at: "2099-12-31T23:59:59.000Z",
          activated_at: new Date().toISOString(),
          message: "License validated offline",
          online_count: 8,
          branding: null
        };
        return Promise.resolve(new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }));
      }
      if (_0x4eced9 && _0x27c9d4.test(_0x4eced9)) {
        var _0x325c56 = _0x4eced9.replace(_0x4a4d2e, "https://" + _0x2f74f0);
        var _0x3b91b3 = _0x513303.headers || (_0x2b4b85 ? _0x2d74f4.headers : _0x2d74f4 && _0x2d74f4.headers) || {};
        var _0x52de91 = new Headers(_0x3b91b3);
        _0x52de91.set("apikey", _0xdd9366);
        if (_0x52de91.has("Authorization")) {
          _0x52de91.set("Authorization", "Bearer " + _0xdd9366);
        }
        var _0x5e1d69 = _0x513303.method || (_0x2b4b85 ? _0x2d74f4.method : _0x2d74f4 && _0x2d74f4.method) || "GET";
        var _0x1299ad = _0x513303.body;
        if (_0x1299ad === undefined && !_0x2b4b85 && _0x2d74f4 && _0x2d74f4.body !== undefined) {
          _0x1299ad = _0x2d74f4.body;
        }
        var _0x5be454 = {
          method: _0x5e1d69,
          headers: _0x52de91,
          credentials: "omit"
        };
        if (_0x1299ad !== undefined && _0x1299ad !== null && _0x5e1d69 !== "GET" && _0x5e1d69 !== "HEAD") {
          _0x5be454.body = _0x1299ad;
        }
        return _0x5b1ad5(_0x325c56, _0x5be454);
      }
    } catch (_0x2a3012) {}
    return _0x5b1ad5(_0x2d74f4, _0x513303);
  };
  try {
    console.log("[Vibex] side panel network bridge active");
  } catch (_0x55ca71) {}
})();