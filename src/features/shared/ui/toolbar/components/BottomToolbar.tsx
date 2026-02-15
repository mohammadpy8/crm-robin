"use client";

import { ActionButtonGroup } from "@/features/shared/ui/toolbar/components/ActionButtonGroup";
import { PageTitle } from "@/features/shared/ui/toolbar/components/PageTitle";
import { ViewButtonGroup } from "@/features/shared/ui/toolbar/components/ViewButtonGroup";
import type { ActionButton, ToolbarHandlers, ViewButton } from "@/features/shared/ui/toolbar/types/toolbar.types";

interface BottomToolbarProps {
  pageTitle?: {
    title: string;
    icon?: React.ReactNode;
  };
  actionButtons?: ActionButton[];
  viewButtons?: ViewButton[];
  hasSelection: boolean;
  selectedCount: number;
  showSelectionCount?: boolean;
  handlers?: ToolbarHandlers;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  pageTitle,
  actionButtons,
  viewButtons,
  hasSelection,
  selectedCount,
  showSelectionCount = true,
  handlers = {},
}) => {
  return (
    <div className='w-full'>
      <div className='mx-auto max-w-480 overflow-x-auto px-4 sm:px-6 md:px-10'>
        <div className='flex h-16 min-w-max items-center justify-between'>
          <div className='flex items-center gap-6'>
            {pageTitle && <PageTitle icon={pageTitle.icon} title={pageTitle.title} />}

            {hasSelection && actionButtons && actionButtons.length > 0 && (
              <ActionButtonGroup
                actionButtons={actionButtons}
                handlers={handlers}
                selectedCount={selectedCount}
                showSelectionCount={showSelectionCount}
              />
            )}
          </div>

          {viewButtons && viewButtons.length > 0 && <ViewButtonGroup viewButtons={viewButtons} />}
        </div>
      </div>
    </div>
  );
};
