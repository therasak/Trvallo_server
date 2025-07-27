const {parse} = require('path')
const UserModel = require('../Models/User')
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthMiddelWare} = require('../middleware/verifyUser')



const UserManage = async (req, res) => {
    console.log(req.body)
    const salt = 10;
    const AddData = JSON.parse(req.body.datas)
    const profilePic = req.file;
    const getUsermail = AddData.email.split('@')[0]
    const userId = `${getUsermail}${uuidv4().slice(0, 8)}`
    const dd = new Date(AddData.dob)
    const dob = new Intl.DateTimeFormat('fr-FR').format(dd)
    const hashedPassword = await bcrypt.hash(AddData.password, salt)
    console.log("Hashed Password", hashedPassword)

    try {

        const GetUser = await UserModel.exists({email: AddData.email})
        // console.log("??", GetUser)
        if (GetUser) {
            // console.log(GetUser)
            return res.json({message: "Mail already exists."});
        }

        else {
            const NewUser = new UserModel({
                userId: userId,
                email: AddData.email,
                userImage: profilePic.filename,
                userName: AddData.userName,
                gender: AddData.gender,
                dateOfBirth: dob,
                role: "User",
                phoneNumber: AddData.number,
                password: hashedPassword,

            })
            await NewUser.save()
            // console.log("saved")
            return res.json({success: "User Saved"});
        }



    } catch (err) {

    }



}




const AuthenticateUser = async (req, res) => {
    // console.log(req.body)
    const userMail = req.body.email;
    const password = req.body.password;

    console.log("Login attempt:");
    // console.log("Email:", userMail);
    // console.log("Password:", password);

    try {
        const IsUser = await UserModel.findOne({email: userMail});

        if (IsUser) {
            // console.log("User found:", IsUser.userId);
            const IsPassword = await bcrypt.compare(password, IsUser.password)
            if (IsPassword) {

                const token = jwt.sign({userId: IsUser.userId}, process.env.JWT_SECRET, {expiresIn: '1d'})
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Lax",
                    maxAge: 24 * 60 * 60 * 1000
                })


                console.log("token", token)



                return res.status(200).json({userId: IsUser.userId});

            } else {
                return res.json({keys: "password", message: "Incorrect password"});
            }
        } else {
            return res.json({keys: "user", message: "User not found"});
        }
    } catch (err) {
        return res.json({keys: "error", message: "Server error"});
    }
};



const GetUserData = async (req, res) => {
    const userId = req.userId;
    // console.log("USerID", userId);
    try {
        const UserData = await UserModel.findOne({userId: userId})
        if (UserData) {
            res.json({UserData: UserData})
        }
        else {
            res.json({error: "No  user data Found"})
        }

    } catch (err) {
        res.json({message: "Something went wrong fetch"})
    }

}


const userLoged = async (req, res) => {
    return res.json({LoggedIn: true, user: req.userId})
}

const userLogOut = async (req, res) => {
    res.clearCookie('token')
    res.json({logOut: true, message: "user Loged out"})
}


const allDestination = async (req, res) => {
    try {
        const destinations=await Destinati
    } catch (err) {

    }
}
module.exports = {UserManage, AuthenticateUser, GetUserData, userLoged, userLogOut};

