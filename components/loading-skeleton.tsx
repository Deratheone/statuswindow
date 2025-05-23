import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSkeletonProps {
  type: "status-window" | "quest-board" | "activity-form" | "skills-list" | "inventory"
}

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  switch (type) {
    case "status-window":
      return (
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>

          {/* XP Bar */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-[80px]" />
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      )

    case "quest-board":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-[150px]" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-[60px]" />
                  <Skeleton className="h-3 w-[40px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <Skeleton className="h-4 w-[120px]" />
            </div>
          ))}
        </div>
      )

    case "activity-form":
      return (
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-[100px]" />
        </div>
      )

    case "skills-list":
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-md space-y-2">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-3 w-[80px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      )

    case "inventory":
      return (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-2 border rounded">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-8 w-[60px]" />
            </div>
          ))}
        </div>
      )

    default:
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )
  }
}
