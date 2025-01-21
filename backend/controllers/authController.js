export function LoginFailed(req, res) {
  return res.status(401).json({
    error: true,
    message: "Login Failure",
  });
}

export function LoginSuccess(req, res) {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.user,
      message: "Successfully Logged In",
    });
  } else {
    return res.status(401).json({
      isAuthenticated: false,
      message: "Not Authorized",
    });
  }
}

export function LogOut(req, res) {
  console.log("Logout route hit");

  req.logout((err) => {
      if (err) {
          console.error("Error during logout:", err);
          return res.status(500).json({ error: true, message: "Logout failed" });
      }

      req.session.destroy((err) => {
          if (err) {
              console.error("Error destroying session:", err);
              return res.status(500).json({ error: true, message: "Session destruction failed" });
          }

          console.log("Session destroyed successfully");
          res.clearCookie("connect.sid", { path: "/" }); // Ensure cookie is cleared
          res.status(200).json({ success: true, message: "Logout successful" });
      });
  });
}
