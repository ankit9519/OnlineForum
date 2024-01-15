const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

answerSchema.methods.vote = function(user, vote) {
    // 'vote' should be either 'up' or 'down'
    const opposite = vote === 'up' ? 'downvotes' : 'upvotes';

    if (this[opposite].includes(user._id)) {
        this[opposite].remove(user._id);
    }
    if (this[vote + 'votes'].includes(user._id)) {
        this[vote + 'votes'].remove(user._id);
    } else {
        this[vote + 'votes'].push(user);
    }

    return this.save();
};

module.exports = mongoose.model('Answer', answerSchema);
