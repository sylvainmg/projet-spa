function Icon({ children, className = '', size = 20, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function AlertCircle(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>;
}

export function BarChart3(props) {
  return <Icon {...props}><path d="M3 3v18h18" /><path d="M7 16V9" /><path d="M12 16V5" /><path d="M17 16v-3" /></Icon>;
}

export function CheckCircle(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-5" /></Icon>;
}

export function ClipboardList(props) {
  return <Icon {...props}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v16H4V6a2 2 0 0 1 2-2h2" /><path d="M8 11h8" /><path d="M8 16h8" /><path d="M6 11h.01" /><path d="M6 16h.01" /></Icon>;
}

export function Eye(props) {
  return <Icon {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon>;
}

export function FilePlus(props) {
  return <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v18h16V8z" /><path d="M14 2v6h6" /><path d="M12 18v-6" /><path d="M9 15h6" /></Icon>;
}

export function Landmark(props) {
  return <Icon {...props}><path d="M3 21h18" /><path d="M5 21V10" /><path d="M9 21V10" /><path d="M15 21V10" /><path d="M19 21V10" /><path d="M2 10h20" /><path d="M12 3 3 8h18z" /></Icon>;
}

export function Lock(props) {
  return <Icon {...props}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>;
}

export function Moon(props) {
  return <Icon {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></Icon>;
}

export function Pencil(props) {
  return <Icon {...props}><path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5z" /><path d="m15 5 4 4" /></Icon>;
}

export function Search(props) {
  return <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>;
}

export function Sun(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></Icon>;
}

export function Trash2(props) {
  return <Icon {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 16H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></Icon>;
}
