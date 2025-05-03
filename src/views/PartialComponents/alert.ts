interface AlertProps {
  color: string;
  type: string;
  message: string;
}

export const Alert = (props: AlertProps): string => {
  return `
          <div class="flex ${props.color} rounded-lg p-4 mb-4 mt-4 text-sm" role="alert" id="alert-response">
            <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div>
                <span class="font-medium">${props.type}</span>${props.message}
            </div>
        </div>
  <script>
         (() => {
        const response = document.getElementById("alert-response");
        if (response) {
          setTimeout(() => {
            response.style.transition = 'opacity 0.3s ease-out';
            response.style.opacity = '0';
            setTimeout(() => {
              if (response.parentNode) {
                response.parentNode.removeChild(response);
              }
            }, 300);
          }, 5000);
        }
      })();
  </script>
  `
}
