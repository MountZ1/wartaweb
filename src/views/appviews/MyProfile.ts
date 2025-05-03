interface MyProfileLayout {
  isMine: boolean;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  role: string;
}

export const MyProfile = (props: MyProfileLayout) => {
  return `
    <div class="min-h-screen bg-gray-100 overflow-x-hidden">
      <main class="container mx-auto px-4 py-10">
        <div class="bg-white shadow rounded-lg p-6">
          <!-- Profile Picture & Info -->
          <form 
            class="space-y-4" 
            hx-post="${props.isMine ? '/auth/profile/updatemine' : '/auth/profile/' + props.username}" 
            hx-encoding="multipart/form-data" 
            hx-trigger="submit" 
            hx-swap="outerHTML"
          >
            <div class="flex items-center space-x-4">
              <div class="relative">
                <img 
                  id="avatar-preview"
                  src="/public/image/user/${props.avatar || 'default.jpg'}" 
                  alt="Profile Picture" 
                  class="w-24 h-24 rounded-full shadow object-cover"
                >
                <label class="absolute inset-0 cursor-pointer group">
                  ${props.isMine ? `
                    <input type="file" name="avatar" accept="image/*" class="hidden" onchange="previewAvatar(event)">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 flex items-center justify-center">
                      <span class="text-white text-opacity-0 group-hover:text-opacity-100 transition-all duration-300">Edit</span>
                    </div>
                  ` : ''}
                </label>
              </div>
              <div>
                <h2 class="text-2xl font-semibold">Update Profile</h2>
                <p class="text-gray-500">Edit your profile details below</p>
              </div>
            </div>

            <!-- First Name -->
            <div class="mt-4">
              <label class="block text-gray-600 text-sm mb-2">First Name</label>
              <input
                type="text"
                name="firstname"
                value="${props.firstname}"
                class="w-full rounded-lg shadow-sm focus:outline-none p-2 border"
                ${!props.isMine ? 'readonly disabled' : ''}
              >
            </div>

            <!-- Last Name -->
            <div class="mt-4">
              <label class="block text-gray-600 text-sm mb-2">Last Name</label>
              <input
                type="text"
                name="lastname"
                value="${props.lastname}"
                class="w-full rounded-lg shadow-sm focus:outline-none p-2 border"
                ${!props.isMine ? 'readonly disabled' : ''}
              >
            </div>

            <!-- Email -->
            <div class="mt-4">
              <label class="block text-gray-600 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value="${props.email}"
                class="w-full rounded-lg shadow-sm focus:outline-none p-2 border"
                ${!props.isMine ? 'readonly disabled' : ''}
              >
            </div>

            <!-- Password -->
            ${props.isMine ? `
              <div class="mt-4">
                <label class="block text-gray-600 text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  class="w-full rounded-lg shadow-sm focus:outline-none p-2 border"
                >
              </div>
            ` : ''}

            <!-- Role -->
            ${!props.isMine ? `
              <div class="mt-4">
                <label class="block text-gray-600 text-sm mb-2">Role</label>
                <select 
                  id="role" 
                  name="role" 
                  required 
                  class="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  ${['administrator', 'editor', 'author', 'contributor', 'subscriber']
        .map(role => `
                      <option value="${role}" ${props.role === role ? 'selected' : ''}>
                        ${role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    `).join('')}
                </select>
              </div>
            ` : ''}

            <!-- Submit Button -->
            <div class="mt-6 flex justify-end space-x-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
      <script>
        function previewAvatar(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          const preview = document.getElementById('avatar-preview');
          reader.onloadend = function() {
            preview.src = reader.result;
          }
          if (file) {
            reader.readAsDataURL(file);
          }
        }
      </script>
    </div>
  `;
};

