// Importing the OTPAuth library
import * as OTPAuth from "otpauth";

// Declaring a variable to save the secret
let secretSave;

// Function to build a test TOTP
export const buildTestTotp = (token,userSec) => {
  console.log("buildTestTotp called with token:", token, "secret:", userSec);
  
  try {
    // Creating a new TOTP object with specified options
    let totp = new OTPAuth.TOTP({
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: userSec
    });
    
    // Validating the TOTP with the given token and window
    const result = totp.validate({
      token: token,
      window: 1,
    });
    
    console.log("Validation result:", result);
    return result;
  } catch (error) {
    console.error("Error validating TOTP:", error);
    return null;
  }
}

// Creating a new TOTP object with specified options and a random secret
let totp = new OTPAuth.TOTP({
  issuer: "BMTSC.org",
  label: "added " + Date(),
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret:  random32bit()
});

// Function to generate a random 32-bit secret
function random32bit() {
  // Regex to validate the secret
  var regex= /^(?:[A-Z2-7]{8})*(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}=)?$/;
  var secret;
  // Generating a new secret until it matches the regex
  while (!regex.test(secret)) {
    let u = new Uint32Array(1);
    window.crypto.getRandomValues(u);
    let str = u[0].toString(16).toUpperCase();
    secret = '00000000'.slice(str.length) + str;
  }
  // Saving the secret
  secretSave = secret;
  // Returning the secret
  return secret;
}

// Function to get the saved secret
export const getSecret = () => {
  return secretSave;
}

// Function to validate a token
export const validate = (token) => {
  return totp.validate({
    token: token,
    window: 1,
  });
}

// Converting the TOTP to a Google Authenticator key URI
let uri = totp.toString();

// Parsing the TOTP from a Google Authenticator key URI
let parsedTotp = OTPAuth.URI.parse(uri);

// Function to test the Google Authenticator key URI
export const testURI = () => {
  let exportURL = uri;
  return exportURL;
}
