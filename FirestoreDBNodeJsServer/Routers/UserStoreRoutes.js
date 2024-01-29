const express = require("express");
const bodyParser = require("body-parser");
const UserStoreRouter = express.Router();
const { auth, db, admin } = require("../db");
const { haversine, generateRandomString, validateEmail } = require("../helper");

UserStoreRouter.use(bodyParser.json());

UserStoreRouter.get("/userItems/:UserId", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const snapshot = await db.collection('RequestDetails').get();
    const result = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      result.push(data);
    });
    console.log("UserId from request:", UserId);
    const filteredData = result.filter(item => {
      console.log("UserId from document:", item.UserId);
      return item.UserId === UserId;
    });
    console.log("Filtered Data:", filteredData);

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






// UserStoreRouter.get("/userStore/:UserId/:StoreId", async (req, res) => {
//   try {
//     const UserId = req.params.UserId;
//     const StoreId = req.params.StoreId;
//     const snapshot = await db.collection('RequestDetails').where('UserId', '===', UserId).get();

//     if (snapshot.empty) {
//       return res.status(404).json({ error: "Request not found." });
//     }

//     const result = [];
//     for (const doc of snapshot.docs) {
//       const StoreRef = db.collection('StoreDetails').doc(doc.data().StoreId);
//       const StoreSnapshot = await StoreRef.get();
//       if (!StoreSnapshot.exists) {
//         return res.status(200).json({ message: "None Found" });
//       } else {
//         result.push(StoreSnapshot.data());
//       }
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// UserStoreRouter.get("/StoreItems/:ItemId/:StoreId", async (req, res) => {
//   try {
//     const ItemId = req.params.ItemId;
//     const StoreId = req.params.StoreId;
//     const snapshot = await db.collection('ItemDetails').where('ItemId', '==', ItemId).where('StoreId', '==', StoreId).get();

//     if (snapshot.empty) {
//       return res.status(404).json({ error: "Request not found." });
//     }

//     const result = [];
//     for (const doc of snapshot.docs) {
//       const item = doc.data();
//       const StoreRef = db.collection('StoreDetails').doc(item.StoreId);
//       const StoreSnapshot = await StoreRef.get();
//       if (!StoreSnapshot.exists) {
//         return res.status(200).json({ message: "None Found" });
//       } else {
//         result.push({ item: item, store: StoreSnapshot.data() });
//       }
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error updating request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = UserStoreRouter;
