import { type ChangeEvent, type SubmitEvent, useEffect, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { BookFilters } from '@/types/catalogue.ts';
import { useCatalogue } from '@/context/catalogue/CatalogueContext.tsx';

type NumberFilterKey = 'priceMin' | 'priceMax' | 'publishedYearFrom' | 'publishedYearTo';

const numberFields: NumberFilterKey[] = [
  'priceMin',
  'priceMax',
  'publishedYearFrom',
  'publishedYearTo',
];

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

    if (numberFields.includes(name as NumberFilterKey)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : Number(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
  };

  const onClear = () => {
    setFormData({});
    setFilters({});
  };

  return (
    <div className='flex h-full min-h-0 flex-col'>
      <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
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
              <FieldLabel htmlFor="priceMin">Precio minimo</FieldLabel>
              <Input
                id="priceMin"
                name="priceMin"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={(formData as Record<string, number | undefined>).priceMin ?? ''}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="priceMax">Precio maximo</FieldLabel>
              <Input
                id="priceMax"
                name="priceMax"
                type="number"
                min={0}
                step="0.01"
                placeholder="999.99"
                value={(formData as Record<string, number | undefined>).priceMax ?? ''}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="publishedYearFrom">Anio publicacion desde</FieldLabel>
              <Input
                id="publishedYearFrom"
                name="publishedYearFrom"
                type="number"
                step="1"
                placeholder="1990"
                value={(formData as Record<string, number | undefined>).publishedYearFrom ?? ''}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="publishedYearTo">Anio publicacion hasta</FieldLabel>
              <Input
                id="publishedYearTo"
                name="publishedYearTo"
                type="number"
                step="1"
                placeholder="2026"
                value={(formData as Record<string, number | undefined>).publishedYearTo ?? ''}
                onChange={handleChange}
              />
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
