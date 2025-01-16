const router = require("express").Router();
const passport = require("passport");

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// Login failure route
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failure",
  });
});

// Login success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(401).json({
      error: true,
      message: "Not Authorized",
    });
  }

  console.log(req.user);
});

// Google OAuth login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

// Export the router
module.exports = router;
