import { useState, useEffect } from 'react';
import { db } from '../config/fbConfig';

const useFirestore = (collection) => {
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection('users')
      .doc(uid)
      .onSnapshot((snap) => {
        let docs = [];
        snap.forEach((docField) => {
          docs.push({ ...docField.data(), id: docField.id });
        });
        setDoc(docs);
      });
    return () => unsub();
  }, [collection]);

  return { doc };
};

export default useFirestore;
