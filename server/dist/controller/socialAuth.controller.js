export const googleAuthCallback = (req, res) => {
    res.cookie("token", `Bearer ${req.user}`, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
    });
    res.redirect("https://rapidroom.tech");
};
export const facebookAuthCallback = (req, res) => {
    res.cookie("token", `Bearer ${req.user}`, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
    });
    res.redirect("https://rapidroom.tech");
};
