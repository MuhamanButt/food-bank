import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  setDoc,
  collectionGroup,
} from "firebase/firestore";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyAFIAZNWBehnJhVMA1wXfDQDZnCjnH_h2I",
  authDomain: "foodbank-36f99.firebaseapp.com",
  projectId: "foodbank-36f99",
  storageBucket: "foodbank-36f99.appspot.com",
  messagingSenderId: "867721754136",
  appId: "1:867721754136:web:246f5dc9ad6b358c37b56d",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseContext = createContext(null);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

export const useFirebase = () => useContext(firebaseContext);
const FirebaseProvider = (props) => {
  const [User, setUser] = useState(null);
  const [OwnerState, setOwnerState] = useState(false);
  const [lastViewedPage, setlastViewedPage] = useState('/');
const setLastViewedPage=async (str)=>{
  setlastViewedPage(str)
  
}
  //!-----------------------------------------------------------------------------getImageURL
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  //!-----------------------------------------------------------------------------approveRecipe
  const approveRecipe = async (identity) => {
    console.log(identity);
    const approvalCollectionRef = collection(firestore, "approvals");
    const q = query(approvalCollectionRef, where("identity", "==", identity));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      const data = docSnapshot.data();

      // Create a new document in the "recipes" collection with a unique identifier (auto-generated)
      const recipesCollectionRef = collection(firestore, "recipes");
      const targetDocRef = doc(recipesCollectionRef); // This will create a new document with an auto-generated ID
      await setDoc(targetDocRef, data);

      // Delete the original document from the "approvals" collection
      await deleteDoc(docSnapshot.ref);
      document
        .getElementById("alert-approval-success")
        .classList.remove("d-none");

      setTimeout(() => {
        if (document.getElementById("pendingApprovalPage"))
          {document
            .getElementById("alert-approval-success")
            .classList.add("d-none");}
      }, 2000);
      console.log("Document moved successfully");
    });

    console.log("All matching documents moved successfully");
  };
  //!-----------------------------------------------------------------------------getAllRecipes
  const getAllRecipes = async () => {
    return getDocs(collection(firestore, "recipes"));
  };
  //!-----------------------------------------------------------------------------sendForApproval
  const sendForApproval = async (
    recipeName,
    description,
    ingredients,
    recipe,
    picture,
    category,
    userID,
    userName,
    userEmail
  ) => {
    {
      try {
        // Upload the picture to storage
        const imageRef = ref(
          storage,
          `uploads/images/${Date.now()}-${picture.name}`
        );
        const uploadResult = await uploadBytes(imageRef, picture);

        // Get the URL of the uploaded image
        const pictureURL = await getDownloadURL(uploadResult.ref);

        // Add the document to Firestore with the image URL
        await addDoc(collection(firestore, "approvals"), {
          identity: `${Date.now()}-${recipeName}`,
          recipeName,
          description,
          ingredients,
          recipe,
          pictureURL,
          category,
          userID: userID,
          userName: userName,
          userEmail: userEmail,
        });

        console.log("Recipe added successfully");
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    }
  };
  //!-----------------------------------------------------------------------------getReviewsOfRecipe
  const getReviewsOfRecipe = async (identity) => {
    const recipesCollectionRef = collection(firestore, "recipes");
    const q = query(recipesCollectionRef, where("identity", "==", identity));
    const RecipeData = await getDocs(q);
  
    if (RecipeData.docs.length > 0) {
      const recipeId = RecipeData.docs[0].id; // Get the ID of the first document
      const reviewsCollectionRef = collection(firestore, "recipes", recipeId, "Reviews");
      return await getDocs(reviewsCollectionRef);
    } else {
      // Handle the case where no matching recipe was found
      return [];
    }
  }
    //!-----------------------------------------------------------------------------addReviewToRecipe
  const addReviewToRecipe = async (
    identity,
    userDetails,
    Review,
    ReviewPoints
  ) => {
    const recipesCollectionRef = collection(firestore, "recipes");
    const q = query(recipesCollectionRef, where("identity", "==", identity));
    const RecipeData = await getDocs(q);

    const recipeId = RecipeData.docs[0].id;

    const userCollectionRef = collection(firestore, "users");
    const qu = query(userCollectionRef, where("identity", "==", userDetails.uid));
    const userData = await getDocs(qu);

    const userName = userData.docs[0].data().userName;
  
    const reviewsCollectionRef = collection(firestore, "recipes", recipeId, "Reviews");
  
    await addDoc(reviewsCollectionRef, {
      userName: userName,
      reviewPoints: ReviewPoints,
      Review: Review,
    });
  };
  //!-----------------------------------------------------------------------------getAllPendingApprovals
  const getAllPendingApprovals = async () => {
    return getDocs(collection(firestore, "approvals"));
  };
  //!-----------------------------------------------------------------------------handleCreateNewListing
  const handleCreateNewListing = async (
    recipeName,
    description,
    ingredients,
    recipe,
    picture,
    category,
    userID,
    userName,
    userEmail
  ) => {
    try {
      console.log("hanvler");
      // Upload the picture to storage
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${picture.name}`
      );
      const uploadResult = await uploadBytes(imageRef, picture);

      // Get the URL of the uploaded image
      const pictureURL = await getDownloadURL(uploadResult.ref);

      // Add the document to Firestore with the image URL
      await addDoc(collection(firestore, "recipes"), {
        identity: `${Date.now()}-${recipeName}`,
        recipeName,
        description,
        ingredients,
        recipe,
        pictureURL,
        category,
        userID: userID,
        userName: userName,
        userEmail: userEmail,
      });

      console.log("Recipe added successfully");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };
  //!-----------------------------------------------------------------------------getRecipeByIdentity
  const getRecipeByIdentity = async (identity) => {
    const recipesCollectionRef = collection(firestore, "recipes");
    const q = query(recipesCollectionRef, where("identity", "==", identity));

    return await getDocs(q);
  };
  //!-----------------------------------------------------------------------------getRecipesByUserID
  const getRecipesByUserID = async (userID) => {
    const recipesCollectionRef = collection(firestore, "recipes");

    // Create a query to filter recipes by the 'userID' field
    const q = query(recipesCollectionRef, where("userID", "==", userID));

    return await getDocs(q);
  };
  //!-----------------------------------------------------------------------------getUserName
  const getUserName = async (identity) => {
    const usersCollectionRef = collection(firestore, "users");
    const q = query(usersCollectionRef, where("identity", "==", identity));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there is only one user with the provided identity
      const userData = querySnapshot.docs[0].data();
      return userData.userName; // Replace 'userName' with the actual field name you want to retrieve
    } else {
      // No user found with the provided identity
      return null;
    }
  };
  //!-----------------------------------------------------------------------------signOutUser
  const signOutUser = async () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  //!-----------------------------------------------------------------------------signOutOwner
  const signOutOwner = async () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
        console.log("User signed out");
        setOwnerState(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  //!-----------------------------------------------------------------------------signInuserWithEmailandPassword
  const signInuserWithEmailandPassword = async (email, password) => {
    let flag = false;
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
          flag = true;
          if (document.getElementById("logoutBtn"))
            document.getElementById("logoutBtn").classList.remove("d-none");
          document.getElementById("loginBtn").classList.add("d-none");
        }
      );
    } catch (error) {
      document
        .getElementById("alert-loginpage-error")
        .classList.remove("d-none");
      if (document.getElementById("userLoginPage"))
        setTimeout(() => {
          document
            .getElementById("alert-loginpage-error")
            .classList.add("d-none");
        }, 2000);
    }
    return flag;
  };
  //!-----------------------------------------------------------------------------signInOwnerWithEmailandPassword
  const signInOwnerWithEmailandPassword = async (email, password) => {
    let flag = false;
    try {
      const adminsCollection = collection(firestore, "admins");
      const emailQuery = query(adminsCollection, where("email", "==", email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        // Email exists in the "admins" collection
        await signInWithEmailAndPassword(firebaseAuth, email, password).then(
          (userCredential) => {
            console.log(userCredential.user);
            setUser(userCredential.user);
            setOwnerState(true);
          }
        );
        flag = true;
        console.log('Email exists in "admins" collection.');
      } else {
        // Email doesn't exist in the "admins" collection
        document
          .getElementById("alert-owner-danger")
          .classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("alert-owner-danger").classList.add("d-none");
        }, 2000);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    return flag;
  };
  //!-----------------------------------------------------------------------------isOwnerEmail
  const isOwnerEmail = async (email) => {
    let flag = false;
    try {
      const adminsCollection = collection(firestore, "admins");
      const emailQuery = query(adminsCollection, where("email", "==", email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        flag = true;
        console.log('Email exists in "admins" collection.');
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    return flag;
  };
  //!-----------------------------------------------------------------------------deleteRecipeByName
  const deleteRecipeByName = async (name) => {
    const targetRecipeName = name ? name : " ";
    const recipesCollectionRef = collection(firestore, "recipes");
    const q = query(
      recipesCollectionRef,
      where("recipeName", "==", targetRecipeName)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docs) => {
        const documentRef = doc(firestore, "recipes", docs.id);

        // Delete the document
        try {
          deleteDoc(documentRef);
          console.log("Document successfully deleted.");

          if (document.getElementById("deleterecipePage")){ document
            .getElementById("alert-delete-success")
            .classList.remove("d-none");
          setTimeout(() => {
            if (document.getElementById("deleterecipePage"))
              document
                .getElementById("alert-delete-success")
                .classList.add("d-none");
          }, 2000);}
        } catch (error) {
          console.error("Error deleting document: ", error);
          if (document.getElementById("ownerPage")){document
            .getElementById("alert-delete-danger")
            .classList.remove("d-none");
          if (document.getElementById("ownerPage"))
            setTimeout(() => {
              document
                .getElementById("alert-delete-danger")
                .classList.add("d-none");
            }, 2000);}
        }
      });
    } else {
      console.log("No document found with the specified recipeName.");
      document.getElementById("alert-delete-danger").classList.remove("d-none");
      setTimeout(() => {
        document.getElementById("alert-delete-danger").classList.add("d-none");
      }, 2000);
    }
  };
  //!-----------------------------------------------------------------------------deleteApprovalRecipe
  const deleteApprovalRecipe = async (name) => {
    const targetRecipeName = name ? name : " ";
    const recipesCollectionRef = collection(firestore, "recipes");
    const q = query(
      recipesCollectionRef,
      where("recipeName", "==", targetRecipeName)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docs) => {
        const documentRef = doc(firestore, "recipes", docs.id);

        // Delete the document
        try {
          deleteDoc(documentRef);
          console.log("Document successfully deleted.");

          document
            .getElementById("alert-delete-success")
            .classList.remove("d-none");
          setTimeout(() => {
            if (document.getElementById("ownerPage"))
              document
                .getElementById("alert-delete-success")
                .classList.add("d-none");
          }, 2000);
        } catch (error) {
          console.error("Error deleting document: ", error);
          document
            .getElementById("alert-delete-danger")
            .classList.remove("d-none");
          setTimeout(() => {
            document
              .getElementById("alert-delete-danger")
              .classList.add("d-none");
          }, 2000);
        }
      });
    } else {
      console.log("No document found with the specified recipeName.");
      document.getElementById("alert-delete-danger").classList.remove("d-none");
      setTimeout(() => {
        document.getElementById("alert-delete-danger").classList.add("d-none");
      }, 2000);
    }
  };
  //!-----------------------------------------------------------------------------createUser
  const createUser = async (email, password, userName) => {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(userCredential);
    const uid = user.uid;
    await addDoc(collection(firestore, "users"), {
      identity: uid,
      userName: userName,
      recipeIds: [],
      email: email,
    });
  };
  //!-----------------------------------------------------------------------------getUserisLoggedIn
  const getUserisLoggedIn = () => {
    return User;
  };
  //!-----------------------------------------------------------------------------getUserDetails
  const getUserDetails = () => {
    return User;
  };
  //!-----------------------------------------------------------------------------return
  return (
    <firebaseContext.Provider
      value={{
        handleCreateNewListing,
        getAllRecipes,
        getImageURL,
        getRecipeByIdentity,
        signInuserWithEmailandPassword,
        signInOwnerWithEmailandPassword,
        OwnerState,
        deleteRecipeByName,
        signOutUser,
        setOwnerState,
        createUser,
        getUserisLoggedIn,
        signOutOwner,
        getUserDetails,
        getRecipeByIdentity,
        getUserName,
        getRecipesByUserID,
        sendForApproval,
        getAllPendingApprovals,
        deleteApprovalRecipe,
        approveRecipe,
        isOwnerEmail,
        addReviewToRecipe,
        getReviewsOfRecipe,
        User,
        setLastViewedPage,
        lastViewedPage
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

export default FirebaseProvider;
