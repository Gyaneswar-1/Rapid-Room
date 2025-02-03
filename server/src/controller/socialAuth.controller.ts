export const googleAuthCallback = (req:any, res:any) => {
  res.cookie("token", req.user.token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.redirect("http://localhost:5173/home");
};

export const facebookAuthCallback = (req:any, res:any) => {
  res.cookie("token", req.user.token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.redirect("http://localhost:5173/home");
};
