const {db} = require('../util/admin');

exports.getAllDocs = async (req, res) => {
    let allDocs = await db.collection('mdoc').orderBy('createdAt', 'desc').get();
    let docs = [];
    allDocs.forEach(doc => {
        docs.push({
            id: doc.id,
            ...doc.data()
        });
    })
    return res.json(docs);
    /*
    db
    .collection("mdoc")
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let mdoc = [];
        data.forEach(doc => {
            mdoc.push({
                mId: doc.id,
                //...doc.data()
                title: doc.data().title,
                content: doc.data().content,
                user: doc.data().user,
                createdAt: doc.data().createdAt,
                updatedAt: doc.data().updatedAt
            });
        });
        return res.json(mdoc);
    })
    .catch(err => console.error(err));
    */
}

exports.viewDoc = async (req, res) => {
    let docData = {
      mdoc: {},
      content: ""
    };
    try {
        let doc = await db.collection('mdoc').doc(req.params.docId).get();
        docData.mdoc = doc.data();
        if (!doc.exists) {
            return res.status(404).json({ error: "Doc1 not found" });
        }

        let snapshot = await db.collection('mcontent').where('docId', '==', req.params.docId).orderBy('createdAt', 'desc').limit(1).get();
        snapshot.forEach(mycontent => {
            docData.content = mycontent.data().content;
        });
        return res.json(docData);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: err});
    }
}

exports.viewDocHistory = async (req, res) => {
    let docHistory = [];
    try {
        let snapshot = await db.collection('mcontent').where('docId', '==', req.params.docId).orderBy('createdAt', 'desc').get();
        snapshot.forEach(mycontent => {
            docHistory.push(mycontent.data());
        });
        return res.json(docHistory);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}

exports.createDoc = async (req, res) => {
    const newDoc = {
        title: req.body.title,
        //contentId: req.body.content,
        username: req.user.username,
        userImage: req.user.imageUrl,
        category: req.body.category,
        createdAt: new Date().toDateString(),
        likeCount: 0,
        commentCount: 0
    };
    const newContent = {
      content: req.body.content,
      docId: "",
      createdAt: new Date().toDateString()
    };
    try {
        let doc = await db.collection("mdoc").add(newDoc);
        let responseDoc = {
            mdoc: {},
            content: {}
        };
        responseDoc.mdoc = newDoc;
        responseDoc.mdoc.docId = doc.id;
        newContent.docId = doc.id;
        let content = await db.collection("mcontent").add(newContent);
        responseDoc.mcontent = newContent.content;
        return res.status(200).json(responseDoc);
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
    }
}

exports.editDoc = async (req, res) => {
    let contentUpdated = req.body.contentUpdated;
    const newDoc = {
        title: req.body.title,
        category: req.body.category,
        lastUpdatedBy: req.user.username,
        updatedAt: new Date().toDateString()
    }
    try {
        let doc = await db.doc(`/mdoc/${req.params.docId}`).get();
        if (!doc.exists){
            return res.status(404).json({error: "Doc not found"});
        }
        let responseDoc = {
            mdoc: {},
            content: {}
        };
        await doc.ref.update(newDoc);
        if (contentUpdated){
            //create mcontent
            const newContent = {
                content: req.body.content,
                createdAt: new Date().toDateString(),
                docId: ""
            };
            newContent.docId = doc.id;
            await db.collection("mcontent").add(newContent);
            newDoc.content = req.body.content;
        }
        return res.status(200).json(newDoc);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "something went wrong" });
    }
}

exports.deleteDoc = async (req, res) => {
    const document = db.doc(`/mdoc/${req.params.docId}`);
    
    try {
        const doc = await document.get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Doc not found' });
        }
        console.info(doc.data());
        if (doc.data().username !== req.user.username) {
            console.error(`${doc.data().username} does not match ${req.user.username}`);
            return res.status(403).json({ error: "Unauthorized" });
        }
        await document.delete();
        return res.json({message: 'Doc deleted successfully'});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error: err.code});
    }
}