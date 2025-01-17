const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController")

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

// Login failure route
router.get("/login/failed", authController.LoginFailed);

// Login success route
router.get("/login/success", authController.LoginSuccess);

// Google OAuth login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Logout route
router.get("/logout", authController.LogOut);

// Export the router
module.exports = router;
