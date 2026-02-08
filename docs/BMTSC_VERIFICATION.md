# BMTSC Membership Verification

## Overview

The BMTSC app requires users to be members of the BMTSC (Black Magic Trading Services Center) organization in Star Citizen. During registration, the system automatically verifies organization membership by checking the user's RSI profile.

---

## How It Works

### Registration Flow

1. **User Input**: User enters their RSI player handle (e.g., "3D-Printed-Cat")
2. **OTP Verification**: System validates the one-time password (2FA)
3. **BMTSC Verification**: System checks if user is a member of BMTSC
4. **Account Creation**: If verified, user account is created

### Technical Implementation

The verification process:

1. Frontend sends playerTag to backend verification endpoint
2. Backend fetches the user's RSI organizations page
3. Backend searches HTML content for BMTSC indicators:
   - Organization name "BMTSC"
   - Full name "Black Magic Trading"
   - Organization URL `/orgs/BMTSC`
   - Organization SID `sid=BMTSC`
4. Backend returns verification result to frontend
5. Frontend proceeds with account creation or blocks registration

---

## Frontend Implementation

### User Creation with Built-in Verification

The frontend calls the user creation endpoint, which automatically verifies BMTSC membership.

**Backend Endpoint:**
```
POST http://localhost:3000/createUser/
```

### Code Location

**File:** `/src/components/logicForLogin.js`

**Key Function:** `onFinish()` in `LoginForm` component

**User Creation Code:**
```javascript
axios
  .post("http://localhost:3000/createUser/", {
    playerTag: values.playerTag,
    password: values.password,
    totp: token
  })
  .then((response) => {
    message.success("User created successfully");
    // Proceed with login
  })
  .catch((error) => {
    // If BMTSC verification fails, backend returns error
    const errorMsg = error.response?.data?.error || "Error creating user";
    message.error(errorMsg);
  });
```

---
## User Experience

### Loading States

- **Loading Message**: "Creating user account..."
- **Duration**: Typically 2-5 seconds (includes BMTSC verification)
- **Dismissal**: Automatic on completion

### Success Flow

1. ✅ "User created successfully" (verification passed)
2. ↻ Page reload → User logged in
3. ↻ Page reload → User logged in

### Error Scenarios

1. **Not a Member**
   - **Message**: Backend returns error like "You must be a member of BMTSC to create an account"
   - **HTTP Status**: 400 or 403
   - **Action**: Registration blocked

2. **Verification Failed**
   - **Message**: Backend returns error like "Unable to verify BMTSC membership"
   - **HTTP Status**: 500
   - **Cause**: Network error, RSI website down
   - **Action**: Registration blocked, user can retry

3. **Invalid Player Handle**
   - **Cause**: RSI page not found (404)
   - **HTTP Status**: 400
   - **Message**: Backend returns validation error
   - **Action**: User should check spelling of handle

---

## Backend Implementation

**This is the required implementation for the backend server.**

### RSI Organizations URL

The backend should fetch:
```
https://robertsspaceindustries.com/en/citizens/{playerTag}/organizations
```

This page contains the user's organization memberships in HTML format.

### User Creation Endpoint with Built-in Verification

**Endpoint:** `POST /createUser/`

The backend should verify BMTSC membership **before** creating the user account.

**Request:**
```json
{
  "playerTag": "3D-Printed-Cat",
  "password": "hashedPassword",
  "totp": "secretToken"
}
```

**Response (Success - User Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "playerTag": "3D-Printed-Cat"
}
```

**Response (Error - Not BMTSC Member):**
```json
{
  "success": false,
  "error": "You must be a member of BMTSC to create an account. Please join BMTSC first at robertsspaceindustries.com"
}
```
**HTTP Status:** 403

**Response (Error - Verification Failed):**
```json
{
  "success": false,
  "error": "Unable to verify BMTSC membership. Please try again later."
}
```
**HTTP Status:** 500

### Why Backend?

- ✅ No CORS issues
- ✅ Caching capability
- ✅ Rate limit control
- ✅ Retry logic
- ✅ Logging/monitoring
- ✅ Multiple verification methods

### Backend Implementation Example

```javascript
// Node.js/Express example - createUser endpoint with BMTSC verification
app.post('/createUser/', async (req, res) => {
  const { playerTag, password, totp } = req.body;
  
  try {
    // Step 1: Verify BMTSC membership
    let isMember = false;
    
    // Check cache first (optional but recommended)
    const cached = await cache.get(`bmtsc:${playerTag}`);
    if (cached !== null) {
      isMember = cached;
    } else {
      // Fetch RSI profile
      const rsiUrl = `https://robertsspaceindustries.com/en/citizens/${playerTag}/organizations`;
      const response = await axios.get(rsiUrl);
      const html = response.data;
      
      // Check for BMTSC
      isMember = html.includes('BMTSC') || 
                 html.includes('Black Magic Trading') ||
                 html.includes('/orgs/BMTSC') ||
                 html.includes('sid=BMTSC');
      
      // Cache result for 24 hours
      await cache.set(`bmtsc:${playerTag}`, isMember, 86400);
    }
    
    // Step 2: Block registration if not a member
    if (!isMember) {
      return res.status(403).json({ 
        success: false, 
        error: 'You must be a member of BMTSC to create an account. Please join BMTSC first at robertsspaceindustries.com'
      });
    }
    
    // Step 3: Create user account (only if BMTSC member)
    const user = await db.createUser({
      playerTag,
      password: hashPassword(password),
      totp
    });
    
    res.json({ 
      success: true, 
      message: 'User created successfully',
      playerTag 
    });
    
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Unable to verify BMTSC membership. Please try again later.'
    });
  }
});
```

---

## Testing

### Manual Test Flow

1. Enter a valid BMTSC member handle
2. Enter password
3. Complete OTP field
4. Click "Create User"
5. Observe loading message: "Creating user account..."
6. If BMTSC member: See "User created successfully" message
7. If not BMTSC member: See error message about BMTSC requirement
8. Confirm account creation and login

### Test Scenarios

| Scenario | Player Handle | Expected Result |
|----------|--------------|----------------|
| Valid Member | Real BMTSC member | ✅ Account created |
| Non-Member | Valid RSI user not in BMTSC | ❌ Registration blocked |
| Invalid Handle | Fake/typo handle | ❌ Verification failed |
| Network Error | Any handle | ❌ Verification failed |

### Test with Developer Tools

```javascript
// In browser console, test user creation with BMTSC verification
const testUserCreation = async (playerTag, password, totp) => {
  try {
    const response = await fetch('http://localhost:3000/createUser/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerTag, password, totp })
    });
    const data = await response.json();
    console.log('User creation result:', data);
    return data.success;
  } catch (error) {
    console.error('User creation error:', error);
    return false;
  }
};

// Test it (use real credentials)
testUserCreation('3D-Printed-Cat', 'testPassword', 'testToken');
```

---

## Troubleshooting

### Common Issues

**Issue: "Unable to verify BMTSC membership"**
- **Cause**: Backend unreachable, RSI website down, network issue
- **Solution**: Check backend logs, verify RSI website is accessible
- **User Action**: Try again in a few minutes

**Issue: False negatives (member rejected)**
- **Cause**: RSI page structure changed, search strings outdated
- **Solution**: Update search patterns in backend code
- **Quick Fix**: Add more search strings to backend verification logic

**Issue: Verification too slow**
- **Cause**: RSI website slow, network latency
- **Solution**: Implement caching in backend
- **Alternative**: Add retry logic with exponential backoff

**Issue: Backend returns error**
- **Cause**: Backend server down, database issue
- **Solution**: Check backend server status and logs
- **User Action**: Contact support if issue persists

---

## Security Considerations

1. **Backend Verification**: Verification is handled server-side and cannot be bypassed by modifying frontend code
2. **Rate Limiting**: Implement rate limiting on the `/createUser/` endpoint to prevent abuse
3. **Caching**: Cache successful verifications to reduce RSI server load
4. **Input Validation**: Sanitize playerTag input to prevent injection attacks
5. **Timeout Handling**: Set appropriate timeouts for RSI API calls

---

## Future Enhancements

- [x] Backend verification integrated into user creation
- [ ] Verification result caching (24-hour TTL recommended)
- [ ] Manual verification override (admin only)
- [ ] Periodic re-verification of existing users
- [ ] Support for affiliate organization checking
- [ ] Verification badge in user profile
- [ ] Notification when membership status changes
- [ ] Webhook notifications to RSI org changes
- [ ] Retry logic with exponential backoff for RSI API failures

---

## Related Documentation

- RSI Organization API (if available)
- [Homepage API Documentation](./HOMEPAGE_API.md)
- Main README: `/workspaces/bmtapp/README.md`
