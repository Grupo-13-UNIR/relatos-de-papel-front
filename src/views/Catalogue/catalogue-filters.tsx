import { type ChangeEvent, type SubmitEvent, useEffect, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { BookFilters } from '@/types/catalogue.ts';
import { useCatalogue } from '@/context/catalogue/CatalogueContext.tsx';
import { InputRange } from '@/components/input-range.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { BookCategory } from '@/types/book.ts';
import { categoryLabels } from '@/translations/category.ts';

export const CatalogueFilters = () => {
  const { loading, filters, setFilters } = useCatalogue();
  const [formData, setFormData] = useState<BookFilters>({});

  useEffect(() => {
    setFormData(filters);
  }, [filters]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setFilters(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
  };

  const onPriceChange = (fromValue: number, toValue: number) => {
    setFormData((prev) => ({
      ...prev,
      priceMin: fromValue,
      priceMax: toValue,
    }));
  };

  const onClear = () => {
    setFormData({});
    setFilters({});
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-1">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Titulo</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Titulo"
                value={formData.title ?? ''}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="author">Autor</FieldLabel>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Autor"
                value={formData.author ?? ''}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel>Precio</FieldLabel>
              <InputRange
                fromValue={formData.priceMin ?? 0}
                toValue={formData.priceMax ?? 100}
                minValue={0}
                maxValue={100}
                onChange={onPriceChange}
              />
            </Field>

            <Field>
              <FieldLabel>Categoría</FieldLabel>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value as BookCategory,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(BookCategory).map((category) => (
                      <SelectItem value={category}>{categoryLabels[category]}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>

        <div className="mt-4 flex gap-2 border-t pt-3">
          <Button type="button" variant="outline" onClick={onClear} className="flex-1">
            Limpiar filtros
          </Button>
          <Button disabled={loading} type="submit" className="flex-1">
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
};
