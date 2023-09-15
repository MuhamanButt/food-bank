import React from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import MyNavbar from "../components/Navbar";
import Title from "../components/Title";
import List from "../components/List";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";

import PendingApprovalList from "../components/PendingApprovalList";
import { useEffect } from "react";

export const PendingApprovalContext = React.createContext();
const PendingApprovals = () => {
  const firebase = useFirebase();
  const [Recipes, setRecipes] = useState([]);
  const [DataIsLoaded, setDataIsLoaded] = useState(false);

  const setData = (flag) => {
    console.log("HELLO")
    setDataIsLoaded(flag);
  };
  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await firebase.getAllPendingApprovals();
      setRecipes(recipesData.docs);
      setDataIsLoaded(true);
    };
    fetchData();
  }, [DataIsLoaded]);
  return (
    <div id="pendingApprovalPage">
      {DataIsLoaded ? (
        <>
          <MyNavbar></MyNavbar>
          <Title name={"Pending Approvals"}></Title>
          <div id="alert-approval-success" className="d-none">
            <Alert variant="success">
              <Alert.Heading>Recipe Approved Successfully!!</Alert.Heading>
            </Alert>
          </div>
          <div id="alert-approval-danger" className="d-none">
            <Alert variant="danger">
              <Alert.Heading>Recipe cannot be Approved!!</Alert.Heading>
            </Alert>
          </div>
          <PendingApprovalContext.Provider value={setData}>
            <PendingApprovalList RecipeList={Recipes} />
          </PendingApprovalContext.Provider>
          {Recipes.length == 0 ? (
            <h1 className="text-danger">No Pending Approvals</h1>
          ) : (
            ""
          )}
        </>
      ) : (
        <Loader text={"Stirring up something delicious..."}></Loader>
      )}
    </div>
  );
};

export default PendingApprovals;
