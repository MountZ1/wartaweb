
export const AppLayout = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My App</title>
  <script src="/public/js/htmx.min.js"></script>
  <script src="/public/js/response-targets.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex bg-gray-100 min-h-screen h-screen" hx-ext="response-targets">

<div class="fixed top-0 left-0 w-full z-20">
  <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-2xl text-gray-500 rounded-lg lg:hidden hover:bg-gray-100" onclick="toggleSidebar()">
     <span class="sr-only">Open sidebar</span>
     <svg class="w-16 h-16" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
       <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
     </svg>
  </button>
</div>

<!-- Overlay -->
<div id="sidebar-overlay" class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden opacity-0 invisible transition-all duration-300" onclick="toggleSidebar()"></div>

<!-- Sidebar -->
<div id="sidebar" class="min-h-screen flex flex-col lg:flex-row lg:fixed lg:block -translate-x-full lg:translate-x-0 z-50 h-screen w-screen lg:w-64 bg-white border-r transition-transform duration-300 ease-in-out overflow-y-auto">
  <!-- Close button for mobile -->
  <button onclick="toggleSidebar()" class="absolute top-2 right-4 p-2 text-gray-500 hover:text-gray-800 lg:hidden">
    <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
   
        <ul class="flex flex-col px-3 py-4 lg:space-y-3 text-5xl lg:text-base pt-20 lg:pt-10">
          <div class="flex-1 space-y-8 lg:space-y-3">
            <li>
              <a hx-get="/auth/dashboard" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML" class="relative flex flex-row items-center h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </span>
                <span class="ml-6 lg:ml-2 tracking-wide truncate">Dashboard</span>
              </a>
            </li>
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="font-light tracking-wide text-gray-500 mt-4">Website</div>
              </div>
            </li>
            <li class="relative">
            <!-- Parent Link -->
            <button onclick="toggleSubMenu(this)" class="relative flex flex-row items-center w-full h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span class="inline-flex justify-center items-center ml-4">
                <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M7.5 16.5h6v-1h-6zm0-4h9v-1h-9zm0-4h9v-1h-9zM5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M5 5v14z"></path>
                </svg>
              </span>
              <span class="ml-6 lg:ml-2 tracking-wide truncate">Posts</span>
              <svg class="w-6 h-6 ml-auto transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          
            <!-- Submenu -->
            <ul class="hidden bg-white border border-gray-200 shadow-lg w-full mt-2 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 space-y-6 lg:space-y-0">
              <li>
                <a hx-get="/auth/posts" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   All Posts
                </a>
              </li>
              <li>
                <a hx-get="/auth/categories" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   Add New
                </a>
              </li>
              <li>
                <a  hx-get="/auth/categories" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   Categories
                </a>
              </li>
              <li>
                <a hx-get="/auth/tags" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   Tags
                </a>
              </li>
            </ul>
          </li>                         
            <li class="relative">
            <!-- Parent Link -->
            <button onclick="toggleSubMenu(this)" class="relative flex flex-row items-center w-full h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
                <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9.462 13h8.692l-2.758-3.654l-2.454 3.077l-1.588-1.884zm-5.846 6.77q-.672 0-1.144-.473Q2 18.825 2 18.154V7.077h1v11.077q0 .269.173.442t.443.173H19v1zm3-3q-.672 0-1.144-.473Q5 15.825 5 15.154V4.616q0-.672.472-1.144T6.616 3h4.961l2 2h6.808q.67 0 1.143.472q.472.472.472 1.144v8.538q0 .671-.472 1.143t-1.144.472zm0-1h13.769q.269 0 .442-.174q.173-.173.173-.442V6.616q0-.27-.173-.443T20.385 6h-7.21l-2-2h-4.56q-.269 0-.442.173T6 4.616v10.538q0 .269.173.442t.443.173m-.616 0V4z"/></svg>
            </span>
              <span class="ml-6 lg:ml-2 tracking-wide truncate">Media</span>
              <svg class="w-6 h-6 ml-auto transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          
            <!-- Submenu -->
            <ul class="hidden bg-white border border-gray-200 shadow-lg w-full mt-2 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 space-y-6 lg:space-y-0">
              <li>
                <a hx-get="/auth/library" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   Library
                </a>
              </li>
              <li>
                <a href="#sub-item-2"
                   class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   Add New
                </a>
              </li>
            </ul>
          </li>                         
           <li class="relative">
           <!-- Parent Link -->
           <button onclick="toggleSubMenu(this)" class="relative flex flex-row items-center w-full h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
           <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 18h7m-7-4h1m-1-4h3M7 2h9.5L21 6.5V19"/><path d="M3 20.5v-14A1.5 1.5 0 0 1 4.5 5h9.752a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 18 8.75V20.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 3 20.5"/><path d="M14 5v3.4a.6.6 0 0 0 .6.6H18"/></g></svg>
            </span>
             <span class="ml-6 lg:ml-2 tracking-wide truncate">Pages</span>
             <svg class="w-6 h-6 ml-auto transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
             </svg>
           </button>
         
           <!-- Submenu -->
           <ul class="hidden bg-white border border-gray-200 shadow-lg w-full mt-2 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 space-y-6 lg:space-y-0">
             <li>
               <a hx-get="/auth/pages" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  All Pages
               </a>
             </li>
             <li>
               <a href="#sub-item-2"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  Add New
               </a>
             </li>
           </ul>
         </li> 
           <li>
             <a href="#" class="relative flex flex-row items-center h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
               <span class="inline-flex justify-center items-center ml-4 lg:ml-3">
                  <svg  class="w-12 h-12 lg:w-6 lg:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7.5 5H5v6h14V5h-2.5v3a.5.5 0 0 1-1 0V5H14v4.5a.5.5 0 0 1-1 0V5H8.5v2a.5.5 0 0 1-1 0zM5 13v-1h14v1a2 2 0 0 1-2 2h-3v3a2 2 0 1 1-4 0v-3H7a2 2 0 0 1-2-2"/></svg>
               </span>
               <span class="ml-6 lg:ml-2 tracking-wide truncate">Theme</span>
             </a>
           </li>
           <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="font-light tracking-wide text-gray-500 mt-4">Settings</div>
              </div>
            </li>
<!--           <li>
             <a href="#" class="relative flex flex-row items-center h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
               <span class="inline-flex justify-center items-center ml-4">
                 <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </span>
               <span class="ml-6 lg:ml-2 tracking-wide truncate">Plugins</span>
             </a>
           </li>-->
           <li class="relative">
           <!-- Parent Link -->
           <button onclick="toggleSubMenu(this)" class="relative flex flex-row items-center w-full h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
           <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
             <span class="ml-6 lg:ml-2 tracking-wide truncate">Users</span>
             <svg class="w-6 h-6 ml-auto transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
             </svg>
           </button>
         
           <!-- Submenu -->
           <ul class="hidden bg-white border border-gray-200 shadow-lg w-full mt-2 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 space-y-6 lg:space-y-0">
             <li>
               <a hx-get="/auth/users" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  All Users
               </a>
             </li>
             <li>
               <a hx-get="/auth/create-user" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  Add New
               </a>
             </li>
             <li>
               <a hx-get="/auth/my-profile" hx-trigger="click" hx-target="#main-content" hx-swap="innerHTML"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                  My Profile
               </a>
             </li>
           </ul>
         </li>
           <li>
             <a href="#" class="relative flex flex-row items-center h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
               <span class="inline-flex justify-center items-center ml-4">
                 <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                 </svg>
               </span>
               <span class="ml-6 lg:ml-2 tracking-wide truncate">Settings</span>
             </a>
           </li>
           <li class="px-3">
              <div class="flex flex-row items-center h-8">
                <div class="font-light tracking-wide text-gray-500"></div>
              </div>
            </li>
            <div class="space-y-4"> <!-- Increased space between multiple logout buttons -->
              <a href="#" class="relative flex flex-row items-center h-16 lg:h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-12 h-12 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                </span>
                <span class="ml-6 lg:ml-2 text-5xl lg:text-base">Logout</span>
              </a>
            </div>
          </div>
      </div>
   </ul>
</div>

<!-- Main Content -->
<div class="flex-1 lg:ml-64 p-6 pt-28 lg:pt-6" id="main-content" hx-ext="response-targets">
   <h1 class="bg-[#023e8a] text-white text-8xl lg:text-base">Hello World</h1>
</div>

<!-- JavaScript -->
<script>
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    // Toggle translate class for sidebar
    sidebar.classList.toggle('-translate-x-full');
    
    // Toggle visibility classes for overlay
    overlay.classList.toggle('invisible');
    overlay.classList.toggle('opacity-0');
  }

  function toggleSubMenu(button) {
    // Find the submenu
    const submenu = button.nextElementSibling;

    // Toggle visibility
    if (submenu.classList.contains('hidden')) {
      submenu.classList.remove('hidden', 'opacity-0', 'translate-y-2');
      submenu.classList.add('opacity-100', 'translate-y-0');
    } else {
      submenu.classList.add('hidden', 'opacity-0', 'translate-y-2');
      submenu.classList.remove('opacity-100', 'translate-y-0');
    }
  }
</script>

</body>
</html>
`
