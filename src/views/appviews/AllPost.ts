interface AllPostsLayout {
  tableBody: string;
}

export const AllPost = (props: AllPostsLayout): string => {
  return `
<div class="container mx-auto p-4">
  <!-- Header -->
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-gray-800">All Posts</h1>
    <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
      Add New Post
    </button>
  </div>

  <!-- Search and Filters -->
  <div class="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-4">
    <input
      type="text"
      placeholder="Search posts..."
      class="w-full md:w-1/3 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
    />
    <select
      class="w-full md:w-1/4 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">All Categories</option>
      <option value="news">News</option>
      <option value="tutorials">Tutorials</option>
      <option value="reviews">Reviews</option>
    </select>
    <select class="w-full md:w-1/4 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-500">
      <option value="">All Dates</option>
      <option value="2024-11">November 2024</option>
      <option value="2024-10">October 2024</option>
    </select>
  </div>

  <!-- Posts Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded shadow">
      <thead>
        <tr class="bg-gray-50 border-b">
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Author</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Tags</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Comment</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
          <th class="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Example Row -->
        <tr class="border-b hover:bg-gray-50">
          <td class="px-4 py-2 text-sm text-gray-800">How to Build a Website</td>
          <td class="px-4 py-2 text-sm text-gray-600">John Doe</td>
          <td class="px-4 py-2 text-sm text-gray-600">Tutorials</td>
          <td class="px-4 py-2 text-sm text-gray-600">-</td>
          <td class="px-4 py-2 text-sm text-gray-600"><a>1</a></td>
          <td class="px-4 py-2 text-sm text-gray-600">Nov 20, 2024</td>
          <td class="px-4 py-2 text-center">
            <button class="text-blue-600 hover:underline" onclick="editPost('post-id-1')">
              Edit
            </button>
            |
            <button class="text-red-600 hover:underline" onclick="deletePost('post-id-1')">
              Delete
            </button>
          </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex justify-between items-center mt-4">
    <button class="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
      Previous
    </button>
    <div class="text-sm text-gray-600">Page 1 of 10</div>
    <button class="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
      Next
    </button>
  </div>
</div>

<script>

</script>

`
}
