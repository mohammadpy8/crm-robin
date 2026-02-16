"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SelectOption } from "../../types";

interface SelectFilterProps {
  multiSelect?: boolean;
  onChange: (value: string[] | string) => void;
  options: SelectOption[];
  placeholder: string;
  value: string[] | string;
}

export const SelectFilter = ({ multiSelect = false, onChange, options, placeholder, value }: SelectFilterProps) => {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState<string[] | string>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      let newValue: string[] | string;

      if (multiSelect) {
        const current = Array.isArray(localValue) ? localValue : [];
        newValue = current.includes(optionValue) ? current.filter((v) => v !== optionValue) : [...current, optionValue];
      } else {
        newValue = optionValue;
        setOpen(false);
      }

      setLocalValue(newValue);
      onChange(newValue);
    },
    [multiSelect, localValue, onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const empty = multiSelect ? [] : "";
      setLocalValue(empty);
      onChange(empty);
    },
    [multiSelect, onChange],
  );

  const displayText = useMemo(() => {
    if (Array.isArray(localValue) && localValue.length > 0) {
      return localValue.map((v) => options.find((opt) => opt.value === v)?.label || v).join("، ");
    }
    if (!Array.isArray(localValue) && localValue) {
      return options.find((opt) => opt.value === localValue)?.label || localValue;
    }
    return "";
  }, [localValue, options]);

  const hasValue = useMemo(() => {
    if (Array.isArray(localValue)) {
      return localValue.length > 0;
    }
    return !!localValue;
  }, [localValue]);

  return (
    <div className='relative w-full'>
      <Popover isOpen={open} offset={10} onOpenChange={setOpen} placement='bottom' showArrow={true}>
        <PopoverTrigger>
          <div className='w-full cursor-pointer'>
            <input
              className='w-full cursor-pointer border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0'
              placeholder={placeholder}
              readOnly={true}
              type='text'
              value={displayText}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className='w-64 max-w-xs p-0'>
          <div className='flex flex-col'>
            {multiSelect && Array.isArray(localValue) && localValue.length > 0 && (
              <button
                className='border-b px-3 py-2 text-right text-red-600 text-xs hover:bg-gray-50'
                onClick={() => {
                  setLocalValue([]);
                  onChange([]);
                }}
                type='button'
              >
                پاک کردن همه
              </button>
            )}

            <div className='max-h-64 overflow-y-auto py-1'>
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = multiSelect
                    ? Array.isArray(localValue) && localValue.includes(option.value)
                    : localValue === option.value;

                  return (
                    <button
                      className={`w-full px-4 py-2 text-right text-xs transition-colors ${
                        isSelected ? "bg-primary/10 font-medium text-primary" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      type='button'
                    >
                      {option.label}
                    </button>
                  );
                })
              ) : (
                <div className='px-3 py-2 text-center text-gray-400 text-xs'>آپشنی موجود نیست</div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {hasValue && (
        <button
          className='-translate-y-1/2 absolute top-1/2 left-1 z-50 rounded p-0.5 hover:bg-gray-100'
          onClick={handleClear}
          type='button'
        >
          <X className='h-3 w-3 text-gray-400' />
        </button>
      )}
    </div>
  );
};
