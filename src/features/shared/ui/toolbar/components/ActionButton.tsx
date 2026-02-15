"use client";

import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useState } from "react";
import type { ActionButton as ActionButtonType } from "@/features/shared/ui/toolbar/types/toolbar.types";
import { cn } from "@/lib/utils";

export const ActionButton: React.FC<
  ActionButtonType & {
    onClick?: () => void;
    onPopoverConfirm?: (selectedValues: string[]) => void;
  }
> = ({
  label,
  icon,
  onClick,
  variant = "ghost",
  disabled = false,
  className,
  hasPopover = false,
  popoverOptions = [],
  onPopoverConfirm,
  selectionMode = "multiple",
  popoverMaxHeight = 300,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleItemClick = (value: string) => {
    if (selectionMode === "single") {
      setSelectedValues([value]);
    } else {
      setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    }
  };

  const handleConfirm = () => {
    onPopoverConfirm?.(selectedValues);
    setSelectedValues([]);
    setIsPopoverOpen(false);
  };

  const baseStyles = cn(
    "flex h-9 items-center gap-2 rounded-lg px-3",
    "text-sm font-medium",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "whitespace-nowrap",
  );

  const variantStyles = {
    danger: cn("bg-danger text-white", "hover:bg-danger/90", "focus:ring-danger/50"),
    ghost: cn("bg-gray-100 text-gray-700", "hover:bg-gray-200", "focus:ring-gray-300"),
  };

  if (!hasPopover || popoverOptions.length === 0) {
    return (
      <button
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={disabled}
        onClick={onClick}
        type='button'
      >
        <span>{label}</span>
        {icon && <span className='flex items-center justify-center'>{icon}</span>}
      </button>
    );
  }

  return (
    <Popover offset={10} placement='bottom' showArrow={true} isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <button className={cn(baseStyles, variantStyles[variant], className)} disabled={disabled} type='button'>
          <span>{label}</span>
          {icon && <span className='flex items-center justify-center'>{icon}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-55'>
        <div className='w-full px-4 py-3' dir='ltr'>
          <div
            className='space-y-3'
            style={{
              maxHeight: `${popoverMaxHeight}px`,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {popoverOptions.map((option, index) => (
              <Checkbox
                key={index}
                isSelected={selectedValues.includes(option.value)}
                onValueChange={() => handleItemClick(option.value)}
                classNames={{
                  base: "w-full max-w-full m-0",
                  label: "text-small w-full text-right",
                  wrapper: "after:bg-primary",
                }}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>

          <Button
            className='mt-4 w-full bg-primary text-white'
            onPress={handleConfirm}
            size='md'
            isDisabled={selectedValues.length === 0}
          >
            تایید {selectedValues.length > 1 && `(${selectedValues.length})`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
