
export class storage {

    constructor() {
        this.db = window.firebase.firestore();
        this.collection = this.db.collection('challenges');
    }

    writeData = (documentId, data) => {
        return this.collection.doc(documentId).set(data);
    }

    readData = (documentId) => {
        return new Promise((resolve, reject) => {
            this.collection.doc(documentId).get()
                .then(doc => {
                    if (doc.exists) {
                        return resolve(doc.data());
                    } else {
                        this.writeData(documentId, {});
                        return resolve({});
                    }
                })
                .catch(err => reject(err));
        });
    }
}