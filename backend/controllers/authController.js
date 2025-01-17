

export function LoginFailed(req, res) {
    return res.status(401).json({
      error: true,
      message: "Login Failure",
    });
}

export function LoginSuccess(req, res) {
    // console.log(req._passport)

    console.log("rererererer",req.isAuthenticated())
    
    if (req.isAuthenticated()) {
        return res.json({ isAuthenticated: true, user: req.user });
      } else {
        return res.json({ isAuthenticated: false });
      }


    // if (req.user) {
    //   return res.status(200).json({
    //     error: false,
    //     message: "Successfully Logged In",
    //     user: req.user,
    //   });
    // } else {
    //   return res.status(401).json({
    //     error: true,
    //     message: "Not Authorized",
    //   });
    // }
  }

export function LogOut(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: true, message: "Logout failed" });
      }
      res.redirect(process.env.CLIENT_URL);
    });
  }