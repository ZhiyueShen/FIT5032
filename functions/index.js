
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


exports.capitalizeBook = onDocumentCreated("books/{bookId}", async (event) => {
  const snap = event.data;
  if (!snap) return; 

  const data = snap.data();
  if (data && data.name) {
    const upperName = data.name.toUpperCase();
    await snap.ref.update({ name: upperName });
    console.log(`Book name capitalized to: ${upperName}`);
  }
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksSnapshot = await admin.firestore().collection("books").get();
      const books = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send(books);
    } catch (error) {
      console.error("Error getting all books:", error.message);
      res.status(500).send("Error getting all books");
    }
  });
});


