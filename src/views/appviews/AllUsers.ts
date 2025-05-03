interface LayoutProps {
  alert?: string;
}

export const AllUsers = (props: LayoutProps) => {
  return `
<div class="p-6 bg-white max-h-fit rounded-md">
  <!-- Page Title -->
  <h1 class="text-2xl text-center font-semibold text-gray-800 mb-4">Users</h1>

  <!-- Add New User Button -->
<div class="mb-4">
  <div class="flex items-center justify-between">
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
            hx-get="/auth/create-user" 
            hx-trigger="click" 
            hx-target="#main-content" 
            hx-swap="innerHTML">
      Add New User
    </button>
    
    <div class="flex space-x-2 ml-auto">
       <select id="role-filter" name="role" hx-get="/auth/getusers/" hx-trigger="change" hx-target="#users-body" hx-include="#status-filter" class="p-2 rounded-md border border-gray-300">
        <option value="all" selected>All Role</option>
        <option value="administrator">Administrator</option>
        <option value="editor">Editor</option>
        <option value="author">Author</option>
        <option value="contributor">Contributor</option>
        <option value="subscriber">Subscriber</option>
      </select>

      <select id="status-filter" name="status" hx-get="/auth/getusers/" hx-trigger="change" hx-target="#users-body" hx-include="#role-filter" class="text-left py-2 px-2 rounded-md border border-gray-300">
        <option value="active" selected>Active</option>
        <option value="deleted">Deleted</option>
      </select>
    </div>
  
  <div id="alert">
    ${props.alert || ''}
  </div>
</div>

  <!-- Users Table -->
  <div class="overflow-x-auto bg-white shadow-md rounded-lg mt-8">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Username
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody id="users-body" class="bg-white divide-y divide-gray-200" hx-get="/auth/getusers/" hx-trigger="load" hx-target="this" hx-include="#role-filter, #status-filter">
      <tr>
        <td colspan="6" class="text-center p-4">
          <div class="flex items-center justify-center w-full h-full">
	<div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
		 
				<svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
					<path clip-rule='evenodd'
						d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
						fill='currentColor' fill-rule='evenodd' />
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
`
}
