import { db } from "./firebase.js";
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy, limit, } from "firebase/firestore";

export const addCollection = async (name) => {
  try {
    await addDoc(collection(db, "collections"), {
      name,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error adding collection:", err);
  }
};

// Real-time listener instead of one-time fetch
export const getCollections = (callback) => {
  try {
    const colRef = collection(db, "collections");
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(results);
    });

    return unsubscribe; // <-- real unsubscribe function
  } catch (err) {
    console.error("Error setting up listener:", err);
    return () => {}; // return empty cleanup if error
  }
};


// ✅ Save recent request
export async function addRecentRequest(method, url, headers = {}, body = "", response = null) {
  try {
    await addDoc(collection(db, "recentRequests"), {
      method,
      url,
      headers,
      body,
      response,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error adding recent request:", err);
  }
}


// ✅ Listen to recent requests
export function getRecentRequests(callback) {
  const q = query(
    collection(db, "recentRequests"),
    orderBy("timestamp", "desc"),
    limit(10) // latest 10
  );

  return onSnapshot(q, (snapshot) => {
    const reqs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(reqs);
  });
}



// ✅ existing functions...
export async function deleteCollectionById(id) {
  await deleteDoc(doc(db, "collections", id));
}

export async function deleteRecentRequestById(id) {
  await deleteDoc(doc(db, "recentRequests", id));
}

