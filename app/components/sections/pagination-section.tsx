"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function PaginationSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="Pagination"
      description="分页组件"
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex gap-4">
        <PropsToggle component="Pagination" expanded={!!expandedProps.Pagination} onToggle={toggleProps} />
        <PropsToggle component="PaginationLink" expanded={!!expandedProps.PaginationLink} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Pagination" expanded={!!expandedProps.Pagination} label="Pagination Props" />
      <PropsPanel component="PaginationLink" expanded={!!expandedProps.PaginationLink} label="PaginationLink Props" />
    </ComponentSection>
  );
}
