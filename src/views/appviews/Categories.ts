export const Categories = /* html */`
<div class="container mx-auto px-4 py-2">
  <!-- Categories Section -->
  <div class="mb-12">
    <h2 class="text-2xl font-semibold mb-6">Categories</h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div>
        <h3 class="text-xl font-medium mb-4">Add New Category</h3>
        <form class="bg-white p-4 shadow rounded-lg space-y-4">
          <div>
            <label for="category-name" class="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="category-name" name="name"
              placeholder="Category Name"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label for="category-slug" class="block text-sm font-medium text-gray-700">Slug</label>
            <input 
              type="text" 
              id="category-slug" name="slug"
              placeholder="Slug (optional)"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label for="parent-category" class="block text-sm font-medium text-gray-700">Parent Category</label>
            <select 
                id="parent-category" 
                class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="parent">
                <option value="">None</option>
                <option value="1">Recipes</option>
                <option value="2">Travel</option>
            </select>
        </div>
          <div>
            <label for="category-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea rows="4"
              id="category-description" name="description"
              placeholder="Description (optional)"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <button 
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring">
            Add New Category
          </button>
        </form>
      </div>
      <!-- Table -->
      <div class="col-span-2">
        <table class="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr class="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th class="px-6 py-3">Category Name</th>
              <th class="px-6 py-3">Slug</th>
              <th class="px-6 py-3">Description</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Example Rows -->
            <tr class="border-b hover:bg-gray-50">
              <td class="px-6 py-4">Recipes</td>
              <td class="px-6 py-4">recipes</td>
              <td class="px-6 py-4">A collection of food recipes</td>
              <td class="px-6 py-4 text-right">
                <button class="text-blue-500 hover:underline" onclick="editCategory('Recipes')">Edit</button>
                <button class="text-red-500 hover:underline ml-4" onclick="deleteCategory('Recipes')">Delete</button>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50">
              <td class="px-6 py-4">Travel</td>
              <td class="px-6 py-4">travel</td>
              <td class="px-6 py-4">Tips and guides for travelers</td>
              <td class="px-6 py-4 text-right">
                <button class="text-blue-500 hover:underline" onclick="editCategory('Travel')">Edit</button>
                <button class="text-red-500 hover:underline ml-4" onclick="deleteCategory('Travel')">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`
