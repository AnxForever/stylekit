import * as React from "react";
import { cn } from "@/lib/utils";

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("divide-y divide-border", className)}
    {...props}
  />
));
List.displayName = "List";

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("py-4 first:pt-0 last:pb-0", className)}
    {...props}
  />
));
ListItem.displayName = "ListItem";

interface ListItemContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, title, description, leading, trailing, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
        )}
        {description && (
          <p className="text-sm text-muted truncate">{description}</p>
        )}
        {children}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  )
);
ListItemContent.displayName = "ListItemContent";

export { List, ListItem, ListItemContent };
