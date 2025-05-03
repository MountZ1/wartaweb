export const Library = /* html */`
<div class="p-6 bg-gray-50 min-h-screen">
  <h1 class="text-2xl font-semibold mb-4">Media Library</h1>
  
  <!-- Upload Section -->
  <div class="mb-4 flex items-center justify-between">
    <button 
      class="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400">
      Upload New Media
    </button>

    <select 
      class="border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 px-2 py-1">
      <option value="all">All Media Items</option>
      <option value="images">Images</option>
      <option value="videos">Videos</option>
      <option value="documents">Documents</option>
    </select>
  </div>

  <!-- Media Grid -->
  <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- Example Media Item -->
    <div class="relative group">
      <img 
        src="https://via.placeholder.com/150" 
        alt="Media item" 
        class="w-full h-32 object-cover rounded-lg shadow">
      
      <!-- Overlay with Actions -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity p-4">
        <p class="text-sm font-medium">File Name: example.jpg</p>
        <p class="text-xs">Size: 150 KB</p>
        <div class="mt-2 flex space-x-2">
            <button 
            class="bg-white text-red-600 px-2 py-1 rounded shadow hover:bg-red-100 focus:ring-2 focus:ring-red-400">
            Delete
            </button>
            <button 
            class="bg-white text-indigo-600 px-2 py-1 rounded shadow hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-400">
            Edit
            </button>
            <button 
            class="bg-white text-yellow-600 px-2 py-1 rounded shadow hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-400">
            Info
            </button>
        </div>
      </div>
    </div>
    
    <!-- Repeat the above block for each media item -->
  </div>

  <!-- Pagination -->
  <div class="mt-6 flex items-center justify-between">
    <p class="text-gray-600">Showing 1-10 of 50 items</p>
    <div class="flex space-x-2">
      <button 
        class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400">
        Prev
      </button>
      <button 
        class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
        Next
      </button>
    </div>
  </div>
</div>

`