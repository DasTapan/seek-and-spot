import { useEffect } from "react";
import { personsRef } from "./firebase-config";
import { getDocs } from "firebase/firestore";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(personsRef);
      const persons = [];
      snapshot.docs.map((doc) => {
        persons.push(doc.data());
      });
      console.log(persons);
    };
    fetchData();
  }, []);

  return <h1>Jay Jagannath</h1>;
}

export default App;
