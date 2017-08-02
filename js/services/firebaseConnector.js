'use strict';
app.service('firebaseService', function ($firebaseObject, $firebaseArray, $firebaseStorage) {
    return {
        getNodeArray: function (nodeName) {
            let ref = firebase.database().ref().child(nodeName);
            return $firebaseArray(ref);
        },
        getNodeObject: function (nodeName) {
            let ref = firebase.database().ref().child(nodeName);
            return $firebaseObject(ref);
        },
        getDownload: function (nodeName, document) {
            var storageRef = firebase.storage().ref(nodeName);
            var storage = $firebaseStorage(storageRef);
            storage.$getDownloadURL().then(function (url) {
                document.link = url;
                return url;
            }).catch(function (err) {
                document.link = "Error";
            });
        },
        uploadFile: function (nodeName, file) {
            var storageRef = firebase.storage().ref(nodeName);
            console.log("storage", storageRef);
            var storage = $firebaseStorage(storageRef);
            return storage.$put(file);
        }
    }
});