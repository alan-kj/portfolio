import type { ReactNode } from "react";

type ResumeLinkProps = Readonly<{
  href: string;
  fileName: string;
  className: string;
  children: ReactNode;
}>;

// One place for the resume link's attributes. `download` only applies to same-site files, so an
// externally hosted resume (Drive, Notion) simply opens in a new tab.
export default function ResumeLink({ href, fileName, className, children }: ResumeLinkProps) {
  return (
    <a
      className={className}
      href={href}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
