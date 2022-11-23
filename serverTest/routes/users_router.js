import { User } from "../Schemas/user.schema.js";

const userPost = {
    create: function(req, res) {
        var data = req.body;
        var user = new User();

        user.name = data.name;
        user.email = data.email;
        user.country = data.country;

        user.save((err, userSaved) => {

            if(err) {
                return res.status(500).send({
                    data: {
                        error: "Form can't be send"
                    }
                });
            }

            return res.status(201).send({
                data: {
                    message: "Form sent!"
                }
            });
        });
    }
}

export {userPost};