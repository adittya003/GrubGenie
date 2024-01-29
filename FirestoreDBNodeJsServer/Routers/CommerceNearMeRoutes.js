const express = require("express");
const bodyParser = require("body-parser");
const CommerceNearMeRouter = express.Router();
const { auth, db, admin } = require("../db");
const { haversine } = require("../helper");
CommerceNearMeRouter.use(bodyParser.json());

//GET ROUTES
CommerceNearMeRouter.get("/AllStores", async (req, res) => {
  try {
    const snapshot = await db.collection("StoreDetails").get();
    const stores = [];
    snapshot.forEach((doc) => {
      stores.push(doc.data());
    });
    
    const result = [];
    stores.map((store) => {
      result.push({
        name: store.StoreName,
        storeid: store.StoreId,
        Location: store.Location,
      });
    });
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

CommerceNearMeRouter.post("/AllItems", async (req, res) => {
  try {
    const ItemSnapshot = await db.collection("ItemDetails").get();
    const Userlat = req.body.Location[0];
    const Userlong = req.body.Location[1]
    const sorts = req.body.sorts || "dist";
    const maxDist = req.body.maxDist || 999999999999999;
    const items = [];
    ItemSnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    const StoreSnapshot = await db.collection("StoreDetails").get();
    const stores = [];
    StoreSnapshot.forEach((doc) => {
      stores.push(doc.data());
    });
    const result = [];
    items.forEach((item) => {
      stores.forEach((store) => {
        console.log(store)
        if (store.StoreId == item.StoreId) {
          let dist = haversine(
            Userlat,
            Userlong,
            store.Location._latitude,
            store.Location._longitude
          );
          if (dist < maxDist ) {
            result.push({ item, distance: dist, store });
          }
        }
      });
    });
    if (sorts === "dist") {
      result.sort((a, b) => a.distance - b.distance);
    } else if (sorts === "name") {
      result.sort((a, b) => {
        const nameA = a.store.StoreName.toLowerCase();
        const nameB = b.store.StoreName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (sorts === "price") {
      result.sort((a, b) => a.item.ItemPrice - b.item.ItemPrice);
    }
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST ROUTES

//Stores that are within 5 kms by default or the maxDist passed as body  of user (user lat long passed as body in array form)
CommerceNearMeRouter.post("/foodNearMeDist", async (req, res) => {
  try {
    const body = req.body;
    const Userlat = body.location[0];
    const Userlong = body.location[1];
    const maxDist = body.maxDist || 5;
    const sorts = body.sorts || "dist";
    const snapshot = await db.collection("StoreDetails").get();
    const stores = [];
    const result = [];

    snapshot.forEach((doc) => {
      stores.push(doc.data());
    });

    stores.forEach((store) => {
      let dist = haversine(
        Userlat,
        Userlong,
        store.Location._latitude,
        store.Location._longitude
      );
      if (dist < maxDist) {
        result.push({ store, distance: dist });
      }
    });
    // Sorting the result array based on distance
    if(sorts==="dist"){
      result.sort((a, b) => a.distance - b.distance);
    }
    else if(sorts==="name"){
      result.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
////Stores that are within 5 kms by default or the maxDist passed as body  of user with all store items
CommerceNearMeRouter.post("/foodNearMeDistItemNames", async (req, res) => {
  try {
    const body = req.body;
    const Userlat = body.location[0];
    const Userlong = body.location[1];
    const maxDist = body.maxDist || 5;
    const sorts = body.sorts || "dist";
    const snapshot = await db.collection("StoreDetails").get();
    const stores = [];
    const result = [];
    
    snapshot.forEach((doc) => {
      stores.push(doc.data());
    });
    stores.forEach(async(store) => {
      let dist = haversine(
        Userlat,
        Userlong,
        store.Location._latitude,
        store.Location._longitude
      );
      if (dist < maxDist) {
        const ItemSnapshot = await db.collection("ItemDetails").get();
        const Items = [];
        ItemSnapshot.forEach((doc) => {
        Items.push(doc.data());
        });
        console.log(Items);
        Items.filter((item)=>item.StoreId==store.StoreId)
        console.log("======================="); 
        
        result.push({store: store, distance: dist ,items :Items});
      }
    });
    // Sorting the result array based on distance
    if(sorts==="dist"){
      result.sort((a, b) => a.distance - b.distance);
    }
    else if(sorts==="name"){
      result.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Find Based on FoodItem sorted by distance
CommerceNearMeRouter.post("/foodNearMeItem", async (req, res) => {
  try {
    const body = req.body;
    const Userlat = body.location[0];
    const Userlong = body.location[1];
    const maxDist = body.maxDist || 20;
    const Item = body.Item;
    const ItemSnapshot = await db.collection("ItemDetails").get();
    const StoreSnapshot = await db.collection("StoreDetails").get();
    const sorts = body.sorts || "dist";
    const items = [];
    const stores = [];
    const result = [];
    ItemSnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    StoreSnapshot.forEach((doc) => {
      stores.push(doc.data());
    });
    items.forEach((item) => {
      if (item.ItemName === Item) {
        stores.map((store) => {
          if (store.StoreId == item.StoreId) {
              let dist = haversine(
                Userlat,
                Userlong,
                store.Location._latitude,
                store.Location._longitude
              )
              if (dist < maxDist) {
                result.push({ store, distance: dist ,item});
              }
          }
        });
      }
    });
    if(sorts==="dist"){
      result.sort((a, b) => a.distance - b.distance);
    }
    else if (sorts === "name") {
      result.sort((a, b) => {
        const nameA = a.store.StoreName.toLowerCase();
        const nameB = b.store.StoreName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (sorts === "price") {
      result.sort((a, b) => a.item.ItemPrice - b.item.ItemPrice);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = CommerceNearMeRouter;
