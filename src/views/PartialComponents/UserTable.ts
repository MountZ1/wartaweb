interface UsersTableProps {
  Users: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    status: boolean;
    avatar?: string;
  }[];
  hasMore?: boolean;
  nextOffset?: number;
  currentStatus?: string;
  currentRole?: string;
}

export const UsersTable = (props: UsersTableProps): string => {
  const renderActionButtons = (user: typeof props.Users[0]): string => {
    const commonHxAttributes = `
      hx-post="/auth/user/updatestatus"
      hx-ext="json-enc"
      hx-request='{"headers": {"Content-Type": "application/json"}}'
      hx-vals='{"username": "${user.username}", "value": ${!user.status}}'
      hx-include="none" 
      hx-trigger="click" 
      hx-target="#alert"
      hx-swap="innerHTML"
      hx-on::after-request="
        if (event.detail.successful) { 
          const row = document.querySelector('#user-${user.username}');
          if (row) {
            row.style.transition = 'opacity 0.3s ease-out';
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 1000);
          }
        }
      "
    `;

    if (user.status) {
      return `
        <button 
          class="text-red-600 hover:underline" 
          ${commonHxAttributes}
          aria-label="Temporary delete ${user.username}">
          Trash
        </button>  
        <span class="text-gray-300 mx-1">|</span>
        <button 
          class="text-blue-600 hover:underline"
          hx-swap="innerHTML"
          hx-target="#main-content"
          hx-get="/auth/show-user/${user.username}"
          aria-label="View profile for ${user.username}">
          View Profile
        </button>
      `;
    } else {
      return `
        <button 
          class="text-green-600 hover:underline" 
          ${commonHxAttributes}
          aria-label="Restore user ${user.username}">
          Restore
        </button>
        <span class="text-gray-300 mx-1">|</span>
        <button 
          class="text-red-600 hover:underline" 
          hx-delete="/auth/user/${user.username}" 
          hx-trigger="click" 
          hx-target="#alert" 
          hx-swap="innerHTML" 
          hx-on::after-request="
            if (event.detail.successful) { 
              const row = document.querySelector('#user-${user.username}');
              if (row) {
                row.style.transition = 'opacity 0.3s ease-out';
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 1000);
              }
            }
          "
          aria-label="Permanently delete user ${user.username}">
          Permanently Delete
        </button>
      `;
    }
  };

  const modal = (user: typeof props.Users[0]): string => {
    return `
  <div class="flex items-center justify-center h-screen">
    <div class="relative w-full max-w-lg">

      <!-- Modal -->
      <div id="modal" class="fixed inset-0 z-10 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">${user.firstname + ' ' + user.lastname}| ${user.username}</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Change role of user ${user.username}</p>
                    <input type="email" class="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" placeholder="name@example.com">
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                Subscribe
              </button>
              <button type="button" id="close-modal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" hx-on:click="this.closest('#user-modal').remove()">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
  }

  const userRows = props.Users.map((user) => `
    <tr id="user-${user.username}">
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800">
        <div class="flex items-center">
          <img 
            class="w-10 h-10 rounded-full" 
            src="${user.avatar || '/public/image/user/default.jpg'}" 
            alt="Avatar of ${user.firstname} ${user.lastname}">
          <span class="ml-4 font-medium">${user.username}</span>
        </div>
      </td>
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-600">${user.firstname} ${user.lastname}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-600">${user.email}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-600">${user.role}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-600">${user.status ? 'Active' : 'Deleted'}</td>
      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
        <div class="space-x-2">
          ${renderActionButtons(user)}
        </div>
      </td>
    </tr>
  `).join('');

  if (props.Users.length === 0 && props.hasMore) {
    return `<tr><td class="py-2 text-sm text-center" colspan="6">No data tags found</td></tr>`
  }
  return `
    ${userRows}
    ${props.hasMore ? `
      <tr id="load-more-trigger" 
          hx-get="/auth/users/${props.currentStatus || 'active'}/${props.currentRole || 'all'}?offset=${props.nextOffset}" 
          hx-trigger="revealed" 
          hx-target="#users-body" 
          hx-swap="beforeend">
        <td colspan="6" class="text-center p-4">
          Loading more...
        </td>
      </tr>
    ` : ''}
  `;
};
