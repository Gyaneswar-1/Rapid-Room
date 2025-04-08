export const verifyEmail = async (req, res) => {
    // get the otp and the emial in the body,
    // compre it with the user db token
    // if verifyed then store user data email verifyed and delete the user token
    // if not send the error msg to the frontend
    return res.json({
        msg: "email verifyed successfully by bibek and gyana"
    });
};
