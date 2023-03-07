import * as OTPAuth from "otpauth";

let secretSave
export const buildTestTotp = (token,userSec) =>{
    let totp = new OTPAuth.TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret:  userSec
      });
      
      return (totp.validate({
            token: token,
            window: 1,
          }))
          
}

// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
  issuer: "BMTSC.org",
  label: "added " + Date(),
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret:  random32bit()
});
function random32bit() {
   var regex= /^(?:[A-Z2-7]{8})*(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}=)?$/;
var secret
   while ( !regex.test(secret)){
    let u = new Uint32Array(1);
    window.crypto.getRandomValues(u);
    let str = u[0].toString(16).toUpperCase();
    secret = '00000000'.slice(str.length) + str;
   }
   
   secretSave = secret
   return (secret)
}

export const getSecret = () =>{
    return secretSave
}
// Generate a token.


// Validate a token.
export const validate = (token)=>{
return totp.validate({
    token: token,
    window: 1,
  })
  
}
// Convert to Google Authenticator key URI:
//   otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30
let uri = totp.toString(); // or 'OTPAuth.URI.stringify(totp)'

// Convert from Google Authenticator key URI.
let parsedTotp = OTPAuth.URI.parse(uri);
export const testURI = () =>{
    var QRCode = require('qrcode')
    let exportURL
    QRCode.toDataURL(uri, function (err, url) {
        exportURL = url
    })
    let token = totp.generate();
    
return (exportURL)
}