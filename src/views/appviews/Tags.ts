export const Tags = (alert?: string) => {
  return `
    <div class="container mx-auto px-4 py-1">
      <div class="mb-12">
        <div>
          <h2 class="text-2xl font-semibold mb-6">Tags</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Form -->
            <div class="">
              <h3 class="text-xl font-medium mb-4">Add New Tag</h3>
              <form class="bg-white p-4 shadow rounded-lg space-y-4" hx-post="/auth/tags" hx-encoding="multipart/form-data" hx-trigger="submit" hx-target="#tags-body" hx-swap="beforeend" hx-target-4*="#alert" hx-target-5*="#alert" id="form-tag" hx-on:after-request="resetForm()">
                <div>
                  <label for="tag-name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="tag-name" name="name" placeholder="Tag Name" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label for="tag-slug" class="block text-sm font-medium text-gray-700">Slug</label>
                  <input type="text" name="slug" id="tag-slug" placeholder="Slug (optional)" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label for="tag-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="tag-description" rows="6" name="description" placeholder="Description (optional)" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <button type="submit" class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring">
                  Add New Tags
                </button>
              </form>
            </div>
            <!-- Table -->
            <div class="col-span-2 container overflow-y-auto mt-4">
              <div id="alert"></div>
              <div class="rounded-lg border overflow-hidden">
                <table class="min-w-full bg-white shadow-md divide-y divide-gray-200">
                  <thead>
                    <tr class="bg-gray-100 text-left text-sm uppercase text-gray-600">
                      <th class="px-6 py-3">Tag Name</th>
                      <th class="px-6 py-3">Slug</th>
                      <th class="px-6 py-3">Description</th>
                      <th class="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="tags-body" class="bg-white divide-y divide-gray-200" hx-get="/auth/gettags" hx-trigger="load" hx-target="this">
                    <tr>
                      <td colspan="6" class="text-center p-4">
                        <div class="flex items-center justify-center w-full h-full">
                          <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
                            <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                              <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
                            </svg>
                            <div>Loading ...</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edit Modal -->
    <div id="edit-modal" class="hidden fixed inset-0 bg-gray-50 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-medium mb-4">Edit Tag</h3>
        <form id="edit-form" class="space-y-4" hx-encoding="multipart/form-data" hx-trigger="submit" hx-target="#tags-body" hx-swap="beforeend" hx-target-4*="#alert" hx-target-5*="#alert" id="form-tag" hx-on:after-request="closeModal()">
          <div>
            <label for="edit-tag-name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="edit-tag-name" name="name" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label for="edit-tag-slug" class="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" id="edit-tag-slug" name="slug" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label for="edit-tag-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="edit-tag-description" name="description" rows="4" class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <button type="submit" class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring" onclick="console.log('this button clicked')">
            Update Tag
          </button>
          <button type="button" class="w-full mt-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none focus:ring" onclick="closeModal()">
            Cancel
          </button>
        </form>
      </div>
    </div>
    
    <script>
      function edit(tag) {
        const data = JSON.parse(decodeURIComponent(tag));
        document.getElementById('edit-tag-name').value = data.name;
        document.getElementById('edit-tag-slug').value = data.slug;
        document.getElementById('edit-tag-description').value = data.description;
        document.getElementById('edit-form').setAttribute('hx-post', '/auth/tag/' + data.id);
        document.getElementById('edit-form').setAttribute('data-tag-id', data.id);
        document.getElementById('edit-modal').classList.remove('hidden');
      }
      
      function closeModal() {
        const modal = document.getElementById('edit-modal');
        if (!modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      }

      document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
  
        const form = this;
        const tagId = form.getAttribute('data-tag-id');
        const formData = new FormData(form);
  
        fetch('/auth/tag/' + tagId, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // For both success and error cases, we'll get the HTML content
          return response.text().then(html => {
            if (!response.ok) {
                // If it's an error, update the alert element
                document.getElementById('alert').innerHTML = html;
                closeModal();
                // Don't throw an error here, just return null to stop the chain
                return null;
            }
            // If successful, return the HTML for the next then block
            return html;
          });
        })
        .then(html => {
          // Only proceed if we got valid HTML (not null from error case)
          if (html) {
              document.getElementById('tag-' + tagId).innerHTML = html;
              closeModal();
          }
        })
      });
    </script>
  `
}
