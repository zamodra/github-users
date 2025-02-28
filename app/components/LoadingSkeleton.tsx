import { Skeleton } from "@/components/ui/skeleton";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";

export const HeaderSkeleton = () => {
  return (
    <AccordionTrigger>
      <div className="flex gap-2 flex-row items-center">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-24 h-4" />
      </div>
    </AccordionTrigger>
  )
}
export const CardSkeleton = () => {
  return (
    <AccordionContent>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <Skeleton className="w-32 h-6" />
          <div className="flex flex-row gap-2">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4 mt-2" />
          </CardDescription>
        </CardContent>
      </Card>
    </AccordionContent>
  )
}

const LoadingSkeleton = ({ userIndex }: { userIndex:number }) => {
  return (
    <AccordionItem key={`loading-user-${userIndex}`} value={`loading-user-${userIndex}`}>
      <HeaderSkeleton/>
      <CardSkeleton/>
    </AccordionItem>
  );
};

export default LoadingSkeleton;
