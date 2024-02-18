const express = require("express");
const bodyParser = require("body-parser");
const UserStoreRouter = express.Router();
const { auth, db, admin } = require("../db");
const { haversine, generateRandomString, validateEmail } = require("../helper");

UserStoreRouter.use(bodyParser.json());

//user has got which items , which request he has
UserStoreRouter.get("/userItems/:UserId", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const snapshot = await db.collection('RequestDetails').get();
    let result = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      result.push(data);
    });
    const filteredData = result.filter(item => {
      console.log("UserId from document:", item.UserId);
      return item.UserId === UserId;
    });
    console.log("Filtered Data:", filteredData);
    result=filteredData
    res.status(200).json({result});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//======================================================================================================
//user has gone which stores
UserStoreRouter.get("/userStore/:UserId", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const snapshot = await db.collection('RequestDetails').where('UserId', '==', UserId).get();
    const storeIds = new Set();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Request not found." });
    }

    snapshot.forEach(async (doc) => {
      const data = doc.data();
      Object.keys(data.Orders).forEach(storeId => {
        storeIds.add(storeId); // Add storeId to the set
      });
    });

    const storesPromises = Array.from(storeIds).map(async (storeId) => {
      const storeSnapshot = await db.collection('StoreDetails').where('StoreId', '==', storeId).get();
      const storeDetails = [];
      storeSnapshot.forEach((doc) => {
        const data2 = doc.data();
        storeDetails.push(data2);
      });
      return storeDetails;
    });
    // Wait for all store details to be fetched
    let result = await Promise.all(storesPromises);
    // Flatten the array of arrays into a single array
    const flattenedResult = result.flat();
    result=flattenedResult
    res.status(200).json({result});
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Item in which Stores
UserStoreRouter.get("/StoreItems/:ItemId", async (req, res) => {
  try {
    const ItemId = req.params.ItemId;
    const snapshot = await db.collection('ItemDetails').where('ItemId', '==', ItemId).get();
    const result = [];

    if (snapshot.empty) {
      return res.status(404).json({ error: "Request not found." });
    }

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const StoreSnapshot = await db.collection('StoreDetails').where("StoreId", "==", data.StoreId).get();

      if (StoreSnapshot.empty) {
        return res.status(404).json({ error: "Store Not Found." });
      }

      StoreSnapshot.forEach((storeDoc) => {
        result.push({ [storeDoc.data().StoreId]: storeDoc.data()});
      });
    }
    console.log(result);
    res.status(200).json({result});
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = UserStoreRouter;
