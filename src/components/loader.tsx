import { Spinner } from '@/components/ui/spinner.tsx';

interface LoaderProps {
  description: string;
}

const Loader = ({ description }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Spinner className="size-8 text-primary" />
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Loader;
