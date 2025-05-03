export const CreateUser = /* html */`
<div class="p-6 bg-gray-50 min-h-screen">
  <!-- Page Title -->
  <h1 class="text-2xl font-semibold text-gray-800 mb-6">Add New User</h1>
  <div id="alert"></div>

  <!-- Form for Creating User -->
  <form class="space-y-6" id="create-user-form" hx-post="/auth/store-user" hx-encoding="multipart/form-data" hx-trigger="submit" hx-swap="innerHTML" hx-target="#main-content" hx-target-4*="#alert" hx-target-5*="#alert">
    <!-- Username Field -->
    <div class="flex items-center space-x-2">
      <label for="username" class="text-sm font-medium text-gray-700 w-1/4">Username</label>
      <input id="username" name="username" type="text" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter username">
    </div>

    <!-- Email Field -->
    <div class="flex items-center space-x-2">
      <label for="email" class="text-sm font-medium text-gray-700 w-1/4">Email</label>
      <input id="email" name="email" type="email" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter email address">
    </div>

    <div class="flex items-center space-x-2">
      <label for="firstname" class="text-sm font-medium text-gray-700 w-1/4">First Name</label>
      <input id="firstname" name="firstname" type="firstname" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter first name">
    </div>

    <div class="flex items-center space-x-2">
      <label for="lastname" class="text-sm font-medium text-gray-700 w-1/4">Last Name</label>
      <input id="lastname" name="lastname" type="lastname" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter last name">
    </div>

    <!-- Password Field -->
    <div class="flex items-center space-x-2">
      <label for="password" class="text-sm font-medium text-gray-700 w-1/4">Password</label>
      <input id="password" name="password" type="password" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter password">
    </div>

    <!-- Role Selection -->
    <div class="flex items-center space-x-2">
      <label for="role" class="text-sm font-medium text-gray-700 w-1/4">Role</label>
      <select id="role" name="role" required class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="administrator">Administrator</option>
        <option value="editor">Editor</option>
        <option value="author">Author</option>
        <option value="contributor">Contributor</option>
        <option value="subscriber">Subscriber</option>
      </select>
    </div>

    <!-- Submit Button -->
    <div class="flex items-center space-x-2">
      <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto">Add New User</button>
    </div>
  </form>

  <!-- Cancel Button -->
</div>
<script>
  
</script>
`
