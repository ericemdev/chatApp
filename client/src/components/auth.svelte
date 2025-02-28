<script>
  import { auth, db } from "../firebase";
  import { GoogleAuthProvider, signInWithPopup,  onAuthStateChanged } from "firebase/auth";
  import { doc, setDoc, getDoc } from "firebase/firestore";

  let user = null;
  let socket = null;

 
  const saveUserToFirestore = async (user) => {
    if (!user) return;
    
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      });
    }
  };

  
  const login = async () => {
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          user = result.user;
          await saveUserToFirestore(user);

          // Establish WebSocket connection after authentication
          socket = new WebSocket('ws://localhost:4000');

          socket.onopen = () => {
              console.log("Connected to WebSocket server");
              // Send user data to the server
              socket.send(JSON.stringify({
                  type: 'user_connected',
                  uid: user.uid,
                  name: user.displayName,
                  photo: user.photoURL,
              }));
          };

          socket.onmessage = (event) => {
              const data = JSON.parse(event.data);
              console.log("Server says:", data);
          };

          socket.onclose = () => {
              console.log("Disconnected from WebSocket server");
          };
      } catch (error) {
          console.error("Google Sign-In Error:", error.message);
      }
  };

  
  const logout = async () => {
    try {
      await signOut(auth);
      user = null;
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
    }
  };

  // Track authentication state
  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user = u;
      await saveUserToFirestore(user);
    } else {
      user = null;
    }
  });

</script>

<div class="flex flex-col items-center justify-center ">
  {#if user}
    <img src={user.photoURL} alt="Profile" class="w-12 h-12 rounded-full mt-2">
  {:else}
    <button on:click={login} class="bg-blue-500 text-white p-2 rounded">Sign in with Google</button>
  {/if}
</div>