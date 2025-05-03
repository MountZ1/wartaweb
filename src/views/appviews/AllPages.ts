export const AllPages = /* html */`
<div class="p-6 bg-gray-50 min-h-screen">
  <h1 class="text-2xl font-semibold mb-4">Pages</h1>

  <!-- Search and Filters -->
  <div class="flex items-center justify-between mb-4">
    <div class="flex space-x-4">
      <button 
        class="text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none">
        All <span class="text-gray-400">(12)</span>
      </button>
      <button 
        class="text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none">
        Published <span class="text-gray-400">(8)</span>
      </button>
      <button 
        class="text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none">
        Draft <span class="text-gray-400">(4)</span>
      </button>
    </div>

    <div class="flex items-center">
      <input 
        type="text" 
        placeholder="Search pages..." 
        class="border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 px-3 py-1.5 mr-4">
      <button 
        class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400">
        Add New Page
      </button>
    </div>
  </div>

  <!-- Pages Table -->
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <table class="min-w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</th>
          <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Author</th>
          <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
          <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
          <th class="py-3 px-4 text-center text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Example Page Row -->
        <tr class="border-t border-gray-200">
          <td class="py-4 px-4">
            <div class="flex flex-col">
              <span class="text-gray-800 font-medium">About Us</span>
            </div>
          </td>
          <td class="py-4 px-4 text-gray-600">Admin</td>
          <td class="py-4 px-4 text-gray-500">Published</td>
          <td class="py-4 px-4 text-gray-500">Nov 20, 2024</td>
          <td class="py-4 px-4 text-center">
            <button 
              class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
              Edit
            </button>
            <button 
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2">
              Delete
            </button>
          </td>
        </tr>

        <!-- Repeat Rows for More Pages -->
        <tr class="border-t border-gray-200">
          <td class="py-4 px-4">
            <div class="flex flex-col">
              <span class="text-gray-800 font-medium">Contact Us</span>
            </div>
          </td>
          <td class="py-4 px-4 text-gray-600">Editor</td>
          <td class="py-4 px-4 text-gray-500">Scheduled</td>
          <td class="py-4 px-4 text-gray-500">Nov 19, 2024</td>
          <td class="py-4 px-4 text-center">
            <button 
              class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
              Edit
            </button>
            <button 
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="mt-6 flex items-center justify-between">
    <p class="text-gray-600">Showing 1-10 of 12 pages</p>
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