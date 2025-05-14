import Link from "next/link";
import React from "react";
import { MoveRight } from 'lucide-react';

interface PageLink {
  title: string;
  url: string;
}

interface BreadcrumbProps {
  pageTitle: string;
  pageLinks?: PageLink[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, pageLinks }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              <MoveRight className="text-gray-500" width={14}/>
            </Link>
          </li>
          {
            pageLinks?.map(pageLink => (
              <li key={ 'breadcrumb-' + pageLink.title }>
                <Link
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                  href={ pageLink.url }
                >
                  { pageLink.title }
                  <MoveRight className="text-gray-500" width={14}/>
                </Link>
              </li>
            ))
          }
          <li className="mt-[2px] text-sm text-gray-800 dark:text-white/90">
            <span>{pageTitle}</span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
