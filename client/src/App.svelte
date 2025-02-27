<script>
  let socket = new WebSocket('ws://localhost:4000');  
  let messages = []; 
  let newMessage = "";

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onmessage = (event) => {
    console.log("Server says:", event.data);
    messages = [...messages, event.data]; 
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  function sendMessage() {
    if (newMessage.trim()) {
      socket.send(newMessage);
      newMessage = "";
    }
  }
  import './style.css';
</script>

<main>

  <div class="flex flex-col items-center p-6 min-h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Live Chat</h1>
    
    <div class="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <div class="h-60 overflow-y-auto mb-4 border p-2 rounded">
            {#each messages as msg}
                <p class="bg-blue-100 p-2 rounded my-1">{msg}</p>
            {/each}
        </div>

        <div class="flex gap-2">
            <input class="flex-1 p-2 border rounded" bind:value={newMessage} placeholder="Type a message..." />
            <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={sendMessage}>
                Send
            </button>
        </div>
    </div>
  </div>
</main>
