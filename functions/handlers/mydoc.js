const {db} = require('../util/admin');

exports.getAllDocs = async (req, res) => {
    let allDocs = await db.collection('mdoc').orderBy('createdAt', 'desc').get();
    let docs = [];
    allDocs.forEach(doc => {
        docs.push({
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

exports.createDoc = async (req, res) => {
    const newDoc = {
        title: req.body.title,
        //contentId: req.body.content,
        username: req.user.username,
        userImage: req.user.imageUrl,
        createdAt: new Date().toDateString(),
        likeCount: 0,
        commentCount: 0
    };
    const newContent = {
        content: req.body.content,
        docId: ""
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
        responseDoc.mcontent = newContent;
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
        responseDoc.mdoc = await doc.ref.update(newDoc);
        if (contentUpdated){
            //create mcontent
            const newContent = {
                content: req.body.content,
                docId: ""
            };
            newContent.docId = doc.id;
            responseDoc.content = await db.collection("mcontent").add(newContent);
        }
        return res.status(200).json(responseDoc);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "something went wrong" });
    }
}