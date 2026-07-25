'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { Locale } from 'intlayer';
import { useLocale } from 'next-intlayer';

const LocaleToggle = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  const handleLocaleChange = (value: string) => {
    setLocale(value as Locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Change language">
        <Globe className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32"
        side="bottom"
        sideOffset={10}
      >
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLocaleChange}
        >
          {availableLocales.map(l => (
            <DropdownMenuRadioItem key={l} value={l}>
              {l.toUpperCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LocaleToggle };
