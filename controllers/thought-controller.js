const { Thought, User } = require('../models');

const thoughtController = { 

    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 }) // return newest thought first
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            })
    },


    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
  
    addThought({ params, body }, res) {
        console.log(body);

        Thought.create(body)
            .then(({ _id }) => {

                console.log(params);
               
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { thoughts: _id }},
                    { new: true}
                )
                .populate({
                    path: 'thoughts friends',
                    select: '-__v'
                })
            })

            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },


    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id})
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(deletedThought);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },


    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!'});
                    return;
                }
                res.json(dbThoughtData)})
            .catch(err => res.json(err));
    },
};


module.exports = thoughtController;