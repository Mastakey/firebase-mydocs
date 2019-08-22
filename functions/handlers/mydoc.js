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
        content: req.body.content,
        username: req.user.username,
        userImage: req.user.imageUrl,
        createdAt: new Date().toDateString(),
        likeCount: 0,
        commentCount: 0
    }
    try {
        let doc = await db.collection('mdoc').add(newDoc);
        let responseDoc = newDoc;
        responseDoc.docId = doc.id;
        res.json(responseDoc);
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
    }
}