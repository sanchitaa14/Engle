const { db } = require("../config/firebase");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;

const createSubscription = async (req, res) => {
    try {
        const { email, userId } = req.body;
        if (!email || !userId) {
            res.status(403).json({ status: "error", message: "please Provide both email and UserId!", token: null });
            return;
        }

        const jsonData = {
            email: email,
            noOfDaysInPlan: 0,
            planEndingDate: 0,
            planStartingDate: 0,
            userId: userId,
            timeStamp: serverTimestamp()
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        await subDocRef.set({
            jsonData
        });

        const token = jwt.sign(jsonData, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ status: "success", message: "subscription create successfully", token: token })
        return;

    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to create Subscription => ${error.message}`, token: null });
        return;
    }
};




// after subscription it will update
const updateSubscription = async (req, res) => {
    try {
        const { email, userId, noOfDaysInPlan, planStartingDate, planEndingDate } = req.body;
        if (!email || !userId || !noOfDaysInPlan || !planStartingDate || !planEndingDate) {
            res.status(403).json({ status: "error", message: "please provide all field!", token: null });
            return;
        }

        const jsonData = {
            email: email,
            noOfDaysInPlan: noOfDaysInPlan,
            planEndingDate: planEndingDate,
            planStartingDate: planStartingDate,
            userId: userId,
            timeStamp: serverTimestamp()
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        await subDocRef.update({
            jsonData
        });

        const token = jwt.sign(jsonData, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ status: "success", message: "subscription update successfully", token: token })
        return;

    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to update Subscription => ${error.message}`, token: null });
        return;
    }
};




const generateToken = async (req, res) => {
    try {
        const { email, userId } = req.body;
        if (!email || !userId) {
            res.status(403).json({ status: "error", message: "please Provide both email and UserId!", token: null });
            return;
        }

        const docRef = db.collection("subscription").doc(userId);
        const subCollectionRef = docRef.collection("userData");
        const subDocRef = subCollectionRef.doc(userId);
        const doc = await subDocRef.get();

        // means our user is first time login and there is no data in subscription field.
        if (!doc.exists) {
            res.status(200).json({ status: "success", message: "No such user Found!", token: null });
            return;
        } else {
            const data = doc.data();
            const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.status(200).json({ status: "success", message: "token generated successfully", token: token })
            return;
        }

    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to generate token => ${error.message}`, token: null });
        return;
    }
};




// check if token is expire or not 
const validateToken = async (req, res) => {

    try {
        let { token } = req.body;
        if (!token) {
            res.status(403).json({ status: "error", message: "please Provide token!", isexpire: true });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(200).json({ status: "success", message: "Token is expired", isexpire: true });
                return;
            }
            else {
                res.status(200).json({ status: "success", message: "Token is still valid", isexpire: false });
                return;
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to validate token => ${error.message}`, isexpire: true });
        return;
    }
}




// get subscription data from token
const getSubscriptionData = async (req, res) => {
    try {

        let { token } = req.body;
        if (!token) {
            res.status(403).json({ status: "error", message: "please Provide token!", data: null });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("error", err);
                res.status(400).json({ status: "error", message: "Token doesn't have expiration information or is malformed", data: null });
                return;
            }
            else {
                res.status(200).json({ status: "success", message: "Token is still valid", data: decoded });
                return;
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: `some error to validate token => ${error.message}`, data: null });
        return;
    }
}



module.exports = {
    createSubscription, updateSubscription, generateToken, validateToken, getSubscriptionData
};