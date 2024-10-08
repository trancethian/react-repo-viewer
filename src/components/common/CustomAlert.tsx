import { ReactNode } from 'react';

function AlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-9 sm:size-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export interface CustomAlertProps {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
}
export default function CustomAlert(props: Partial<CustomAlertProps>) {
  const { open, title, children } = props;

  return (
    open && (
      <div
        role="alert"
        className="mt-3 relative flex flex-col sm:items-center w-full p-3 text-sm text-white bg-gradient-to-tr from-gray-900 to-gray-800 rounded-md"
      >
        <span className="flex text-base items-center gap-1">
          <AlertIcon />
          {title}
        </span>
        {children}
      </div>
    )
  );
}
