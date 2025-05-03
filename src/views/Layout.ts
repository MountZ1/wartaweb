
interface LayoutProps {
  navbar: string;
  content: string;
  footer?: string;
}

export const Layout = (props: LayoutProps): string => {
  return /* html */`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My App</title>
        <style>

        </style>
        <script src="/public/js/htmx.min.js"></script>
        <script src="/public/js/tailwindcss.js"></script>
      </head>
      <body>
        ${props.navbar}
        ${props.content}
        ${props.footer || ''}
      </body>
    </html>
  `;
};

