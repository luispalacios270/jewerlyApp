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
        getDownload: function (nodeName) {
            var storageRef = firebase.storage().ref(nodeName);
            var storage = $firebaseStorage(storageRef);
        },
        uploadFile: function (nodeName, file) {
            var storageRef = firebase.storage().ref(nodeName);
            console.log("storage", storageRef);
            var storage = $firebaseStorage(storageRef);
            return storage.$put(file);
        }
    }
});