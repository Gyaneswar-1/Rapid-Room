export const googleAuthCallback = (req: any, res: any) => {
    res.cookie("token", `Bearer ${req.user}`, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.redirect("http://localhost:5173/home");
};

export const facebookAuthCallback = (req: any, res: any) => {
    res.cookie("token", `Bearer ${req.user}`, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    });
    res.redirect("http://localhost:5173/home");
};
