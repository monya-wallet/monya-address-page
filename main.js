require("./style.css")
const qrcode = require("qrcode")

const queries = location.search.substr(1).split("&").reduce(function (a, b) {
  const kv = b.split("=");
  a[kv[0]] = (kv[1])
  return a;
}, {});
console.log(queries)

let url = queries.scheme + ":" + queries.address + "?amount=" + parseFloat(queries.amount || 0) + "&message=" + (queries.message || "") + "&req-opreturn=" + (queries["req-opreturn"] || "") + "&label=" + (queries.label || "");

let monyaAppUrl=url
if (/Android/.test(navigator.userAgent)) {
  monyaAppUrl="intent://" + queries.address + "?amount=" + parseFloat(queries.amount || 0) + "&message=" + (queries.message || "") + "&req-opreturn=" + (queries["req-opreturn"] || "") + "&label=" + (queries.label || "") + "#Intent;scheme=" + queries.scheme + ";package=org.missmonacoin.monya;end"
}

let webUrl="https://monya-wallet.github.io/wallet?url="+encodeURIComponent(url)
if("NEM_APOSTILLE_BITCONIN"===queries.address){
   webUrl="https://missmonacoin.github.io/bitconin-nem-wallet?url="+encodeURIComponent(url)
}
function $(id){
  return document.getElementById(id)
}

$("openMonyaWeb").href=webUrl
$("notOpen").href=monyaAppUrl
$("openMonya").href=monyaAppUrl
$("openWallet").href=url

$("openMonya").addEventListener("click",function(e){
  $("openMonya").style.display="none"
  $("notOpen").style.display="inline-block"
})

if (queries.address) {
  $("addressInput").value=queries.address
}
$("amount").innerText=queries.amount||0
$("unit").innerText=queries.scheme||"まい"
if (queries.message) {
  $("message").innerText=decodeURIComponent(queries.message)
}
if (queries["req-opreturn"]) {
  $("opreturn").innerText=decodeURIComponent(queries["req-opreturn"])
}
if(queries.address){
qrcode.toDataURL(url,{
  errorCorrectionLevel: 'M',
  type: 'image/png'
},(err,url)=>{
  $("qrcode").src=url
})

}












