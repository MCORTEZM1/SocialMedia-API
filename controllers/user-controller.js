const { User, Thought } = require('../models');

const userController = { 
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts friends',
                select: '-__v '

            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err =>{
                console.log(err);
                res.status(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: ' No user not found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400),json(err);
            });
    },

    createUser( { body } , res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUserInfo({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body,{ new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(async dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                console.log(dbUserData);
                return await Thought.deleteMany({ username: dbUserData.userName })
                    .then(dbUserData => res.json(dbUserData))
                    .catch(e => res.json(e))
            })
            .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: params.friendId }},
            { new: true }
        )
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
                
                // can also add user to friendId's friend list like below. 
                // not included here since usually there is a User confirmation of the relationship.
                
                /* 
                return User.findOneAndUpdate(
                    { _id: params: params.friendId},
                    { $addToSet: { friends: params.userId}}
                )
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No user found with this id!'});
                            return;
                        }
                        return User.findOne({_id: params.userId})
                    });
                */
            })
            .catch(err => res.json(err));
    }, 

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true}
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },


};

module.exports = userController; 