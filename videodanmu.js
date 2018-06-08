'use strict'

function video(props) {
    this.name = props.name;
    this.hash = props.hash;
    this.type = props.type;
    this.author = 0;
}

function comment(props) {
    this.hash = props.hash;
    this.comment = props.comment;
    this.author = 0;
}

function createVideo(props) {
    return new video(props);
}

function createComment(props) {
    return new comment(props);
}

var videoDanmu = function () {
    // LocalContractStorage.defineMapProperty(this, "namequery", null);
    LocalContractStorage.defineMapProperty(this, "videoListQuery", null);
    LocalContractStorage.defineMapProperty(this, "videoNameQuery", null);
    LocalContractStorage.defineMapProperty(this, "allCommentQuery", null);
};

videoDanmu.prototype = {
    init: function () {
    },

    AddVideoList: function (name, hash) {
        var props = {};
        props.name = name;
        props.hash = hash;
        props.type = 'all';

        var newVideo = createVideo(props);
        newVideo.author = Blockchain.transaction.from;

        var vlq = this.videoListQuery.get(props.type);
        var vnq = this.videoNameQuery.get(props.name);
        if (!vlq) {
            vlq = [];
        }
        if (!vnq) {
            vnq = [];
        }
        vlq.push(newVideo);
        vnq.push(newVideo);
        this.videoListQuery.put(props.type, vlq);
        this.videoNameQuery.put(props.name, vnq);
        return 'success';
    },
    AddVideoComment: function (hash, comment) {
        var props = {};
        props.comment = comment;
        props.hash = hash;

        var newComment = createComment(props);
        newComment.author = Blockchain.transaction.from;

        var acq = this.allCommentQuery.get(props.hash);
        if (!acq) {
            acq = [];
        }
        acq.push(newComment);
        this.allCommentQuery.put(props.hash, acq);
        return 'success';
    },
    VideoListQuery: function () {
        var vlq = this.videoListQuery.get('all');
        return vlq;
    },
    VideoNameQuery: function (name) {
        name = name.trim();
        var vnq = this.videoNameQuery.get(name);
        return vnq;
    },
    VideoCommetQuery: function (hash) {
        hash = hash.trim();
        var acq = this.allCommentQuery.get(hash);
        return acq;
    }
};
module.exports = videoDanmu;

// n1gsCGza2PHsPyUnYkHz1ye8yinVnNsjCEy
// f1f886918f9b7ef39d798e3579d434bb30ed395a572115a654419564d79478ab

// QmU1GSqu4w29Pt7EEM57Lhte8Lce6e7kuhRHo6rSNb2UaC
