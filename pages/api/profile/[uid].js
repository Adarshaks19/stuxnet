import User from '../../../models/User'
import dbConnect from "../../../lib/dbconnect";
dbConnect();

async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const { uid, roll,username,email, image, github, linkedIn, insta, bio, branch, yearofgraduation, hostel, room, phone } = req.body;
            const User_instance = await User.updateOne({uid:uid},{
                uid: uid,
                username:username,
                image:image,
                email:email,
                roll: roll,
                github: github,
                linkedIn: linkedIn,
                insta: insta,
                bio: bio,
                branch: branch,
                yearofgraduation: yearofgraduation,
                hostel: hostel,
                room: room,
                phone: phone

            },{upsert:true});
            res.status(200).json({ message: "user Added", Status: "Success" });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.status(400).send(response);
        }
    }
    if (req.method === "GET") {
        const { uid } = req.query;
        try {
            console.log("hello world");
            const user_instance = await User.findOne({ uid });
            res.status(200).json({
                message: "All User  fetched",
                Status: "Success",
                users: user_instance,
            });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.send(response).status(400);
        }
    }
    if (req.method === "PUT") {
        try {
            const { uid, _id, type } = req.body;
            const dtype = type === 'upvotes' ? 'downvotes' : 'upvotes';
            const confession_instance = await Confession.findOne({ _id })
            confession_instance[type].push(uid);
            confession_instance[dtype].pull(uid);
            await confession_instance.save();
            res.status(200).json({ message: "content Added", Status: "Success", _id });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.status(400).send(response);
        }
    }
}

export default handler;
